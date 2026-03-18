import { useState } from "react";
import { X, Check, ExternalLink, Copy, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SourceConfigPanelProps {
  source: string;
  category: "site" | "leads" | "revenue";
  onSave: (config: Record<string, string>) => void;
  onClose: () => void;
}

/* ─── Config fields per source ─── */
const configFields: Record<string, { key: string; label: string; labelPt: string; placeholder: string; type?: "text" | "url" | "select"; options?: string[] }[]> = {
  // Site sources
  "Google Analytics": [
    { key: "measurementId", label: "Measurement ID", labelPt: "ID de medição", placeholder: "G-XXXXXXXXXX" },
    { key: "propertyId", label: "Property ID", labelPt: "ID da propriedade", placeholder: "123456789" },
  ],
  "Google Tag Manager": [
    { key: "containerId", label: "Container ID", labelPt: "ID do container", placeholder: "GTM-XXXXXXX" },
  ],
  "Meta Pixel": [
    { key: "pixelId", label: "Pixel ID", labelPt: "ID do Pixel", placeholder: "1234567890123456" },
  ],
  "Site script": [
    { key: "siteUrl", label: "Website URL", labelPt: "URL do site", placeholder: "https://seusite.com.br", type: "url" },
  ],

  // Checkout
  "Hotmart": [
    { key: "apiToken", label: "API Token (Hottok)", labelPt: "Token da API (Hottok)", placeholder: "hot_xxxxxxxxxxxxxxxx" },
    { key: "environment", label: "Environment", labelPt: "Ambiente", placeholder: "Production", type: "select", options: ["Production", "Sandbox"] },
  ],
  "Shopify": [
    { key: "storeUrl", label: "Store URL", labelPt: "URL da loja", placeholder: "sualoja.myshopify.com", type: "url" },
    { key: "apiKey", label: "API Access Token", labelPt: "Token de acesso da API", placeholder: "shpat_xxxxxxxxxxxxxxx" },
  ],
  "Cartpanda": [
    { key: "apiToken", label: "API Token", labelPt: "Token da API", placeholder: "cp_xxxxxxxxxxxxxxxx" },
    { key: "storeId", label: "Store ID", labelPt: "ID da loja", placeholder: "12345" },
  ],

  // Leads sources
  "HubSpot": [
    { key: "apiKey", label: "Private App Token", labelPt: "Token do App Privado", placeholder: "pat-na1-xxxxxxxx" },
    { key: "pipeline", label: "Pipeline name", labelPt: "Nome do pipeline", placeholder: "Sales Pipeline" },
  ],
  "Pipedrive": [
    { key: "apiToken", label: "API Token", labelPt: "Token da API", placeholder: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
    { key: "pipeline", label: "Pipeline", labelPt: "Pipeline", placeholder: "Default" },
  ],
  "RD Station": [
    { key: "apiToken", label: "API Token", labelPt: "Token da API", placeholder: "xxxxxxxxxxxxxxxxxxxxxxxx" },
  ],
  "Google Sheets": [
    { key: "sheetUrl", label: "Spreadsheet URL", labelPt: "URL da planilha", placeholder: "https://docs.google.com/spreadsheets/d/...", type: "url" },
    { key: "sheetName", label: "Sheet name", labelPt: "Nome da aba", placeholder: "Leads" },
  ],
  "Built-in form": [
    { key: "formName", label: "Form name", labelPt: "Nome do formulário", placeholder: "Contact Form" },
  ],
  "Webhook": [
    { key: "webhookUrl", label: "Webhook URL", labelPt: "URL do Webhook", placeholder: "https://...", type: "url" },
  ],

  // Revenue sources
  "Pagar.me": [
    { key: "apiKey", label: "API Key", labelPt: "Chave da API", placeholder: "ak_live_xxxxxxxx" },
    { key: "environment", label: "Environment", labelPt: "Ambiente", placeholder: "Production", type: "select", options: ["Production", "Sandbox"] },
  ],
  "Stripe": [
    { key: "apiKey", label: "Restricted API Key", labelPt: "Chave da API restrita", placeholder: "rk_live_xxxxxxxx" },
  ],
  "Mercado Pago": [
    { key: "accessToken", label: "Access Token", labelPt: "Token de acesso", placeholder: "APP_USR-xxxxxxxx" },
  ],
  "Bling": [
    { key: "apiKey", label: "API Key", labelPt: "Chave da API", placeholder: "xxxxxxxxxxxxxxxxxxxxxxxx" },
  ],
};

/* ─── Help links per source ─── */
const helpLinks: Record<string, string> = {
  "Google Analytics": "https://support.google.com/analytics/answer/9539598",
  "Google Tag Manager": "https://support.google.com/tagmanager/answer/6103696",
  "Meta Pixel": "https://www.facebook.com/business/help/952192354843755",
  "HubSpot": "https://knowledge.hubspot.com/integrations/how-do-i-get-my-hubspot-api-key",
  "Pipedrive": "https://pipedrive.readme.io/docs/how-to-find-the-api-token",
  "RD Station": "https://developers.rdstation.com/reference/autenticacao",
  "Stripe": "https://stripe.com/docs/keys",
  "Hotmart": "https://developers.hotmart.com/docs/en/",
  "Shopify": "https://shopify.dev/docs/apps/auth/admin-app-access-tokens",
};

const SourceConfigPanel = ({ source, category, onSave, onClose }: SourceConfigPanelProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";

  const fields = configFields[source] || [
    { key: "apiKey", label: "API Key", labelPt: "Chave da API", placeholder: "Enter your API key..." },
  ];

  const [values, setValues] = useState<Record<string, string>>({});
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const updateValue = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const allFilled = fields.every((f) => (values[f.key] || "").trim().length > 0);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setTimeout(() => onSave(values), 600);
    }, 1500);
  };

  const helpLink = helpLinks[source];

  // Webhook special: show the webhook URL to copy
  const isWebhookIncoming = source === "Webhook" && category !== "leads";
  const generatedWebhookUrl = "https://api.growthlab.io/webhook/v1/revenue/abc123";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-background border border-[hsl(var(--dash-border))] rounded-2xl shadow-2xl w-full max-w-[480px] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[hsl(var(--dash-border))]">
          <div>
            <h3 className="text-[16px] font-bold text-[hsl(var(--dash-text-primary))]">
              {lang === "pt" ? `Configurar ${source}` : `Configure ${source}`}
            </h3>
            <p className="text-[12px] text-[hsl(var(--dash-text-tertiary))] mt-0.5">
              {lang === "pt"
                ? "Preencha os dados para conectar esta fonte."
                : "Fill in the details to connect this source."}
            </p>
          </div>
          <button onClick={onClose} className="text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-primary))] transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Fields */}
        <div className="px-6 py-5 space-y-4">
          {connected ? (
            <div className="flex flex-col items-center py-6">
              <div className="w-12 h-12 rounded-full bg-[hsl(var(--dash-green-bg))] flex items-center justify-center mb-3">
                <Check className="w-6 h-6 text-[hsl(var(--dash-green))]" />
              </div>
              <p className="text-[14px] font-semibold text-[hsl(var(--dash-text-primary))]">
                {lang === "pt" ? "Conectado com sucesso!" : "Successfully connected!"}
              </p>
              <p className="text-[12px] text-[hsl(var(--dash-text-tertiary))] mt-1">
                {lang === "pt" ? "Os dados estão sendo sincronizados." : "Data is being synced."}
              </p>
            </div>
          ) : (
            <>
              {fields.map((field) => (
                <div key={field.key}>
                  <label className="text-[12px] font-medium text-[hsl(var(--dash-text-secondary))] mb-1.5 block">
                    {lang === "pt" ? field.labelPt : field.label}
                  </label>
                  {field.type === "select" && field.options ? (
                    <div className="flex gap-2">
                      {field.options.map((opt) => (
                        <button
                          key={opt}
                          onClick={() => updateValue(field.key, opt)}
                          className={`flex-1 px-3 py-2.5 rounded-lg border text-[13px] font-medium transition-colors ${
                            values[field.key] === opt
                              ? "border-primary bg-primary/5 text-[hsl(var(--dash-text-primary))]"
                              : "border-[hsl(var(--dash-border))] text-[hsl(var(--dash-text-secondary))] hover:bg-[hsl(var(--dash-sidebar))]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      type={field.type === "url" ? "url" : "text"}
                      value={values[field.key] || ""}
                      onChange={(e) => updateValue(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full h-10 px-3 rounded-lg border border-[hsl(var(--dash-border))] bg-transparent text-[13px] text-[hsl(var(--dash-text-primary))] placeholder:text-[hsl(var(--dash-text-tertiary))]/50 focus:outline-none focus:border-primary transition-colors font-mono"
                    />
                  )}
                </div>
              ))}

              {/* Webhook incoming URL */}
              {isWebhookIncoming && (
                <div>
                  <label className="text-[12px] font-medium text-[hsl(var(--dash-text-secondary))] mb-1.5 block">
                    {lang === "pt" ? "URL para receber dados" : "URL to receive data"}
                  </label>
                  <div className="flex items-center gap-2 bg-[hsl(var(--dash-sidebar))] border border-[hsl(var(--dash-border))] rounded-lg px-3 py-2.5">
                    <code className="flex-1 text-[12px] text-[hsl(var(--dash-text-primary))] truncate">{generatedWebhookUrl}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(generatedWebhookUrl)}
                      className="text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-primary))] transition-colors shrink-0"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-[hsl(var(--dash-text-tertiary))] mt-1">
                    {lang === "pt"
                      ? "Configure esta URL no seu sistema para enviar dados automaticamente."
                      : "Set this URL in your system to send data automatically."}
                  </p>
                </div>
              )}

              {/* Help link */}
              {helpLink && (
                <a
                  href={helpLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-[hsl(var(--dash-blue))] hover:underline"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {lang === "pt" ? `Como encontrar suas credenciais do ${source}` : `How to find your ${source} credentials`}
                </a>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {!connected && (
          <div className="px-6 py-4 border-t border-[hsl(var(--dash-border))] flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-[13px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]"
            >
              {lang === "pt" ? "Cancelar" : "Cancel"}
            </button>
            <button
              onClick={handleConnect}
              disabled={!allFilled || connecting}
              className="h-[40px] px-5 bg-primary text-primary-foreground rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center gap-2"
            >
              {connecting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  {lang === "pt" ? "Conectando..." : "Connecting..."}
                </>
              ) : (
                lang === "pt" ? "Conectar" : "Connect"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourceConfigPanel;
