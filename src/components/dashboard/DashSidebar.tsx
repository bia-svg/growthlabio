import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface NavItem {
  labelKey: string;
  path: string;
  icon: string;
  badge?: number | string;
  badgeColor?: "red" | "amber" | "green";
  soon?: boolean;
}

const managementItems: NavItem[] = [
  { labelKey: "dashboard.sidebar.performance", path: "/app", icon: "◎" },
  { labelKey: "dashboard.sidebar.aiCopilot", path: "/app/agent", icon: "◈", soon: true },
  { labelKey: "dashboard.sidebar.optimizer", path: "/app/optimizer", icon: "⚡", soon: true },
  { labelKey: "dashboard.sidebar.competitor", path: "/app/competitor", icon: "⊙", soon: true },
  { labelKey: "dashboard.sidebar.goals", path: "/app/goals", icon: "◉" },
];

const businessItems: NavItem[] = [
  { labelKey: "dashboard.sidebar.integrations", path: "/app/integrations", icon: "⊕" },
  { labelKey: "dashboard.sidebar.attribution", path: "/app/attribution", icon: "⊞", soon: true },
  { labelKey: "dashboard.sidebar.billing", path: "/app/billing", icon: "⊡" },
];

const badgeColors = {
  red: "bg-dash-red text-white",
  amber: "bg-dash-amber text-white",
  green: "bg-dash-green text-white",
};

interface DashSidebarProps {
  optimizerCount: number;
}

const DashSidebar = ({ optimizerCount }: DashSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const current = location.pathname;

  const isActive = (path: string) => current === path;

  const SidebarItem = ({ item }: { item: NavItem }) => {
    const active = isActive(item.path);
    const count = item.labelKey === "dashboard.sidebar.optimizer" ? optimizerCount : item.badge;
    return (
      <button
        onClick={() => navigate(item.path)}
        className={`w-full flex items-center gap-2.5 px-3 py-[7px] rounded-md text-[13.5px] transition-colors ${
          active
            ? "bg-dash-active font-medium text-dash-text-primary"
            : "text-dash-text-secondary hover:bg-dash-hover"
        }`}
      >
        <span className="text-[14px] w-4 text-center opacity-55">{item.icon}</span>
        <span className="flex-1 text-left">{t(item.labelKey)}</span>
        {count !== undefined && String(count).length > 0 && (
          <span className={`text-[10px] font-bold px-[6px] py-[1px] rounded-full ${badgeColors[item.badgeColor || "red"]}`}>
            {count}
          </span>
        )}
      </button>
    );
  };

  const SectionLabel = ({ label }: { label: string }) => (
    <div className="px-3 mb-1.5">
      <span className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">{label}</span>
    </div>
  );

  const toggleLang = () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    i18n.changeLanguage(newLang);
    localStorage.setItem("gl_language", newLang);
  };

  return (
    <aside className="w-[240px] h-screen bg-dash-sidebar border-r border-dash-border flex flex-col font-inter sticky top-0">
      {/* Logo */}
      <div className="px-4 pt-5 pb-4 flex items-center gap-2">
        <div className="w-6 h-6 bg-black rounded-[5px] flex items-center justify-center">
          <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
            <path d="M1 10L4.5 5.5L7 8L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="3" r="1.2" fill="white" />
          </svg>
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-dash-text-primary">Clarivus</span>
      </div>

      {/* Active product */}
      <div className="mx-3 mb-4 p-3 border border-dash-border rounded-lg bg-background">
        <div className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1">{t("dashboard.sidebar.activeProduct")}</div>
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-dash-green" />
          <span className="text-[13px] font-medium text-dash-text-primary">Orbit</span>
        </div>
      </div>

      {/* Management */}
      <SectionLabel label={t("dashboard.sidebar.management")} />
      <nav className="px-2 flex flex-col gap-0.5 mb-3">
        {managementItems.map(item => <SidebarItem key={item.path} item={item} />)}
      </nav>

      <div className="mx-3 h-px bg-dash-border" />

      {/* Your Business */}
      <div className="mt-3">
        <SectionLabel label={t("dashboard.sidebar.yourBusiness")} />
        <nav className="px-2 flex flex-col gap-0.5">
          {businessItems.map(item => <SidebarItem key={item.path} item={item} />)}
        </nav>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Language selector */}
      <div className="px-3 pb-2">
        <div className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary px-3 mb-1">
          {i18n.language === "pt" ? "Mudar de Idioma" : "Change Language"}
        </div>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={() => { i18n.changeLanguage("pt"); localStorage.setItem("gl_language", "pt"); }}
            className={`w-full flex items-center gap-2 px-3 py-[7px] rounded-md text-[12px] transition-colors ${
              i18n.language === "pt" ? "bg-dash-active font-medium text-dash-text-primary" : "text-dash-text-secondary hover:bg-dash-hover"
            }`}
          >
            🇧🇷 Português
          </button>
          <button
            onClick={() => { i18n.changeLanguage("en"); localStorage.setItem("gl_language", "en"); }}
            className={`w-full flex items-center gap-2 px-3 py-[7px] rounded-md text-[12px] transition-colors ${
              i18n.language === "en" ? "bg-dash-active font-medium text-dash-text-primary" : "text-dash-text-secondary hover:bg-dash-hover"
            }`}
          >
            🇺🇸 English
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-3 pb-4 pt-3 border-t border-dash-border flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-full bg-dash-text-primary text-white flex items-center justify-center text-[12px] font-bold">V</div>
        <div>
          <div className="text-[13px] font-medium text-dash-text-primary">Velaris Co.</div>
          <div className="text-[11px] text-dash-text-tertiary">Professional Plan</div>
        </div>
      </div>
    </aside>
  );
};

export default DashSidebar;
