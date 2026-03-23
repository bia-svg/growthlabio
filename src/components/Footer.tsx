import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-7 border-t border-border">
      <div className="max-w-[1040px] mx-auto px-7">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-foreground flex items-center gap-[7px]">
            <div className="w-5 h-5 bg-primary rounded-[5px] flex items-center justify-center">
              <svg viewBox="0 0 12 12" fill="none" className="w-[10px] h-[10px]">
                <path d="M1 10L4.5 5.5L7 8L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="10" cy="3" r="1.2" fill="white" />
              </svg>
            </div>
            Clarivus
          </div>
          <div className="text-[12.5px] text-gl-g300">{t("footer.copyright")}</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
