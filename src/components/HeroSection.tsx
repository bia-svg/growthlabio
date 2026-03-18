import { useTranslation } from "react-i18next";
import RevealUp from "./RevealUp";

interface HeroSectionProps {
  onOpenModal: () => void;
}

const WindowMock = () => (
  <div className="max-w-[860px] mx-auto bg-background border border-border rounded-xl shadow-[0_2px_4px_rgba(0,0,0,.03),0_8px_24px_rgba(0,0,0,.05),0_32px_80px_rgba(0,0,0,.07)] overflow-hidden text-left animate-lift">
    {/* Title bar */}
    <div className="flex items-center gap-[7px] px-4 py-3 bg-[hsl(var(--dash-sidebar))] border-b border-[hsl(var(--dash-border))]">
      <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57]" />
      <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E]" />
      <div className="w-[11px] h-[11px] rounded-full bg-[#28C840]" />
      <div className="flex-1 mx-3.5 bg-background border border-[hsl(var(--dash-border))] rounded-md px-2.5 py-0.5 text-[11.5px] text-[hsl(var(--dash-text-tertiary))] text-center">
        app.growthlab.io / velaris / orbit
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr]">
      {/* Sidebar */}
      <div className="hidden md:block border-r border-[hsl(var(--dash-border))] py-4 bg-[hsl(var(--dash-sidebar))]">
        <div className="px-3 pb-3 mb-1">
          <div className="flex items-center gap-2 px-2 mb-2">
            <div className="w-5 h-5 bg-[hsl(var(--dash-text-primary))] rounded flex items-center justify-center text-[9px] font-bold text-white">G</div>
            <span className="text-[13px] font-semibold text-[hsl(var(--dash-text-primary))]">GrowthLab</span>
          </div>
          <div className="px-2 py-1.5 mb-1">
            <div className="text-[9px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))]">Active product</div>
            <div className="text-[12px] font-medium text-[hsl(var(--dash-text-primary))] flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--dash-green))]" /> Orbit
            </div>
          </div>
        </div>
        <div className="px-3 pb-3">
          {[
            { label: "Performance", active: true },
            { label: "AI Agent", active: false },
            { label: "Optimizer", active: false, badge: "3" },
            { label: "Competitor", active: false },
            { label: "Attribution", active: false, badgeAmber: "!" },
          ].map((item) => (
            <div
              key={item.label}
              className={`flex items-center justify-between px-2 py-[6px] rounded-md text-[12px] mb-0.5 ${
                item.active
                  ? "bg-[hsl(var(--dash-active))] font-medium text-[hsl(var(--dash-text-primary))]"
                  : "text-[hsl(var(--dash-text-secondary))]"
              }`}
            >
              {item.label}
              {item.badge && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[hsl(var(--dash-red-bg,0_84%_97%))] text-[hsl(var(--dash-red,0_64%_46%))]">{item.badge}</span>
              )}
              {item.badgeAmber && (
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[hsl(var(--dash-amber-bg))] text-[hsl(var(--dash-amber))]">{item.badgeAmber}</span>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[hsl(var(--dash-border))] mx-3 pt-3 px-2">
          <div className="text-[9px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-1">Intelligence</div>
        </div>
        <div className="mt-auto px-3 pt-3 border-t border-[hsl(var(--dash-border))] mx-0 mt-6">
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-6 h-6 rounded-full bg-[hsl(var(--dash-active))] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--dash-text-secondary))]">V</div>
            <div>
              <div className="text-[11px] font-medium text-[hsl(var(--dash-text-primary))]">Velaris Co.</div>
              <div className="text-[9px] text-[hsl(var(--dash-text-tertiary))]">Professional Plan</div>
            </div>
          </div>
        </div>
      </div>
      {/* Main content */}
      <div className="p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-[11px] text-[hsl(var(--dash-text-tertiary))]">Orbit · synced 3 min ago</div>
            <div className="text-[18px] font-bold tracking-[-0.04em] text-[hsl(var(--dash-text-primary))]">Performance</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="border border-[hsl(var(--dash-border))] rounded-md px-2.5 py-1 text-[11px] text-[hsl(var(--dash-text-secondary))]">Last 30 days</div>
            <div className="border border-[hsl(var(--dash-border))] rounded-md px-2.5 py-1 text-[11px] text-[hsl(var(--dash-text-secondary))]">Export</div>
          </div>
        </div>
        <div className="flex gap-1.5">
          {["Orbit", "Nexus", "Pulse", "Core"].map((p, i) => (
            <div
              key={p}
              className={`text-[11px] px-3 py-1 rounded-md ${
                i === 0
                  ? "bg-[hsl(var(--dash-text-primary))] text-white font-medium"
                  : "border border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-secondary))]"
              }`}
            >
              {i === 0 && "● "}{p}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 border border-[hsl(var(--dash-border))] rounded-lg overflow-hidden">
          {[
            { label: "Total ROAS", value: "4.2×", color: "hsl(var(--dash-green))", sub: "↑ target 3.5×" },
            { label: "Monthly ROAS", value: "1.8×", color: "hsl(var(--dash-text-primary))", sub: "12× installments" },
            { label: "CPL", value: "R$89", color: "hsl(var(--dash-text-primary))", sub: "↓ -12% vs prior" },
            { label: "Frequency", value: "4.1", color: "hsl(var(--dash-amber))", sub: "↑ above 3.5" },
          ].map((kpi, i) => (
            <div key={kpi.label} className={`p-3 ${i < 3 ? "border-r border-[hsl(var(--dash-border))]" : ""}`}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-1">{kpi.label}</div>
              <div className="text-[20px] font-bold tracking-[-0.04em] leading-none" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-[9px] mt-0.5" style={{ color: kpi.color === "hsl(var(--dash-text-primary))" ? "hsl(var(--dash-text-tertiary))" : kpi.color }}>{kpi.sub}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-[1.8fr_1fr] gap-3">
          <div>
            <div className="text-[9px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-2">Conversion Funnel</div>
            <div className="flex flex-col gap-[4px]">
              {[
                { label: "Impressions", w: "100%", val: "284k", pct: "" },
                { label: "Clicks", w: "54%", val: "5.1k", pct: "1.8%" },
                { label: "LP Views", w: "34%", val: "3.2k", pct: "62.7%" },
                { label: "Leads", w: "14%", val: "412", pct: "12.9%" },
                { label: "Converted", w: "5%", val: "21", pct: "11.4%" },
              ].map((row) => (
                <div key={row.label} className="flex items-center gap-2">
                  <div className="text-[10px] text-[hsl(var(--dash-text-secondary))] w-[70px] text-right shrink-0">{row.label}</div>
                  <div className="flex-1 h-[14px] bg-[hsl(var(--dash-active))] rounded overflow-hidden">
                    <div className="h-full bg-[hsl(var(--dash-text-primary))] rounded" style={{ width: row.w }} />
                  </div>
                  <div className="text-[10px] text-[hsl(var(--dash-text-secondary))] w-8 shrink-0">{row.val}</div>
                  <div className="text-[9px] text-[hsl(var(--dash-text-tertiary))] w-8 shrink-0">{row.pct}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-[hsl(var(--dash-green-bg))] border border-[hsl(155,40%,88%)] rounded-md px-2.5 py-2 text-[10px] text-[hsl(var(--dash-green))] leading-relaxed">
              ✦ Lookalike 1% at 5.1× ROAS — best performing ad set this period.
            </div>
            <div className="bg-[hsl(var(--dash-amber-bg))] border border-[hsl(38,60%,88%)] rounded-md px-2.5 py-2 text-[10px] text-[hsl(var(--dash-amber))] leading-relaxed">
              ⚠ 'Orbit v3' frequency at 4.8 for 5 days. Audience saturated.
            </div>
          </div>
        </div>
        <div>
          <div className="text-[9px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-2">Active Campaigns</div>
          <div className="border border-[hsl(var(--dash-border))] rounded-lg overflow-hidden text-[10px]">
            <div className="grid grid-cols-6 gap-1 px-3 py-1.5 bg-[hsl(var(--dash-sidebar))] border-b border-[hsl(var(--dash-border))] font-semibold text-[hsl(var(--dash-text-tertiary))]">
              <div className="col-span-2">Campaign</div>
              <div>Spend</div>
              <div>ROAS</div>
              <div>CPL</div>
              <div>Status</div>
            </div>
            {[
              { name: "Lookalike 1%", spend: "R$4.2k", roas: "5.1×", cpl: "R$74", status: "Healthy", statusColor: "dash-green" },
              { name: "SaaS Interest BR", spend: "R$6.8k", roas: "4.0×", cpl: "R$92", status: "Good", statusColor: "dash-green" },
              { name: "Orbit v3", spend: "R$5.1k", roas: "3.2×", cpl: "R$118", status: "Saturated", statusColor: "dash-amber" },
            ].map((row) => (
              <div key={row.name} className="grid grid-cols-6 gap-1 px-3 py-1.5 border-b border-[hsl(var(--dash-border))] last:border-b-0 text-[hsl(var(--dash-text-secondary))]">
                <div className="col-span-2 text-[hsl(var(--dash-text-primary))] font-medium">{row.name}</div>
                <div>{row.spend}</div>
                <div>{row.roas}</div>
                <div>{row.cpl}</div>
                <div className={`text-[hsl(var(--${row.statusColor}))]`}>{row.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const HeroSection = ({ onOpenModal }: HeroSectionProps) => {
  const { t } = useTranslation();
  return (
    <section id="home" className="pt-[116px] pb-20 text-center">
      <div className="max-w-[1040px] mx-auto px-7">
        <div className="inline-flex items-center gap-1.5 border border-border rounded-full px-3.5 py-[5px] text-[12.5px] font-medium text-gl-g400 mb-7">
          <span className="w-1.5 h-1.5 bg-gl-green rounded-full animate-pulse-dot" />
          {t("hero.badge")}
        </div>
        <h1 className="text-[clamp(48px,6.5vw,88px)] font-bold leading-[1.03] tracking-[-0.04em] text-foreground max-w-[860px] mx-auto mb-5">
          {t("hero.title1")}<br />
          {t("hero.title2")} <span className="text-gl-g300">{t("hero.title3")}</span><br />
          {t("hero.title4")}
        </h1>
        <p className="text-lg font-light text-gl-g400 max-w-[500px] mx-auto mb-9 leading-[1.7]">
          {t("hero.subtitle")}
        </p>
        <div className="flex items-center justify-center gap-2.5">
          <button onClick={onOpenModal} className="text-[15px] font-medium text-primary-foreground bg-primary rounded-lg px-6 py-3 hover:bg-gl-g700 transition-colors">
            {t("hero.cta")}
          </button>
          <a href="#plataforma" className="text-[15px] font-medium text-gl-g500 border border-border rounded-lg px-6 py-3 hover:bg-gl-g50 hover:border-gl-g200 hover:text-foreground transition-all no-underline">
            {t("hero.howItWorks")}
          </a>
        </div>
        <p className="text-[12.5px] text-gl-g300 mt-3.5">{t("hero.noCommitment")}</p>
        <RevealUp className="mt-16 perspective-[1200px]" delay={200}>
          <WindowMock />
        </RevealUp>
      </div>
    </section>
  );
};

export default HeroSection;
