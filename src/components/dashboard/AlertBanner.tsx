import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AlertBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (dismissed) return null;

  return (
    <div className="bg-dash-amber-bg border-b border-[hsl(36,60%,78%)] px-5 py-2.5 flex items-center justify-between font-inter">
      <div className="flex items-center gap-2 text-[13px] text-dash-amber">
        <span>⚠</span>
        <span>{t("dashboard.alert.partialAttribution")}</span>
        <button
          onClick={() => navigate("/app/attribution")}
          className="underline underline-offset-2 font-medium hover:text-dash-text-primary transition-colors ml-1"
        >
          {t("dashboard.alert.viewDiagnostics")}
        </button>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="text-dash-amber hover:text-dash-text-primary transition-colors text-sm ml-4"
      >
        ✕
      </button>
    </div>
  );
};

export default AlertBanner;
