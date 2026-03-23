import { useTranslation } from "react-i18next";

interface ComingSoonOverlayProps {
  children: React.ReactNode;
}

const ComingSoonOverlay = ({ children }: ComingSoonOverlayProps) => {
  const { i18n } = useTranslation();
  const label = i18n.language === "pt" ? "Em breve" : "Soon";

  return (
    <div className="relative w-full h-full">
      {children}
      <div className="absolute inset-0 z-40 flex items-center justify-center bg-dash-sidebar/80 backdrop-blur-[2px]">
        <span className="text-[42px] font-bold uppercase tracking-[0.15em] text-dash-text-tertiary select-none">
          {label}
        </span>
      </div>
    </div>
  );
};

export default ComingSoonOverlay;
