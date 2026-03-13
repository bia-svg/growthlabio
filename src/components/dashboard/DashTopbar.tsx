import { useNavigate } from "react-router-dom";

interface DashTopbarProps {
  breadcrumb: string;
  onNavigateAttribution?: () => void;
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
      <div className="flex items-center gap-2">
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
