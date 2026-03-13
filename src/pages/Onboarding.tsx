import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = ["Media", "Revenue", "Context"];

const adPlatforms = [
  { name: "Meta Ads", desc: "Facebook & Instagram campaigns", available: true },
  { name: "Google Ads", desc: "Search, Display & YouTube", available: false },
  { name: "TikTok Ads", desc: "TikTok for Business", available: false },
];

const revenueTypes = ["E-commerce", "CRM / B2B", "Events"];

const revenueSources: Record<string, { name: string; desc: string; available: boolean; isUpload?: boolean }[]> = {
  "E-commerce": [
    { name: "Shopify", desc: "Orders and revenue via API", available: true },
    { name: "WooCommerce", desc: "WordPress store", available: false },
    { name: "CSV Upload", desc: "Upload a revenue spreadsheet", available: true, isUpload: true },
  ],
  "CRM / B2B": [
    { name: "HubSpot", desc: "Contacts, deals and pipeline", available: true },
    { name: "Salesforce", desc: "CRM and opportunity tracking", available: false },
    { name: "CSV Upload", desc: "Upload leads or deals export", available: true, isUpload: true },
  ],
  Events: [
    { name: "Sympla", desc: "Event tickets and attendance", available: true },
    { name: "Eventbrite", desc: "Event management", available: false },
    { name: "CSV Upload", desc: "Upload attendee export", available: true, isUpload: true },
  ],
};

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [metaConnected, setMetaConnected] = useState(false);
  const [revenueType, setRevenueType] = useState("E-commerce");
  const [revenueConnected, setRevenueConnected] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleContinue = () => {
    setCompletedSteps((prev) => [...prev, step]);
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate("/funnel-wizard");
    }
  };

  const handleSkip = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      navigate("/funnel-wizard");
    }
  };

  const handleMetaConnect = () => {
    setTimeout(() => setMetaConnected(true), 800);
  };

  const handleRevenueConnect = () => {
    setTimeout(() => setRevenueConnected(true), 800);
  };

  const handleAddUrl = () => {
    if (urlInput.trim()) {
      setFiles((prev) => [...prev, urlInput.trim()]);
      setUrlInput("");
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 py-4 border-b border-dash-border">
        <a href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-dash-text-primary no-underline">
          <div className="w-6 h-6 bg-black rounded-[5px] flex items-center justify-center">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M1 10L4.5 5.5L7 8L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="3" r="1.2" fill="white" />
            </svg>
          </div>
          GrowthLab
        </a>
        <span className="text-[12px] text-dash-text-tertiary">
          Need help? <button className="text-dash-blue hover:underline">Talk to us →</button>
        </span>
      </div>

      <div className="max-w-[640px] mx-auto px-6 py-14">
        {/* Progress */}
        <div className="flex items-center justify-center gap-0 mb-12">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                  i === step
                    ? "bg-dash-text-primary text-white"
                    : completedSteps.includes(i)
                    ? "bg-dash-text-primary text-white"
                    : "border border-dash-border text-dash-text-tertiary"
                }`}
              >
                {completedSteps.includes(i) ? "✓" : ""} Step {i + 1}: {s}
              </div>
              {i < 2 && <div className="w-8 h-px bg-dash-border mx-1" />}
            </div>
          ))}
        </div>

        {/* Step 1 — Media */}
        {step === 0 && (
          <div className="dash-page-enter">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Step 1 of 3</div>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-dash-text-primary mb-2">Where are your ads running?</h2>
            <p className="text-[14px] text-dash-text-tertiary mb-8">Connect at least one ad platform to unlock Performance Report and AI insights.</p>

            <div className="flex flex-col gap-3 mb-4">
              {adPlatforms.map((p) => (
                <div key={p.name} className="border border-dash-border rounded-lg px-5 py-4 flex items-center justify-between hover:bg-dash-sidebar transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-dash-text-primary rounded-md flex items-center justify-center text-white text-[11px] font-bold">
                      {p.name[0]}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-dash-text-primary">{p.name}</div>
                      <div className="text-[13px] text-dash-text-tertiary">{p.desc}</div>
                    </div>
                  </div>
                  {p.name === "Meta Ads" && metaConnected ? (
                    <span className="text-[12px] font-semibold text-dash-green bg-dash-green-bg px-3 py-1 rounded-full">✓ Connected · 12 campaigns found</span>
                  ) : p.available ? (
                    <button onClick={p.name === "Meta Ads" ? handleMetaConnect : undefined} className="text-[13px] font-medium bg-dash-text-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                      Connect
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] text-dash-text-tertiary">Coming soon</span>
                      <button className="text-[12px] text-dash-blue hover:underline">Notify me</button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-dash-amber-bg border border-[hsl(36,60%,85%)] rounded-md px-4 py-2.5 text-[12px] text-dash-amber mb-8">
              ⚠ Meta Ads review may take up to 24h on first connection.
            </div>

            <button
              onClick={handleContinue}
              disabled={!metaConnected}
              className="w-full h-[44px] bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 mb-2"
            >
              Continue →
            </button>
            <button onClick={handleSkip} className="w-full text-center text-[12px] text-dash-text-tertiary hover:text-dash-text-secondary py-2">
              Skip for now →
            </button>
          </div>
        )}

        {/* Step 2 — Revenue */}
        {step === 1 && (
          <div className="dash-page-enter">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Step 2 of 3</div>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-dash-text-primary mb-2">Where does your revenue come from?</h2>
            <p className="text-[14px] text-dash-text-tertiary mb-6">Connect your conversion source to calculate real ROAS and Projected Payback.</p>

            <div className="flex gap-2 mb-6">
              {revenueTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setRevenueType(t)}
                  className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                    revenueType === t ? "bg-dash-text-primary text-white" : "border border-dash-border text-dash-text-tertiary hover:border-dash-text-secondary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-3 mb-4">
              {revenueSources[revenueType]?.map((s) => (
                <div key={s.name} className="border border-dash-border rounded-lg px-5 py-4 flex items-center justify-between hover:bg-dash-sidebar transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-dash-sidebar border border-dash-border rounded-md flex items-center justify-center text-[11px] font-bold text-dash-text-secondary">
                      {s.name[0]}
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-dash-text-primary">{s.name}</div>
                      <div className="text-[13px] text-dash-text-tertiary">{s.desc}</div>
                    </div>
                  </div>
                  {revenueConnected && s.name === "Shopify" ? (
                    <span className="text-[12px] font-semibold text-dash-green bg-dash-green-bg px-3 py-1 rounded-full">✓ 847 orders found</span>
                  ) : s.available ? (
                    <button
                      onClick={s.isUpload ? undefined : handleRevenueConnect}
                      className="text-[13px] font-medium bg-dash-text-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity"
                    >
                      {s.isUpload ? "Upload file" : "Connect"}
                    </button>
                  ) : (
                    <span className="text-[12px] text-dash-text-tertiary">Coming soon</span>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[12px] text-dash-text-tertiary mb-6">You can connect multiple sources. Each maps to a separate product.</p>

            <button onClick={handleContinue} className="w-full h-[44px] bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity mb-2">
              Continue →
            </button>
            <button onClick={handleSkip} className="w-full text-center text-[12px] text-dash-text-tertiary hover:text-dash-text-secondary py-2">
              Skip → <span className="italic">ROAS will show as estimated until revenue is connected.</span>
            </button>
          </div>
        )}

        {/* Step 3 — Context */}
        {step === 2 && (
          <div className="dash-page-enter">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Step 3 of 3 · Optional</div>
            <h2 className="text-[28px] font-bold tracking-[-0.03em] text-dash-text-primary mb-2">Give the AI context about your business</h2>
            <p className="text-[14px] text-dash-text-tertiary mb-8">The more context the AI Agent has, the sharper its insights and creative suggestions.</p>

            <div className="border-2 border-dashed border-dash-border rounded-lg px-8 py-8 text-center hover:bg-dash-sidebar transition-colors mb-4 cursor-pointer">
              <div className="text-[20px] mb-2">📄</div>
              <p className="text-[14px] text-dash-text-primary">
                Drop files here or <span className="text-dash-blue underline">browse</span>
              </p>
              <p className="text-[12px] text-dash-text-tertiary mt-1">Accepted: .pdf, .docx, .txt</p>
            </div>

            <div className="flex gap-2 mb-4">
              <input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste a URL — landing page, pitch deck, brand guide…"
                className="flex-1 bg-dash-sidebar border border-dash-border rounded-md px-3 py-2.5 text-[13px] text-dash-text-primary placeholder:text-dash-text-tertiary outline-none focus:border-dash-text-secondary transition-colors"
              />
              <button onClick={handleAddUrl} className="text-[13px] font-medium bg-dash-text-primary text-white px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity">
                Add →
              </button>
            </div>

            {files.length > 0 && (
              <div className="flex flex-col gap-1.5 mb-4">
                {files.map((f, i) => (
                  <div key={i} className="flex items-center justify-between border border-dash-border rounded-md px-3 py-2">
                    <span className="text-[13px] text-dash-text-secondary truncate">{f}</span>
                    <button onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))} className="text-[12px] text-dash-text-tertiary hover:text-dash-red ml-2">✕</button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-[12px] text-dash-text-tertiary italic mb-8">Product deck, pricing page, target audience doc, ad brief, brand voice guide.</p>

            <button onClick={handleContinue} className="w-full h-[44px] bg-dash-text-primary text-white rounded-md text-[14px] font-semibold hover:opacity-90 transition-opacity mb-2">
              Finish setup →
            </button>
            <button onClick={handleSkip} className="w-full text-center text-[12px] text-dash-text-tertiary hover:text-dash-text-secondary py-2">
              Skip →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
