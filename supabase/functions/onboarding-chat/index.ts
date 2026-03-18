import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `Você é o assistente de onboarding da GrowthLab — uma plataforma de performance marketing.

Seu papel é ajudar o usuário a configurar sua operação durante o setup inicial. Você deve:

1. Responder perguntas sobre as integrações disponíveis (Meta Ads, Google Ads, Shopify, HubSpot, etc.)
2. Ajudar a escolher as melhores fontes de dados para o negócio do usuário
3. Sugerir a estrutura ideal do funil com base no tipo de negócio
4. Explicar conceitos de marketing (ROAS, CPL, CAC, LTV) de forma simples
5. Dar dicas sobre como melhorar a qualidade dos dados

Regras:
- Responda sempre em português brasileiro
- Seja conciso e objetivo (máximo 3 parágrafos)
- Use emojis com moderação para tornar a conversa amigável
- Quando sugerir ações, seja específico sobre o que o usuário deve fazer na interface
- Se o usuário perguntar algo fora do escopo de onboarding, redirecione gentilmente

Contexto atual do usuário será fornecido em cada mensagem como [CONTEXTO].`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, stepContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const contextMsg = stepContext
      ? `[CONTEXTO] Etapa atual do onboarding: ${stepContext}`
      : "";

    const allMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...(contextMsg ? [{ role: "system", content: contextMsg }] : []),
      ...messages,
    ];

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: allMessages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Muitas requisições. Tente novamente em alguns segundos." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Créditos insuficientes." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "Erro no serviço de IA" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("onboarding-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
