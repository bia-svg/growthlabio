import { useTranslation } from "react-i18next";

const integrations = [
  // Ads
  { icon: "M", bg: "#1877F2", label: "Meta Ads" },
  { icon: "G", bg: "#4285F4", label: "Google Ads" },
  { icon: "T", bg: "#000000", label: "TikTok Ads" },
  { icon: "in", bg: "#0A66C2", label: "LinkedIn Ads" },
  // Site / Tracking
  { icon: "GA", bg: "#E37400", label: "Google Analytics" },
  { icon: "GT", bg: "#4688F4", label: "Tag Manager" },
  { icon: "Px", bg: "#1877F2", label: "Meta Pixel" },
  // Leads
  { icon: "Hs", bg: "#FF7A59", label: "HubSpot" },
  { icon: "Pd", bg: "#333333", label: "Pipedrive" },
  { icon: "RD", bg: "#00A85A", label: "RD Station" },
  // Revenue
  { icon: "St", bg: "#635BFF", label: "Stripe" },
  { icon: "Sh", bg: "#96BF48", label: "Shopify" },
  { icon: "Pg", bg: "#21C25E", label: "Pagar.me" },
  { icon: "H", bg: "#FF3C00", label: "Hotmart" },
  { icon: "MP", bg: "#009EE3", label: "Mercado Pago" },
];

const IntegrationsBar = () => {
  const { t } = useTranslation();
  return (
    <div className="border-t border-b border-border py-11">
      <div className="max-w-[1040px] mx-auto px-7">
        <p className="text-center text-[11.5px] font-semibold tracking-widest uppercase text-gl-g300 mb-7">
          {t("integrations.title")}
        </p>
        <div className="flex items-center justify-center flex-wrap gap-y-2">
          {integrations.map((int, i) => (
            <div
              key={int.label + i}
              className="flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-gl-g400 hover:text-foreground transition-colors"
            >
              <div
                className="w-[20px] h-[20px] rounded-[4px] flex items-center justify-center text-[9px] font-extrabold shrink-0 text-primary-foreground"
                style={{ background: int.bg }}
              >
                {int.icon}
              </div>
              {int.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegrationsBar;
