import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import RevealUp from "./RevealUp";

interface CTASectionProps {
  onOpenModal: () => void;
}

const CTASection = ({ onOpenModal }: CTASectionProps) => {
  const { t } = useTranslation();
  return (
    <RevealUp className="py-24 border-t border-border text-center">
      <div className="max-w-[1040px] mx-auto px-7">
        <h2 className="text-[clamp(32px,4vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground max-w-[600px] mx-auto mb-3.5 whitespace-pre-line">
          {t("cta.title")}
        </h2>
        <p className="text-[17px] font-light text-gl-g400 max-w-[420px] mx-auto mb-8 leading-[1.7]">
          {t("cta.subtitle")}
        </p>
        <div className="flex items-center justify-center gap-2.5">
          <button onClick={onOpenModal} className="text-[15px] font-medium text-primary-foreground bg-primary rounded-lg px-6 py-3 hover:bg-gl-g700 transition-colors">
            {t("cta.bookDemo")}
          </button>
          <Link to="/signup" className="text-[15px] font-medium text-gl-g500 border border-border rounded-lg px-6 py-3 hover:bg-gl-g50 hover:border-gl-g200 hover:text-foreground transition-all no-underline">
            {t("cta.startTrial")}
          </Link>
        </div>
        <p className="text-[12.5px] text-gl-g300 mt-3.5">{t("cta.noCreditCard")}</p>
      </div>
    </RevealUp>
  );
};

export default CTASection;
