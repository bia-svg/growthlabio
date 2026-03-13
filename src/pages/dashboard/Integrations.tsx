import { useState } from "react";
import { useNavigate } from "react-router-dom";

const adPlatforms = [
  { name: "Meta Ads", desc: "Facebook & Instagram · act_123456", connected: true, lastSync: "3 min ago" },
  { name: "Google Ads", desc: "Search, Display & YouTube", connected: false, comingSoon: true },
  { name: "TikTok Ads", desc: "TikTok for Business", connected: false, comingSoon: true },
];

const revenueSources = [
  { name: "Shopify", desc: "velaris.myshopify.com", connected: true, lastSync: "8 min ago" },
  { name: "HubSpot", desc: "CRM contacts & deals", connected: false },
  { name: "Sympla", desc: "Event tickets", connected: false },
  { name: "WooCommerce", desc: "WordPress store", connected: false, comingSoon: true },
];

const contextFiles = [
  { name: "velaris_brand_guide.pdf", type: "Brand", date: "Mar 1" },
  { name: "annual-plan-landing.growthlab.app.br", type: "URL", date: "Mar 5" },
  { name: "audience_brief_q1.docx", type: "Brief", date: "Mar 8" },
];

const Integrations = () => {
  const navigate = useNavigate();
  const [disconnecting, setDisconnecting] = useState<string | null>(null);
  const [metaSyncFreq, setMetaSyncFreq] = useState("Every 6h");
  const [shopifySyncFreq, setShopifySyncFreq] = useState("Every 2h");

  const handleDisconnect = (name: string) => {
    setDisconnecting(name);
  };

  return (
    <div className="p-10 dash-page-enter">
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Integrations</h1>
      <p className="text-[14px] text-dash-text-secondary mb-8">Connected data sources · 2 active</p>

      {/* Ad Platforms */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Ad Platforms</div>
        <div className="border border-dash-border rounded-lg overflow-hidden">
          {adPlatforms.map((p, i) => (
            <div key={p.name}>
              <div className={`px-5 py-4 flex items-center justify-between ${i < adPlatforms.length - 1 ? "border-b border-dash-border" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-dash-text-primary rounded-md flex items-center justify-center text-white text-[11px] font-bold">{p.name[0]}</div>
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
                      <button onClick={() => handleDisconnect(p.name)} className="text-[12px] text-dash-red hover:underline">Disconnect</button>
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
                  <button onClick={() => setDisconnecting(null)} className="text-dash-text-tertiary hover:text-dash-text-secondary">Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Revenue Sources */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Revenue Sources</div>
        <div className="border border-dash-border rounded-lg overflow-hidden">
          {revenueSources.map((s, i) => (
            <div key={s.name}>
              <div className={`px-5 py-4 flex items-center justify-between ${i < revenueSources.length - 1 ? "border-b border-dash-border" : ""}`}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-dash-sidebar border border-dash-border rounded-md flex items-center justify-center text-[11px] font-bold text-dash-text-secondary">{s.name[0]}</div>
                  <div>
                    <div className="text-[14px] font-medium text-dash-text-primary">{s.name}</div>
                    <div className="text-[12px] text-dash-text-tertiary">{s.desc}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {s.connected ? (
                    <>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-dash-green-bg text-dash-green">✓ Connected</span>
                      <span className="text-[11px] text-dash-text-tertiary">{s.lastSync}</span>
                      <button className="text-[12px] text-dash-text-secondary hover:text-dash-text-primary">Reconnect</button>
                      <button onClick={() => handleDisconnect(s.name)} className="text-[12px] text-dash-red hover:underline">Disconnect</button>
                    </>
                  ) : s.comingSoon ? (
                    <span className="text-[12px] text-dash-text-tertiary">Coming soon</span>
                  ) : (
                    <button className="text-[13px] font-medium bg-dash-text-primary text-white px-4 py-1.5 rounded-md">Connect</button>
                  )}
                </div>
              </div>
              {disconnecting === s.name && (
                <div className="px-5 py-3 bg-dash-sidebar border-b border-dash-border flex items-center gap-3 text-[13px]">
                  <span className="text-dash-text-secondary">Disconnect {s.name}? Historical data will be preserved.</span>
                  <button className="text-dash-red font-medium hover:underline">Confirm</button>
                  <button onClick={() => setDisconnecting(null)} className="text-dash-text-tertiary hover:text-dash-text-secondary">Cancel</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Funnel Configuration */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Funnel Configuration</div>
        <div className="border border-dash-border rounded-lg px-5 py-4 flex items-center justify-between">
          <div className="text-[13px] text-dash-text-secondary">
            Traffic: <span className="text-dash-text-primary font-medium">Meta Ads</span> · Page: <span className="text-dash-text-primary font-medium">Meta Pixel</span> · Leads: <span className="text-dash-text-primary font-medium">Meta Pixel</span> · Sales: <span className="text-dash-text-primary font-medium">Shopify</span> · Sync: <span className="text-dash-text-primary font-medium">Every 2h</span>
          </div>
          <button onClick={() => navigate("/funnel-wizard")} className="text-[12px] text-dash-blue hover:underline">Edit funnel config →</button>
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
