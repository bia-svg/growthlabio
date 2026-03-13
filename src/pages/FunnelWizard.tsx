import { useState } from "react";
import { useNavigate } from "react-router-dom";

const wizardSteps = [
  {
    title: "Where do your ad impressions and clicks come from?",
    subtitle: "This is the top of your funnel.",
    options: [
      { label: "Meta Ads", desc: "Impressions, clicks, spend, campaigns", preSelected: true },
      { label: "Google Ads", desc: "Search and Display campaigns" },
      { label: "LinkedIn Ads", desc: "B2B campaigns" },
      { label: "TikTok Ads", desc: "Short-form video campaigns" },
      { label: "Custom API", desc: "Connect your own data source" },
    ],
  },
  {
    title: "How do you track landing page visits?",
    subtitle: "",
    options: [
      { label: "Meta Pixel", desc: "Landing Page View / PageView", preSelected: true },
      { label: "Google Analytics 4", desc: "Sessions and unique visitors" },
      { label: "Other analytics tool", desc: "Matomo, Plausible, etc." },
      { label: "Custom script", desc: "Own tracking implementation" },
    ],
  },
  {
    title: "Where are leads registered?",
    subtitle: "",
    options: [
      { label: "Meta Pixel", desc: "Lead event", preSelected: true },
      { label: "Google Tag Manager", desc: "Event-based tracking" },
      { label: "CRM", desc: "HubSpot, Salesforce, etc." },
      { label: "Webhook", desc: "Real-time push from your form" },
      { label: "Integrated form", desc: "Native form inside the platform" },
    ],
  },
  {
    title: "Where do sales happen?",
    subtitle: "",
    options: [
      { label: "Meta Pixel", desc: "Purchase event" },
      { label: "CRM", desc: "Closed deals / won opportunities" },
      { label: "Payment platform", desc: "Shopify, Stripe, Hotmart, etc.", preSelected: true },
      { label: "Webhook", desc: "Real-time push from payment system" },
      { label: "Custom API", desc: "Own integration" },
    ],
  },
  {
    title: "How often should GrowthLab sync your data?",
    subtitle: "",
    options: [
      { label: "⚡ Real-time", desc: "Via webhooks. Most accurate. Requires setup.", badge: "Recommended" },
      { label: "Every 15 minutes", desc: "Via API polling. Good balance." },
      { label: "Every hour", desc: "Lighter on API usage." },
    ],
  },
];

const validationData = [
  { metric: "Impressions", value: "180,234" },
  { metric: "Clicks", value: "3,912" },
  { metric: "Landing page views", value: "2,145" },
  { metric: "Leads", value: "57" },
  { metric: "Sales", value: "9" },
  { metric: "Revenue", value: "R$42,000" },
];

const FunnelWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<number, number>>(
    Object.fromEntries(wizardSteps.map((s, i) => {
      const preIdx = s.options.findIndex((o) => o.preSelected);
      return [i, preIdx >= 0 ? preIdx : 0];
    }))
  );
  const [activated, setActivated] = useState(false);
  const [activating, setActivating] = useState(false);

  const totalSteps = 6;
  const isValidation = step === 5;
  const isSuccess = activated;

  const handleContinue = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleActivate = () => {
    setActivating(true);
    setTimeout(() => {
      setActivating(false);
      setActivated(true);
      localStorage.setItem("gl_onboarded", "true");
    }, 3000);
  };

  if (isSuccess) {
    return (
      <div className="h-screen w-full bg-background flex items-center justify-center font-inter">
        <div className="text-center max-w-[400px] dash-page-enter">
          <div className="text-[40px] mb-4">✓</div>
          <h1 className="text-[32px] font-bold tracking-[-0.04em] text-dash-text-primary mb-3">Dashboard activated.</h1>
          <p className="text-[14px] text-dash-text-tertiary mb-8">Syncing your data. First insights ready in a few minutes.</p>
          <div className="w-full h-1.5 bg-dash-active rounded-full overflow-hidden mb-6">
            <div className="h-full bg-dash-text-primary rounded-full animate-[grow_3s_ease-in-out_forwards]" />
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full h-[44px] bg-dash-text-primary text-white rounded-md text-[15px] font-semibold hover:opacity-90 transition-opacity"
          >
            Go to dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-background flex items-center justify-center font-inter">
      <div className="w-full max-w-[600px] px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {step > 0 ? (
            <button onClick={handleBack} className="text-[13px] text-dash-text-secondary hover:text-dash-text-primary transition-colors">
              ← Back
            </button>
          ) : (
            <div />
          )}
          <span className="text-[12px] text-dash-text-tertiary font-medium">Step {step + 1} of {totalSteps}</span>
        </div>

        {!isValidation ? (
          <div className="dash-page-enter">
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-dash-text-primary mb-2">
              {wizardSteps[step].title}
            </h2>
            {wizardSteps[step].subtitle && (
              <p className="text-[14px] text-dash-text-tertiary mb-8">{wizardSteps[step].subtitle}</p>
            )}
            {!wizardSteps[step].subtitle && <div className="mb-8" />}

            <div className="flex flex-col gap-2.5 mb-8">
              {wizardSteps[step].options.map((opt, i) => (
                <button
                  key={opt.label}
                  onClick={() => setSelections((prev) => ({ ...prev, [step]: i }))}
                  className={`w-full text-left border rounded-lg px-5 py-4 transition-colors ${
                    selections[step] === i
                      ? "border-dash-text-primary bg-background"
                      : "border-dash-border hover:bg-dash-sidebar"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[14px] font-medium text-dash-text-primary">{opt.label}</div>
                      <div className="text-[13px] text-dash-text-tertiary">{opt.desc}</div>
                    </div>
                    {opt.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-[0.05em] px-2 py-0.5 rounded-full bg-dash-green-bg text-dash-green">
                        {opt.badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleContinue}
              className="w-full h-[44px] bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity"
            >
              Continue →
            </button>
          </div>
        ) : (
          <div className="dash-page-enter">
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-dash-text-primary mb-2">
              Here's what we found from last month
            </h2>
            <p className="text-[14px] text-dash-text-tertiary mb-8">Confirm this looks right before we activate your dashboard.</p>

            <div className="border border-dash-border rounded-lg overflow-hidden mb-8">
              {validationData.map((row, i) => (
                <div
                  key={row.metric}
                  className={`flex items-center justify-between px-5 py-3 ${
                    i < validationData.length - 1 ? "border-b border-dash-border" : ""
                  }`}
                >
                  <span className="text-[14px] text-dash-text-secondary">{row.metric}</span>
                  <span className="text-[14px] font-semibold text-dash-text-primary">{row.value}</span>
                </div>
              ))}
            </div>

            <button
              onClick={handleActivate}
              disabled={activating}
              className="w-full h-[44px] bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 mb-2"
            >
              {activating ? "Activating..." : "Looks correct — activate dashboard"}
            </button>
            <button onClick={() => setStep(0)} className="w-full text-center text-[12px] text-dash-text-tertiary hover:text-dash-text-secondary py-2">
              Adjust configuration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FunnelWizard;
