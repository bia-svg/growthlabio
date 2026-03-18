import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Clock, AlertTriangle, XCircle, Lightbulb, Loader2, Sparkles } from "lucide-react";
import type { IntegrationData } from "./OnboardingIntegrations";

interface Props {
  integrationData: IntegrationData | null;
  funnel: string[];
  onBack: () => void;
}

type RowStatus = "connected" | "pending" | "no_data" | "error" | "attention";

interface CheckRow {
  stage: string;
  tool: string;
  status: RowStatus;
  lastSync: string;
  quality: string;
}

const buildRows = (data: IntegrationData | null, funnel: string[]): CheckRow[] => {
  const rows: CheckRow[] = [];

  if (data) {
    Object.entries(data.adPlatforms).forEach(([name, status]) => {
      if (status === "connected") {
        rows.push({ stage: "Ad accounts", tool: name, status: "connected", lastSync: "2 min ago", quality: "OK" });
      }
    });
  }
  if (rows.length === 0) {
    rows.push({ stage: "Ad accounts", tool: "None", status: "pending", lastSync: "—", quality: "—" });
  }

  if (data?.siteType && data.siteType !== "none") {
    const tools = data.siteIntegrations.length > 0 ? data.siteIntegrations.join(", ") : data.siteType === "whatsapp" ? "WhatsApp" : "Configured";
    rows.push({ stage: "Landing page / Site", tool: tools, status: "connected", lastSync: "5 min ago", quality: "OK" });
  } else {
    rows.push({ stage: "Landing page / Site", tool: "—", status: "attention", lastSync: "—", quality: "Incomplete" });
  }

  if (data?.leadsSource) {
    rows.push({ stage: "Leads", tool: data.leadsSource, status: "connected", lastSync: "3 min ago", quality: "OK" });
  } else {
    rows.push({ stage: "Leads", tool: "None", status: "pending", lastSync: "—", quality: "Incomplete" });
  }

  if (data?.revenueSource) {
    rows.push({ stage: "Purchases / Revenue", tool: data.revenueSource, status: "connected", lastSync: "1 min ago", quality: "OK" });
  } else {
    rows.push({ stage: "Purchases / Revenue", tool: "None", status: "pending", lastSync: "—", quality: "Incomplete" });
  }

  return rows;
};

const statusConfig: Record<RowStatus, { icon: React.ReactNode; label: string; color: string }> = {
  connected: { icon: <Check className="w-3.5 h-3.5" />, label: "Connected", color: "text-[hsl(var(--dash-green))] bg-[hsl(var(--dash-green-bg))]" },
  pending: { icon: <Clock className="w-3.5 h-3.5" />, label: "Pending", color: "text-[hsl(var(--dash-amber))] bg-[hsl(var(--dash-amber-bg))]" },
  no_data: { icon: <XCircle className="w-3.5 h-3.5" />, label: "No data", color: "text-[hsl(var(--dash-text-tertiary))] bg-[hsl(var(--dash-sidebar))]" },
  error: { icon: <XCircle className="w-3.5 h-3.5" />, label: "Error", color: "text-[hsl(var(--dash-red))] bg-[hsl(var(--dash-red-bg))]" },
  attention: { icon: <AlertTriangle className="w-3.5 h-3.5" />, label: "Attention", color: "text-[hsl(var(--dash-amber))] bg-[hsl(var(--dash-amber-bg))]" },
};

