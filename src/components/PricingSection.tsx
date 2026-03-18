import { useTranslation } from "react-i18next";
import RevealUp from "./RevealUp";

interface PricingSectionProps {
  onOpenModal: () => void;
}

const planKeys = ["starter", "growth", "scale"] as const;
const planNames = ["Starter", "Growth", "Scale"];
const planPrices = ["5.000", "10.000", "15.000"];
const planStars = [false, true, false];

const PricingSection = ({ onOpenModal }: PricingSectionProps) => {
  const { t } = useTranslation();

  return (
    <section id="pricing" className="py-28 border-t border-border">
      <div className="max-w-[1040px] mx-auto px-7">
        <RevealUp className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-gl-g300 mb-3.5">{t("pricing.label")}</p>
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-3.5 mx-auto whitespace-pre-line">
            {t("pricing.title")}
          </h2>
          <p className="text-lg font-light text-gl-g400 leading-[1.75] max-w-[520px] mx-auto">
            {t("pricing.subtitle")}
          </p>
        </RevealUp>

        <RevealUp>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-start">
            {planKeys.map((key, idx) => {
              const star = planStars[idx];
              const features = t(`pricing.plans.${key}.features`, { returnObjects: true }) as string[];
              const badge = t(`pricing.plans.${key}.badge`, { defaultValue: "" });

              return (
                <div
                  key={key}
                  className={`border rounded-xl p-8 relative transition-colors ${
                    star ? "border-foreground bg-foreground" : "border-border bg-background hover:border-gl-g200"
                  }`}
                >
                  {badge && (
                    <div className={`absolute top-[-11px] left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-widest uppercase px-3 py-0.5 rounded-full whitespace-nowrap ${
                      star ? "bg-background text-foreground" : "bg-foreground text-background"
                    }`}>
                      {badge}
                    </div>
                  )}
                  <div className={`text-xs font-semibold tracking-widest uppercase mb-4 ${star ? "text-primary-foreground/40" : "text-gl-g300"}`}>
                    {planNames[idx]}
                  </div>
                  <div className={`text-[56px] font-bold tracking-[-0.04em] leading-none mb-1 ${star ? "text-primary-foreground" : "text-foreground"}`}>
                    <sup className="text-xl align-top mt-3 font-normal">R$</sup>{planPrices[idx]}
                  </div>
                  <div className={`text-sm mb-1.5 ${star ? "text-primary-foreground/35" : "text-gl-g300"}`}>{t("pricing.perMonth")}</div>
                  <div className={`text-sm font-medium rounded-[5px] px-2.5 py-1 inline-block mb-5 ${
                    star ? "bg-primary-foreground/10 text-primary-foreground/60" : "bg-gl-g50 text-gl-g400"
                  }`}>
                    {t(`pricing.plans.${key}.scope`)}
                  </div>
                  <p className={`text-[15px] font-light leading-relaxed mb-6 min-h-[50px] ${star ? "text-primary-foreground/50" : "text-gl-g400"}`}>
                    {t(`pricing.plans.${key}.desc`)}
                  </p>
                  <div className={`h-px mb-5 ${star ? "bg-primary-foreground/10" : "bg-border"}`} />
                  <div className="flex flex-col gap-2.5 mb-7">
                    {features.map((f, i) => (
                      <div key={i} className={`flex items-start gap-2 text-[15px] leading-snug ${star ? "text-primary-foreground/70" : "text-gl-g500"}`}>
                        <span className={`shrink-0 mt-px text-sm ${star ? "text-primary-foreground/30" : "text-gl-g200"}`}>✓</span>
                        {f}
                      </div>
                    ))}
                    <div className={`flex items-start gap-2 text-[15px] leading-snug ${star ? "text-primary-foreground/70" : "text-gl-g500"}`}>
                      <span className={`shrink-0 mt-px text-sm ${star ? "text-primary-foreground/30" : "text-gl-g200"}`}>✓</span>
                      <span className={`inline-block text-[9px] font-bold tracking-wider uppercase rounded-[3px] px-1.5 py-px align-middle mr-1 ${
                        star ? "bg-primary-foreground/10 text-primary-foreground/50" : "bg-gl-g50 text-gl-g400"
                      }`}>AI AGENT</span>
                      {t(`pricing.plans.${key}.aiFeature`)}
                    </div>
                    <div className={`flex items-start gap-2 text-[15px] leading-snug ${star ? "text-primary-foreground/70" : "text-gl-g500"}`}>
                      <span className={`shrink-0 mt-px text-sm ${star ? "text-primary-foreground/30" : "text-gl-g200"}`}>○</span>
                      {t(`pricing.plans.${key}.support`)}
                    </div>
                  </div>
                  <button
                    onClick={onOpenModal}
                    className={`block w-full py-3 rounded-lg text-[15px] font-medium text-center transition-all ${
                      star
                        ? "bg-background text-foreground hover:bg-gl-g50"
                        : "bg-transparent border border-border text-gl-g700 hover:bg-gl-g50 hover:border-gl-g200"
                    }`}
                  >
                    {t(`pricing.plans.${key}.cta`)}
                  </button>
                </div>
              );
            })}
          </div>
        </RevealUp>

        <RevealUp className="text-center mt-8">
          <p className="text-[15px] text-gl-g300 leading-[1.7]">
            {t("pricing.footer")}<br />
            <button onClick={onOpenModal} className="text-foreground underline underline-offset-[3px] bg-transparent border-none cursor-pointer text-[15px]">
              {t("pricing.footerCta")}
            </button>
          </p>
        </RevealUp>
      </div>
    </section>
  );
};

export default PricingSection;
