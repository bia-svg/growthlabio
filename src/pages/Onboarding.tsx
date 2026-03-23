import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import OnboardingWelcome from "@/components/onboarding/OnboardingWelcome";
import OnboardingIntegrations from "@/components/onboarding/OnboardingIntegrations";
import OnboardingProducts from "@/components/onboarding/OnboardingProducts";
import OnboardingFunnel from "@/components/onboarding/OnboardingFunnel";
import OnboardingContext from "@/components/onboarding/OnboardingContext";
import OnboardingDataCheck from "@/components/onboarding/OnboardingDataCheck";
import OnboardingChat from "@/components/onboarding/OnboardingChat";
import type { IntegrationData } from "@/components/onboarding/OnboardingIntegrations";
import type { ProductMapping } from "@/components/onboarding/OnboardingProducts";

const Onboarding = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";

  const handleSkip = () => {
    localStorage.setItem("gl_onboarded", "1");
    navigate("/app");
  };

  const stepLabels = [
    t("onboarding.steps.welcome"),
    t("onboarding.steps.integrations"),
    lang === "pt" ? "Produtos" : "Products",
    t("onboarding.steps.funnel"),
    lang === "pt" ? "Contexto IA" : "AI Context",
    t("onboarding.steps.validation"),
  ];

  const [step, setStep] = useState(0);
  const [integrationData, setIntegrationData] = useState<IntegrationData | null>(null);
  const [products, setProducts] = useState<ProductMapping[]>([]);
  const [funnel, setFunnel] = useState<string[]>([]);
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background font-inter flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 py-4 border-b border-[hsl(var(--dash-border))] shrink-0">
        <a href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[hsl(var(--dash-text-primary))] no-underline">
          <div className="w-6 h-6 bg-primary rounded-[5px] flex items-center justify-center">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M1 10L4.5 5.5L7 8L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="3" r="1.2" fill="white" />
            </svg>
          </div>
          Clarivus
        </a>

        {step > 0 && (
          <div className="flex items-center gap-1">
            {stepLabels.map((label, i) => (
              <div key={`${label}-${i}`} className="flex items-center">
                <div className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-colors ${
                  i === step ? "bg-primary text-primary-foreground" :
                  i < step ? "bg-[hsl(var(--dash-green))] text-white" :
                  "border border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-tertiary))]"
                }`}>
                  {i < step ? "✓" : ""} {label}
                </div>
                {i < stepLabels.length - 1 && <div className="w-6 h-px bg-[hsl(var(--dash-border))] mx-0.5" />}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSkip}
          className="text-[12px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))] transition-colors whitespace-nowrap"
        >
          {lang === "pt" ? "Pular → ver dashboard" : "Skip → explore dashboard"}
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {showChat && (
          <div className={`h-full ${step === 0 ? "flex-1" : "flex-1 basis-0 min-w-0"}`}>
            <OnboardingChat currentStep={step} onUserMessage={() => { if (step === 0) setStep(1); }} />
          </div>
        )}

        {!(step === 0 && showChat) && (
          <div className={`overflow-y-auto ${showChat ? "flex-1 basis-0 min-w-0" : "flex-1"}`}>
            {step === 0 && (
              <OnboardingWelcome
                onStart={() => { setStep(1); setShowChat(true); }}
                onAiHelp={() => { setShowChat(true); }}
              />
            )}
          {step === 1 && (
            <OnboardingIntegrations
              onContinue={(data) => { setIntegrationData(data); setStep(2); }}
              onBack={() => setStep(0)}
            />
          )}
          {step === 2 && (
            <OnboardingProducts
              integrationData={integrationData}
              onContinue={(prods) => { setProducts(prods); setStep(3); }}
              onBack={() => setStep(1)}
            />
          )}
          {step === 3 && (
            <OnboardingFunnel
              integrationData={integrationData}
              onContinue={(f, _metrics) => { setFunnel(f); setStep(4); }}
              onBack={() => setStep(2)}
            />
          )}
          {step === 4 && (
            <OnboardingContext
              onContinue={() => setStep(5)}
              onBack={() => setStep(3)}
            />
          )}
          {step === 5 && (
            <OnboardingDataCheck
              integrationData={integrationData}
              funnel={funnel}
              onBack={() => setStep(4)}
            />
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
