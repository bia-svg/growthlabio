import { useState, useCallback } from "react";
import { GripVertical, X, Lightbulb, Plus } from "lucide-react";
import type { IntegrationData } from "./OnboardingIntegrations";

interface Props {
  integrationData: IntegrationData | null;
  onContinue: (funnel: string[]) => void;
  onBack: () => void;
}

const allBlocks = [
  "Ad Spend", "Impressions", "Clicks", "Visitors", "Sessions",
  "Leads", "Opportunities", "Meetings", "Checkout started",
  "Purchases", "Revenue", "LTV", "CAC", "ROAS",
];

const getSuggestedFunnel = (data: IntegrationData | null): string[] => {
  if (!data) return ["Ad Spend", "Clicks", "Purchases", "Revenue"];
  const funnel = ["Ad Spend"];
  if (data.siteType === "landing") { funnel.push("Clicks", "Visitors"); }
  else { funnel.push("Clicks"); }
  if (data.leadsSource) funnel.push("Leads");
  funnel.push("Purchases", "Revenue");
  return funnel;
};

const OnboardingFunnel = ({ integrationData, onContinue, onBack }: Props) => {
  const suggested = getSuggestedFunnel(integrationData);
  const [funnel, setFunnel] = useState<string[]>(suggested);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const [showAiTip, setShowAiTip] = useState(true);

  const available = allBlocks.filter((b) => !funnel.includes(b));

  const removeBlock = (idx: number) => setFunnel((p) => p.filter((_, i) => i !== idx));
  const addBlock = (name: string) => setFunnel((p) => [...p, name]);

  const handleDragStart = (idx: number) => setDragIdx(idx);
  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    setDragOverIdx(idx);
  }, []);
  const handleDrop = useCallback((dropIdx: number) => {
    if (dragIdx === null || dragIdx === dropIdx) { setDragIdx(null); setDragOverIdx(null); return; }
    setFunnel((prev) => {
      const next = [...prev];
      const [item] = next.splice(dragIdx, 1);
      next.splice(dropIdx, 0, item);
      return next;
    });
    setDragIdx(null);
    setDragOverIdx(null);
  }, [dragIdx]);

  const hasGap = integrationData && !integrationData.leadsSource && funnel.includes("Purchases") && !funnel.includes("Leads");

  return (
    <div className="max-w-[720px] mx-auto px-6 py-10 dash-page-enter">
      <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[hsl(var(--dash-text-primary))] mb-2">Build your funnel</h2>
      <p className="text-[14px] text-[hsl(var(--dash-text-tertiary))] mb-8">Drag and organize the stages that represent how your ad spend turns into revenue.</p>

      {/* AI suggestion */}
      {showAiTip && (
        <div className="flex items-start gap-3 bg-[hsl(var(--dash-blue-bg))] border border-[hsl(var(--dash-blue))]/20 rounded-lg px-4 py-3 mb-6">
          <Lightbulb className="w-4 h-4 text-[hsl(var(--dash-blue))] mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-[13px] font-medium text-[hsl(var(--dash-blue))] mb-1">AI suggestion for your funnel</p>
            <p className="text-[12px] text-[hsl(var(--dash-blue))]/80">
              {hasGap
                ? "We noticed you connected media and revenue, but haven't connected a lead source yet. Want to add one?"
                : `We built the funnel ${suggested.join(" → ")} based on your integrations. Customize as you wish.`}
            </p>
          </div>
          <button onClick={() => setShowAiTip(false)} className="text-[hsl(var(--dash-blue))]/50 hover:text-[hsl(var(--dash-blue))]">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Funnel area */}
      <div className="border border-[hsl(var(--dash-border))] rounded-xl p-6 mb-6 min-h-[200px]">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))] mb-4">Your funnel ({funnel.length} stages)</div>
        <div className="flex flex-col gap-1">
          {funnel.map((block, idx) => (
            <div key={block}>
              <div
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDrop={() => handleDrop(idx)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-grab active:cursor-grabbing select-none ${
                  dragOverIdx === idx ? "border-[hsl(var(--dash-blue))] bg-[hsl(var(--dash-blue-bg))]" :
                  dragIdx === idx ? "opacity-40 border-[hsl(var(--dash-border))]" :
                  "border-[hsl(var(--dash-border))] hover:bg-[hsl(var(--dash-sidebar))]"
                }`}
              >
                <GripVertical className="w-4 h-4 text-[hsl(var(--dash-text-tertiary))]" />
                <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-[11px] font-bold text-[hsl(var(--dash-text-primary))]">
                  {idx + 1}
                </div>
                <span className="text-[14px] font-medium text-[hsl(var(--dash-text-primary))] flex-1">{block}</span>
                {funnel.length > 3 && (
                  <button onClick={() => removeBlock(idx)} className="text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-red))] transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {idx < funnel.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <div className="w-px h-4 bg-[hsl(var(--dash-border))]" />
                </div>
              )}
            </div>
          ))}
        </div>

        {funnel.length < 3 && (
          <p className="text-[12px] text-[hsl(var(--dash-amber))] mt-3">Minimum of 3 stages required</p>
        )}
      </div>

      {/* Available blocks */}
      {available.length > 0 && (
        <div className="mb-8">
          <div className="text-[12px] font-medium text-[hsl(var(--dash-text-tertiary))] mb-3">Available blocks — click to add</div>
          <div className="flex flex-wrap gap-2">
            {available.map((b) => (
              <button
                key={b}
                onClick={() => addBlock(b)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[hsl(var(--dash-border))] text-[12px] font-medium text-[hsl(var(--dash-text-secondary))] hover:bg-[hsl(var(--dash-sidebar))] hover:border-[hsl(var(--dash-text-tertiary))] transition-colors"
              >
                <Plus className="w-3 h-3" />
                {b}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[hsl(var(--dash-border))]">
        <button onClick={onBack} className="text-[13px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]">← Back</button>
        <button
          onClick={() => onContinue(funnel)}
          disabled={funnel.length < 3}
          className="h-[44px] px-6 bg-primary text-primary-foreground rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};

export default OnboardingFunnel;
