import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import DateRangeFilter from "./DateRangeFilter";

interface DashTopbarProps {
  breadcrumb: string;
}

const DashTopbar = ({ breadcrumb }: DashTopbarProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="h-[44px] border-b border-[hsl(var(--dash-border))] flex items-center justify-between px-5 font-inter shrink-0">
      <div className="text-[13px] text-[hsl(var(--dash-text-tertiary))]">
        <span className="text-[hsl(var(--dash-text-secondary))] font-medium">Velaris Co.</span>
        <span className="mx-1.5">/</span>
        <span>{breadcrumb}</span>
      </div>
      <div className="flex items-center gap-3">
        <DateRangeFilter />
        <button className="flex items-center gap-1.5 text-[12px] text-[hsl(var(--dash-text-secondary))] border border-[hsl(var(--dash-border))] rounded-md px-2.5 py-1 hover:bg-[hsl(var(--dash-hover))] transition-colors">
          {t("dashboard.topbar.export")}
        </button>
        <button
          onClick={() => navigate("/")}
          className="text-[12px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-primary))] transition-colors"
        >
          {t("nav.backToSite")}
        </button>
      </div>
    </div>
  );
};

export default DashTopbar;
