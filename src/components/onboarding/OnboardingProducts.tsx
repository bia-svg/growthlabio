import { useState } from "react";
import { Plus, X, Package, ChevronDown, ChevronUp, Check, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { IntegrationData } from "./OnboardingIntegrations";

export interface ProductMapping {
  id: string;
  name: string;
  campaigns: string[];
}

interface Props {
  integrationData: IntegrationData | null;
  onContinue: (products: ProductMapping[]) => void;
  onBack: () => void;
}

/* Mock campaigns pulled from "connected" ad accounts */
const getMockCampaigns = (data: IntegrationData | null) => {
  const campaigns: { id: string; name: string; platform: string; spend: string }[] = [];
  if (!data) return campaigns;

  if (data.adPlatforms["Meta Ads"] === "connected") {
    campaigns.push(
      { id: "meta-1", name: "Lookalike 1% Clientes", platform: "Meta Ads", spend: "R$3,600" },
      { id: "meta-2", name: "Interesse — Educação BR", platform: "Meta Ads", spend: "R$5,200" },
      { id: "meta-3", name: "Remarketing 30d", platform: "Meta Ads", spend: "R$1,600" },
      { id: "meta-4", name: "Broad — Awareness v1", platform: "Meta Ads", spend: "R$900" },
      { id: "meta-5", name: "Retargeting — Oferta Relâmpago", platform: "Meta Ads", spend: "R$1,100" },
      { id: "meta-6", name: "Conversão — Depoimento v2", platform: "Meta Ads", spend: "R$1,500" },
    );
  }
  if (data.adPlatforms["Google Ads"] === "connected") {
    campaigns.push(
      { id: "gads-1", name: "Search — Brand Terms", platform: "Google Ads", spend: "R$2,800" },
      { id: "gads-2", name: "Search — Competitor", platform: "Google Ads", spend: "R$1,900" },
      { id: "gads-3", name: "Display — Remarketing", platform: "Google Ads", spend: "R$1,200" },
      { id: "gads-4", name: "YouTube — Tutorial Ads", platform: "Google Ads", spend: "R$800" },
    );
  }

  // Fallback if no ad accounts connected
  if (campaigns.length === 0) {
    campaigns.push(
      { id: "demo-1", name: "Campanha A — Lookalike", platform: "Meta Ads", spend: "R$3,000" },
      { id: "demo-2", name: "Campanha B — Interesse", platform: "Meta Ads", spend: "R$4,500" },
      { id: "demo-3", name: "Campanha C — Remarketing", platform: "Meta Ads", spend: "R$1,800" },
      { id: "demo-4", name: "Campanha D — Search Brand", platform: "Google Ads", spend: "R$2,200" },
      { id: "demo-5", name: "Campanha E — Display", platform: "Google Ads", spend: "R$1,000" },
    );
  }

  return campaigns;
};

let nextId = 1;
const genId = () => `product-${nextId++}`;

const OnboardingProducts = ({ integrationData, onContinue, onBack }: Props) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";

  const campaigns = getMockCampaigns(integrationData);

  const [products, setProducts] = useState<ProductMapping[]>([
    { id: genId(), name: "", campaigns: [] },
  ]);
  const [expandedProduct, setExpandedProduct] = useState<string>(products[0].id);

  const addProduct = () => {
    const newP: ProductMapping = { id: genId(), name: "", campaigns: [] };
    setProducts((p) => [...p, newP]);
    setExpandedProduct(newP.id);
  };

  const removeProduct = (id: string) => {
    setProducts((p) => p.filter((pr) => pr.id !== id));
    if (expandedProduct === id) {
      setExpandedProduct(products[0]?.id || "");
    }
  };

  const updateName = (id: string, name: string) => {
    setProducts((p) => p.map((pr) => (pr.id === id ? { ...pr, name } : pr)));
  };

  const toggleCampaign = (productId: string, campaignId: string) => {
    setProducts((prev) =>
      prev.map((pr) => {
        if (pr.id !== productId) return pr;
        const has = pr.campaigns.includes(campaignId);
        return {
          ...pr,
          campaigns: has
            ? pr.campaigns.filter((c) => c !== campaignId)
            : [...pr.campaigns, campaignId],
        };
      })
    );
  };

  // Campaigns already assigned to other products
  const assignedCampaigns = (currentProductId: string) => {
    const assigned = new Set<string>();
    products.forEach((p) => {
      if (p.id !== currentProductId) {
        p.campaigns.forEach((c) => assigned.add(c));
      }
    });
    return assigned;
  };

  const validProducts = products.filter((p) => p.name.trim().length > 0 && p.campaigns.length > 0);
  const canContinue = validProducts.length >= 1;

  const handleContinue = () => {
    const mapped = validProducts.map((p) => ({
      ...p,
      name: p.name.trim(),
    }));
    localStorage.setItem("gl_products", JSON.stringify(mapped));
    onContinue(mapped);
  };

  return (
    <div className="max-w-[720px] mx-auto px-6 py-10 dash-page-enter">
      <h2 className="text-[28px] font-bold tracking-[-0.03em] text-[hsl(var(--dash-text-primary))] mb-2">
        {lang === "pt" ? "Defina seus produtos" : "Define your products"}
      </h2>
      <p className="text-[14px] text-[hsl(var(--dash-text-tertiary))] mb-8">
        {lang === "pt"
          ? "Cada produto terá seu próprio funil e métricas. Associe as campanhas ou contas de anúncio de cada um."
          : "Each product will have its own funnel and metrics. Associate the campaigns or ad accounts for each one."}
      </p>

      {/* AI Tip */}
      <div className="flex items-start gap-3 bg-[hsl(var(--dash-blue-bg))] border border-[hsl(var(--dash-blue))]/20 rounded-lg px-4 py-3 mb-8">
        <Lightbulb className="w-4 h-4 text-[hsl(var(--dash-blue))] mt-0.5 shrink-0" />
        <p className="text-[13px] text-[hsl(var(--dash-blue))]">
          {lang === "pt"
            ? "Associe campanhas ao produto certo para que seus KPIs e funis reflitam a realidade de cada oferta. Você pode criar mais produtos depois."
            : "Associate campaigns to the right product so your KPIs and funnels reflect each offer's reality. You can add more products later."}
        </p>
      </div>

      {/* Products list */}
      <div className="flex flex-col gap-4 mb-6">
        {products.map((product, idx) => {
          const isExpanded = expandedProduct === product.id;
          const assigned = assignedCampaigns(product.id);
          const isValid = product.name.trim().length > 0 && product.campaigns.length > 0;

          return (
            <div
              key={product.id}
              className={`border rounded-xl overflow-hidden transition-colors ${
                isValid
                  ? "border-[hsl(var(--dash-green))]/40"
                  : "border-[hsl(var(--dash-border))]"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setExpandedProduct(isExpanded ? "" : product.id)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-[hsl(var(--dash-sidebar))] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Package className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-left">
                    <span className="text-[14px] font-semibold text-[hsl(var(--dash-text-primary))]">
                      {product.name || (lang === "pt" ? `Produto ${idx + 1}` : `Product ${idx + 1}`)}
                    </span>
                    {product.campaigns.length > 0 && (
                      <span className="ml-2 text-[11px] text-[hsl(var(--dash-green))] font-medium">
                        {product.campaigns.length} {lang === "pt" ? "campanhas" : "campaigns"}
                      </span>
                    )}
                  </div>
                  {isValid && (
                    <span className="text-[10px] font-semibold text-[hsl(var(--dash-green))] bg-[hsl(var(--dash-green-bg))] px-2 py-0.5 rounded-full">
                      ✓ {lang === "pt" ? "Configurado" : "Configured"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {products.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeProduct(product.id);
                      }}
                      className="text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-red))] transition-colors p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[hsl(var(--dash-text-tertiary))]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[hsl(var(--dash-text-tertiary))]" />
                  )}
                </div>
              </button>

              {/* Content */}
              {isExpanded && (
                <div className="px-5 pb-5 space-y-5">
                  {/* Product name */}
                  <div>
                    <label className="text-[12px] font-medium text-[hsl(var(--dash-text-tertiary))] mb-1.5 block">
                      {lang === "pt" ? "Nome do produto" : "Product name"}
                    </label>
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => updateName(product.id, e.target.value)}
                      placeholder={lang === "pt" ? "Ex: Curso de Marketing, SaaS Pro, Mentoria..." : "e.g., Marketing Course, SaaS Pro, Mentoring..."}
                      className="w-full h-10 px-3 rounded-lg border border-[hsl(var(--dash-border))] bg-transparent text-[13px] text-[hsl(var(--dash-text-primary))] placeholder:text-[hsl(var(--dash-text-tertiary))] focus:outline-none focus:border-primary transition-colors"
                      maxLength={80}
                    />
                  </div>

                  {/* Campaign assignment */}
                  <div>
                    <label className="text-[12px] font-medium text-[hsl(var(--dash-text-tertiary))] mb-3 block">
                      {lang === "pt"
                        ? "Selecione as campanhas deste produto"
                        : "Select campaigns for this product"}
                    </label>

                    {/* Group by platform */}
                    {["Meta Ads", "Google Ads"].map((platform) => {
                      const platCampaigns = campaigns.filter((c) => c.platform === platform);
                      if (platCampaigns.length === 0) return null;

                      return (
                        <div key={platform} className="mb-3">
                          <div className="text-[11px] font-semibold uppercase tracking-wider text-[hsl(var(--dash-text-tertiary))] mb-2">
                            {platform}
                          </div>
                          <div className="flex flex-col gap-1.5">
                            {platCampaigns.map((campaign) => {
                              const isSelected = product.campaigns.includes(campaign.id);
                              const isAssignedElsewhere = assigned.has(campaign.id);

                              return (
                                <button
                                  key={campaign.id}
                                  onClick={() => !isAssignedElsewhere && toggleCampaign(product.id, campaign.id)}
                                  disabled={isAssignedElsewhere}
                                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border text-left transition-all ${
                                    isSelected
                                      ? "border-primary bg-primary/5"
                                      : isAssignedElsewhere
                                      ? "border-[hsl(var(--dash-border))] opacity-35 cursor-not-allowed"
                                      : "border-[hsl(var(--dash-border))] hover:bg-[hsl(var(--dash-sidebar))] hover:border-[hsl(var(--dash-text-tertiary))]"
                                  }`}
                                >
                                  <div
                                    className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 transition-colors ${
                                      isSelected
                                        ? "bg-primary border-primary"
                                        : "border-[hsl(var(--dash-border))]"
                                    }`}
                                    style={{ width: 18, height: 18 }}
                                  >
                                    {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-[13px] font-medium text-[hsl(var(--dash-text-primary))] truncate">
                                      {campaign.name}
                                    </div>
                                  </div>
                                  <span className="text-[11px] text-[hsl(var(--dash-text-tertiary))] shrink-0">
                                    {campaign.spend}
                                  </span>
                                  {isAssignedElsewhere && (
                                    <span className="text-[10px] text-[hsl(var(--dash-text-tertiary))] shrink-0">
                                      {lang === "pt" ? "Já atribuída" : "Assigned"}
                                    </span>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add product button */}
      <button
        onClick={addProduct}
        className="flex items-center gap-2 text-[13px] font-medium text-[hsl(var(--dash-text-secondary))] border border-dashed border-[hsl(var(--dash-border))] rounded-xl px-5 py-3.5 w-full justify-center hover:bg-[hsl(var(--dash-sidebar))] hover:border-[hsl(var(--dash-text-tertiary))] transition-colors mb-8"
      >
        <Plus className="w-4 h-4" />
        {lang === "pt" ? "Adicionar outro produto" : "Add another product"}
      </button>

      {/* Unassigned campaigns notice */}
      {(() => {
        const allAssigned = new Set<string>();
        products.forEach((p) => p.campaigns.forEach((c) => allAssigned.add(c)));
        const unassigned = campaigns.filter((c) => !allAssigned.has(c.id));
        if (unassigned.length === 0) return null;
        return (
          <div className="text-[12px] text-[hsl(var(--dash-amber))] bg-[hsl(var(--dash-amber-bg))] rounded-lg px-4 py-2.5 mb-6">
            {lang === "pt"
              ? `${unassigned.length} campanha(s) ainda não atribuída(s). Campanhas sem produto serão ignoradas no dashboard.`
              : `${unassigned.length} campaign(s) not yet assigned. Unassigned campaigns will be excluded from dashboards.`}
          </div>
        );
      })()}

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[hsl(var(--dash-border))]">
        <button
          onClick={onBack}
          className="text-[13px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))]"
        >
          {lang === "pt" ? "← Voltar" : "← Back"}
        </button>
        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="h-[44px] px-6 bg-primary text-primary-foreground rounded-lg text-[14px] font-semibold hover:opacity-90 transition-opacity disabled:opacity-40"
        >
          {lang === "pt" ? "Continuar →" : "Continue →"}
        </button>
      </div>
    </div>
  );
};

export default OnboardingProducts;
