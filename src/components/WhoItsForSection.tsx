import { useTranslation } from "react-i18next";
import RevealUp from "./RevealUp";

const WhoItsForSection = () => {
  const { t } = useTranslation();
  const items = t("whoItsFor.items", { returnObjects: true }) as string[];

  return (
    <div className="max-w-[1040px] mx-auto px-7 py-24">
      <RevealUp>
        <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-10 whitespace-pre-line max-w-[700px]">
          {t("whoItsFor.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-5 border border-border rounded-xl hover:bg-gl-off transition-colors"
            >
              <span className="text-primary text-sm mt-0.5 shrink-0">✦</span>
              <p className="text-[15px] font-light text-gl-g500 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </RevealUp>
    </div>
  );
};

export default WhoItsForSection;