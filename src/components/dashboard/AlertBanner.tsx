import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AlertBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  if (dismissed) return null;

  return (
    <div className="bg-dash-amber-bg border-b border-[hsl(36,60%,78%)] px-5 py-2.5 flex items-center justify-between font-inter">
      <div className="flex items-center gap-2 text-[13px] text-dash-amber">
        <span>⚠</span>
        <span>Partial attribution: 34% of conversions have no trackable source.</span>
        <button
          onClick={() => navigate("/dashboard/attribution")}
          className="underline underline-offset-2 font-medium hover:text-dash-text-primary transition-colors ml-1"
        >
          View diagnostics →
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
