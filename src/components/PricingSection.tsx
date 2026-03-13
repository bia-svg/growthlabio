import RevealUp from "./RevealUp";

interface PricingSectionProps {
  onOpenModal: () => void;
}

const plans = [
  {
    name: "Starter",
    price: "5.000",
    scope: "1 marca · até 2 produtos",
    desc: "Comece com foco. Uma marca, dados reais, IA operando desde o primeiro dia.",
    star: false,
    cta: "Começar →",
    features: [
      "1 marca · até 2 produtos",
      "Performance Report completo",
      "Optimizer + Competitor Intel",
      "Projected Payback + alertas",
      "UTM Diagnostics",
      "Billing automatizado",
      { text: "Chat conversacional", ai: true },
    ],
    support: "Suporte: chat · SLA 48h",
  },
  {
    name: "Growth",
    price: "10.000",
    scope: "Até 3 marcas · até 5 produtos",
    desc: "Operação em escala com suporte humano. Ideal para gestores com múltiplos clientes.",
    star: true,
    badge: "Mais popular",
    cta: "Agendar demo →",
    features: [
      "Até 3 marcas · até 5 produtos",
      "Tudo do Starter",
      "Bônus de performance calculado automaticamente",
      "Geração de criativos com IA",
      "Sessões de revisão mensais",
      { text: "Chat + execução via API", ai: true },
    ],
    support: "Suporte humano · SLA 24h",
  },
  {
    name: "Scale",
    price: "15.000",
    scope: "Marcas e produtos ilimitados",
    desc: "Operação sem limite com especialista estratégico dedicado ao lado todo dia.",
    star: false,
    cta: "Falar com a gente →",
    features: [
      "Marcas e produtos ilimitados",
      "Tudo do Growth",
      "White-label (domínio próprio)",
      "Motor de experimentação A/B",
      { text: "Sessões ilimitadas + memória", ai: true },
    ],
    support: "Especialista estratégico · SLA 4h",
  },
];

const PricingSection = ({ onOpenModal }: PricingSectionProps) => (
  <section id="pricing" className="py-28 border-t border-border">
    <div className="max-w-[1040px] mx-auto px-7">
      <RevealUp className="text-center mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase text-gl-g300 mb-3.5">Preços</p>
        <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-3.5 mx-auto">
          Por produto. Sem letra miúda.
        </h2>
        <p className="text-lg font-light text-gl-g400 leading-[1.75] max-w-[520px] mx-auto">
          Mesmas funcionalidades em todos os planos — incluindo AI Agent. O preço varia pela escala de operação e pelo nível de suporte humano.
        </p>
      </RevealUp>

      <RevealUp>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`border rounded-xl p-8 relative transition-colors ${
                plan.star
                  ? "border-foreground bg-foreground"
                  : "border-border bg-background hover:border-gl-g200"
              }`}
            >
              {plan.badge && (
                <div className={`absolute top-[-11px] left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full whitespace-nowrap ${
                  plan.star ? "bg-background text-foreground" : "bg-foreground text-background"
                }`}>
                  {plan.badge}
                </div>
              )}
              <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${plan.star ? "text-primary-foreground/40" : "text-gl-g300"}`}>
                {plan.name}
              </div>
              <div className={`text-[56px] font-bold tracking-[-0.04em] leading-none mb-1 ${plan.star ? "text-primary-foreground" : "text-foreground"}`}>
                <sup className="text-xl align-top mt-3 font-normal">R$</sup>{plan.price}
              </div>
              <div className={`text-sm mb-1.5 ${plan.star ? "text-primary-foreground/35" : "text-gl-g300"}`}>por mês</div>
              <div className={`text-sm font-medium rounded-[5px] px-2.5 py-1 inline-block mb-5 ${
                plan.star ? "bg-primary-foreground/10 text-primary-foreground/60" : "bg-gl-g50 text-gl-g400"
              }`}>
                {plan.scope}
              </div>
              <p className={`text-[15px] font-light leading-relaxed mb-6 min-h-[50px] ${plan.star ? "text-primary-foreground/50" : "text-gl-g400"}`}>
                {plan.desc}
              </p>
              <div className={`h-px mb-5 ${plan.star ? "bg-primary-foreground/10" : "bg-border"}`} />
              <div className="flex flex-col gap-2.5 mb-7">
                {plan.features.map((f, i) => {
                  const isObj = typeof f === "object";
                  const text = isObj ? f.text : f;
                  const ai = isObj ? f.ai : false;
                  return (
                    <div key={i} className={`flex items-start gap-2 text-[15px] leading-snug ${plan.star ? "text-primary-foreground/70" : "text-gl-g500"}`}>
                      <span className={`shrink-0 mt-px text-sm ${plan.star ? "text-primary-foreground/30" : "text-gl-g200"}`}>✓</span>
                      {ai && (
                        <span className={`inline-block text-[9px] font-bold tracking-wider uppercase rounded-[3px] px-1.5 py-px align-middle mr-1 ${
                          plan.star ? "bg-primary-foreground/10 text-primary-foreground/50" : "bg-gl-g50 text-gl-g400"
                        }`}>AI AGENT</span>
                      )}
                      {text}
                    </div>
                  );
                })}
                <div className={`flex items-start gap-2 text-[15px] leading-snug ${plan.star ? "text-primary-foreground/70" : "text-gl-g500"}`}>
                  <span className={`shrink-0 mt-px text-sm ${plan.star ? "text-primary-foreground/30" : "text-gl-g200"}`}>○</span>
                  {plan.support}
                </div>
              </div>
              <button
                onClick={onOpenModal}
                className={`block w-full py-3 rounded-lg text-[15px] font-medium text-center transition-all ${
                  plan.star
                    ? "bg-background text-foreground hover:bg-gl-g50"
                    : "bg-transparent border border-border text-gl-g700 hover:bg-gl-g50 hover:border-gl-g200"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </RevealUp>

      <RevealUp className="text-center mt-8">
        <p className="text-[15px] text-gl-g300 leading-[1.7]">
          Todos os planos incluem trial gratuito com dados reais. Sem cartão de crédito para começar.<br />
          <button onClick={onOpenModal} className="text-foreground underline underline-offset-[3px] bg-transparent border-none cursor-pointer text-[15px]">
            Dúvidas? Fale com o time →
          </button>
        </p>
      </RevealUp>
    </div>
  </section>
);

export default PricingSection;
