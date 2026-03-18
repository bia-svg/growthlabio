import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, Loader2 } from "lucide-react";

type Msg = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/onboarding-chat`;

const stepContextMap: Record<number, string> = {
  0: "Welcome screen. The user hasn't started configuring yet.",
  1: "Integrations screen — connecting data sources (ads, site, leads, revenue).",
  2: "Funnel builder — organizing conversion funnel stages with drag-and-drop.",
  3: "Data validation — reviewing connection health and data quality.",
};

const stepGreetings: Record<number, string> = {
  0: "Hey! 👋 I'm GrowthLab AI. I can help you set up your operation. Tell me: what type of business do you run?",
  1: "Let's connect your data sources. Tell me which tools you use for ads, analytics, and sales — I'll guide you!",
  2: "Time to build your funnel! Tell me how your sales journey works and I'll suggest the best structure.",
  3: "Almost there! I'm here if you have questions about data quality or want to adjust anything.",
};

async function streamChat({
  messages,
  stepContext,
  onDelta,
  onDone,
  onError,
}: {
  messages: Msg[];
  stepContext: string;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  try {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages, stepContext }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      onError(data.error || `Error ${resp.status}`);
      return;
    }

    if (!resp.body) { onError("No response"); return; }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let idx: number;
      while ((idx = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, idx);
        buffer = buffer.slice(idx + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (!line.startsWith("data: ")) continue;
        const json = line.slice(6).trim();
        if (json === "[DONE]") { onDone(); return; }
        try {
          const parsed = JSON.parse(json);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }
    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Connection error");
  }
}

interface Props {
  currentStep: number;
}

const OnboardingChat = ({ currentStep }: Props) => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: stepGreetings[0] },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const prevStep = useRef(currentStep);

  useEffect(() => {
    if (currentStep !== prevStep.current) {
      prevStep.current = currentStep;
      const greeting = stepGreetings[currentStep];
      if (greeting) {
        setMessages((prev) => [...prev, { role: "assistant", content: greeting }]);
      }
    }
  }, [currentStep]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || isStreaming) return;
    setInput("");

    const userMsg: Msg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);

    let assistantText = "";

    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

    await streamChat({
      messages: [...messages, userMsg],
      stepContext: stepContextMap[currentStep] || "",
      onDelta: (chunk) => {
        assistantText += chunk;
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: assistantText },
        ]);
      },
      onDone: () => setIsStreaming(false),
      onError: (err) => {
        setMessages((prev) => [
          ...prev.slice(0, -1),
          { role: "assistant", content: `⚠️ ${err}` },
        ]);
        setIsStreaming(false);
      },
    });
  };

  return (
    <div className="flex flex-col h-full border-r border-[hsl(var(--dash-border))] bg-[hsl(var(--dash-sidebar))]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[hsl(var(--dash-border))] flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
          <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
        </div>
        <div>
          <div className="text-[13px] font-semibold text-[hsl(var(--dash-text-primary))]">GrowthLab AI</div>
          <div className="text-[11px] text-[hsl(var(--dash-text-tertiary))]">Setup assistant</div>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[13px] leading-relaxed ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-background border border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-primary))] rounded-bl-sm"
              }`}
            >
              {msg.content || (
                <span className="flex items-center gap-1 text-[hsl(var(--dash-text-tertiary))]">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Thinking…
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick suggestions */}
      <div className="px-4 pb-2 flex flex-wrap gap-1.5">
        {currentStep === 1 && (
          <>
            <QuickBtn onClick={(t) => { setInput(t); }} label="Which integrations are essential?" />
            <QuickBtn onClick={(t) => { setInput(t); }} label="I sell via WhatsApp, do I need a site?" />
          </>
        )}
        {currentStep === 2 && (
          <>
            <QuickBtn onClick={(t) => { setInput(t); }} label="Best funnel for e-commerce?" />
            <QuickBtn onClick={(t) => { setInput(t); }} label="Do I need a leads stage?" />
          </>
        )}
        {currentStep === 3 && (
          <>
            <QuickBtn onClick={(t) => { setInput(t); }} label="Can I finish without connecting leads?" />
          </>
        )}
      </div>

      {/* Input */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-2 bg-background border border-[hsl(var(--dash-border))] rounded-xl px-3 py-2 focus-within:border-[hsl(var(--dash-text-secondary))] transition-colors">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="Ask anything about setup…"
            className="flex-1 bg-transparent text-[13px] text-[hsl(var(--dash-text-primary))] placeholder:text-[hsl(var(--dash-text-tertiary))] outline-none"
            disabled={isStreaming}
          />
          <button
            onClick={send}
            disabled={!input.trim() || isStreaming}
            className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-30"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

const QuickBtn = ({ label, onClick }: { label: string; onClick: (text: string) => void }) => (
  <button
    onClick={() => onClick(label)}
    className="px-2.5 py-1 rounded-full border border-[hsl(var(--dash-border))] text-[11px] font-medium text-[hsl(var(--dash-text-secondary))] hover:bg-background hover:border-[hsl(var(--dash-text-tertiary))] transition-colors"
  >
    {label}
  </button>
);

export default OnboardingChat;
