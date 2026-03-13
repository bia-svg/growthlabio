import { useState } from "react";

interface Session {
  id: number;
  title: string;
  preview: string;
  time: string;
  messages: Message[];
}

interface Message {
  role: "bot" | "user" | "proposal";
  text: string;
  dataBlock?: string;
  proposalLabel?: string;
  proposalActions?: boolean;
}

const sessions: Session[] = [
  {
    id: 1,
    title: "ROAS Drop Analysis",
    preview: "Analyzing spend and frequency...",
    time: "Today 14:32",
    messages: [
      { role: "bot", text: "Olá. Tenho acesso aos dados de Velaris Co. / Plano Anual. O que você quer analisar?" },
      { role: "user", text: "O ROAS caiu essa semana. O que está acontecendo?" },
      {
        role: "bot",
        text: 'Analisando os últimos 7 dias…\n\nCriativo saturado. Quer proposta de redistribuição de budget?',
        dataBlock: 'Spend: R$12.400 (+18% WoW)\nLeads: 89 (-22% WoW)\nCPL: R$139 (+52% WoW) ⚠\n"Anual v3" → freq 4.8, CTR -31% WoW\n72% da queda concentrada nesta campanha',
      },
      { role: "user", text: "Sim. Qual o impacto esperado?" },
      {
        role: "proposal",
        proposalLabel: "⚡ PROPOSAL — AWAITING APPROVAL",
        text: "1. Pausar Ad Set \"Anual v3\" → libera R$320/dia\n2. Redistribuir para Lookalike 1%: R$400 → R$720/dia\n3. Impacto estimado: +R$2,800/semana em receita incremental\n4. ROAS projetado: 4.8× (vs 3.2× atual)",
        proposalActions: true,
      },
    ],
  },
  {
    id: 2,
    title: "Creative Brief — Lookalike",
    preview: "Generating brief for new angle...",
    time: "Yesterday 09:18",
    messages: [
      { role: "bot", text: "Olá. Tenho acesso aos dados de Velaris Co. / Plano Anual. O que você quer analisar?" },
      { role: "user", text: "Preciso de um brief de criativo para o ad set Lookalike 1%." },
      {
        role: "bot",
        text: "Baseado nos dados dos últimos 30 dias, o Lookalike 1% responde melhor a:\n\n• Social proof (CTR 4.2% vs média 2.8%)\n• Formato vídeo curto (< 15s)\n• CTA direto com benefício numérico\n\nQuer que eu gere um brief completo com copy suggestions?",
      },
      { role: "user", text: "Sim, gera o brief." },
      {
        role: "bot",
        text: "Brief gerado e salvo em Documentos. Principais pontos:\n\n• Headline: \"Empresas como a sua crescem 4× mais rápido\"\n• Hook: dado real de performance (ROAS 5.1×)\n• Formato: vídeo vertical 9:16, até 12 segundos\n• CTA: \"Comece seu trial grátis →\"",
      },
    ],
  },
  {
    id: 3,
    title: "Week 10 Summary",
    preview: "Weekly performance digest...",
    time: "Mar 12 08:00",
    messages: [
      { role: "bot", text: "Olá. Tenho acesso aos dados de Velaris Co. / Plano Anual. O que você quer analisar?" },
      { role: "user", text: "Me dá o resumo da semana 10." },
      {
        role: "bot",
        text: "Resumo Semana 10 — Plano Anual:\n\n✅ ROAS total: 4.2× (acima da meta)\n⚠ Frequência subiu para 4.1 no ad set principal\n✅ CPL caiu 12% vs semana anterior\n⚠ CTR do \"Anual v3\" em queda há 4 dias\n\nRecomendações:\n1. Diversificar criativos do ad set principal\n2. Aumentar budget do Lookalike 1%\n3. Considerar pausa do \"Anual v3\" se tendência continuar",
      },
    ],
  },
];

