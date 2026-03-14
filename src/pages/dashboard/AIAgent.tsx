import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";

interface Message {
  role: "bot" | "user" | "proposal" | "creative";
  text: string;
  dataBlock?: string;
  proposalLabel?: string;
  proposalActions?: boolean;
  tools?: string[];
  creativeData?: {
    headline: string;
    primaryText: string;
    cta: string;
    format: string;
    audience: string;
    placement: string;
    launched?: boolean;
  };
}

interface SessionState {
  executed?: boolean;
  messages: Message[];
  isAI?: boolean; // true = uses real OpenAI
}

const toolLabels: Record<string, string> = {
  get_campaign_metrics: "Get Campaign Metrics",
  get_account_targets: "Get Account Targets",
  analyze_creative_sentiment: "Analyze Creative Sentiment",
  generate_creative_brief: "Generate Creative Brief",
  generate_image: "Generate Image",
  pause_ad: "Pause Ad",
  adjust_budget: "Adjust Budget",
  create_ad: "Create Ad",
  get_competitor_intel: "Get Competitor Intel",
  get_utm_health: "Get UTM Health",
};

const toolResponses: Record<string, () => Message[]> = {
  get_campaign_metrics: () => [{
    role: "bot",
    text: "Métricas atualizadas dos últimos 7 dias:\n\nPerformance geral estável, mas o ad set \"Orbit v3\" continua com frequência elevada. Recomendo atenção.",
    dataBlock: "Spend: R$14.200 (+8% WoW)\nImpressions: 312k (+5%)\nClicks: 5.8k (CTR 1.86%)\nLeads: 104 (+17% WoW)\nCPL: R$136 (-2%)\nROAS: 4.3× (+2.4%)\nBest Ad Set: Lookalike 1% — ROAS 5.4×\nWorst Ad Set: Orbit v3 — Freq 5.1, CTR 0.9%",
    tools: ["get_campaign_metrics"],
  }],
  get_account_targets: () => [{
    role: "bot",
    text: "Targets configurados para Orbit (Q1 2026):",
    dataBlock: "ROAS Target: 3.5×\nCPL Target: R$95\nMonthly Spend Cap: R$60.000\nFrequency Cap: 3.5 (per 7 days)\nMin CTR Threshold: 1.5%\nMonthly Revenue Target: R$120.000\nPace: 72% of target at 68% of month ✅",
    tools: ["get_account_targets"],
  }],
  analyze_creative_sentiment: () => [{
    role: "bot",
    text: "Análise de sentimento concluída — 342 comentários analisados nos últimos 30 dias.\n\n**Sentimento geral:** 71% positivo · 18% neutro · 11% negativo\n\n**Temas positivos recorrentes:**\n• \"Resultado rápido\" (mencionado 48×)\n• \"Fácil de usar\" (31×)\n• \"Suporte excelente\" (27×)\n\n**Objeções frequentes:**\n• \"Preço alto\" (19×)\n• \"Já tentei algo parecido\" (12×)\n• \"Funciona para negócio pequeno?\" (9×)\n\n**Ângulo mais engajador:** Social proof com números reais — posts com dados de ROAS geraram 2.7× mais comentários.",
    tools: ["analyze_creative_sentiment"],
  }],
  generate_creative_brief: () => [{
    role: "bot",
    text: "Brief de criativo gerado com base na análise de sentimento e performance atual:\n\n**Hook:** \"4.2× de ROAS em 3 semanas — sem achismo\"\n**Angle:** Resultado comprovado com dados reais do cliente\n**Target Objections:** \"É caro demais\" → mostrar ROI positivo em <30 dias\n**CTA:** \"Comece grátis →\"\n**Format:** Carrossel 1:1 (5 slides) + Vídeo vertical 9:16 (12s)\n**Tone:** Confiante, direto, sem jargão\n**Reference:** @lucas_mkt — \"Dobrei meu faturamento em 2 meses\"\n\nQuer que eu gere o criativo com base nesse brief?",
    tools: ["generate_creative_brief"],
  }],
  generate_image: () => [{
    role: "creative",
    text: "Criativo gerado com base no brief aprovado. Preview abaixo:",
    tools: ["generate_image"],
    creativeData: {
      headline: "4.2× ROAS in 3 Weeks — No Guesswork",
      primaryText: "Growth teams using GrowthLab see an average 34% reduction in CPL and 4.2× ROAS within the first month. Real data, real results. Join 200+ companies already scaling with AI.\n\n✅ Automated budget optimization\n✅ Creative fatigue alerts\n✅ AI-powered competitor analysis\n\nStart your free trial today →",
      cta: "Sign Up Free",
      format: "Single Image · 1080×1080",
      audience: "Lookalike 1% — Marketing Managers, 25–44",
      placement: "Feed + Stories + Reels",
    },
  }],
  pause_ad: () => [{
    role: "proposal",
    proposalLabel: "⚡ PROPOSAL — PAUSE AD",
    text: "Pausar \"Orbit v3\" imediatamente.\n\nMotivo: Frequência 5.1 (acima do cap 3.5) há 6 dias. CTR caiu 31% WoW.\nImpacto: Libera R$340/dia para redistribuição.\nRisco: Nenhum — audiência já saturada.",
    proposalActions: true,
    tools: ["pause_ad"],
  }],
  adjust_budget: () => [{
    role: "proposal",
    proposalLabel: "⚡ PROPOSAL — ADJUST BUDGET",
    text: "Redistribuir budget do Orbit v3 para Lookalike 1%:\n\n• Lookalike 1%: R$400/dia → R$740/dia (+85%)\n• Economia esperada: R$2.100/semana em spend desperdiçado\n• ROAS projetado: 4.2× → 4.9×\n• CPL projetado: R$136 → R$98 (-28%)",
    proposalActions: true,
    tools: ["adjust_budget"],
  }],
  create_ad: () => [{
    role: "creative",
    text: "Novo anúncio criado com base nas melhores práticas da conta:",
    tools: ["create_ad"],
    creativeData: {
      headline: "Stop Guessing. Start Growing.",
      primaryText: "Your competitors are already using AI to optimize their ad spend. GrowthLab analyzes your campaigns 24/7 and tells you exactly what to do.\n\n📊 Real-time ROAS tracking\n🎯 Automated audience optimization\n⚡ Creative refresh alerts before fatigue hits\n\nJoin 200+ growth teams. Free for 14 days.",
      cta: "Start Free Trial",
      format: "Carousel · 5 slides · 1080×1080",
      audience: "SaaS Interest BR — Decision Makers, 28–50",
      placement: "Feed + Instagram Explore",
    },
  }],
  get_competitor_intel: () => [{
    role: "bot",
    text: "Intel atualizado dos competidores monitorados (últimas 48h):\n\n**Mentor Pro** 🟣\n• 5 novos criativos (3 vídeos, 2 carrosséis)\n• Ângulo dominante: depoimentos em vídeo curto\n• Volume estimado: alto — provável push de Q1\n\n**FluxoAds** 🟢\n• Campanha de countdown ativa há 8 dias\n• \"Últimas vagas\" — urgência como driver principal\n• Frequência estimada: alta — possível saturação em 2–3 dias\n\n**AdScale BR** 🟠\n• Padrão de spend: picos terça e quinta\n• Foco em retargeting de lista quente\n• Sem criativos novos há 12 dias\n\n**Oportunidade:** Nenhum competidor está usando social proof com dados numéricos para público 35–44. Esse é o ângulo com maior CVR na sua conta.",
    tools: ["get_competitor_intel"],
  }],
  get_utm_health: () => [{
    role: "bot",
    text: "Diagnóstico de UTMs — Orbit:\n\n**Health Score: 34%** ⚠\n\nProblemas encontrados:",
    dataBlock: "❌ 0% das conversões com utm_source (crítico)\n⚠ 3 conversões com campaign name inexistente\n⚠ 34% das sessões sem utm_medium\n✅ utm_content presente em 89% dos clicks\n✅ Pixel events firing corretamente\n\nImpacto: R$18.400 em spend sem source rastreável\nAção recomendada: Adicionar UTM template em todos os ad sets ativos",
    tools: ["get_utm_health"],
  }],
};

