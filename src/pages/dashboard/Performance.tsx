import { useState } from "react";

const products = [
  { id: "orbit", label: "Orbit", active: true },
  { id: "nexus", label: "Nexus" },
  { id: "pulse", label: "Pulse" },
  { id: "core", label: "Core" },
];

const topAds = [
  { name: "Lookalike — Social Proof v2", spend: "R$1,800", roas: "6.8×", ctr: "4.1%", freq: "1.8" },
  { name: "Remarketing — Urgency CTA", spend: "R$1,200", roas: "6.2×", ctr: "4.8%", freq: "1.9" },
  { name: "Lookalike — Testimonial Short", spend: "R$980", roas: "5.9×", ctr: "3.9%", freq: "2.0" },
  { name: "Interest BR — Benefit Hook", spend: "R$1,400", roas: "5.4×", ctr: "3.2%", freq: "2.3" },
  { name: "Lookalike — Data Proof", spend: "R$760", roas: "5.1×", ctr: "3.4%", freq: "2.1" },
];

const bottomAds = [
  { name: "Orbit v3 — Generic CTA", spend: "R$2,100", cpa: "R$420", ctr: "0.8%", freq: "5.2" },
  { name: "Orbit v3 — Long Copy", spend: "R$1,800", cpa: "R$360", ctr: "0.9%", freq: "4.8" },
  { name: "Interest BR — Old Creative", spend: "R$1,400", cpa: "R$280", ctr: "1.1%", freq: "3.9" },
  { name: "Broad — Awareness v1", spend: "R$900", cpa: "R$300", ctr: "1.0%", freq: "3.5" },
  { name: "Retargeting — Expired Offer", spend: "R$680", cpa: "R$340", ctr: "1.2%", freq: "3.2" },
];

