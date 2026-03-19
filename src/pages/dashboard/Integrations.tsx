import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Data mirrors /integrations (onboarding) exactly ─── */

const adPlatforms = [
  { name: "Google Ads", desc: "Search, Display & YouTube", icon: "G", connected: false, comingSoon: false },
  { name: "Meta Ads", desc: "Facebook & Instagram · act_123456", icon: "M", connected: true, lastSync: "3 min ago", comingSoon: false },
  { name: "TikTok Ads", desc: "TikTok for Business", icon: "T", connected: false, comingSoon: true },
  { name: "LinkedIn Ads", desc: "LinkedIn Campaign Manager", icon: "in", connected: false, comingSoon: true },
];

const siteTracking = [
  { name: "Google Analytics", desc: "GA4 property tracking", icon: "GA", connected: true, lastSync: "5 min ago", comingSoon: false },
  { name: "Google Tag Manager", desc: "Container GTM-XXXXXX", icon: "GT", connected: false, comingSoon: false },
  { name: "Meta Pixel", desc: "Facebook Pixel events", icon: "Px", connected: true, lastSync: "5 min ago", comingSoon: false },
  { name: "Site script", desc: "Custom tracking script", icon: "S", connected: false, comingSoon: false },
  { name: "Hotmart", desc: "Checkout tracking", icon: "H", connected: false, comingSoon: false },
  { name: "Shopify", desc: "Storefront tracking", icon: "Sh", connected: false, comingSoon: false },
  { name: "Cartpanda", desc: "Cart tracking", icon: "Cp", connected: false, comingSoon: true },
];

const leadSources = [
  { name: "HubSpot", desc: "CRM contacts & forms", icon: "Hs", connected: false, comingSoon: false },
  { name: "RD Station", desc: "Marketing automation", icon: "RD", connected: false, comingSoon: false },
  { name: "Pipedrive", desc: "Sales pipeline", icon: "Pd", connected: false, comingSoon: false },
  { name: "Google Sheets", desc: "Spreadsheet import", icon: "Gs", connected: false, comingSoon: false },
  { name: "Built-in form", desc: "GrowthLab capture form", icon: "F", connected: false, comingSoon: false },
  { name: "Webhook", desc: "Custom webhook endpoint", icon: "Wh", connected: false, comingSoon: false },
];

const revenueSources = [
  { name: "Stripe", desc: "Payment processing", icon: "St", connected: false, comingSoon: false },
  { name: "Shopify", desc: "velaris.myshopify.com", icon: "Sh", connected: true, lastSync: "8 min ago", comingSoon: false },
  { name: "HubSpot", desc: "CRM deals & revenue", icon: "Hs", connected: false, comingSoon: false },
  { name: "Mercado Pago", desc: "Payments & checkout", icon: "MP", connected: false, comingSoon: false },
  { name: "Hotmart", desc: "Digital products", icon: "H", connected: false, comingSoon: false },
  { name: "Pagar.me", desc: "Payment gateway", icon: "Pg", connected: false, comingSoon: false },
  { name: "Pipedrive", desc: "Won deals", icon: "Pd", connected: false, comingSoon: false },
  { name: "Bling", desc: "ERP orders", icon: "Bl", connected: false, comingSoon: true },
  { name: "Google Sheets", desc: "Spreadsheet import", icon: "Gs", connected: false, comingSoon: false },
  { name: "Webhook", desc: "Custom webhook endpoint", icon: "Wh", connected: false, comingSoon: false },
];

const contextFiles = [
  { name: "velaris_brand_guide.pdf", type: "Brand", date: "Mar 1" },
  { name: "annual-plan-landing.growthlab.app.br", type: "URL", date: "Mar 5" },
  { name: "audience_brief_q1.docx", type: "Brief", date: "Mar 8" },
];

type Platform = { name: string; desc: string; icon: string; connected: boolean; lastSync?: string; comingSoon: boolean };

