import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are Clarivus AI — an expert AI copilot for paid media managers. You have full access to the advertiser's data and can analyze campaigns, propose optimizations, generate creative briefs, and execute changes.

Context:
- Workspace: Velaris Co.
- Active product: Orbit (12× installment plan, avg ticket R$18k)
- Ad platform: Meta Ads (connected)
- Revenue source: Shopify (connected)
- Current ROAS: 4.2× (target 3.5×)
- Current CPL: R$89

You respond in Portuguese (Brazilian) by default. You are data-driven, concise, and action-oriented. When proposing changes, always include expected impact with numbers. Format data in monospace blocks when showing metrics.

Available tools you can reference:
- Get Campaign Metrics, Get Account Targets, Analyze Creative Sentiment
- Generate Creative Brief, Generate Image, Pause Ad, Adjust Budget
- Create Ad, Get Competitor Intel, Get UTM Health

When the user asks you to generate a creative or ad, create a detailed ad with:
- Headline (compelling, under 40 chars)
- Primary Text (persuasive, with bullet points and social proof)
- CTA button text
- Format recommendation
- Target audience
- Placement recommendation`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    const OPENAI_API_KEY = Deno.env.get("OpenAi_API");
    if (!OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "OpenAI API key is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "o3-2025-04-16",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please check your OpenAI billing." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("OpenAI error:", response.status, text);
      return new Response(
        JSON.stringify({ error: `OpenAI API error: ${response.status}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
