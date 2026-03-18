import { useState, useMemo } from "react";

const allMetrics = [
  { key: "cpl", label: "CPL", unit: "R$", direction: "down" as const, description: "Cost per Lead" },
  { key: "cac", label: "CAC", unit: "R$", direction: "down" as const, description: "Cost per Acquisition" },
  { key: "roas", label: "ROAS", unit: "x", direction: "up" as const, description: "Return on Ad Spend" },
  { key: "cpa", label: "CPA", unit: "R$", direction: "down" as const, description: "Cost per Action" },
  { key: "ctr", label: "CTR", unit: "%", direction: "up" as const, description: "Click-Through Rate" },
  { key: "cvr", label: "CVR", unit: "%", direction: "up" as const, description: "Conversion Rate" },
  { key: "ltv", label: "LTV", unit: "R$", direction: "up" as const, description: "Lifetime Value" },
  { key: "mrr", label: "MRR", unit: "R$", direction: "up" as const, description: "Monthly Recurring Revenue" },
  { key: "arpu", label: "ARPU", unit: "R$", direction: "up" as const, description: "Avg Revenue per User" },
  { key: "churn", label: "Churn", unit: "%", direction: "down" as const, description: "Churn Rate" },
];

const mockCurrentValues: Record<string, number> = {
  cpl: 38.5, cac: 285, roas: 4.2, cpa: 52, ctr: 3.1, cvr: 2.8, ltv: 1200, mrr: 45000, arpu: 89, churn: 4.5,
};

interface MetricGoal {
  key: string;
  label: string;
  current: number;
  target: number | null;
  unit: string;
  direction: "up" | "down";
  description: string;
}