const AIAgent = () => {
  const [activeSession, setActiveSession] = useState(0);
  const [sessionStates, setSessionStates] = useState<Record<number, { executed?: boolean; messages: Message[] }>>(
    Object.fromEntries(sessions.map((s, i) => [i, { messages: [...s.messages] }]))
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const currentMessages = sessionStates[activeSession]?.messages || [];

  const handleExecute = () => {
    setSessionStates(prev => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        executed: true,
        messages: prev[activeSession].messages.map(m =>
          m.role === "proposal" ? { ...m, proposalActions: false } : m
        ),
      },
    }));
  };

  const handleNewConversation = () => {
    const newId = Object.keys(sessionStates).length;
    setSessionStates(prev => ({
      ...prev,
      [newId]: {
        messages: [{ role: "bot", text: "Olá. Tenho acesso aos dados de Velaris Co. / Plano Anual. O que você quer analisar?" }],
      },
    }));
    setActiveSession(newId);
  };

  const handleSend = () => {
    if (!input.trim() || typing) return;
    const text = input.trim();
    setInput("");
    setSessionStates(prev => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        messages: [...prev[activeSession].messages, { role: "user", text }],
      },
    }));
    setTyping(true);
    setTimeout(() => {
      setSessionStates(prev => ({
        ...prev,
        [activeSession]: {
          ...prev[activeSession],
          messages: [
            ...prev[activeSession].messages,
            { role: "bot", text: "Analisando seus dados... Identifico que a principal oportunidade agora é otimizar o budget allocation entre os ad sets ativos. Quer que eu elabore uma proposta?" },
          ],
        },
      }));
      setTyping(false);
    }, 1500);
  };

  return (
    <div className="p-10 dash-page-enter flex flex-col" style={{ height: "calc(100vh - 44px - 40px)" }}>
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">AI Agent</h1>
      <p className="text-[14px] text-dash-text-secondary mb-6">Chat with your data. Analyze, propose, execute — all in one conversation.</p>

      <div className="flex-1 flex border border-dash-border rounded-lg overflow-hidden min-h-0">
        {/* Sessions panel */}
        <div className="w-[220px] bg-dash-sidebar border-r border-dash-border flex flex-col">
          <div className="px-3 pt-3 pb-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Conversations</div>
          </div>
          <div className="flex-1 overflow-auto">
            {sessions.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setActiveSession(i)}
                className={`w-full text-left px-3 py-2.5 transition-colors ${
                  activeSession === i ? "bg-dash-active" : "hover:bg-dash-hover"
                }`}
              >
                <div className="text-[13px] font-medium text-dash-text-primary truncate">{s.title}</div>
                <div className="text-[11px] text-dash-text-tertiary truncate">{s.preview}</div>
                <div className="text-[10px] text-dash-text-tertiary mt-0.5">{s.time}</div>
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-dash-border">
            <button
              onClick={handleNewConversation}
              className="w-full text-[12px] text-dash-text-secondary hover:text-dash-text-primary hover:bg-dash-hover py-2 rounded-md transition-colors"
            >
              + New conversation
            </button>
          </div>
        </div>

        {/* Chat pane */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex-1 overflow-auto p-5 flex flex-col gap-3">
            {currentMessages.map((msg, i) => {
              if (msg.role === "user") {
                return (
                  <div key={i} className="self-end max-w-[85%] bg-dash-text-primary text-white rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed">
                    {msg.text}
                  </div>
                );
              }
              if (msg.role === "proposal") {
                const executed = sessionStates[activeSession]?.executed;
                if (executed) {
                  return (
                    <div key={i} className="self-start max-w-[90%] bg-dash-green-bg border border-[hsl(155,40%,85%)] rounded-lg px-4 py-3 text-[13px] text-dash-green">
                      ✓ Actions sent for execution via API. Confirmation in ~2 min.
                    </div>
                  );
                }
                return (
                  <div key={i} className="self-start max-w-[90%] bg-dash-lime-bg border-l-[3px] border-dash-lime rounded-lg px-4 py-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-dash-lime mb-2">{msg.proposalLabel}</div>
                    <div className="text-[13px] text-dash-text-primary whitespace-pre-line leading-relaxed mb-3">{msg.text}</div>
                    {msg.proposalActions && (
                      <div className="flex gap-2">
                        <button onClick={handleExecute} className="text-[12px] font-medium bg-dash-text-primary text-white px-3.5 py-1.5 rounded-md">✓ Execute</button>
                        <button className="text-[12px] text-dash-text-secondary border border-dash-border px-3.5 py-1.5 rounded-md">Dismiss</button>
                        <button className="text-[12px] text-dash-text-tertiary px-3.5 py-1.5">View details</button>
                      </div>
                    )}
                  </div>
                );
              }
              // bot
              return (
                <div key={i} className="self-start max-w-[88%] bg-dash-sidebar border border-dash-border rounded-lg px-3.5 py-2.5 text-[13px] text-dash-text-primary leading-relaxed">
                  {msg.dataBlock && (
                    <>
                      <span>{msg.text.split("\n\n")[0]}</span>
                      <div className="mt-2 bg-background border border-dash-border rounded px-3 py-2 font-mono text-[11.5px] text-dash-text-secondary leading-relaxed whitespace-pre-line">
                        {msg.dataBlock}
                      </div>
                      <div className="mt-2">{msg.text.split("\n\n").slice(1).join("\n\n")}</div>
                    </>
                  )}
                  {!msg.dataBlock && <span className="whitespace-pre-line">{msg.text}</span>}
                </div>
              );
            })}
            {typing && (
              <div className="self-start bg-dash-sidebar border border-dash-border rounded-lg px-4 py-3 flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-dash-text-tertiary typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-dash-text-tertiary typing-dot" />
                <span className="w-1.5 h-1.5 rounded-full bg-dash-text-tertiary typing-dot" />
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-dash-border p-3 flex gap-2 items-center">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleSend()}
              placeholder="Ask, analyze, or propose…"
              className="flex-1 bg-dash-sidebar border border-dash-border rounded-md px-3 py-2 text-[13px] text-dash-text-primary placeholder:text-dash-text-tertiary outline-none focus:border-dash-text-secondary transition-colors"
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 bg-dash-text-primary text-white rounded-md flex items-center justify-center text-[13px] hover:opacity-90 transition-opacity"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgent;