/* ─── Reusable section row ─── */
const PlatformRow = ({
  p,
  isLast,
  disconnecting,
  onDisconnect,
  onCancelDisconnect,
}: {
  p: Platform;
  isLast: boolean;
  disconnecting: string | null;
  onDisconnect: (name: string) => void;
  onCancelDisconnect: () => void;
}) => (
  <div>
    <div className={`px-5 py-4 flex items-center justify-between ${!isLast ? "border-b border-dash-border" : ""}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-dash-sidebar border border-dash-border rounded-md flex items-center justify-center text-[11px] font-bold text-dash-text-secondary">
          {p.icon}
        </div>
        <div>
          <div className="text-[14px] font-medium text-dash-text-primary">{p.name}</div>
          <div className="text-[12px] text-dash-text-tertiary">{p.desc}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {p.connected ? (
          <>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-dash-green-bg text-dash-green">✓ Connected</span>
            <span className="text-[11px] text-dash-text-tertiary">{p.lastSync}</span>
            <button className="text-[12px] text-dash-text-secondary hover:text-dash-text-primary">Reconnect</button>
            <button onClick={() => onDisconnect(p.name)} className="text-[12px] text-dash-red hover:underline">Disconnect</button>
          </>
        ) : p.comingSoon ? (
          <>
            <span className="text-[12px] text-dash-text-tertiary">Coming soon</span>
            <button className="text-[12px] text-dash-blue hover:underline">Notify me</button>
          </>
        ) : (
          <button className="text-[13px] font-medium bg-dash-text-primary text-white px-4 py-1.5 rounded-md">Connect</button>
        )}
      </div>
    </div>
    {disconnecting === p.name && (
      <div className="px-5 py-3 bg-dash-sidebar border-b border-dash-border flex items-center gap-3 text-[13px]">
        <span className="text-dash-text-secondary">Disconnect {p.name}? Historical data will be preserved.</span>
        <button className="text-dash-red font-medium hover:underline">Confirm</button>
        <button onClick={onCancelDisconnect} className="text-dash-text-tertiary hover:text-dash-text-secondary">Cancel</button>
      </div>
    )}
  </div>
);

/* ─── Section wrapper ─── */
const Section = ({
  title,
  platforms,
  disconnecting,
  onDisconnect,
  onCancelDisconnect,
}: {
  title: string;
  platforms: Platform[];
  disconnecting: string | null;
  onDisconnect: (name: string) => void;
  onCancelDisconnect: () => void;
}) => (
  <div className="mb-8">
    <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">{title}</div>
    <div className="border border-dash-border rounded-lg overflow-hidden">
      {platforms.map((p, i) => (
        <PlatformRow
          key={p.name + p.icon}
          p={p}
          isLast={i === platforms.length - 1}
          disconnecting={disconnecting}
          onDisconnect={onDisconnect}
          onCancelDisconnect={onCancelDisconnect}
        />
      ))}
    </div>
  </div>
);

const Integrations = () => {
  const navigate = useNavigate();
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [metaSyncFreq, setMetaSyncFreq] = useState("Every 6h");
  const [shopifySyncFreq, setShopifySyncFreq] = useState("Every 2h");

  const activeCount = [...adPlatforms, ...siteTracking, ...leadSources, ...revenueSources].filter((p) => p.connected).length;

  return (
    <div className="p-10 dash-page-enter">
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Integrations</h1>
      <p className="text-[14px] text-dash-text-secondary mb-8">Connected data sources · {activeCount} active</p>

      <Section title="Ad Platforms" platforms={adPlatforms} disconnecting={disconnecting} onDisconnect={setDisconnecting} onCancelDisconnect={() => setDisconnecting(null)} />
      <Section title="Site / Tracking" platforms={siteTracking} disconnecting={disconnecting} onDisconnect={setDisconnecting} onCancelDisconnect={() => setDisconnecting(null)} />
      <Section title="Leads" platforms={leadSources} disconnecting={disconnecting} onDisconnect={setDisconnecting} onCancelDisconnect={() => setDisconnecting(null)} />
      <Section title="Revenue" platforms={revenueSources} disconnecting={disconnecting} onDisconnect={setDisconnecting} onCancelDisconnect={() => setDisconnecting(null)} />

      {/* Funnel Configuration */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Funnel Configuration</div>
        <div className="border border-dash-border rounded-lg px-5 py-4 flex items-center justify-between">
          <div className="text-[13px] text-dash-text-secondary">
            Traffic: <span className="text-dash-text-primary font-medium">Meta Ads</span> · Page: <span className="text-dash-text-primary font-medium">Meta Pixel</span> · Leads: <span className="text-dash-text-primary font-medium">Meta Pixel</span> · Sales: <span className="text-dash-text-primary font-medium">Shopify</span> · Sync: <span className="text-dash-text-primary font-medium">Every 2h</span>
          </div>
          <button onClick={() => navigate("/integrations")} className="text-[12px] text-dash-blue hover:underline">Edit funnel config →</button>
        </div>
      </div>

      {/* Manual Uploads */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Manual Uploads</div>
        <div className="border-2 border-dashed border-dash-border rounded-lg px-6 py-6 text-center hover:bg-dash-sidebar transition-colors cursor-pointer mb-3">
          <p className="text-[13px] text-dash-text-tertiary">Drop CSV or XLSX files here, or <span className="text-dash-blue underline">browse</span></p>
        </div>
        <div className="border border-dash-border rounded-lg overflow-hidden">
          <div className="px-5 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-dash-text-primary font-medium">velaris_leads_feb.csv</span>
              <span className="text-[11px] text-dash-text-tertiary">Leads · Feb 28 · 1,204 rows</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dash-green-bg text-dash-green">Active</span>
            </div>
            <div className="flex gap-3">
              <button className="text-[12px] text-dash-blue hover:underline">View</button>
              <button className="text-[12px] text-dash-red hover:underline">Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Context Library */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-1">AI Context Library</div>
        <p className="text-[12px] text-dash-text-tertiary mb-3">Files and URLs the AI Agent uses to personalize insights.</p>
        <div className="border border-dash-border rounded-lg overflow-hidden">
          {contextFiles.map((f, i) => (
            <div key={f.name} className={`px-5 py-3 flex items-center justify-between ${i < contextFiles.length - 1 ? "border-b border-dash-border" : ""}`}>
              <div className="flex items-center gap-3">
                <span className="text-[13px]">📄</span>
                <span className="text-[13px] text-dash-text-primary">{f.name}</span>
                <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-dash-sidebar border border-dash-border text-dash-text-secondary">{f.type}</span>
                <span className="text-[11px] text-dash-text-tertiary">{f.date}</span>
              </div>
              <button className="text-[12px] text-dash-text-tertiary hover:text-dash-red">✕</button>
            </div>
          ))}
        </div>
        <button className="mt-2 text-[12px] text-dash-blue hover:underline">+ Add file or URL</button>
      </div>

      {/* Sync Settings */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Sync Settings</div>
        <div className="border border-dash-border rounded-lg overflow-hidden">
          <div className="px-5 py-3 flex items-center justify-between border-b border-dash-border">
            <span className="text-[13px] text-dash-text-primary font-medium">Meta Ads</span>
            <select
              value={metaSyncFreq}
              onChange={(e) => setMetaSyncFreq(e.target.value)}
              className="text-[13px] text-dash-text-secondary bg-transparent border border-dash-border rounded-md px-2 py-1 outline-none"
            >
              <option>Every 15 min</option>
              <option>Every hour</option>
              <option>Every 2h</option>
              <option>Every 6h</option>
            </select>
          </div>
          <div className="px-5 py-3 flex items-center justify-between">
            <span className="text-[13px] text-dash-text-primary font-medium">Shopify</span>
            <select
              value={shopifySyncFreq}
              onChange={(e) => setShopifySyncFreq(e.target.value)}
              className="text-[13px] text-dash-text-secondary bg-transparent border border-dash-border rounded-md px-2 py-1 outline-none"
            >
              <option>Every 15 min</option>
              <option>Every hour</option>
              <option>Every 2h</option>
              <option>Every 6h</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
