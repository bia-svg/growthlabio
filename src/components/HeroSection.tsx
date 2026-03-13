import RevealUp from "./RevealUp";

interface HeroSectionProps {
  onOpenModal: () => void;
}

const WindowMock = () => (
  <div className="max-w-[860px] mx-auto bg-background border border-border rounded-xl shadow-[0_2px_4px_rgba(0,0,0,.03),0_8px_24px_rgba(0,0,0,.05),0_32px_80px_rgba(0,0,0,.07)] overflow-hidden text-left animate-lift">
    {/* Bar */}
    <div className="flex items-center gap-[7px] px-4 py-3 bg-gl-off border-b border-border">
      <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
      <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
      <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
      <div className="flex-1 mx-3.5 bg-background border border-border rounded-md px-2.5 py-0.5 text-[11.5px] text-gl-g300 text-center">
        growthlab.app.br / velaris / plano-anual
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
      {/* Sidebar */}
      <div className="hidden md:block border-r border-border py-4 bg-gl-off">
        <div className="px-3 pb-3 mb-1">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-gl-g300 px-1 mb-1">Velaris Co.</div>
          <div className="flex items-center gap-[7px] px-2 py-[5px] rounded-md bg-background text-foreground font-medium shadow-sm text-[13px]">
            <span className="text-xs w-3.5 text-center opacity-60">◎</span> Plano Anual
          </div>
          {["Expansão MRR", "Trial → Pago"].map((t) => (
            <div key={t} className="flex items-center gap-[7px] px-2 py-[5px] rounded-md text-[13px] text-gl-g500">
              <span className="text-xs w-3.5 text-center opacity-60">○</span> {t}
            </div>
          ))}
        </div>
        <div className="px-3 pb-3">
          <div className="text-[10px] font-semibold tracking-widest uppercase text-gl-g300 px-1 mb-1">Módulos</div>
          {[["▦", "Performance"], ["◈", "AI Agent"], ["⊞", "Optimizer"], ["⊙", "Competitor"]].map(([ico, label]) => (
            <div key={label} className="flex items-center gap-[7px] px-2 py-[5px] rounded-md text-[13px] text-gl-g500">
              <span className="text-xs w-3.5 text-center opacity-60">{ico}</span> {label}
            </div>
          ))}
        </div>
      </div>
      {/* Main */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold text-foreground">Performance Report</div>
            <div className="text-xs text-gl-g400 mt-0.5">Plano Anual · atualizado há 3 min</div>
          </div>
          <div className="border border-border rounded-md px-2.5 py-0.5 text-[11.5px] text-gl-g400">Últimos 30 dias</div>
        </div>
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-gl-off border border-border rounded-lg p-3">
            <div className="text-[10.5px] font-semibold tracking-wider uppercase text-gl-g300 mb-1">ROAS Total</div>
            <div className="text-2xl font-bold tracking-tight text-gl-green leading-none">4.2×</div>
            <div className="text-[10.5px] text-gl-green mt-0.5">↑ meta era 3.5×</div>
          </div>
          <div className="bg-gl-off border border-border rounded-lg p-3">
            <div className="text-[10.5px] font-semibold tracking-wider uppercase text-gl-g300 mb-1">CPL</div>
            <div className="text-2xl font-bold tracking-tight text-foreground leading-none">R$89</div>
            <div className="text-[10.5px] text-gl-g300 mt-0.5">dentro da meta</div>
          </div>
          <div className="bg-gl-off border border-border rounded-lg p-3">
            <div className="text-[10.5px] font-semibold tracking-wider uppercase text-gl-g300 mb-1">Frequência</div>
            <div className="text-2xl font-bold tracking-tight text-gl-amber leading-none">4.1</div>
            <div className="text-[10.5px] text-gl-amber mt-0.5">↑ acima de 3.5 ⚠</div>
          </div>
        </div>
        {/* Funnel */}
        <div className="flex flex-col gap-[5px]">
          {[["Impressões", "100%", "284k"], ["Cliques", "62%", "5.1k"], ["Leads", "38%", "412"], ["Conversões", "12%", "21"]].map(([label, w, val]) => (
            <div key={label} className="flex items-center gap-2">
              <div className="text-[11px] text-gl-g400 w-20 text-right shrink-0">{label}</div>
              <div className="flex-1 h-5 bg-gl-g50 rounded overflow-hidden">
                <div className="h-full bg-primary rounded" style={{ width: w }} />
              </div>
              <div className="text-[11px] text-gl-g400 w-10 shrink-0">{val}</div>
            </div>
          ))}
        </div>
        {/* Chat */}
        <div className="flex flex-col gap-[7px]">
          <div className="p-2.5 px-3 rounded-lg bg-gl-off border border-border text-xs leading-relaxed text-gl-g700 self-start max-w-[88%]">
            Frequência do ad set principal está em 4.1 por 4 dias. CTR caiu 28% WoW. O criativo está saturado — redireciono o budget?
          </div>
          <div className="p-2.5 px-3 rounded-lg bg-primary text-primary-foreground text-xs self-end max-w-[88%]">
            Sim. Qual a recomendação?
          </div>
          <div className="bg-gl-green-bg border border-gl-green/20 rounded-lg p-2.5 px-3 text-xs self-start max-w-[90%]">
            <div className="text-[9.5px] font-bold tracking-widest uppercase text-gl-green mb-1">Proposta</div>
            <div className="text-gl-g700 mb-2 leading-relaxed">
              Pausar "Campanha Plano Anual v3" e mover R$420/dia para "Lookalike 1% Clientes" (ROAS 5.1×).
            </div>
            <div className="flex gap-[5px]">
              <button className="text-[11.5px] font-semibold bg-primary text-primary-foreground border-none rounded-[5px] px-3 py-[5px]">Executar</button>
              <button className="text-[11.5px] bg-background text-gl-g400 border border-border rounded-[5px] px-3 py-[5px]">Cancelar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  return (
    <section id="home" className="pt-[116px] pb-20 text-center">
      <div className="max-w-[1040px] mx-auto px-7">
        <div className="inline-flex items-center gap-1.5 border border-border rounded-full px-3.5 py-[5px] text-[12.5px] font-medium text-gl-g400 mb-7">
          <span className="w-1.5 h-1.5 bg-gl-green rounded-full animate-pulse-dot" />
          AI Growth Copilot
        </div>
        <h1 className="text-[clamp(48px,6.5vw,88px)] font-bold leading-[1.03] tracking-[-0.04em] text-foreground max-w-[860px] mx-auto mb-5">
          Seu copiloto de IA<br />
          para <span className="text-gl-g300 font-light">growth</span><br />
          e mídia paga.
        </h1>
        <p className="text-lg font-light text-gl-g400 max-w-[500px] mx-auto mb-9 leading-[1.7]">
          Analisa sua conta, propõe otimizações e executa com a sua aprovação. Você decide. A IA acelera.
        </p>
        <div className="flex items-center justify-center gap-2.5">
          <button onClick={onOpenModal} className="text-[15px] font-medium text-primary-foreground bg-primary rounded-lg px-6 py-3 hover:bg-gl-g700 transition-colors">
            Agendar demo
          </button>
          <a href="#plataforma" className="text-[15px] font-medium text-gl-g500 border border-border rounded-lg px-6 py-3 hover:bg-gl-g50 hover:border-gl-g200 hover:text-foreground transition-all no-underline">
            Como funciona
          </a>
        </div>
        <p className="text-[12.5px] text-gl-g300 mt-3.5">Sem compromisso. Acesso trial gratuito.</p>
        <RevealUp className="mt-16 perspective-[1200px]" delay={200}>
          <WindowMock />
        </RevealUp>
      </div>
    </section>
  );
};

export default HeroSection;
