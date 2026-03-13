import RevealUp from "./RevealUp";

const features = [
  { ico: "◎", title: "Performance Report", desc: "Dashboard unificado por produto: Spend, ROAS, CPL e funil de impressão à conversão. Atualização a cada 5 minutos." },
  { ico: "⟳", title: "AI Insights Semanal", desc: "Toda segunda-feira: análise de 7 dias, o que funcionou, o que não funcionou e 3 ações concretas para a semana." },
  { ico: "⚡", title: "Optimization Queue", desc: "Detecção de saturação, CPA alto e oportunidade de escala. Proposta pronta, você aprova, executa via API." },
  { ico: "◈", title: "Projected Payback", desc: "Projeção de receita antes das conversões fecharem — ROAS projetado em tempo real com CVR configurável por produto." },
  { ico: "⊙", title: "Competitor Intel", desc: "Monitora anúncios dos concorrentes via Meta Ad Library. IA aponta os ângulos que eles usam e você ainda não está explorando." },
  { ico: "◷", title: "Goal Tracker & Alertas", desc: "Semáforo de meta diário no Slack. Alertas de frequência, CTR e CPA antes de virarem problema irreversível." },
];

const PlatformSection = () => (
  <section id="plataforma" className="py-28">
    <div className="max-w-[1040px] mx-auto px-7">
      <RevealUp>
        <p className="text-[11.5px] font-semibold tracking-widest uppercase text-gl-g300 mb-3.5">A Plataforma</p>
        <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-3.5">
          Inteligência que amplifica<br />quem já é bom.
        </h2>
        <p className="text-lg font-light text-gl-g400 leading-[1.75] max-w-[520px]">
          GrowthLab é o copiloto para gestores de tráfego, times in-house, consultores e qualquer pessoa que trabalha com growth e mídia paga. Você no controle — com IA acelerando cada decisão.
        </p>
      </RevealUp>

      <RevealUp className="mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-border rounded-xl overflow-hidden">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`p-8 px-7 border-b border-r border-border hover:bg-gl-off transition-colors
                ${(i + 1) % 3 === 0 ? "lg:border-r-0" : ""}
                ${(i + 1) % 2 === 0 ? "sm:border-r-0 lg:border-r" : ""}
                ${i >= 3 ? "lg:border-b-0" : ""}
                ${i >= 4 ? "sm:border-b-0" : ""}
              `}
            >
              <div className="w-[34px] h-[34px] border border-border rounded-[7px] flex items-center justify-center text-sm mb-4 bg-background">
                {f.ico}
              </div>
              <h3 className="text-base font-semibold tracking-tight text-foreground mb-2">{f.title}</h3>
              <p className="text-[15px] font-light text-gl-g400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </RevealUp>
    </div>
  </section>
);

export default PlatformSection;
