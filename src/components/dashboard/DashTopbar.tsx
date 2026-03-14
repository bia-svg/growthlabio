import { useNavigate } from "react-router-dom";

interface DashTopbarProps {
  breadcrumb: string;
}

const DashTopbar = ({ breadcrumb }: DashTopbarProps) => {
  const navigate = useNavigate();

  return (
    <div className="h-[44px] border-b border-dash-border flex items-center justify-between px-5 font-inter shrink-0">
      <div className="text-[13px] text-dash-text-tertiary">
        <span className="text-dash-text-secondary font-medium">Velaris Co.</span>
        <span className="mx-1.5">/</span>
        <span>{breadcrumb}</span>
      </div>
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-1.5 text-[12px] text-dash-text-secondary border border-dash-border rounded-md px-2.5 py-1 hover:bg-dash-hover transition-colors">
          <span className="text-[11px]">📅</span>
          Last 30 days
        </button>
        <button className="flex items-center gap-1.5 text-[12px] text-dash-text-secondary border border-dash-border rounded-md px-2.5 py-1 hover:bg-dash-hover transition-colors">
          ↓ Export
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-[12px] text-dash-text-tertiary hover:text-dash-text-primary transition-colors"
        >
          ← Back to site
        </button>
      </div>
    </div>
  );
};

export default DashTopbar;
