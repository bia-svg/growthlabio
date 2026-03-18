import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface MetricGoal {
  key: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  direction: "up" | "down";
}

const defaultGoals: MetricGoal[] = [
  { key: "cpl", label: "CPL", current: 38.5, target: 30, unit: "R$", direction: "down" },
  { key: "cac", label: "CAC", current: 285, target: 220, unit: "R$", direction: "down" },
  { key: "roas", label: "ROAS", current: 4.2, target: 5.0, unit: "x", direction: "up" },
];

const Goals = () => {
  const { t } = useTranslation();

  const savedMetrics = useMemo(() => {
    try {
      const raw = localStorage.getItem("gl_top_metrics");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }, []);

  const [goals, setGoals] = useState<MetricGoal[]>(() => {
    if (savedMetrics && Array.isArray(savedMetrics)) {
      return savedMetrics.map((m: string) => {
        const existing = defaultGoals.find(g => g.key === m.toLowerCase());
        if (existing) return existing;
        return { key: m.toLowerCase(), label: m, current: 0, target: 0, unit: "", direction: "up" as const };
      });
    }
    return defaultGoals;
  });

  const [editing, setEditing] = useState<string | null>(null);

  const handleTargetChange = (key: string, value: string) => {
    setGoals(prev => prev.map(g => g.key === key ? { ...g, target: parseFloat(value) || 0 } : g));
  };

  const getProgress = (goal: MetricGoal) => {
    if (goal.target === 0) return 0;
    if (goal.direction === "down") {
      if (goal.current <= goal.target) return 100;
      const start = goal.target * 2;
      return Math.max(0, Math.min(100, ((start - goal.current) / (start - goal.target)) * 100));
    }
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  const getStatus = (goal: MetricGoal) => {
    const progress = getProgress(goal);
    if (progress >= 90) return { color: "bg-dash-green", label: "On track" };
    if (progress >= 60) return { color: "bg-dash-amber", label: "At risk" };
    return { color: "bg-dash-red", label: "Off track" };
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-[22px] font-semibold text-dash-text-primary mb-1">Goals</h1>
      <p className="text-[14px] text-dash-text-tertiary mb-8">
        Set targets for your top metrics. Progress is tracked automatically.
      </p>

      <div className="flex flex-col gap-4">
        {goals.map(goal => {
          const progress = getProgress(goal);
          const status = getStatus(goal);

          return (
            <div key={goal.key} className="border border-dash-border rounded-xl p-5 bg-background">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`w-2.5 h-2.5 rounded-full ${status.color}`} />
                  <span className="text-[16px] font-semibold text-dash-text-primary">{goal.label}</span>
                  <span className="text-[12px] text-dash-text-tertiary px-2 py-0.5 bg-muted rounded-full">{status.label}</span>
                </div>
              </div>

              <div className="flex items-end gap-8 mb-4">
                <div>
                  <div className="text-[11px] text-dash-text-tertiary uppercase tracking-wider mb-1">Current</div>
                  <div className="text-[20px] font-semibold text-dash-text-primary">
                    {goal.unit === "R$" ? `R$ ${goal.current.toFixed(2)}` : `${goal.current}${goal.unit}`}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-dash-text-tertiary uppercase tracking-wider mb-1">Target</div>
                  {editing === goal.key ? (
                    <input
                      type="number"
                      value={goal.target}
                      onChange={e => handleTargetChange(goal.key, e.target.value)}
                      onBlur={() => setEditing(null)}
                      onKeyDown={e => e.key === "Enter" && setEditing(null)}
                      autoFocus
                      className="text-[20px] font-semibold text-dash-text-primary bg-transparent border-b-2 border-primary outline-none w-28"
                    />
                  ) : (
                    <button
                      onClick={() => setEditing(goal.key)}
                      className="text-[20px] font-semibold text-dash-text-primary hover:text-primary transition-colors cursor-pointer"
                    >
                      {goal.unit === "R$" ? `R$ ${goal.target.toFixed(2)}` : `${goal.target}${goal.unit}`}
                    </button>
                  )}
                </div>
                <div className="text-[13px] text-dash-text-tertiary">
                  {goal.direction === "down" ? "↓ Lower is better" : "↑ Higher is better"}
                </div>
              </div>

              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${status.color}`}
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
