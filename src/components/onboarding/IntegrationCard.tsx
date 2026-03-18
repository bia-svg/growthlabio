import { Check, Loader2, AlertCircle, Bell } from "lucide-react";

export type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error";

interface Props {
  name: string;
  desc: string;
  icon: string;
  status: ConnectionStatus;
  comingSoon?: boolean;
  onConnect: () => void;
  connectedDetail?: string;
}

const IntegrationCard = ({ name, desc, icon, status, comingSoon, onConnect, connectedDetail }: Props) => (
  <div className={`border rounded-lg px-5 py-4 flex items-center justify-between transition-colors ${
    status === "connected" ? "border-[hsl(var(--dash-green))]/30 bg-[hsl(var(--dash-green-bg))]" :
    status === "error" ? "border-[hsl(var(--dash-red))]/30 bg-[hsl(var(--dash-red-bg))]" :
    "border-[hsl(var(--dash-border))] hover:bg-[hsl(var(--dash-sidebar))]"
  }`}>
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] rounded-lg flex items-center justify-center text-[13px] font-bold text-[hsl(var(--dash-text-secondary))]">
        {icon}
      </div>
      <div>
        <div className="text-[14px] font-semibold text-[hsl(var(--dash-text-primary))]">{name}</div>
        <div className="text-[12px] text-[hsl(var(--dash-text-tertiary))]">{desc}</div>
      </div>
    </div>

    {comingSoon ? (
      <button className="text-[12px] text-[hsl(var(--dash-blue))] hover:underline flex items-center gap-1.5">
        <Bell className="w-3 h-3" />
        Notify me
      </button>
    ) : status === "connected" ? (
      <span className="text-[12px] font-semibold text-[hsl(var(--dash-green))] bg-[hsl(var(--dash-green-bg))] px-3 py-1 rounded-full flex items-center gap-1.5">
        <Check className="w-3 h-3" />
        {connectedDetail || "Connected"}
      </span>
    ) : status === "connecting" ? (
      <span className="text-[12px] font-medium text-[hsl(var(--dash-text-tertiary))] flex items-center gap-1.5">
        <Loader2 className="w-3 h-3 animate-spin" />
        Connecting…
      </span>
    ) : status === "error" ? (
      <button onClick={onConnect} className="text-[12px] font-medium text-[hsl(var(--dash-red))] flex items-center gap-1.5 hover:underline">
        <AlertCircle className="w-3 h-3" />
        Error · Retry
      </button>
    ) : (
      <button
        onClick={onConnect}
        className="text-[13px] font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity"
      >
        Connect
      </button>
    )}
  </div>
);

export default IntegrationCard;