const initialSessions = [
  {
    id: 1,
    title: "ROAS Drop Analysis",
    preview: "Analyzing spend and frequency...",
    time: "Today 14:32",
    messages: [
      { role: "bot" as const, text: "Olá. Tenho acesso aos dados de Velaris Co. / Orbit. O que você quer analisar?" },
      { role: "user" as const, text: "O ROAS caiu essa semana. O que está acontecendo?" },
      {
        role: "bot" as const,
        text: 'Analisando os últimos 7 dias…\n\nCriativo saturado. Quer proposta de redistribuição de budget?',
        dataBlock: 'Spend: R$12.400 (+18% WoW)\nLeads: 89 (-22% WoW)\nCPL: R$139 (+52% WoW) ⚠\n"Orbit v3" → freq 4.8, CTR -31% WoW\n72% da queda concentrada nesta campanha',
        tools: ["get_campaign_metrics", "get_account_targets"],
      },
      { role: "user" as const, text: "Sim. Qual o impacto esperado?" },
      {
        role: "proposal" as const,
        proposalLabel: "⚡ PROPOSAL — AWAITING APPROVAL",
        text: "1. Pausar 'Orbit v3' → libera R$340/dia\n2. Lookalike 1%: R$400 → R$740/dia (+85%)\nImpacto estimado: ROAS 4.2× → 4.9×, CPL R$89 → R$72 (-19%)",
        proposalActions: true,
        tools: ["pause_ad", "adjust_budget"],
      },
    ],
  },
  {
    id: 2,
    title: "Creative Brief — Lookalike",
    preview: "Generating brief for new angle...",
    time: "Yesterday 09:18",
    messages: [
      { role: "bot" as const, text: "Olá. Sessão de brief de criativo para Lookalike 1%. Quer que eu analise os comentários dos anúncios atuais para identificar os ângulos mais eficazes?" },
      { role: "user" as const, text: "Sim" },
      {
        role: "bot" as const,
        text: "Análise de sentimento dos comentários concluída.\n\nAngulos mais eficazes:\n• Social proof com dados numéricos (CTR 4.2% vs média 2.8%)\n• Depoimentos curtos em vídeo (< 15s)\n• CTA com benefício direto\n\nBrief gerado:\n\n**Hook:** \"Empresas como a sua crescem 4× mais rápido\"\n**Angle:** Dado real de performance — ROAS 5.1× comprovado\n**Objections addressed:** \"Sem tempo para gerenciar\" / \"Já tentei ferramentas assim\"\n**CTA:** \"Comece seu trial grátis →\"\n**Format:** Vídeo vertical 9:16, até 12 segundos\n**Reference comment:** \"Dobrei meu ROAS em 3 semanas\" — @maria_growth\n**Rationale:** Comentários com social proof numérico geram 2.3× mais engajamento",
        tools: ["analyze_creative_sentiment", "generate_creative_brief"],
      },
      { role: "user" as const, text: "Gera uma imagem para o ad." },
      {
        role: "creative" as const,
        text: "Criativo gerado com base no brief:",
        tools: ["generate_image"],
        creativeData: {
          headline: "4.2× ROAS in 3 Weeks — No Guesswork",
          primaryText: "Growth teams using GrowthLab see an average 34% reduction in CPL and 4.2× ROAS within the first month. Real data, real results.\n\n✅ Automated optimization\n✅ Creative fatigue alerts\n✅ AI competitor analysis\n\nStart free →",
          cta: "Sign Up Free",
          format: "Single Image · 1080×1080",
          audience: "Lookalike 1% — Marketing Managers, 25–44",
          placement: "Feed + Stories + Reels",
        },
      },
    ],
  },
  {
    id: 3,
    title: "Week 10 Summary",
    preview: "Weekly performance digest...",
    time: "Mar 12 08:00",
    messages: [
      { role: "bot" as const, text: "Olá. Tenho acesso aos dados de Velaris Co. / Orbit. O que você quer analisar?" },
      { role: "user" as const, text: "Me dá o resumo da semana 10." },
      {
        role: "bot" as const,
        text: "Resumo Semana 10 — Orbit:\n\n✅ ROAS total: 4.2× (acima da meta)\n⚠ Frequência subiu para 4.1 no ad set principal\n✅ CPL caiu 12% vs semana anterior\n⚠ CTR do \"Orbit v3\" em queda há 4 dias\n\nRecomendações:\n1. Diversificar criativos do ad set principal\n2. Aumentar budget do Lookalike 1%\n3. Considerar pausa do \"Orbit v3\" se tendência continuar",
        tools: ["get_campaign_metrics", "get_account_targets"],
      },
    ],
  },
];

