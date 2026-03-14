import { useState } from "react";

const issues = [
  {
    id: 1,
    dot: "red",
    title: "0% of conversions with utm_source",
    desc: "Shopify receiving orders without source parameter. Impossible to attribute revenue to Meta Ads.",
    link: "View fix guide →",
    fix: {
      title: "Fix guide — Meta Ads → Shopify",
      steps: [
        "Go to Meta Ads Manager → Campaigns → Ad Sets",
        "Edit destination URL for each active ad set",
        "Append: ?utm_source=facebook&utm_medium=cpc&utm_campaign={{campaign.name}}&utm_content={{ad.name}}",
        "Save and allow up to 2h for tracking to update",
        "Verify in Shopify: Orders → filter by source",
      ],
    },
  },
  {
    id: 2,
    dot: "amber",
    title: "utm_campaign doesn't match active IDs",
    desc: "3 conversions with campaign name 'Orbit-Q1' — campaign not found in account.",
    link: "View mapping →",
  },
  {
    id: 3,
    dot: "amber",
    title: "34% of sessions missing utm_medium",
    desc: "Traffic arriving without media identifier. Likely direct link or URL shortener breaking the attribution chain.",
    link: "View samples →",
  },
];

const sampleConversions = [
  { date: "Mar 10", value: "R$1,200", source: "Direct", utm: "—", tracked: false },
  { date: "Mar 9", value: "R$890", source: "Unknown", utm: "—", tracked: false },
  { date: "Mar 8", value: "R$2,100", source: "Referral", utm: "—", tracked: false },
];

const Attribution = () => {
  const [expandedIssue, setExpandedIssue] = useState<number | null>(null);

  return (
    <div className="p-10 dash-page-enter">
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Attribution</h1>
      <p className="text-[14px] text-dash-text-secondary mb-8">UTM tracking diagnostics · Orbit</p>

      <div className="grid grid-cols-[1fr_1.5fr] gap-6 mb-8">
        {/* Score */}
        <div className="border border-dash-border rounded-lg p-6 text-center flex flex-col items-center justify-center">
          <div className="text-[56px] font-bold tracking-[-0.04em] text-dash-amber leading-none mb-2">34%</div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-2">Health Score</div>
          <p className="text-[13px] text-dash-text-secondary leading-relaxed mb-4 max-w-[240px]">
            Critical attribution gap. R$18,400 in spend without trackable source this month.
          </p>
          <div className="w-full h-2.5 bg-dash-active rounded-full overflow-hidden">
            <div className="h-full bg-dash-amber rounded-full" style={{ width: "34%" }} />
          </div>
        </div>

        {/* Issues */}
        <div className="border border-dash-border rounded-lg overflow-hidden">
          <div className="px-5 py-3 border-b border-dash-border flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Detected Issues</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-dash-red-bg text-dash-red">3 critical</span>
          </div>
          {issues.map((issue, i) => (
            <div key={issue.id}>
              <div className={`px-5 py-4 ${i < issues.length - 1 ? "border-b border-dash-border" : ""}`}>
                <div className="flex items-start gap-2.5">
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    issue.dot === "red" ? "bg-dash-red" : "bg-dash-amber"
                  }`} />
                  <div className="flex-1">
                    <div className="text-[14px] font-medium text-dash-text-primary mb-1">{issue.title}</div>
                    <div className="text-[13px] text-dash-text-secondary leading-relaxed mb-2">{issue.desc}</div>
                    <button
                      onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
                      className="text-[12px] text-dash-blue hover:underline"
                    >
                      {expandedIssue === issue.id ? "Hide" : issue.link}
                    </button>
                  </div>
                </div>

                {expandedIssue === issue.id && issue.fix && (
                  <div className="mt-3 ml-5 bg-dash-blue-bg border-l-[3px] border-dash-blue rounded-r-lg px-4 py-3">
                    <div className="text-[13px] font-semibold text-dash-text-primary mb-2">{issue.fix.title}</div>
                    <ol className="list-decimal list-inside text-[12.5px] text-dash-text-secondary leading-relaxed space-y-1">
                      {issue.fix.steps.map((step, si) => <li key={si}>{step}</li>)}
                    </ol>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fix progress bar */}
      <div className="border border-dash-border rounded-lg p-5 mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[13px] font-medium text-dash-text-primary">3 of 5 issues resolved this month</div>
          <button className="text-[12px] text-dash-blue hover:underline">See history →</button>
        </div>
        <div className="w-full h-2 bg-dash-active rounded-full overflow-hidden">
          <div className="h-full bg-dash-green rounded-full transition-all" style={{ width: "60%" }} />
        </div>
      </div>

      {/* Sample conversions */}
      <div className="border border-dash-border rounded-lg overflow-hidden">
        <div className="px-5 py-3 border-b border-dash-border">
          <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Sample Conversions — Missing UTM</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-dash-border">
              {["Date", "Value", "Detected Source", "UTM Status"].map(h => (
                <th key={h} className="px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.05em] text-dash-text-tertiary">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[13px]">
            {sampleConversions.map((row, i) => (
              <tr key={i} className={i < sampleConversions.length - 1 ? "border-b border-dash-border" : ""}>
                <td className="px-5 py-2.5 text-dash-text-secondary">{row.date}</td>
                <td className="px-5 py-2.5 text-dash-text-secondary">{row.value}</td>
                <td className="px-5 py-2.5 text-dash-text-secondary">{row.source}</td>
                <td className="px-5 py-2.5 flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${row.tracked ? "bg-dash-green" : "bg-dash-red"}`} />
                  <span className="text-dash-text-tertiary">{row.utm}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Attribution;
