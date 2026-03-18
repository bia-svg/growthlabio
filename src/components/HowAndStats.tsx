import { useTranslation } from "react-i18next";
import RevealUp from "./RevealUp";

const stepKeys = ["s1", "s2", "s3", "s4"];
const statKeys = ["s1", "s2", "s3", "s4"];

const HowAndStats = () => {
  const { t } = useTranslation();
  return (
    <div className="max-w-[1040px] mx-auto px-7">
      {/* How */}
      <RevealUp className="py-24 border-t border-border">
        <div className="text-center mb-14">
          <p className="text-[11.5px] font-semibold tracking-widest uppercase text-gl-g300 mb-3.5">{t("howAndStats.howLabel")}</p>
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
            {t("howAndStats.howTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-xl overflow-hidden">
          {stepKeys.map((key, i) => (
            <div key={key} className={`p-8 px-6 ${i < 3 ? "lg:border-r border-b lg:border-b-0" : ""} ${i < 2 ? "sm:border-r" : "sm:border-r-0"} border-border`}>
              <div className="text-[42px] font-bold tracking-[-0.04em] text-gl-g100 leading-none mb-4">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="text-base font-semibold text-foreground mb-2">{t(`howAndStats.steps.${key}.title`)}</h3>
              <p className="text-[15px] font-light text-gl-g400 leading-relaxed">{t(`howAndStats.steps.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </RevealUp>

      {/* Stats */}
      <RevealUp className="py-[72px]">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-widest uppercase text-gl-g300 mb-3.5">{t("howAndStats.statsLabel")}</p>
          <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground">
            {t("howAndStats.statsTitle")}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-border rounded-xl overflow-hidden">
          {statKeys.map((key, i) => (
            <div key={key} className={`p-9 px-7 ${i < 3 ? "lg:border-r" : ""} ${i < 2 ? "sm:border-r" : "sm:border-r-0"} border-b lg:border-b-0 border-border last:border-b-0`}>
              <div className="text-[52px] font-bold tracking-[-0.04em] text-foreground leading-none mb-1.5">{t(`howAndStats.stats.${key}.value`)}</div>
              <div className="text-[15px] font-light text-gl-g400 leading-relaxed">{t(`howAndStats.stats.${key}.label`)}</div>
            </div>
          ))}
        </div>
      </RevealUp>
    </div>
  );
};

export default HowAndStats;
