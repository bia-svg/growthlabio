import { useState } from "react";
import { Lightbulb, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import IntegrationCard, { type ConnectionStatus } from "./IntegrationCard";
import SourceConfigPanel from "./SourceConfigPanel";

interface Props {
  onContinue: (data: IntegrationData) => void;
  onBack: () => void;
}

export interface IntegrationData {
  adPlatforms: Record<string, ConnectionStatus>;
  siteType: string | null;
  siteIntegrations: string[];
  leadsSource: string | null;
  revenueSource: string | null;
  syncFrequency: string;
}

const adPlatformsList = [
  { name: "Google Ads", desc: "Search, Display & YouTube", icon: "G", comingSoon: false },
  { name: "Meta Ads", desc: "Facebook & Instagram", icon: "M", comingSoon: false },
  { name: "TikTok Ads", desc: "TikTok for Business", icon: "T", comingSoon: true },
  { name: "LinkedIn Ads", desc: "LinkedIn Campaign Manager", icon: "in", comingSoon: true },
];

const siteIntegrationOptions: Record<string, { name: string; icon: string }[]> = {
  landing: [
    { name: "Google Analytics", icon: "GA" },
    { name: "Google Tag Manager", icon: "GT" },
    { name: "Meta Pixel", icon: "Px" },
    { name: "Site script", icon: "S" },
  ],
  checkout: [
    { name: "Hotmart", icon: "H" },
    { name: "Shopify", icon: "Sh" },
    { name: "Cartpanda", icon: "Cp" },
  ],
};

const leadsOptions = [
  { name: "HubSpot", icon: "Hs" },
  { name: "RD Station", icon: "RD" },
  { name: "Pipedrive", icon: "Pd" },
  { name: "Google Sheets", icon: "Gs" },
  { name: "Built-in form", icon: "F" },
  { name: "Webhook", icon: "Wh" },
];

const revenueOptions = [
  { name: "Stripe", icon: "St" },
  { name: "Shopify", icon: "Sh" },
  { name: "HubSpot", icon: "Hs" },
  { name: "Mercado Pago", icon: "MP" },
  { name: "Hotmart", icon: "H" },
  { name: "Pagar.me", icon: "Pg" },
  { name: "Pipedrive", icon: "Pd" },
  { name: "Bling", icon: "Bl" },
  { name: "Google Sheets", icon: "Gs" },
  { name: "Webhook", icon: "Wh" },
];

const syncOptions = ["Real-time", "Every hour", "Daily"];

const OnboardingIntegrations = ({ onContinue, onBack }: Props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";

  const [adStatuses, setAdStatuses] = useState<Record<string, ConnectionStatus>>({});
  const [siteType, setSiteType] = useState<string | null>(null);
  const [siteIntegrations, setSiteIntegrations] = useState<string[]>([]);
  const [configuredSiteIntegrations, setConfiguredSiteIntegrations] = useState<Set<string>>(new Set());
  const [leadsSource, setLeadsSource] = useState<string | null>(null);
  const [leadsConfigured, setLeadsConfigured] = useState(false);
  const [revenueSource, setRevenueSource] = useState<string | null>(null);
  const [revenueConfigured, setRevenueConfigured] = useState(false);
  const [syncFreq, setSyncFreq] = useState("Every hour");
  const [expandedBlocks, setExpandedBlocks] = useState<Record<string, boolean>>({
    ads: true, site: true, leads: false, revenue: false,
  });

  // Config panel state
  const [configPanel, setConfigPanel] = useState<{ source: string; category: "site" | "leads" | "revenue" } | null>(null);

  const toggleBlock = (key: string) =>
    setExpandedBlocks((p) => ({ ...p, [key]: !p[key] }));

  const connectAd = (name: string) => {
    setAdStatuses((p) => ({ ...p, [name]: "connecting" }));
    setTimeout(() => setAdStatuses((p) => ({ ...p, [name]: "connected" })), 1200);
  };

  const connectedAds = Object.values(adStatuses).filter((s) => s === "connected").length;
  const totalProgress = [
    connectedAds > 0,
    siteType !== null,
    leadsSource !== null,
    revenueSource !== null,
  ].filter(Boolean).length;

  const handleContinue = () => {
    onContinue({
      adPlatforms: adStatuses,
      siteType,
      siteIntegrations,
      leadsSource,
      revenueSource,
      syncFrequency: syncFreq,
    });
  };

  const siteTypeOptions = [
    { id: "landing", label: t("onboarding.integrationScreen.siteOptions.landing") },
    { id: "whatsapp", label: t("onboarding.integrationScreen.siteOptions.whatsapp") },
    { id: "checkout", label: t("onboarding.integrationScreen.siteOptions.checkout") },
    { id: "none", label: t("onboarding.integrationScreen.siteOptions.none") },
  ];

  const aiTip = siteType === "whatsapp"
    ? t("onboarding.integrationScreen.aiTipWhatsapp")
    : leadsSource === null && revenueSource !== null
    ? t("onboarding.integrationScreen.aiTipNoLeads")
    : null;

  // Handle site integration click → open config
  const handleSiteIntegrationClick = (name: string) => {
    if (configuredSiteIntegrations.has(name)) {
      // Already configured, allow reconfigure
      setConfigPanel({ source: name, category: "site" });
    } else {
      setConfigPanel({ source: name, category: "site" });
    }
  };

  // Handle leads click → open config
  const handleLeadsClick = (name: string) => {
    if (leadsSource === name && leadsConfigured) {
      // Reconfigure
      setConfigPanel({ source: name, category: "leads" });
    } else {
      setLeadsSource(name);
      setLeadsConfigured(false);
      setConfigPanel({ source: name, category: "leads" });
    }
  };

  // Handle revenue click → open config
  const handleRevenueClick = (name: string) => {
    if (revenueSource === name && revenueConfigured) {
      setConfigPanel({ source: name, category: "revenue" });
    } else {
      setRevenueSource(name);
      setRevenueConfigured(false);
      setConfigPanel({ source: name, category: "revenue" });
    }
  };

  // Config panel save handlers
  const handleConfigSave = (config: Record<string, string>) => {
    if (!configPanel) return;

    if (configPanel.category === "site") {
      if (!siteIntegrations.includes(configPanel.source)) {
        setSiteIntegrations((p) => [...p, configPanel.source]);
      }
      setConfiguredSiteIntegrations((prev) => new Set(prev).add(configPanel.source));
    } else if (configPanel.category === "leads") {
      setLeadsSource(configPanel.source);
      setLeadsConfigured(true);
    } else if (configPanel.category === "revenue") {
      setRevenueSource(configPanel.source);
      setRevenueConfigured(true);
    }

    setConfigPanel(null);
  };

  return (
    <div className="max-w-[720px] mx-auto px-6 py-10 dash-page-enter">
      {/* Config Panel Modal */}
      {configPanel && (
        <SourceConfigPanel
          source={configPanel.source}
          category={configPanel.category}
          onSave={handleConfigSave}
          onClose={() => setConfigPanel(null)}
        />
      )}

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[12px] font-medium text-[hsl(var(--dash-text-tertiary))]">{t("onboarding.integrationScreen.progress")}</span>
          <span className="text-[12px] font-semibold text-[hsl(var(--dash-text-secondary))]">{totalProgress}/4 {t("onboarding.integrationScreen.blocks")}</span>
        </div>
        <div className="h-1.5 bg-[hsl(var(--dash-border))] rounded-full overflow-hidden">
          <div className="h-full bg-[hsl(var(--dash-green))] rounded-full transition-all duration-500" style={{ width: `${(totalProgress / 4) * 100}%` }} />
        </div>
      </div>

      <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[hsl(var(--dash-text-primary))] mb-2">{t("onboarding.integrationScreen.title")}</h2>
      <p className="text-[14px] text-[hsl(var(--dash-text-tertiary))] mb-10">{t("onboarding.integrationScreen.subtitle")}</p>

      {/* AI Tip */}
      {aiTip && (
        <div className="flex items-start gap-3 bg-[hsl(var(--dash-blue-bg))] border border-[hsl(var(--dash-blue))]/20 rounded-lg px-4 py-3 mb-8">
          <Lightbulb className="w-4 h-4 text-[hsl(var(--dash-blue))] mt-0.5 shrink-0" />
          <p className="text-[13px] text-[hsl(var(--dash-blue))]">{aiTip}</p>
        </div>
      )}

      {/* Block 1: Ad Accounts */}
      <Section title={t("onboarding.integrationScreen.adAccounts")} badge={connectedAds > 0 ? `${connectedAds} ${t("onboarding.integrationScreen.connected")}` : undefined} expanded={expandedBlocks.ads} onToggle={() => toggleBlock("ads")} required requiredLabel={t("onboarding.integrationScreen.required")} configuredLabel={t("onboarding.integrationScreen.configured")}>
        <div className="flex flex-col gap-2.5">
          {adPlatformsList.map((p) => (
            <IntegrationCard
              key={p.name}
              name={p.name}
              desc={p.desc}
              icon={p.icon}
              status={adStatuses[p.name] || "disconnected"}
              comingSoon={p.comingSoon}
              onConnect={() => connectAd(p.name)}
              connectedDetail={p.name === "Meta Ads" ? "12 campaigns" : p.name === "Google Ads" ? "8 campaigns" : undefined}
            />
          ))}
        </div>
      </Section>

      {/* Block 2: Site / Landing Page */}
      <Section title={t("onboarding.integrationScreen.siteTitle")} expanded={expandedBlocks.site} onToggle={() => toggleBlock("site")} badge={siteType ? t("onboarding.integrationScreen.configured") : undefined} configuredLabel={t("onboarding.integrationScreen.configured")}>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {siteTypeOptions.map((st) => (
            <button
              key={st.id}
              onClick={() => setSiteType(st.id)}
              className={`text-left px-4 py-3 rounded-lg border text-[13px] font-medium transition-colors ${
                siteType === st.id
                  ? "border-primary bg-primary/5 text-[hsl(var(--dash-text-primary))]"
                  : "border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-secondary))] hover:bg-[hsl(var(--dash-sidebar))]"
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {siteType && siteIntegrationOptions[siteType] && (
          <div className="flex flex-col gap-2 mt-3">
            <p className="text-[12px] text-[hsl(var(--dash-text-tertiary))] mb-1">
              {lang === "pt" ? "Clique para configurar cada integração:" : "Click to configure each integration:"}
            </p>
            {siteIntegrationOptions[siteType].map((opt) => {
              const isConfigured = configuredSiteIntegrations.has(opt.name);
              return (
                <button
                  key={opt.name}
                  onClick={() => handleSiteIntegrationClick(opt.name)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-[13px] font-medium transition-colors ${
                    isConfigured
                      ? "border-[hsl(var(--dash-green))]/40 bg-[hsl(var(--dash-green-bg))]"
                      : "border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-secondary))] hover:bg-[hsl(var(--dash-sidebar))] hover:border-[hsl(var(--dash-text-tertiary))]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-md bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--dash-text-tertiary))]">
                      {opt.icon}
                    </div>
                    <span className={isConfigured ? "text-[hsl(var(--dash-text-primary))]" : ""}>{opt.name}</span>
                  </div>
                  {isConfigured ? (
                    <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--dash-green))] font-semibold">
                      <Check className="w-3.5 h-3.5" />
                      {lang === "pt" ? "Configurado" : "Configured"}
                    </span>
                  ) : (
                    <span className="text-[11px] text-[hsl(var(--dash-blue))] font-medium">
                      {lang === "pt" ? "Configurar →" : "Configure →"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </Section>

      {/* Block 3: Leads */}
      <Section title={t("onboarding.integrationScreen.leadsTitle")} expanded={expandedBlocks.leads} onToggle={() => toggleBlock("leads")} optional optionalLabel={t("onboarding.integrationScreen.optional")} badge={leadsConfigured ? t("onboarding.integrationScreen.configured") : undefined} configuredLabel={t("onboarding.integrationScreen.configured")}>
        <p className="text-[12px] text-[hsl(var(--dash-text-tertiary))] mb-3">
          {lang === "pt" ? "Selecione onde seus leads são capturados:" : "Select where your leads are captured:"}
        </p>
        <div className="flex flex-col gap-2">
          {leadsOptions.map((opt) => {
            const isSelected = leadsSource === opt.name;
            const isConfigured = isSelected && leadsConfigured;
            return (
              <button
                key={opt.name}
                onClick={() => handleLeadsClick(opt.name)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border text-[13px] font-medium transition-colors ${
                  isConfigured
                    ? "border-[hsl(var(--dash-green))]/40 bg-[hsl(var(--dash-green-bg))]"
                    : isSelected
                    ? "border-primary bg-primary/5 text-[hsl(var(--dash-text-primary))]"
                    : "border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-secondary))] hover:bg-[hsl(var(--dash-sidebar))] hover:border-[hsl(var(--dash-text-tertiary))]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--dash-text-tertiary))]">
                    {opt.icon}
                  </div>
                  <span className={isConfigured ? "text-[hsl(var(--dash-text-primary))]" : ""}>{opt.name}</span>
                </div>
                {isConfigured ? (
                  <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--dash-green))] font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    {lang === "pt" ? "Conectado" : "Connected"}
                  </span>
                ) : (
                  <span className="text-[11px] text-[hsl(var(--dash-blue))] font-medium">
                    {lang === "pt" ? "Configurar →" : "Configure →"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </Section>

      {/* Block 4: Revenue */}
      <Section title={t("onboarding.integrationScreen.revenueTitle")} expanded={expandedBlocks.revenue} onToggle={() => toggleBlock("revenue")} badge={revenueConfigured ? t("onboarding.integrationScreen.configured") : undefined} configuredLabel={t("onboarding.integrationScreen.configured")}>
        <p className="text-[12px] text-[hsl(var(--dash-text-tertiary))] mb-3">
          {lang === "pt" ? "Selecione onde é gravado o revenue:" : "Select where revenue is recorded:"}
        </p>
        <div className="flex flex-col gap-2 mb-5">
          {revenueOptions.map((opt) => {
            const isSelected = revenueSource === opt.name;
            const isConfigured = isSelected && revenueConfigured;
            return (
              <button
                key={opt.name}
                onClick={() => handleRevenueClick(opt.name)}
                className={`flex items-center justify-between px-4 py-3 rounded-lg border text-[13px] font-medium transition-colors ${
                  isConfigured
                    ? "border-[hsl(var(--dash-green))]/40 bg-[hsl(var(--dash-green-bg))]"
                    : isSelected
                    ? "border-primary bg-primary/5 text-[hsl(var(--dash-text-primary))]"
                    : "border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-secondary))] hover:bg-[hsl(var(--dash-sidebar))] hover:border-[hsl(var(--dash-text-tertiary))]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-md bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] flex items-center justify-center text-[10px] font-bold text-[hsl(var(--dash-text-tertiary))]">
                    {opt.icon}
                  </div>
                  <span className={isConfigured ? "text-[hsl(var(--dash-text-primary))]" : ""}>{opt.name}</span>
                </div>
                {isConfigured ? (
                  <span className="flex items-center gap-1 text-[11px] text-[hsl(var(--dash-green))] font-semibold">
                    <Check className="w-3.5 h-3.5" />
                    {lang === "pt" ? "Conectado" : "Connected"}
                  </span>
                ) : (
                  <span className="text-[11px] text-[hsl(var(--dash-blue))] font-medium">
                    {lang === "pt" ? "Configurar →" : "Configure →"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {revenueConfigured && (
          <div className="border-t border-[hsl(var(--dash-border))] pt-4">
            <label className="text-[12px] font-medium text-[hsl(var(--dash-text-tertiary))] mb-2 block">{t("onboarding.integrationScreen.syncFrequency")}</label>
            <div className="flex gap-2">
              {syncOptions.map((s) => (
                <button
                  key={s}
                  onClick={() => setSyncFreq(s)}
                  className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-colors ${
                    syncFreq === s
                      ? "border-primary bg-primary/10 text-[hsl(var(--dash-text-primary))]"
                      : "border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-tertiary))]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* Actions */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-[hsl(var(--dash-border))]">
        <button onClick={onBack} className="text-[13px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]">{t("onboarding.integrationScreen.back")}</button>
        <div className="flex items-center gap-3">
          <button onClick={handleContinue} className="text-[12px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]">{t("onboarding.integrationScreen.skipForNow")}</button>
          <button onClick={handleContinue} className="h-[44px] px-6 bg-primary text-primary-foreground rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity">
            {t("onboarding.integrationScreen.continue")}
          </button>
        </div>
      </div>
    </div>
  );
};

/* Collapsible section */
const Section = ({ title, children, expanded, onToggle, required, optional, badge, requiredLabel, optionalLabel, configuredLabel }: {
  title: string; children: React.ReactNode; expanded: boolean; onToggle: () => void;
  required?: boolean; optional?: boolean; badge?: string;
  requiredLabel?: string; optionalLabel?: string; configuredLabel?: string;
}) => (
  <div className="mb-6 border border-[hsl(var(--dash-border))] rounded-xl overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 hover:bg-[hsl(var(--dash-sidebar))] transition-colors">
      <div className="flex items-center gap-3">
        <span className="text-[15px] font-semibold text-[hsl(var(--dash-text-primary))]">{title}</span>
        {required && <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-amber))] bg-[hsl(var(--dash-amber-bg))] px-2 py-0.5 rounded-full">{requiredLabel || "Required"}</span>}
        {optional && <span className="text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))] bg-[hsl(var(--dash-sidebar))] px-2 py-0.5 rounded-full">{optionalLabel || "Optional"}</span>}
        {badge && <span className="text-[10px] font-semibold text-[hsl(var(--dash-green))] bg-[hsl(var(--dash-green-bg))] px-2 py-0.5 rounded-full">✓ {badge}</span>}
      </div>
      {expanded ? <ChevronUp className="w-4 h-4 text-[hsl(var(--dash-text-tertiary))]" /> : <ChevronDown className="w-4 h-4 text-[hsl(var(--dash-text-tertiary))]" />}
    </button>
    {expanded && <div className="px-5 pb-5">{children}</div>}
  </div>
);

export default OnboardingIntegrations;