const availableToolKeys = Object.keys(toolLabels);

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-chat`;

async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
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
      body: JSON.stringify({ messages }),
    });

    if (!resp.ok) {
      const data = await resp.json().catch(() => ({}));
      onError(data.error || `Error ${resp.status}`);
      return;
    }

    if (!resp.body) {
      onError("No response stream");
      return;
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, newlineIndex);
        buffer = buffer.slice(newlineIndex + 1);
        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;
        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") { streamDone = true; break; }
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch {
          buffer = line + "\n" + buffer;
          break;
        }
      }
    }

    // flush remaining
    if (buffer.trim()) {
      for (let raw of buffer.split("\n")) {
        if (!raw) continue;
        if (raw.endsWith("\r")) raw = raw.slice(0, -1);
        if (!raw.startsWith("data: ")) continue;
        const jsonStr = raw.slice(6).trim();
        if (jsonStr === "[DONE]") continue;
        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) onDelta(content);
        } catch { /* ignore */ }
      }
    }

    onDone();
  } catch (e) {
    onError(e instanceof Error ? e.message : "Connection error");
  }
}

const AIAgent = () => {
  const [activeSession, setActiveSession] = useState(0);
  const [sessionStates, setSessionStates] = useState<Record<number, SessionState>>(
    Object.fromEntries(initialSessions.map((s, i) => [i, { messages: [...s.messages], isAI: false }]))
  );
  const [sessionList, setSessionList] = useState(
    initialSessions.map((s, i) => ({ id: i, title: s.title, preview: s.preview, time: s.time }))
  );
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const assistantTextRef = useRef("");

  const currentMessages = sessionStates[activeSession]?.messages || [];
  const isAISession = sessionStates[activeSession]?.isAI || false;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages, typing]);

  const addMessages = (newMsgs: Message[]) => {
    setSessionStates(prev => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        messages: [...prev[activeSession].messages, ...newMsgs],
      },
    }));
  };

  const handleToolClick = (toolKey: string) => {
    if (typing) return;
    const responseFn = toolResponses[toolKey];
    if (!responseFn) return;

    setTyping(true);
    setTimeout(() => {
      addMessages(responseFn());
      setTyping(false);
    }, 1200);
  };

  const handleExecute = (msgIndex: number) => {
    setSessionStates(prev => {
      const msgs = [...prev[activeSession].messages];
      const msg = msgs[msgIndex];
      if (msg) msgs[msgIndex] = { ...msg, proposalActions: false };
      msgs.push({ role: "bot", text: "✓ Actions sent for execution via Meta API. Confirmation in ~2 min.", tools: [] });
      return { ...prev, [activeSession]: { ...prev[activeSession], messages: msgs } };
    });
  };

  const handleDismiss = (msgIndex: number) => {
    setSessionStates(prev => {
      const msgs = [...prev[activeSession].messages];
      const msg = msgs[msgIndex];
      if (msg) msgs[msgIndex] = { ...msg, proposalActions: false };
      msgs.push({ role: "bot", text: "Proposta descartada. Posso ajudar com outra coisa?" });
      return { ...prev, [activeSession]: { ...prev[activeSession], messages: msgs } };
    });
  };

  const handleLaunch = (msgIndex: number) => {
    setSessionStates(prev => {
      const msgs = [...prev[activeSession].messages];
      const msg = msgs[msgIndex];
      if (msg?.creativeData) msgs[msgIndex] = { ...msg, creativeData: { ...msg.creativeData, launched: true } };
      msgs.push({
        role: "bot",
        text: "✓ Ad submitted to Meta Ads Manager. Status: In Review.\nEstimated approval: 30 min – 2h.\nCampaign: Lookalike 1% Customers · Budget: R$400/day · Start: Immediately after approval.",
        tools: ["create_ad"],
      });
      return { ...prev, [activeSession]: { ...prev[activeSession], messages: msgs } };
    });
  };

  const handleNewConversation = () => {
    const newId = Math.max(...Object.keys(sessionStates).map(Number)) + 1;
    setSessionStates(prev => ({
      ...prev,
      [newId]: {
        messages: [{ role: "bot", text: "Olá! Sou o GrowthLab AI. Tenho acesso aos dados de Velaris Co. / Orbit. Como posso ajudar?" }],
        isAI: true,
      },
    }));
    setSessionList(prev => [
      { id: newId, title: "New Conversation", preview: "AI-powered chat...", time: "Now" },
      ...prev,
    ]);
    setActiveSession(newId);
  };

  const handleSend = () => {
    if (!input.trim() || typing) return;
    const text = input.trim();
    setInput("");

    // Add user message
    const userMsg: Message = { role: "user", text };
    setSessionStates(prev => ({
      ...prev,
      [activeSession]: {
        ...prev[activeSession],
        messages: [...prev[activeSession].messages, userMsg],
      },
    }));

    setTyping(true);

    if (isAISession) {
      // Real AI streaming
      const allMessages = [...currentMessages, userMsg]
        .filter(m => m.role === "user" || m.role === "bot")
        .map(m => ({ role: m.role === "user" ? "user" as const : "assistant" as const, content: m.text }));

      assistantTextRef.current = "";

      streamChat({
        messages: allMessages,
        onDelta: (chunk) => {
          assistantTextRef.current += chunk;
          const soFar = assistantTextRef.current;
          setSessionStates(prev => {
            const msgs = [...prev[activeSession].messages];
            const last = msgs[msgs.length - 1];
            if (last?.role === "bot" && last.tools?.includes("__streaming")) {
              msgs[msgs.length - 1] = { ...last, text: soFar };
            } else {
              msgs.push({ role: "bot", text: soFar, tools: ["__streaming"] });
            }
            return { ...prev, [activeSession]: { ...prev[activeSession], messages: msgs } };
          });
        },
        onDone: () => {
          // Remove streaming marker
          setSessionStates(prev => {
            const msgs = [...prev[activeSession].messages];
            const last = msgs[msgs.length - 1];
            if (last?.role === "bot" && last.tools?.includes("__streaming")) {
              msgs[msgs.length - 1] = { ...last, tools: [] };
            }
            return { ...prev, [activeSession]: { ...prev[activeSession], messages: msgs } };
          });
          setTyping(false);
        },
        onError: (err) => {
          toast.error(err);
          setTyping(false);
        },
      });
    } else {
      // Demo fallback
      setTimeout(() => {
        setSessionStates(prev => ({
          ...prev,
          [activeSession]: {
            ...prev[activeSession],
            messages: [...prev[activeSession].messages, {
              role: "bot",
              text: "Analisando seus dados... Identifico que a principal oportunidade agora é otimizar o budget allocation entre os ad sets ativos. Quer que eu elabore uma proposta?",
              tools: ["get_campaign_metrics"],
            }],
          },
        }));
        setTyping(false);
      }, 1500);
    }
  };

  const renderCreativeCard = (msg: Message, msgIndex: number) => {
    const cd = msg.creativeData!;
    return (
      <div className="self-start max-w-[90%]">
        <div className="bg-dash-sidebar border border-dash-border rounded-lg overflow-hidden">
          <div className="px-4 py-2.5 border-b border-dash-border">
            <span className="text-[13px] text-dash-text-primary leading-relaxed whitespace-pre-line">{msg.text}</span>
          </div>
          <div className="p-4 space-y-3">
            <div className="bg-background border border-dash-border rounded-md p-4">
              <div className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-2">Ad Preview</div>
              <div className="w-full aspect-square bg-dash-active rounded-md flex items-center justify-center mb-3">
                <div className="text-center">
                  <div className="text-[32px] mb-1">🎨</div>
                  <div className="text-[11px] text-dash-text-tertiary">{cd.format}</div>
                </div>
              </div>
              <div className="text-[15px] font-semibold text-dash-text-primary leading-tight mb-1.5">{cd.headline}</div>
              <div className="text-[12.5px] text-dash-text-secondary leading-relaxed whitespace-pre-line mb-3">{cd.primaryText}</div>
              <div className="flex items-center justify-between bg-dash-hover border border-dash-border rounded-md px-3 py-2">
                <div className="text-[12px] text-dash-text-secondary">velaris.com.br</div>
                <div className="text-[12px] font-semibold text-dash-text-primary">{cd.cta}</div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[11px]">
              <div>
                <div className="text-dash-text-tertiary uppercase tracking-wide font-medium text-[9px] mb-0.5">Format</div>
                <div className="text-dash-text-secondary">{cd.format}</div>
              </div>
              <div>
                <div className="text-dash-text-tertiary uppercase tracking-wide font-medium text-[9px] mb-0.5">Audience</div>
                <div className="text-dash-text-secondary">{cd.audience}</div>
              </div>
              <div>
                <div className="text-dash-text-tertiary uppercase tracking-wide font-medium text-[9px] mb-0.5">Placement</div>
                <div className="text-dash-text-secondary">{cd.placement}</div>
              </div>
            </div>
            {cd.launched ? (
              <div className="bg-dash-green-bg border border-[hsl(155,40%,85%)] rounded-md px-3 py-2 text-[12px] text-dash-green font-medium">
                ✓ Launched — Submitted to Meta Ads Manager
              </div>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => handleLaunch(msgIndex)} className="text-[12px] font-medium bg-dash-text-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity">Launch</button>
                <button className="text-[12px] text-dash-text-secondary border border-dash-border px-3 py-1.5 rounded-md hover:bg-dash-hover transition-colors">Regenerate</button>
                <button className="text-[12px] text-dash-text-tertiary px-3 py-1.5 hover:text-dash-text-secondary transition-colors">Edit Brief</button>
              </div>
            )}
          </div>
        </div>
        {msg.tools && msg.tools.length > 0 && !msg.tools.includes("__streaming") && (
          <div className="flex gap-1 mt-1.5 flex-wrap">
            {msg.tools.map(t => (
              <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-dash-active text-dash-text-tertiary">{toolLabels[t] || t}</span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-10 dash-page-enter flex flex-col" style={{ height: "calc(100vh - 44px - 40px)" }}>
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">AI Agent</h1>
      <p className="text-[14px] text-dash-text-secondary mb-6">Chat with your data. Analyze, propose, execute — all in one conversation.</p>

      <div className="flex-1 flex border border-dash-border rounded-lg overflow-hidden min-h-0">
        {/* Sessions panel */}
        <div className="w-[220px] bg-dash-sidebar border-r border-dash-border flex flex-col shrink-0">
          <div className="px-3 pt-3 pb-2">
            <div className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Conversations</div>
          </div>
          <div className="flex-1 overflow-auto">
            {sessionList.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSession(s.id)}
                className={`w-full text-left px-3 py-2.5 transition-colors ${
                  activeSession === s.id ? "bg-dash-active" : "hover:bg-dash-hover"
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="text-[13px] font-medium text-dash-text-primary truncate">{s.title}</div>
                  {sessionStates[s.id]?.isAI && (
                    <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-dash-green-bg text-dash-green shrink-0">AI</span>
                  )}
                </div>
                <div className="text-[11px] text-dash-text-tertiary truncate">{s.preview}</div>
                <div className="text-[10px] text-dash-text-tertiary mt-0.5">{s.time}</div>
              </button>
            ))}
          </div>
          <div className="p-2 border-t border-dash-border space-y-1">
            <button
              onClick={handleNewConversation}
              className="w-full text-[12px] text-dash-text-secondary border border-dash-border rounded-md hover:text-dash-text-primary hover:bg-dash-hover py-2 transition-colors"
            >
              + New Conversation
            </button>
            <button className="w-full text-[11px] text-dash-text-tertiary hover:text-dash-text-secondary py-1 rounded-md transition-colors">
              ↑ Import From Meeting
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

              if (msg.role === "creative" && msg.creativeData) {
                return <div key={i}>{renderCreativeCard(msg, i)}</div>;
              }

              if (msg.role === "proposal") {
                return (
                  <div key={i} className="self-start max-w-[90%]">
                    <div className="bg-dash-lime-bg border-l-[3px] border-dash-lime rounded-lg px-4 py-3">
                      <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-dash-lime mb-2">{msg.proposalLabel}</div>
                      <div className="text-[13px] text-dash-text-primary whitespace-pre-line leading-relaxed mb-3">{msg.text}</div>
                      {msg.proposalActions && (
                        <div className="flex gap-2">
                          <button onClick={() => handleExecute(i)} className="text-[12px] font-medium bg-dash-text-primary text-white px-3.5 py-1.5 rounded-md hover:opacity-90 transition-opacity">✓ Execute</button>
                          <button onClick={() => handleDismiss(i)} className="text-[12px] text-dash-text-secondary border border-dash-border px-3.5 py-1.5 rounded-md hover:bg-dash-hover transition-colors">Dismiss</button>
                          <button className="text-[12px] text-dash-text-tertiary px-3.5 py-1.5 hover:text-dash-text-secondary transition-colors">View Details</button>
                        </div>
                      )}
                    </div>
                    {msg.tools && msg.tools.length > 0 && !msg.tools.includes("__streaming") && (
                      <div className="flex gap-1 mt-1.5 flex-wrap">
                        {msg.tools.map(t => (
                          <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-dash-active text-dash-text-tertiary">{toolLabels[t] || t}</span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // bot
              return (
                <div key={i} className="self-start max-w-[88%]">
                  <div className="bg-dash-sidebar border border-dash-border rounded-lg px-3.5 py-2.5 text-[13px] text-dash-text-primary leading-relaxed">
                    {msg.dataBlock ? (
                      <>
                        <span>{msg.text.split("\n\n")[0]}</span>
                        <div className="mt-2 bg-background border border-dash-border rounded px-3 py-2 font-mono text-[11.5px] text-dash-text-secondary leading-relaxed whitespace-pre-line">
                          {msg.dataBlock}
                        </div>
                        <div className="mt-2 whitespace-pre-line">{msg.text.split("\n\n").slice(1).join("\n\n")}</div>
                      </>
                    ) : (
                      <span className="whitespace-pre-line">{msg.text}</span>
                    )}
                  </div>
                  {msg.tools && msg.tools.length > 0 && !msg.tools.includes("__streaming") && (
                    <div className="flex gap-1 mt-1.5 flex-wrap">
                      {msg.tools.map(t => (
                        <span key={t} className="text-[9px] font-medium px-1.5 py-0.5 rounded bg-dash-active text-dash-text-tertiary">{toolLabels[t] || t}</span>
                      ))}
                    </div>
                  )}
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
            <div ref={chatEndRef} />
          </div>

          {/* Tool chips */}
          <div className="px-3 pt-2 flex flex-wrap gap-1">
            {availableToolKeys.map(t => (
              <button
                key={t}
                onClick={() => handleToolClick(t)}
                disabled={typing}
                className="text-[9px] font-medium px-2 py-1 rounded border border-dash-border text-dash-text-tertiary hover:bg-dash-hover hover:text-dash-text-secondary transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {toolLabels[t]}
              </button>
            ))}
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
              disabled={typing}
              className="w-8 h-8 bg-dash-text-primary text-white rounded-md flex items-center justify-center text-[13px] hover:opacity-90 transition-opacity disabled:opacity-50"
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