const Performance = () => {
  const [activeProduct, setActiveProduct] = useState("orbit");
  const [showTimeSeries, setShowTimeSeries] = useState(false);
  const [timeSeriesView, setTimeSeriesView] = useState<"daily" | "weekly">("daily");

  return (
    <div className="p-10 dash-page-enter">
      {/* Header */}
      <div className="mb-1 text-[12px] text-dash-text-tertiary">Orbit · synced 3 min ago</div>
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Performance</h1>
      <p className="text-[14px] text-dash-text-secondary mb-6">Period overview · Meta Ads + Shopify (Orbit)</p>

      {/* Product selector */}
      <div className="flex items-center gap-1.5 mb-8">
        {products.map(p => (
          <button
            key={p.id}
            onClick={() => setActiveProduct(p.id)}
            className={`flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-md border transition-colors ${
              activeProduct === p.id
                ? "bg-dash-text-primary text-white border-dash-text-primary"
                : "border-dash-border text-dash-text-secondary hover:bg-dash-hover"
            }`}
          >
            {activeProduct === p.id && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
            {p.label}
          </button>
        ))}
        <button className="text-[13px] text-dash-text-tertiary hover:text-dash-text-secondary px-3 py-1.5 border border-dashed border-dash-border rounded-md transition-colors">
          + Add product
        </button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-4 border border-dash-border rounded-lg overflow-hidden mb-8">
        <KPI label="Total ROAS" value="4.2×" color="green" note="↑ target: 3.5×" noteColor="green" />
        <KPI label="Monthly ROAS" value="1.8×" note="12× installments" />
        <KPI label="CPL" value="R$89" note="↓ -12% vs prior" noteColor="green" />
        <KPI label="Frequency" value="4.1" color="amber" note="↑ above 3.5" noteColor="amber" last />
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-[1fr_320px] gap-6 mb-8">
        {/* Funnel */}
        <div className="border border-dash-border rounded-lg p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-4">Conversion Funnel</div>
          <div className="flex flex-col gap-2.5">
            <FunnelRow label="Impressions" value="284k" pct="" width="100%" />
            <FunnelRow label="Clicks" value="5.1k" pct="1.8%" width="62%" />
            <FunnelRow label="LP Views" value="3.2k" pct="62.7%" width="48%" />
            <FunnelRow label="Leads" value="412" pct="12.9%" width="30%" highlight />
            <FunnelRow label="SQL" value="185" pct="44.9%" width="18%" highlight />
            <FunnelRow label="Converted" value="21" pct="11.4%" width="6%" />
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Spend chart */}
          <div className="border border-dash-border rounded-lg p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Spend — last 14 days</div>
            <div className="flex items-end gap-[3px] h-[60px]">
              {[65,72,80,58,45,30,35,68,82,90,75,60,25,28].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${i === 5 || i === 6 || i === 12 || i === 13 ? "bg-dash-border" : "bg-dash-text-primary"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Callouts */}
          <div className="bg-dash-green-bg border border-[hsl(155,40%,85%)] rounded-lg p-3.5 text-[13px] text-dash-green leading-relaxed">
            ✦ Lookalike 1% at 5.1× ROAS — best performing ad set this period.
          </div>
          <div className="bg-dash-amber-bg border border-[hsl(36,60%,85%)] rounded-lg p-3.5 text-[13px] text-dash-amber leading-relaxed">
            ⚠ 'Orbit v3' frequency at 4.8 for 5 days. Audience saturated.
          </div>
        </div>
      </div>

      {/* Campaigns table */}
      <div className="border border-dash-border rounded-lg overflow-hidden mb-8">
        <div className="px-5 py-3 border-b border-dash-border">
          <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Active Campaigns</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dash-border">
              {["Campaign", "Spend", "ROAS", "CPL", "Freq.", "CTR", "Status"].map(h => (
                <th key={h} className="px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.05em] text-dash-text-tertiary">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            <CampaignRow name="Lookalike 1% Customers" spend="R$4,200" roas="5.1×" roasColor="green" cpl="R$74" freq="2.1" ctr="3.4%" status="Healthy" statusColor="green" />
            <CampaignRow name="SaaS Interest BR" spend="R$6,800" roas="4.0×" cpl="R$92" freq="2.8" ctr="2.1%" status="Good" statusColor="lime" />
            <CampaignRow name="Orbit v3" spend="R$5,100" roas="3.2×" roasColor="amber" cpl="R$118" freq="4.8" freqBold ctr="1.2%" status="Saturated" statusColor="amber" />
            <CampaignRow name="Remarketing 30d" spend="R$2,300" roas="6.2×" roasColor="green" cpl="R$51" freq="1.9" ctr="4.8%" status="Healthy" statusColor="green" last />
          </tbody>
        </table>
      </div>

      {/* Top / Bottom Ads */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Top 5 by ROAS</div>
          <div className="flex flex-col gap-2">
            {topAds.map(ad => (
              <div key={ad.name} className="border border-dash-border rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 bg-dash-active rounded-md flex items-center justify-center text-[11px] text-dash-text-tertiary shrink-0">AD</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-dash-text-primary truncate">{ad.name}</div>
                  <div className="text-[11px] text-dash-text-tertiary">{ad.spend} · ROAS {ad.roas} · CTR {ad.ctr} · Freq {ad.freq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Bottom 5 by CPA</div>
          <div className="flex flex-col gap-2">
            {bottomAds.map(ad => (
              <div key={ad.name} className="border border-dash-border rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 bg-dash-red-bg rounded-md flex items-center justify-center text-[11px] text-dash-red shrink-0">AD</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-dash-text-primary truncate">{ad.name}</div>
                  <div className="text-[11px] text-dash-text-tertiary">{ad.spend} · CPA {ad.cpa} · CTR {ad.ctr} · Freq {ad.freq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projected Payback */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Projected Payback</div>
        <div className="grid grid-cols-3 border border-dash-border rounded-lg overflow-hidden">
          <div className="p-5 border-r border-dash-border">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-dash-text-tertiary mb-1">Confirmed Revenue</div>
            <div className="text-[26px] font-bold tracking-[-0.04em] text-dash-text-primary">R$76,800</div>
          </div>
          <div className="p-5 border-r border-dash-border">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-dash-text-tertiary mb-1">Total Projection</div>
            <div className="text-[26px] font-bold tracking-[-0.04em] text-dash-green">R$124,200</div>
            <div className="text-[12px] text-dash-green mt-0.5">+R$4,200 above target</div>
          </div>
          <div className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-dash-text-tertiary mb-1">Monthly Target</div>
            <div className="text-[26px] font-bold tracking-[-0.04em] text-dash-text-primary">R$120,000</div>
          </div>
        </div>
      </div>

      {/* Goal Tracker */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Goal Tracker</div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 border border-dash-border rounded-lg px-4 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-dash-green" />
            <span className="text-[13px] font-medium text-dash-text-primary">ROAS 4.2×</span>
            <span className="text-[11px] text-dash-green font-medium">On track</span>
          </div>
          <div className="flex items-center gap-2 border border-dash-border rounded-lg px-4 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-dash-amber" />
            <span className="text-[13px] font-medium text-dash-text-primary">CPL R$89</span>
            <span className="text-[11px] text-dash-amber font-medium">At risk</span>
          </div>
          <div className="flex items-center gap-2 border border-dash-border rounded-lg px-4 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-dash-red" />
            <span className="text-[13px] font-medium text-dash-text-primary">Frequency 4.1</span>
            <span className="text-[11px] text-dash-red font-medium">Off track</span>
          </div>
        </div>
      </div>

      {/* Time Series (collapsible) */}
      <div className="mb-8">
        <button
          onClick={() => setShowTimeSeries(!showTimeSeries)}
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3 hover:text-dash-text-secondary transition-colors"
        >
          <span className={`transition-transform ${showTimeSeries ? "rotate-90" : ""}`}>▶</span>
          Spend vs Revenue — Time Series
        </button>
        {showTimeSeries && (
          <div className="border border-dash-border rounded-lg p-5">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTimeSeriesView("daily")}
                className={`text-[11px] font-medium px-2.5 py-1 rounded ${timeSeriesView === "daily" ? "bg-dash-text-primary text-white" : "text-dash-text-tertiary border border-dash-border"}`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeSeriesView("weekly")}
                className={`text-[11px] font-medium px-2.5 py-1 rounded ${timeSeriesView === "weekly" ? "bg-dash-text-primary text-white" : "text-dash-text-tertiary border border-dash-border"}`}
              >
                Weekly
              </button>
            </div>
            <div className="h-[160px] flex items-end gap-1 relative">
              {/* Spend bars */}
              {(timeSeriesView === "daily"
                ? [40,45,55,48,42,20,22,50,60,65,55,48,18,20,52,58,62,50,45,22,25,55,65,70,60,52,20,22]
                : [45,50,60,55]
              ).map((h, i) => (
                <div key={`spend-${i}`} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full bg-dash-text-primary rounded-sm" style={{ height: `${h * 1.6}px` }} />
                  <div className="w-full bg-dash-green rounded-sm opacity-60" style={{ height: `${h * 2.2}px` }} />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3 text-[11px] text-dash-text-tertiary">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 bg-dash-text-primary rounded-sm" /> Spend</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 bg-dash-green rounded-sm opacity-60" /> Revenue</div>
            </div>
          </div>
        )}
      </div>

      {/* AI Weekly Brief */}
      <div className="bg-dash-lime-bg border-l-[3px] border-dash-lime rounded-lg p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-dash-lime mb-3">Weekly Brief — AI Analysis</div>
        <div className="text-[13.5px] text-dash-text-primary leading-relaxed space-y-2">
          <p><strong>What worked:</strong> Lookalike 1% maintained 5.1× ROAS with low frequency (2.1). Remarketing 30d delivered best CPL at R$51.</p>
          <p><strong>What underperformed:</strong> Orbit v3 hit frequency ceiling (4.8) with CTR dropping 31% WoW. Creative fatigue confirmed.</p>
          <p><strong>Winning angle:</strong> Social proof with numeric results (e.g., "4× faster growth") outperformed generic CTAs by 2.3×.</p>
          <div className="mt-3 pt-3 border-t border-[hsl(80,40%,80%)]">
            <div className="text-[12px] font-semibold text-dash-text-primary mb-1.5">Next week — 3 actions:</div>
            <ol className="list-decimal list-inside text-[12.5px] text-dash-text-secondary space-y-0.5">
              <li>Pause Orbit v3 and reallocate R$340/day to Lookalike 1%</li>
              <li>Launch 2 new creatives for SaaS Interest BR (video testimonial format)</li>
              <li>Test audience expansion on Remarketing with 60-day window</li>
            </ol>
          </div>
        </div>
        <div className="text-[11px] text-dash-text-tertiary mt-3">Generated Mon 7:00 AM · Based on 7-day data</div>
      </div>
    </div>
  );
};

const KPI = ({ label, value, color, note, noteColor, last }: {
  label: string; value: string; color?: string; note?: string; noteColor?: string; last?: boolean;
}) => (
  <div className={`p-5 ${!last ? "border-r border-dash-border" : ""}`}>
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.05em] text-dash-text-tertiary mb-1">{label}</div>
    <div className={`text-[28px] font-bold tracking-[-0.04em] leading-none ${
      color === "green" ? "text-dash-green" : color === "amber" ? "text-dash-amber" : "text-dash-text-primary"
    }`}>{value}</div>
    {note && (
      <div className={`text-[11px] mt-1 ${
        noteColor === "green" ? "text-dash-green" : noteColor === "amber" ? "text-dash-amber" : "text-dash-text-tertiary"
      }`}>{note}</div>
    )}
  </div>
);

const FunnelRow = ({ label, value, pct, width, highlight }: { label: string; value: string; pct: string; width: string; highlight?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="w-[90px] text-right text-[12px] text-dash-text-secondary shrink-0">{label}</div>
    <div className="flex-1 h-5 bg-dash-active rounded overflow-hidden">
      <div className={`h-full rounded ${highlight ? "bg-dash-amber" : "bg-dash-text-primary"}`} style={{ width }} />
    </div>
    <div className="w-[50px] text-[12px] text-dash-text-secondary shrink-0">{value}</div>
    <div className={`w-[40px] text-[11px] shrink-0 ${highlight ? "text-dash-amber font-medium" : "text-dash-text-tertiary"}`}>{pct}</div>
  </div>
);

const CampaignRow = ({ name, spend, roas, roasColor, cpl, freq, freqBold, ctr, status, statusColor, last }: {
  name: string; spend: string; roas: string; roasColor?: string; cpl: string; freq: string; freqBold?: boolean; ctr: string;
  status: string; statusColor: string; last?: boolean;
}) => {
  const statusStyles: Record<string, string> = {
    green: "bg-dash-green-bg text-dash-green",
    lime: "bg-dash-lime-bg text-dash-lime",
    amber: "bg-dash-amber-bg text-dash-amber",
  };
  return (
    <tr className={`hover:bg-dash-sidebar transition-colors ${!last ? "border-b border-dash-border" : ""}`}>
      <td className="px-5 py-3 font-medium text-dash-text-primary">{name}</td>
      <td className="px-5 py-3 text-dash-text-secondary">{spend}</td>
      <td className={`px-5 py-3 font-semibold ${roasColor === "green" ? "text-dash-green" : roasColor === "amber" ? "text-dash-amber" : "text-dash-text-primary"}`}>{roas}</td>
      <td className="px-5 py-3 text-dash-text-secondary">{cpl}</td>
      <td className={`px-5 py-3 ${freqBold ? "font-bold text-dash-amber" : "text-dash-text-secondary"}`}>{freq}</td>
      <td className="px-5 py-3 text-dash-text-secondary">{ctr}</td>
      <td className="px-5 py-3">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[statusColor]}`}>{status}</span>
      </td>
    </tr>
  );
};

export default Performance;
