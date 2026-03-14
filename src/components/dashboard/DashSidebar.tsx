import { useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { label: "Performance", path: "/dashboard", icon: "◎" },
  { label: "AI Agent", path: "/dashboard/agent", icon: "◈" },
  { label: "Optimizer", path: "/dashboard/optimizer", icon: "⚡", badge: 3, badgeColor: "red" as const },
];

const intelItems = [
  { label: "Competitor", path: "/dashboard/competitor", icon: "⊙" },
  { label: "Attribution", path: "/dashboard/attribution", icon: "⊞", badge: "!", badgeColor: "amber" as const },
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
  const current = location.pathname;

  const isActive = (path: string) => current === path;

  const NavItem = ({ item }: { item: typeof navItems[0] }) => {
    const active = isActive(item.path);
    const count = item.label === "Optimizer" ? optimizerCount : item.badge;
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
        <span className="flex-1 text-left">{item.label}</span>
        {count !== undefined && Number(count) > 0 && (
          <span className={`text-[10px] font-bold px-[6px] py-[1px] rounded-full ${badgeColors[item.badgeColor || "red"]}`}>
            {count}
          </span>
        )}
      </button>
    );
  };

  const IntelItem = ({ item }: { item: typeof intelItems[0] }) => {
    const active = isActive(item.path);
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
        <span className="flex-1 text-left">{item.label}</span>
        {item.badge && (
          <span className={`text-[10px] font-bold px-[6px] py-[1px] rounded-full ${badgeColors[item.badgeColor || "amber"]}`}>
            {item.badge}
          </span>
        )}
      </button>
    );
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
        <span className="text-[15px] font-semibold tracking-tight text-dash-text-primary">GrowthLab</span>
      </div>

      {/* Active product */}
      <div className="mx-3 mb-4 p-3 border border-dash-border rounded-lg bg-background">
        <div className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1">Active product</div>
        <div className="flex items-center gap-2">
          <span className="w-[6px] h-[6px] rounded-full bg-dash-green" />
          <span className="text-[13px] font-medium text-dash-text-primary">Orbit</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="px-2 flex flex-col gap-0.5">
        {navItems.map(item => <NavItem key={item.path} item={item} />)}
      </nav>

      <div className="mx-3 my-3 h-px bg-dash-border" />

      <div className="px-3 mb-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Intelligence</span>
      </div>
      <nav className="px-2 flex flex-col gap-0.5">
        {intelItems.map(item => <IntelItem key={item.path} item={item} />)}
      </nav>

      <div className="mx-3 my-3 h-px bg-dash-border" />

      <nav className="px-2 flex flex-col gap-0.5">
        <button
          onClick={() => navigate("/dashboard/billing")}
          className={`w-full flex items-center gap-2.5 px-3 py-[7px] rounded-md text-[13.5px] transition-colors ${
            isActive("/dashboard/billing")
              ? "bg-dash-active font-medium text-dash-text-primary"
              : "text-dash-text-secondary hover:bg-dash-hover"
          }`}
        >
          <span className="text-[14px] w-4 text-center opacity-55">⊡</span>
          <span className="flex-1 text-left">Billing</span>
        </button>
      </nav>

      <div className="mx-3 my-3 h-px bg-dash-border" />

      <nav className="px-2">
        <button
          onClick={() => navigate("/dashboard/integrations")}
          className={`w-full flex items-center gap-2.5 px-3 py-[7px] rounded-md text-[13.5px] transition-colors ${
            isActive("/dashboard/integrations")
              ? "bg-dash-active font-medium text-dash-text-primary"
              : "text-dash-text-tertiary hover:bg-dash-hover"
          }`}
        >
          <span className="text-[14px] w-4 text-center opacity-55">⊕</span>
          <span className="flex-1 text-left">Integrations</span>
        </button>
      </nav>

      {/* Spacer */}
      <div className="flex-1" />

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
