import { useTranslation } from "react-i18next";
import RevealUp from "./RevealUp";

const featureKeys = [
  { ico: "◎", key: "performanceReport" },
  { ico: "⟳", key: "aiInsights" },
  { ico: "⚡", key: "optimizationQueue" },
  { ico: "◈", key: "projectedPayback" },
  { ico: "⊙", key: "competitorIntel" },
  { ico: "◷", key: "goalTracker" },
];

const PlatformSection = () => {
  const { t } = useTranslation();
  return (
    <section id="plataforma" className="py-28">
      <div className="max-w-[1040px] mx-auto px-7">
        <RevealUp>
          <p className="text-[11.5px] font-semibold tracking-widest uppercase text-gl-g300 mb-3.5">{t("platformSection.label")}</p>
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-3.5 whitespace-pre-line">
            {t("platformSection.title")}
          </h2>
          <p className="text-lg font-light text-gl-g400 leading-[1.75] max-w-[520px]">
            {t("platformSection.subtitle")}
          </p>
        </RevealUp>

        <RevealUp className="mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-border rounded-xl overflow-hidden">
            {featureKeys.map((f, i) => (
              <div
                key={f.key}
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
                <h3 className="text-base font-semibold tracking-tight text-foreground mb-2">{t(`platformSection.features.${f.key}.title`)}</h3>
                <p className="text-[15px] font-light text-gl-g400 leading-relaxed">{t(`platformSection.features.${f.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </RevealUp>
      </div>
    </section>
  );
};

export default PlatformSection;
