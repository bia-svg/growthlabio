const Performance = () => {
  return (
    <div className="p-10 dash-page-enter">
      {/* Header */}
      <div className="mb-1 text-[12px] text-dash-text-tertiary">Annual Plan · synced 3 min ago</div>
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Performance</h1>
      <p className="text-[14px] text-dash-text-secondary mb-8">Period overview · Meta Ads + Shopify</p>

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
            <FunnelRow label="Leads" value="412" pct="8.1%" width="38%" />
            <FunnelRow label="SQL" value="185" pct="45%" width="22%" />
            <FunnelRow label="Converted" value="21" pct="11%" width="8%" />
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
            ⚠ &apos;Annual v3&apos; frequency at 4.8 for 5 days. Audience saturated.
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
            <CampaignRow name="Annual Campaign v3" spend="R$5,100" roas="3.2×" roasColor="amber" cpl="R$118" freq="4.8" freqBold ctr="1.2%" status="Saturated" statusColor="amber" />
            <CampaignRow name="Remarketing 30d" spend="R$2,300" roas="6.2×" roasColor="green" cpl="R$51" freq="1.9" ctr="4.8%" status="Healthy" statusColor="green" last />
          </tbody>
        </table>
      </div>

      {/* Projected Payback */}
      <div>
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

const FunnelRow = ({ label, value, pct, width }: { label: string; value: string; pct: string; width: string }) => (
  <div className="flex items-center gap-2">
    <div className="w-[90px] text-right text-[12px] text-dash-text-secondary shrink-0">{label}</div>
    <div className="flex-1 h-5 bg-dash-active rounded overflow-hidden">
      <div className="h-full bg-dash-text-primary rounded" style={{ width }} />
    </div>
    <div className="w-[50px] text-[12px] text-dash-text-secondary shrink-0">{value}</div>
    <div className="w-[40px] text-[11px] text-dash-text-tertiary shrink-0">{pct}</div>
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