const OnboardingDataCheck = ({ integrationData, funnel, onBack }: Props) => {
  const navigate = useNavigate();
  const [finishing, setFinishing] = useState(false);
  const [done, setDone] = useState(false);

  const rows = buildRows(integrationData, funnel);
  const connectedCount = rows.filter((r) => r.status === "connected").length;
  const hasLeads = integrationData?.leadsSource != null;

  const insights: string[] = [];
  if (connectedCount >= 2) insights.push("You can already analyze ad spend, traffic, and purchases.");
  if (!hasLeads) insights.push("Your funnel has no lead stage, but this can be normal for direct-to-purchase operations.");
  if (!hasLeads && integrationData?.revenueSource) insights.push("Connecting a lead source can improve your conversion analysis.");

  const handleFinish = () => {
    setFinishing(true);
    setTimeout(() => {
      localStorage.setItem("gl_onboarding_done", "1");
      setFinishing(false);
      setDone(true);
    }, 1500);
  };

  if (done) {
    return (
      <div className="min-h-[calc(100vh-65px)] flex items-center justify-center px-6 dash-page-enter">
        <div className="max-w-[480px] text-center">
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--dash-green-bg))] flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-7 h-7 text-[hsl(var(--dash-green))]" />
          </div>
          <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[hsl(var(--dash-text-primary))] mb-3">Your operation is ready</h2>
          <p className="text-[14px] text-[hsl(var(--dash-text-tertiary))] mb-8">Now let's turn your data into business insights.</p>
          <button onClick={() => navigate("/dashboard")} className="h-[48px] px-8 bg-primary text-primary-foreground rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity">
            Go to dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto px-6 py-10 dash-page-enter">
      <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[hsl(var(--dash-text-primary))] mb-2">Review your data health</h2>
      <p className="text-[14px] text-[hsl(var(--dash-text-tertiary))] mb-8">Before finishing, check that each funnel stage is receiving data correctly.</p>

      {/* Data table */}
      <div className="border border-[hsl(var(--dash-border))] rounded-xl overflow-hidden mb-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[hsl(var(--dash-border))] bg-[hsl(var(--dash-sidebar))]">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))]">Stage / Source</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))]">Tool</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))]">Status</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))]">Last sync</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))]">Quality</th>
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))]">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const cfg = statusConfig[row.status];
              return (
                <tr key={i} className="border-b border-[hsl(var(--dash-border))] last:border-0">
                  <td className="px-5 py-3.5 text-[13px] font-medium text-[hsl(var(--dash-text-primary))]">{row.stage}</td>
                  <td className="px-5 py-3.5 text-[13px] text-[hsl(var(--dash-text-secondary))]">{row.tool}</td>
                  <td className="px-5 py-3.5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.color}`}>
                      {cfg.icon}
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-[12px] text-[hsl(var(--dash-text-tertiary))]">{row.lastSync}</td>
                  <td className="px-5 py-3.5 text-[12px] text-[hsl(var(--dash-text-tertiary))]">{row.quality}</td>
                  <td className="px-5 py-3.5">
                    <button className="text-[12px] font-medium text-[hsl(var(--dash-blue))] hover:underline">
                      {row.status === "connected" ? "Review" : "Connect"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* AI insights */}
      {insights.length > 0 && (
        <div className="bg-[hsl(var(--dash-blue-bg))] border border-[hsl(var(--dash-blue))]/20 rounded-lg px-5 py-4 mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-4 h-4 text-[hsl(var(--dash-blue))]" />
            <span className="text-[13px] font-semibold text-[hsl(var(--dash-blue))]">Automated insights</span>
          </div>
          <ul className="space-y-1.5">
            {insights.map((ins, i) => (
              <li key={i} className="text-[12px] text-[hsl(var(--dash-blue))]/80 flex items-start gap-2">
                <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-[hsl(var(--dash-blue))]" />
                {ins}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Funnel preview */}
      <div className="mb-8">
        <div className="text-[12px] font-medium text-[hsl(var(--dash-text-tertiary))] mb-3">Your funnel</div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {funnel.map((step, i) => (
            <div key={step} className="flex items-center gap-1.5">
              <span className="px-3 py-1.5 bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] rounded-lg text-[12px] font-medium text-[hsl(var(--dash-text-primary))]">{step}</span>
              {i < funnel.length - 1 && <span className="text-[hsl(var(--dash-text-tertiary))]">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[hsl(var(--dash-border))]">
        <button onClick={onBack} className="text-[13px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]">← Back</button>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/dashboard")} className="text-[12px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]">Continue later</button>
          <button
            onClick={handleFinish}
            disabled={finishing}
            className="h-[44px] px-6 bg-primary text-primary-foreground rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center gap-2"
          >
            {finishing ? <><Loader2 className="w-4 h-4 animate-spin" /> Finishing…</> : "Finish onboarding"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingDataCheck;
