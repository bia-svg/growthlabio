import { useTranslation } from "react-i18next";
import RevealUp from "./RevealUp";

const AgentSection = () => {
  const { t } = useTranslation();
  const features = t("agent.features", { returnObjects: true }) as string[];

  return (
    <div className="max-w-[1040px] mx-auto px-7 mt-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[72px] items-center">
        <RevealUp>
          <div className="inline-flex items-center gap-[5px] border border-border rounded-full px-3 py-1 text-xs font-medium text-gl-g400 mb-4">
            {t("agent.badge")}
          </div>
          <h2 className="text-[clamp(30px,3.5vw,46px)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground mb-3.5 whitespace-pre-line">
            {t("agent.title")}
          </h2>
          <p className="text-[17px] font-light text-gl-g400 leading-[1.75] max-w-[520px] mb-6">
            {t("agent.subtitle")}
          </p>
          <div className="flex flex-col gap-[11px]">
            {features.map((item) => (
              <div key={item} className="flex items-start gap-2.5 text-sm font-light text-gl-g500 leading-relaxed">
                <span className="text-gl-g200 shrink-0 mt-0.5 text-xs">↗</span>
                {item}
              </div>
            ))}
          </div>
        </RevealUp>

        <RevealUp>
          <div className="bg-background border border-[hsl(var(--dash-border))] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,.05),0_1px_3px_rgba(0,0,0,.03)]">
            <div className="flex">
              <div className="w-[140px] bg-[hsl(var(--dash-sidebar))] border-r border-[hsl(var(--dash-border))] hidden sm:block">
                <div className="px-2.5 pt-3 pb-1.5">
                  <div className="text-[8px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))]">Conversations</div>
                </div>
                {[
                  { title: "ROAS Drop Analysis", time: "Today 14:32", active: true },
                  { title: "Creative Brief", time: "Yesterday", active: false },
                  { title: "Week 10 Summary", time: "Mar 12", active: false },
                ].map((s) => (
                  <div key={s.title} className={`px-2.5 py-1.5 ${s.active ? "bg-[hsl(var(--dash-active))]" : ""}`}>
                    <div className="text-[10px] font-medium text-[hsl(var(--dash-text-primary))] truncate">{s.title}</div>
                    <div className="text-[8px] text-[hsl(var(--dash-text-tertiary))]">{s.time}</div>
                  </div>
                ))}
                <div className="px-2.5 py-2 border-t border-[hsl(var(--dash-border))] mt-2">
                  <div className="text-[9px] text-[hsl(var(--dash-text-secondary))] border border-[hsl(var(--dash-border))] rounded px-2 py-1 text-center">+ New Conversation</div>
                </div>
              </div>
              <div className="flex-1">
                <div className="p-3.5 flex flex-col gap-2.5">
                  <div className="bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] rounded-lg px-3 py-2 text-[12px] leading-relaxed text-[hsl(var(--dash-text-primary))] self-start max-w-[90%]">
                    Hi. I have access to Velaris Co. / Orbit data. What would you like to analyze?
                  </div>
                  <div className="px-3 py-2 rounded-lg bg-[hsl(var(--dash-text-primary))] text-white text-[12px] self-end max-w-[85%]">
                    ROAS dropped this week. What's happening?
                  </div>
                  <div className="self-start max-w-[92%]">
                    <div className="bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] rounded-lg px-3 py-2 text-[12px] leading-relaxed text-[hsl(var(--dash-text-primary))]">
                      Analyzing the last 7 days…
                      <div className="font-mono text-[9.5px] text-[hsl(var(--dash-text-secondary))] bg-background border border-[hsl(var(--dash-border))] rounded px-2 py-1.5 mt-1.5 leading-[1.7]">
                        Spend: R$12,400 (+18% WoW)<br />
                        Leads: 89 (-22% WoW)<br />
                        CPL: R$139 (+52% WoW) ⚠<br />
                        Orbit v3 → freq 4.8, CTR -31%
                      </div>
                      <span className="block mt-1.5">Creative saturated. Should I redirect budget to Lookalike 1%?</span>
                    </div>
                    <div className="flex gap-1 mt-1">
                      <span className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-[hsl(var(--dash-active))] text-[hsl(var(--dash-text-tertiary))]">Get Campaign Metrics</span>
                      <span className="text-[8px] font-medium px-1.5 py-0.5 rounded bg-[hsl(var(--dash-active))] text-[hsl(var(--dash-text-tertiary))]">Get Account Targets</span>
                    </div>
                  </div>
                  <div className="bg-[hsl(var(--gl-green-bg))] border-l-[3px] border-[hsl(var(--dash-green))] rounded-lg p-2.5 text-[12px] self-start max-w-[92%]">
                    <div className="text-[8px] font-bold tracking-[0.07em] uppercase text-[hsl(var(--dash-green))] mb-1">⚡ Proposal — Awaiting Approval</div>
                    <div className="text-[hsl(var(--dash-text-primary))] mb-2 text-[11px] leading-relaxed">
                      1. Pause 'Orbit v3' → frees R$340/day<br />
                      2. Lookalike 1%: R$400 → R$740/day (+85%)<br />
                      Est. impact: ROAS 4.2× → 4.9×, CPL -19%
                    </div>
                    <div className="flex gap-[5px]">
                      <button className="text-[10px] font-semibold bg-[hsl(var(--dash-text-primary))] text-white border-none rounded px-2.5 py-1">✓ Execute</button>
                      <button className="text-[10px] bg-background text-[hsl(var(--dash-text-secondary))] border border-[hsl(var(--dash-border))] rounded px-2.5 py-1">Dismiss</button>
                    </div>
                  </div>
                </div>
                <div className="px-3 py-1.5 flex flex-wrap gap-1 border-t border-[hsl(var(--dash-border))]">
                  {["Get Campaign Metrics", "Analyze Creative Sentiment", "Generate Image", "Create Ad", "Adjust Budget"].map((t) => (
                    <span key={t} className="text-[8px] font-medium px-1.5 py-0.5 rounded border border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-tertiary))]">{t}</span>
                  ))}
                </div>
                <div className="border-t border-[hsl(var(--dash-border))] px-3 py-2.5 flex gap-1.5 items-center">
                  <div className="flex-1 bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] rounded-md px-2.5 py-1.5 text-[11px] text-[hsl(var(--dash-text-tertiary))]">
                    Ask, analyze, or propose…
                  </div>
                  <button className="w-6 h-6 bg-[hsl(var(--dash-text-primary))] text-white border-none rounded-md text-[11px] flex items-center justify-center">↑</button>
                </div>
              </div>
            </div>
          </div>
        </RevealUp>
      </div>
    </div>
  );
};

export default AgentSection;
