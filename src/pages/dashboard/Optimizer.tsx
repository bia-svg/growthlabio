import { useState, useEffect } from "react";

interface OptimizerProps {
  onCountChange: (count: number) => void;
}

interface OptItem {
  id: number;
  urgency: string;
  urgencyColor: string;
  impact: string;
  title: string;
  desc: string;
  stats: string;
  trigger: string;
}

const initialItems: OptItem[] = [
  {
    id: 1,
    urgency: "Urgent",
    urgencyColor: "red",
    impact: "+R$2,800/wk",
    title: "Pause 'Orbit v3' — saturated creative",
    desc: "Frequency at 4.8 for 5 consecutive days. CTR dropped 31% WoW. Every dollar spent here performs 2.3× below account average.",
    stats: "Freq: 4.8 · CTR: 1.2% · Spend: R$5,100/wk · Days at saturation: 5",
    trigger: "Frequency > 3.5 for 3+ days → NEW_CREATIVE alert",
  },
  {
    id: 2,
    urgency: "Recommended",
    urgencyColor: "amber",
    impact: "+R$1,400/wk",
    title: "Scale budget on Lookalike 1% — ROAS consistently above target",
    desc: "5.1× ROAS for 12 consecutive days. Current budget is limiting reach. Estimated scale potential: 85%.",
    stats: "ROAS: 5.1× · Freq: 2.1 · Current budget: R$400/day",
    trigger: "ROAS > target × 1.3 + budget > 85% spent → INCREASE_BUDGET alert",
  },
  {
    id: 3,
    urgency: "Suggestion",
    urgencyColor: "blue",
    impact: "+R$600/wk",
    title: "Create creative variation for SaaS Interest BR",
    desc: "CTR flat at 2.1% for 8 days. A new creative angle can recover performance without pausing the campaign.",
    stats: "CTR: 2.1% · Freq: 2.8 · Days without creative change: 8",
    trigger: "CTR fell >20% WoW → NEW_COPY alert",
  },
];

const urgencyStyles: Record<string, string> = {
  red: "bg-dash-red-bg text-dash-red",
  amber: "bg-dash-amber-bg text-dash-amber",
  blue: "bg-dash-blue-bg text-dash-blue",
};

const Optimizer = ({ onCountChange }: OptimizerProps) => {
  const [items, setItems] = useState(initialItems);
  const [removing, setRemoving] = useState<number | null>(null);
  const [showTriggers, setShowTriggers] = useState(false);

  useEffect(() => {
    onCountChange(items.length);
  }, [items, onCountChange]);

  const handleRemove = (id: number) => {
    setRemoving(id);
    setTimeout(() => {
      setItems(prev => prev.filter(i => i.id !== id));
      setRemoving(null);
    }, 250);
  };

  return (
    <div className="p-10 dash-page-enter">
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Optimizer</h1>
      <p className="text-[14px] text-dash-text-secondary mb-8">
        {items.length} action{items.length !== 1 ? "s" : ""} identified · sorted by estimated impact
      </p>

      <div className="border border-dash-border rounded-lg overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-dash-border flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Optimization Queue</span>
          <button className="text-[12px] text-dash-text-secondary hover:text-dash-text-primary transition-colors">⟳ Re-analyze</button>
        </div>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <div className="text-[24px] mb-2">✓</div>
            <div className="text-[14px] font-medium text-dash-text-primary">All clear.</div>
            <div className="text-[13px] text-dash-text-tertiary">Next analysis in 6h.</div>
          </div>
        ) : (
          items.map((item, i) => (
            <div
              key={item.id}
              className={`px-5 py-5 transition-all duration-[250ms] ease-out ${
                removing === item.id ? "opacity-0 max-h-0 py-0 overflow-hidden" : "max-h-[400px] opacity-100"
              } ${i < items.length - 1 && removing !== item.id ? "border-b border-dash-border" : ""}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full ${urgencyStyles[item.urgencyColor]}`}>
                  {item.urgency}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full bg-dash-green-bg text-dash-green">
                  {item.impact}
                </span>
              </div>
              <div className="text-[15px] font-semibold text-dash-text-primary mb-1.5">{item.title}</div>
              <div className="text-[13.5px] text-dash-text-secondary leading-relaxed mb-2">{item.desc}</div>
              <div className="text-[12px] text-dash-text-tertiary mb-4">{item.stats}</div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-[13px] font-medium bg-dash-text-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-[13px] font-medium text-dash-text-secondary border border-dash-border px-4 py-1.5 rounded-md hover:bg-dash-hover transition-colors"
                >
                  ✕ Dismiss
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* How this works — collapsible */}
      <button
        onClick={() => setShowTriggers(!showTriggers)}
        className="flex items-center gap-2 text-[12px] text-dash-text-tertiary hover:text-dash-text-secondary transition-colors mb-2"
      >
        <span className={`transition-transform ${showTriggers ? "rotate-90" : ""}`}>▶</span>
        How this works
      </button>
      {showTriggers && (
        <div className="border border-dash-border rounded-lg p-4 text-[12px] text-dash-text-secondary leading-relaxed space-y-1">
          <div><strong className="text-dash-text-primary">Freq &gt; 3.5 for 3+ days</strong> → NEW_CREATIVE alert</div>
          <div><strong className="text-dash-text-primary">CTR fell &gt;20% WoW</strong> → NEW_COPY alert</div>
          <div><strong className="text-dash-text-primary">CPA &gt; target × 1.5 for 3+ days</strong> → PAUSE_AD alert</div>
          <div><strong className="text-dash-text-primary">ROAS &gt; target × 1.3 + budget &gt;85% spent</strong> → INCREASE_BUDGET alert</div>
          <div><strong className="text-dash-text-primary">Budget &gt;85% spent by day 20</strong> → PACING alert</div>
        </div>
      )}
    </div>
  );
};

export default Optimizer;
