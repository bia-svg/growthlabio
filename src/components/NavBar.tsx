import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavBarProps {
  onOpenModal: () => void;
}

const LogoMark = () => (
  <div className="w-[22px] h-[22px] bg-primary rounded-[5px] flex items-center justify-center">
    <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
      <path d="M1 10L4.5 5.5L7 8L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="3" r="1.2" fill="white" />
    </svg>
  </div>
);

const NavBar = ({ onOpenModal }: NavBarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] h-[52px] flex items-center justify-between px-7 bg-background/90 backdrop-blur-[20px] backdrop-saturate-[160%] border-b border-border">
      <a href="#home" className="text-[15px] font-semibold tracking-tight text-foreground no-underline flex items-center gap-[7px]">
        <LogoMark />
        Clarivus
      </a>
      <ul className="hidden md:flex gap-6 list-none">
        {[[t("nav.home"), "#home"], [t("nav.platform"), "#plataforma"]].map(([label, href]) => (
          <li key={label}>
            <a href={href} className="text-sm text-gl-g400 no-underline hover:text-foreground transition-colors">
              {label}
            </a>
          </li>
        ))}
      </ul>
      <div className="flex gap-2 items-center">
        <button onClick={() => navigate("/login")} className="text-[13.5px] font-medium text-gl-g500 bg-transparent border border-border rounded-lg px-3.5 py-1.5 hover:bg-gl-g50 hover:border-gl-g200 hover:text-foreground transition-all">
          {t("nav.login")}
        </button>
        <button onClick={onOpenModal} className="text-[13.5px] font-medium text-primary-foreground bg-primary border-none rounded-lg px-4 py-[7px] hover:bg-gl-g700 transition-colors">
          {t("nav.bookDemo")}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