const Goals = () => {
  const savedMetrics = useMemo(() => {
    try {
      const raw = localStorage.getItem("gl_top_metrics");
      return raw ? JSON.parse(raw) as string[] : null;
    } catch { return null; }
  }, []);

  const [selectedKeys, setSelectedKeys] = useState<string[]>(() => {
    if (savedMetrics && Array.isArray(savedMetrics)) return savedMetrics.map(m => m.toLowerCase());
    return ["cpl", "cac", "roas"];
  });

  const [targets, setTargets] = useState<Record<string, number | null>>({});
  const [editing, setEditing] = useState<string | null>(null);
  const [pickingMetrics, setPickingMetrics] = useState(false);
  const [tempSelection, setTempSelection] = useState<string[]>([]);

  const goals: MetricGoal[] = selectedKeys.map(key => {
    const meta = allMetrics.find(m => m.key === key) || { key, label: key.toUpperCase(), unit: "", direction: "up" as const, description: "" };
    return {
      ...meta,
      current: mockCurrentValues[key] ?? 0,
      target: targets[key] ?? null,
    };
  });

  const handleTargetSave = (key: string, value: string) => {
    const num = parseFloat(value);
    setTargets(prev => ({ ...prev, [key]: isNaN(num) ? null : num }));
    setEditing(null);
  };

  const openMetricPicker = () => {
    setTempSelection([...selectedKeys]);
    setPickingMetrics(true);
  };

  const toggleMetric = (key: string) => {
    setTempSelection(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : prev.length < 3 ? [...prev, key] : prev
    );
  };

  const confirmMetrics = () => {
    setSelectedKeys(tempSelection);
    localStorage.setItem("gl_top_metrics", JSON.stringify(tempSelection));
    setPickingMetrics(false);
  };

  const getProgress = (goal: MetricGoal) => {
    if (!goal.target || goal.target === 0) return 0;
    if (goal.direction === "down") {
      if (goal.current <= goal.target) return 100;
      const ratio = goal.current / goal.target;
      return Math.max(0, Math.min(100, (2 - ratio) * 100));
    }
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  const getDelta = (goal: MetricGoal) => {
    if (goal.target === null || goal.target === 0) return null;
    const pct = ((goal.current - goal.target) / goal.target) * 100;
    if (goal.direction === "down") {
      return { pct: Math.round(Math.abs(pct)), isGood: goal.current <= goal.target };
    }
    return { pct: Math.round(Math.abs(pct)), isGood: goal.current >= goal.target };
  };

  const getStatus = (goal: MetricGoal) => {
    if (goal.target === null) return { color: "bg-muted-foreground/30", label: "No target", textColor: "text-[hsl(var(--dash-text-tertiary))]" };
    const delta = getDelta(goal);
    if (!delta) return { color: "bg-muted-foreground/30", label: "No target", textColor: "text-[hsl(var(--dash-text-tertiary))]" };
    if (delta.isGood) return { color: "bg-[hsl(var(--dash-green))]", label: "On track", textColor: "text-[hsl(var(--dash-green))]" };
    if (delta.pct <= 15) return { color: "bg-[hsl(var(--dash-amber))]", label: "At risk", textColor: "text-[hsl(var(--dash-amber))]" };
    return { color: "bg-[hsl(var(--dash-red))]", label: "Off track", textColor: "text-[hsl(var(--dash-red))]" };
  };

  const formatValue = (value: number, unit: string) => {
    if (unit === "R$") return `R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (unit === "%") return `${value}%`;
    if (unit === "x") return `${value}x`;
    return String(value);
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-[22px] font-semibold text-dash-text-primary mb-1">Goals</h1>
          <p className="text-[14px] text-dash-text-tertiary">
            Define targets for your key metrics. Click on a target value to edit it.
          </p>
        </div>
        <button
          onClick={openMetricPicker}
          className="text-[13px] font-medium text-primary border border-primary/30 rounded-lg px-4 py-2 hover:bg-primary/5 transition-colors whitespace-nowrap"
        >
          Change main metrics
        </button>
      </div>

      {/* Metric picker modal */}
      {pickingMetrics && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-background border border-dash-border rounded-2xl p-6 w-full max-w-md shadow-xl">
            <h2 className="text-[17px] font-semibold text-dash-text-primary mb-1">Choose 3 main metrics</h2>
            <p className="text-[13px] text-dash-text-tertiary mb-5">These will be tracked on your dashboard and goals page.</p>

            <div className="flex flex-col gap-2 mb-6">
              {allMetrics.map(m => {
                const selected = tempSelection.includes(m.key);
                const disabled = !selected && tempSelection.length >= 3;
                return (
                  <button
                    key={m.key}
                    onClick={() => toggleMetric(m.key)}
                    disabled={disabled}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                      selected
                        ? "border-primary bg-primary/5 text-dash-text-primary"
                        : disabled
                        ? "border-dash-border bg-muted/30 text-dash-text-tertiary opacity-50 cursor-not-allowed"
                        : "border-dash-border hover:border-primary/40 text-dash-text-secondary"
                    }`}
                  >
                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selected ? "border-primary bg-primary" : "border-dash-border"
                    }`}>
                      {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                    <div>
                      <span className="text-[14px] font-medium">{m.label}</span>
                      <span className="text-[12px] text-dash-text-tertiary ml-2">{m.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3 justify-end">
              <button onClick={() => setPickingMetrics(false)} className="text-[13px] px-4 py-2 rounded-lg text-dash-text-secondary hover:bg-muted transition-colors">
                Cancel
              </button>
              <button
                onClick={confirmMetrics}
                disabled={tempSelection.length !== 3}
                className="text-[13px] font-medium px-5 py-2 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Goals cards */}
      <div className="flex flex-col gap-4">
        {goals.map(goal => {
          const progress = getProgress(goal);
          const status = getStatus(goal);
          const delta = getDelta(goal);

          return (
            <div key={goal.key} className="border border-dash-border rounded-xl p-5 bg-background">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
                  <span className="text-[16px] font-semibold text-dash-text-primary">{goal.label}</span>
                  <span className="text-[12px] text-dash-text-tertiary ml-1">{goal.description}</span>
                </div>
                <div className="flex items-center gap-2">
                  {delta && delta.pct > 0 && (
                    <span className={`text-[12px] font-medium ${status.textColor}`}>
                      {delta.isGood ? "↓" : "↑"} {delta.pct}% {delta.isGood ? (goal.direction === "down" ? "below" : "above") : (goal.direction === "down" ? "above" : "below")} target
                    </span>
                  )}
                  <span className={`text-[12px] font-medium px-2 py-0.5 rounded-full ${status.textColor} bg-muted`}>{status.label}</span>
                </div>
              </div>

              <div className="flex items-end gap-8 mb-4">
                <div>
                  <div className="text-[11px] text-dash-text-tertiary uppercase tracking-wider mb-1">Current</div>
                  <div className="text-[20px] font-semibold text-dash-text-primary">
                    {formatValue(goal.current, goal.unit)}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-dash-text-tertiary uppercase tracking-wider mb-1">Target</div>
                  {editing === goal.key ? (
                    <input
                      type="number"
                      defaultValue={goal.target ?? ""}
                      placeholder="Set target..."
                      onBlur={e => handleTargetSave(goal.key, e.target.value)}
                      onKeyDown={e => e.key === "Enter" && handleTargetSave(goal.key, (e.target as HTMLInputElement).value)}
                      autoFocus
                      className="text-[20px] font-semibold text-dash-text-primary bg-transparent border-b-2 border-primary outline-none w-32 placeholder:text-dash-text-tertiary placeholder:text-[16px]"
                    />
                  ) : (
                    <button
                      onClick={() => setEditing(goal.key)}
                      className={`text-[20px] font-semibold transition-colors cursor-pointer ${
                        goal.target !== null ? "text-dash-text-primary hover:text-primary" : "text-primary/60 hover:text-primary"
                      }`}
                    >
                      {goal.target !== null ? formatValue(goal.target, goal.unit) : "Set target →"}
                    </button>
                  )}
                </div>
                <div className="text-[13px] text-dash-text-tertiary pb-1">
                  {goal.direction === "down" ? "↓ Lower is better" : "↑ Higher is better"}
                </div>
              </div>

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${goal.target !== null ? status.color : "bg-muted-foreground/20"}`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Goals;
