import { useTranslation } from "react-i18next";

const integrations = [
  { icon: "f", bg: "#1877F2", label: "Meta Ads" },
  { icon: "S", bg: "#96BF48", label: "Shopify" },
  { icon: "H", bg: "#FF7A59", label: "HubSpot" },
  { icon: "S", bg: "#6B48FF", label: "Sympla" },
  { icon: "H", bg: "#FF3C00", label: "Hotjar" },
  { icon: "#", bg: "#4A154B", label: "Slack" },
];

const IntegrationsBar = () => {
  const { t } = useTranslation();
  return (
    <div className="border-t border-b border-border py-11">
      <div className="max-w-[1040px] mx-auto px-7">
        <p className="text-center text-[11.5px] font-semibold tracking-widest uppercase text-gl-g300 mb-7">
          {t("integrations.title")}
        </p>
        <div className="flex items-center justify-center flex-wrap">
          {integrations.map((int, i) => (
            <div
              key={int.label + i}
              className="flex items-center gap-2 px-7 py-3 border-r border-border last:border-r-0 text-[13.5px] font-medium text-gl-g400 hover:text-foreground transition-colors"
            >
              <div
                className="w-[22px] h-[22px] rounded-[5px] flex items-center justify-center text-xs font-extrabold shrink-0 text-primary-foreground"
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
