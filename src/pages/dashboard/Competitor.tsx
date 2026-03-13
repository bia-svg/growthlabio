import { useState } from "react";

const competitors = [
  {
    name: "Mentor Pro",
    color: "bg-[hsl(245,52%,60%)]",
    meta: "12 active ads · since 02/15",
    tags: ["Offer", "Video", "Social proof"],
    insight: 'Running **3 new creatives** since Monday. Main angle: short video testimonials. Estimated high frequency — possible saturation.',
  },
  {
    name: "FluxoAds",
    color: "bg-[hsl(160,60%,40%)]",
    meta: "8 active ads · since 01/22",
    tags: ["Discount", "Urgency", "Mobile"],
    insight: "Countdown timer campaign active for **6 days**. Direct CTA: 'Last spots'. Dominant format: vertical stories.",
  },
  {
    name: "AdScale BR",
    color: "bg-[hsl(20,85%,55%)]",
    meta: "6 active ads · since 03/01",
    tags: ["Retargeting", "Flash offer"],
    insight: "Ad spend peaks on **Tuesday and Thursday**. Pattern suggests warm list retargeting. Budget concentrated on weekends.",
  },
];

const Competitor = () => {
  const [cards] = useState(competitors);

  const renderBold = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i} className="font-semibold text-dash-text-primary">{part}</strong> : part
    );
  };

  return (
    <div className="p-10 dash-page-enter">
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Competitor Intelligence</h1>
      <p className="text-[14px] text-dash-text-secondary mb-6">Monitoring via Meta Ad Library · updated 2h ago</p>

      {/* Weekly insight */}
      <div className="bg-dash-blue-bg border border-[hsl(215,40%,85%)] rounded-lg px-5 py-3.5 text-[13.5px] text-dash-blue mb-8 leading-relaxed">
        This week: Competitor A reduced ad volume by 40%. Possible strategic pause or creative refresh.
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4">
        {cards.map(c => (
          <div key={c.name} className="border border-dash-border rounded-lg p-5 hover:border-dash-text-tertiary transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-8 h-8 rounded-md ${c.color} flex items-center justify-center text-white text-[13px] font-bold`}>
                {c.name[0]}
              </div>
              <div>
                <div className="text-[14px] font-semibold text-dash-text-primary">{c.name}</div>
                <div className="text-[11px] text-dash-text-tertiary">{c.meta}</div>
              </div>
            </div>
            <div className="flex gap-1.5 mb-3">
              {c.tags.map(t => (
                <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-dash-sidebar border border-dash-border text-dash-text-secondary">
                  {t}
                </span>
              ))}
            </div>
            <div className="h-px bg-dash-border mb-3" />
            <p className="text-[13px] text-dash-text-secondary leading-relaxed">{renderBold(c.insight)}</p>
          </div>
        ))}

        {/* Add competitor */}
        <button className="border-2 border-dashed border-dash-border rounded-lg p-5 flex items-center justify-center hover:border-dash-text-tertiary hover:bg-dash-sidebar transition-colors min-h-[180px]">
          <span className="text-[14px] text-dash-text-tertiary">+ Add competitor</span>
        </button>
      </div>
    </div>
  );
};

export default Competitor;
