import { useState } from "react";
import OnboardingWelcome from "@/components/onboarding/OnboardingWelcome";
import OnboardingIntegrations from "@/components/onboarding/OnboardingIntegrations";
import OnboardingFunnel from "@/components/onboarding/OnboardingFunnel";
import OnboardingDataCheck from "@/components/onboarding/OnboardingDataCheck";
import type { IntegrationData } from "@/components/onboarding/OnboardingIntegrations";

const stepLabels = ["Boas-vindas", "Integrações", "Funil", "Verificação"];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [integrationData, setIntegrationData] = useState<IntegrationData | null>(null);
  const [funnel, setFunnel] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Top bar */}
      <div className="flex items-center justify-between px-7 py-4 border-b border-[hsl(var(--dash-border))]">
        <a href="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight text-[hsl(var(--dash-text-primary))] no-underline">
          <div className="w-6 h-6 bg-primary rounded-[5px] flex items-center justify-center">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3">
              <path d="M1 10L4.5 5.5L7 8L10 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="3" r="1.2" fill="white" />
            </svg>
          </div>
          GrowthLab
        </a>

        {/* Step indicator (hidden on welcome) */}
        {step > 0 && (
          <div className="flex items-center gap-1">
            {stepLabels.map((label, i) => (
              <div key={label} className="flex items-center">
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

        <span className="text-[12px] text-[hsl(var(--dash-text-tertiary))]">
          Precisa de ajuda? <button className="text-[hsl(var(--dash-blue))] hover:underline">Fale conosco →</button>
        </span>
      </div>

      {/* Steps */}
      {step === 0 && <OnboardingWelcome onStart={() => setStep(1)} />}
      {step === 1 && (
        <OnboardingIntegrations
          onContinue={(data) => { setIntegrationData(data); setStep(2); }}
          onBack={() => setStep(0)}
        />
      )}
      {step === 2 && (
        <OnboardingFunnel
          integrationData={integrationData}
          onContinue={(f) => { setFunnel(f); setStep(3); }}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <OnboardingDataCheck
          integrationData={integrationData}
          funnel={funnel}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
};

export default Onboarding;
