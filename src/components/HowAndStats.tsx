import RevealUp from "./RevealUp";

const steps = [
  { n: "01", title: "Conecta as fontes", desc: "Meta Ads via OAuth, mais Shopify, HubSpot ou Sympla para receita. Dados fluindo no mesmo dia." },
  { n: "02", title: "Configura o produto", desc: "Define funil, ticket médio e metas. Faz upload de PDFs e brand guides — a IA lê e usa como contexto." },
  { n: "03", title: "IA analisa e propõe", desc: "Insights semanais automáticos. Fila de otimizações priorizadas por impacto. AI Agent disponível 24/7." },
  { n: "04", title: "Você aprova. Executa.", desc: "Nada muda sem a sua aprovação. Um clique executa via Meta Ads API com auditoria completa." },
];

const stats = [
  { value: "80%", label: "redução no tempo de análise manual" },
  { value: "3×", label: "mais rápido no ciclo de otimização" },
  { value: "5×", label: "mais produtos operados pelo mesmo time" },
  { value: "24/7", label: "monitoramento com alertas em tempo real" },
];

const HowAndStats = () => (
  <div className="max-w-[1040px] mx-auto px-7">
    {/* How */}
    <RevealUp className="py-24 border-t border-border">
      <div className="text-center mb-14">
        <p className="text-[11.5px] font-semibold tracking-widest uppercase text-gl-g300 mb-3.5">Como funciona</p>
        <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
          Do zero ao insight em dias.
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-xl overflow-hidden">
        {steps.map((s, i) => (
          <div key={s.n} className={`p-8 px-6 ${i < 3 ? "lg:border-r border-b lg:border-b-0" : ""} ${i < 2 ? "sm:border-r" : "sm:border-r-0"} border-border`}>
            <div className="text-[42px] font-bold tracking-[-0.04em] text-gl-g100 leading-none mb-4">{s.n}</div>
            <h3 className="text-[14.5px] font-semibold text-foreground mb-[7px]">{s.title}</h3>
            <p className="text-[13px] font-light text-gl-g400 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </RevealUp>

    {/* Stats */}
    <RevealUp className="py-[72px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-xl overflow-hidden">
        {stats.map((s, i) => (
          <div key={s.value} className={`p-9 px-7 ${i < 3 ? "lg:border-r" : ""} ${i < 2 ? "sm:border-r" : "sm:border-r-0"} border-b lg:border-b-0 border-border last:border-b-0`}>
            <div className="text-[52px] font-bold tracking-[-0.04em] text-foreground leading-none mb-1.5">{s.value}</div>
            <div className="text-[13px] font-light text-gl-g400 leading-relaxed">{s.label}</div>
          </div>
        ))}
      </div>
    </RevealUp>
  </div>
);

export default HowAndStats;
