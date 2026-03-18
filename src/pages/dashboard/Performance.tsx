import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Info } from "lucide-react";

/* ─── Demo product (trial / no integration) ─── */
const demoProduct = { id: "ficticio", label: "Fictício" };

/* ─── Metric definitions with demo data ─── */
const metricDefs: Record<string, { label: string; value: string; color?: "green" | "amber"; note: string; noteColor?: "green" | "amber" }> = {
  roas:            { label: "Total ROAS",   value: "3.8×",   color: "green", note: "↑ target: 3.0×",  noteColor: "green" },
  monthly_roas:    { label: "Monthly ROAS", value: "1.5×",   note: "10× installments" },
  cpl:             { label: "CPL",          value: "R$72",   note: "↓ -9% vs prior", noteColor: "green" },
  cac:             { label: "CAC",          value: "R$345",  note: "↓ -5% vs prior",  noteColor: "green" },
  cpa:             { label: "CPA",          value: "R$185",  note: "target: R$200",   noteColor: "green" },
  ctr:             { label: "CTR",          value: "2.1%",   note: "↑ +0.2% vs prior", noteColor: "green" },
  frequency:       { label: "Frequency",    value: "3.9",    color: "amber", note: "↑ above 3.5",     noteColor: "amber" },
  conversion_rate: { label: "Conv. Rate",   value: "4.6%",   note: "↑ +0.5% WoW",    noteColor: "green" },
  aov:             { label: "AOV",          value: "R$2,890", note: "stable" },
  ltv:             { label: "LTV",          value: "R$9,800", note: "↑ +4% vs prior", noteColor: "green" },
};

/* ─── Funnel stage demo data ─── */
const funnelMockData: Record<string, { value: string; pct: string; width: string; highlight?: boolean }> = {
  "Ad Spend":         { value: "R$14.2k", pct: "",      width: "100%" },
  "Impressions":      { value: "210k",    pct: "",      width: "100%" },
  "Clicks":           { value: "4.4k",    pct: "2.1%",  width: "62%" },
  "Visitors":         { value: "2.8k",    pct: "63.6%", width: "48%" },
  "Sessions":         { value: "3.9k",    pct: "88.6%", width: "52%" },
  "Leads":            { value: "356",      pct: "12.7%", width: "30%", highlight: true },
  "Opportunities":    { value: "142",      pct: "39.9%", width: "18%", highlight: true },
  "Meetings":         { value: "68",       pct: "19.1%", width: "14%", highlight: true },
  "Checkout started": { value: "118",      pct: "4.2%",  width: "20%" },
  "Purchases":        { value: "18",       pct: "15.3%", width: "6%" },
  "Revenue":          { value: "R$52.0k",  pct: "",      width: "45%" },
  "LTV":              { value: "R$9.8k",   pct: "",      width: "35%" },
  "CAC":              { value: "R$345",     pct: "",      width: "25%" },
  "ROAS":             { value: "3.8×",      pct: "",      width: "40%" },
};

const demoTopAds = [
  { name: "Lookalike — Depoimento v2", spend: "R$1,500", roas: "5.8×", ctr: "3.8%", freq: "1.7" },
  { name: "Remarketing — Oferta Relâmpago", spend: "R$1,100", roas: "5.4×", ctr: "4.5%", freq: "1.8" },
  { name: "Interesse — Benefício Direto", spend: "R$900", roas: "5.1×", ctr: "3.6%", freq: "1.9" },
  { name: "Lookalike — Prova Social", spend: "R$1,200", roas: "4.9×", ctr: "3.1%", freq: "2.1" },
  { name: "Remarketing — Case de Sucesso", spend: "R$680", roas: "4.7×", ctr: "3.3%", freq: "2.0" },
];

const demoBottomAds = [
  { name: "Fictício v2 — CTA Genérico", spend: "R$1,800", cpa: "R$380", ctr: "0.9%", freq: "4.8" },
  { name: "Fictício v2 — Copy Longa", spend: "R$1,500", cpa: "R$340", ctr: "1.0%", freq: "4.5" },
  { name: "Interesse — Criativo Antigo", spend: "R$1,100", cpa: "R$260", ctr: "1.2%", freq: "3.7" },
  { name: "Broad — Awareness v1", spend: "R$750", cpa: "R$290", ctr: "1.1%", freq: "3.4" },
  { name: "Retargeting — Oferta Expirada", spend: "R$550", cpa: "R$310", ctr: "1.3%", freq: "3.1" },
];

const defaultFunnel = ["Ad Spend", "Impressions", "Clicks", "Leads", "Purchases", "Revenue"];
const defaultMetrics = ["roas", "cpl", "frequency"];

const Performance = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith("pt") ? "pt" : "en";
  const [showTimeSeries, setShowTimeSeries] = useState(false);
  const [timeSeriesView, setTimeSeriesView] = useState<"daily" | "weekly">("daily");

  // Read user's choices from localStorage
  const userFunnel = useMemo(() => {
    try {
      const stored = localStorage.getItem("gl_funnel");
      if (stored) return JSON.parse(stored) as string[];
    } catch { /* ignore */ }
    return defaultFunnel;
  }, []);

  const userMetrics = useMemo(() => {
    try {
      const stored = localStorage.getItem("gl_top_metrics");
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        if (parsed.length === 3) return parsed;
      }
    } catch { /* ignore */ }
    return defaultMetrics;
  }, []);

  // Build KPI data from user's 3 chosen metrics
  const kpis = userMetrics.map((id) => metricDefs[id] || { label: id.toUpperCase(), value: "—", note: "" });

  return (
    <div className="p-10 dash-page-enter">
      {/* Demo banner */}
      <div className="flex items-start gap-3 bg-[hsl(var(--dash-blue-bg))] border border-[hsl(var(--dash-blue))]/20 rounded-lg px-4 py-3 mb-6">
        <Info className="w-4 h-4 text-[hsl(var(--dash-blue))] mt-0.5 shrink-0" />
        <div>
          <p className="text-[13px] font-medium text-[hsl(var(--dash-blue))]">
            {lang === "pt" ? "Dados de exemplo" : "Sample data"}
          </p>
          <p className="text-[12px] text-[hsl(var(--dash-blue))]/80">
            {lang === "pt"
              ? "Você está vendo o produto \"Fictício\" com dados ilustrativos. Conecte suas integrações para ver seus dados reais."
              : "You're viewing the \"Fictício\" product with illustrative data. Connect your integrations to see your real data."}
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="mb-1 text-[12px] text-[hsl(var(--dash-text-tertiary))]">{t("dashboard.performance.synced", { time: "3 min" })}</div>
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-[hsl(var(--dash-text-primary))] mb-1">{t("dashboard.performance.title")}</h1>
      <p className="text-[14px] text-[hsl(var(--dash-text-secondary))] mb-6">{t("dashboard.performance.subtitle")}</p>

      {/* Product selector — single demo product */}
      <div className="flex items-center gap-1.5 mb-8">
        <button
          className="flex items-center gap-1.5 text-[13px] font-medium px-3 py-1.5 rounded-md border transition-colors bg-[hsl(var(--dash-text-primary))] text-white border-[hsl(var(--dash-text-primary))]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          {demoProduct.label}
          <span className="ml-1 text-[10px] opacity-70 uppercase tracking-wider">{lang === "pt" ? "exemplo" : "demo"}</span>
        </button>
        <button
          onClick={(e) => e.preventDefault()}
          className="text-[13px] text-[hsl(var(--dash-text-tertiary))] hover:text-[hsl(var(--dash-text-secondary))] px-3 py-1.5 border border-dashed border-[hsl(var(--dash-border))] rounded-md transition-colors"
        >
          {t("dashboard.performance.addProduct")}
        </button>
      </div>

      {/* KPI Row — from user's top 3 metrics */}
      <div className="grid grid-cols-3 border border-[hsl(var(--dash-border))] rounded-lg overflow-hidden mb-8">
        {kpis.map((kpi, i) => (
          <KPI
            key={i}
            label={kpi.label}
            value={kpi.value}
            color={kpi.color}
            note={kpi.note}
            noteColor={kpi.noteColor}
            last={i === kpis.length - 1}
          />
        ))}
      </div>

      {/* 2-col grid */}
      <div className="grid grid-cols-[1fr_320px] gap-6 mb-8">
        {/* Funnel — from user's funnel stages */}
        <div className="border border-[hsl(var(--dash-border))] rounded-lg p-5">
          <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-4">{t("dashboard.performance.conversionFunnel")}</div>
          <div className="flex flex-col gap-2.5">
            {userFunnel.map((stage) => {
              const data = funnelMockData[stage] || { value: "—", pct: "", width: "20%" };
              return (
                <FunnelRow
                  key={stage}
                  label={stage}
                  value={data.value}
                  pct={data.pct}
                  width={data.width}
                  highlight={data.highlight}
                />
              );
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Spend chart */}
          <div className="border border-[hsl(var(--dash-border))] rounded-lg p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-3">{t("dashboard.performance.spendLast14")}</div>
            <div className="flex items-end gap-[3px] h-[60px]">
              {[65,72,80,58,45,30,35,68,82,90,75,60,25,28].map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm ${i === 5 || i === 6 || i === 12 || i === 13 ? "bg-[hsl(var(--dash-border))]" : "bg-[hsl(var(--dash-text-primary))]"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Callouts */}
          <div className="bg-[hsl(var(--dash-green-bg))] border border-[hsl(155,40%,85%)] rounded-lg p-3.5 text-[13px] text-[hsl(var(--dash-green))] leading-relaxed">
            {lang === "pt"
              ? "✦ Lookalike 1% com 5.8× ROAS — melhor conjunto de anúncios deste período."
              : "✦ Lookalike 1% at 5.8× ROAS — best performing ad set this period."}
          </div>
          <div className="bg-[hsl(var(--dash-amber-bg))] border border-[hsl(36,60%,85%)] rounded-lg p-3.5 text-[13px] text-[hsl(var(--dash-amber))] leading-relaxed">
            {lang === "pt"
              ? "⚠ 'Fictício v2' com frequência em 4.8 há 5 dias. Audiência saturada."
              : "⚠ 'Fictício v2' frequency at 4.8 for 5 days. Audience saturated."}
          </div>
        </div>
      </div>

      {/* Campaigns table */}
      <div className="border border-[hsl(var(--dash-border))] rounded-lg overflow-hidden mb-8">
        <div className="px-5 py-3 border-b border-[hsl(var(--dash-border))]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))]">{t("dashboard.performance.activeCampaigns")}</span>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[hsl(var(--dash-border))]">
              {[t("dashboard.performance.campaign"), "Spend", t("dashboard.performance.roas"), "CPL", t("dashboard.performance.freq"), t("dashboard.performance.ctr"), t("dashboard.performance.status")].map(h => (
                <th key={h} className="px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.05em] text-[hsl(var(--dash-text-tertiary))]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            <CampaignRow name="Lookalike 1% Clientes" spend="R$3,600" roas="4.8×" roasColor="green" cpl="R$62" freq="1.9" ctr="3.2%" status="Healthy" statusColor="green" />
            <CampaignRow name="Interesse — Educação BR" spend="R$5,200" roas="3.6×" cpl="R$78" freq="2.5" ctr="2.3%" status="Good" statusColor="lime" />
            <CampaignRow name="Fictício v2" spend="R$3,800" roas="2.9×" roasColor="amber" cpl="R$105" freq="4.8" freqBold ctr="1.1%" status="Saturated" statusColor="amber" />
            <CampaignRow name="Remarketing 30d" spend="R$1,600" roas="5.6×" roasColor="green" cpl="R$45" freq="1.7" ctr="4.5%" status="Healthy" statusColor="green" last />
          </tbody>
        </table>
      </div>

      {/* Top / Bottom Ads */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-3">{t("dashboard.performance.top5ROAS")}</div>
          <div className="flex flex-col gap-2">
            {demoTopAds.map(ad => (
              <div key={ad.name} className="border border-[hsl(var(--dash-border))] rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 bg-[hsl(var(--dash-active))] rounded-md flex items-center justify-center text-[11px] text-[hsl(var(--dash-text-tertiary))] shrink-0">AD</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[hsl(var(--dash-text-primary))] truncate">{ad.name}</div>
                  <div className="text-[11px] text-[hsl(var(--dash-text-tertiary))]">{ad.spend} · ROAS {ad.roas} · CTR {ad.ctr} · Freq {ad.freq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-3">{t("dashboard.performance.bottom5CPA")}</div>
          <div className="flex flex-col gap-2">
            {demoBottomAds.map(ad => (
              <div key={ad.name} className="border border-[hsl(var(--dash-border))] rounded-lg p-3.5 flex items-center gap-3">
                <div className="w-10 h-10 bg-[hsl(var(--dash-red-bg))] rounded-md flex items-center justify-center text-[11px] text-[hsl(var(--dash-red))] shrink-0">AD</div>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium text-[hsl(var(--dash-text-primary))] truncate">{ad.name}</div>
                  <div className="text-[11px] text-[hsl(var(--dash-text-tertiary))]">{ad.spend} · CPA {ad.cpa} · CTR {ad.ctr} · Freq {ad.freq}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projected Payback */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-3">{t("dashboard.performance.projectedPayback")}</div>
        <div className="grid grid-cols-3 border border-[hsl(var(--dash-border))] rounded-lg overflow-hidden">
          <div className="p-5 border-r border-[hsl(var(--dash-border))]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[hsl(var(--dash-text-tertiary))] mb-1">{t("dashboard.performance.confirmedRevenue")}</div>
            <div className="text-[26px] font-bold tracking-[-0.04em] text-[hsl(var(--dash-text-primary))]">R$52,020</div>
          </div>
          <div className="p-5 border-r border-[hsl(var(--dash-border))]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[hsl(var(--dash-text-tertiary))] mb-1">{t("dashboard.performance.totalProjection")}</div>
            <div className="text-[26px] font-bold tracking-[-0.04em] text-[hsl(var(--dash-green))]">R$88,500</div>
            <div className="text-[12px] text-[hsl(var(--dash-green))] mt-0.5">+R$3,500 {lang === "pt" ? "acima da meta" : "above target"}</div>
          </div>
          <div className="p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[hsl(var(--dash-text-tertiary))] mb-1">{t("dashboard.performance.monthlyTarget")}</div>
            <div className="text-[26px] font-bold tracking-[-0.04em] text-[hsl(var(--dash-text-primary))]">R$85,000</div>
          </div>
        </div>
      </div>

      {/* Goal Tracker */}
      <div className="mb-8">
        <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-3">{t("dashboard.performance.goalTracker")}</div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 border border-[hsl(var(--dash-border))] rounded-lg px-4 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--dash-green))]" />
            <span className="text-[13px] font-medium text-[hsl(var(--dash-text-primary))]">ROAS 3.8×</span>
            <span className="text-[11px] text-[hsl(var(--dash-green))] font-medium">{t("dashboard.performance.onTrack")}</span>
          </div>
          <div className="flex items-center gap-2 border border-[hsl(var(--dash-border))] rounded-lg px-4 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--dash-amber))]" />
            <span className="text-[13px] font-medium text-[hsl(var(--dash-text-primary))]">CPL R$72</span>
            <span className="text-[11px] text-[hsl(var(--dash-amber))] font-medium">{t("dashboard.performance.atRisk")}</span>
          </div>
          <div className="flex items-center gap-2 border border-[hsl(var(--dash-border))] rounded-lg px-4 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[hsl(var(--dash-red))]" />
            <span className="text-[13px] font-medium text-[hsl(var(--dash-text-primary))]">Frequency 3.9</span>
            <span className="text-[11px] text-[hsl(var(--dash-red))] font-medium">{t("dashboard.performance.offTrack")}</span>
          </div>
        </div>
      </div>

      {/* Time Series (collapsible) */}
      <div className="mb-8">
        <button
          onClick={() => setShowTimeSeries(!showTimeSeries)}
          className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.07em] text-[hsl(var(--dash-text-tertiary))] mb-3 hover:text-[hsl(var(--dash-text-secondary))] transition-colors"
        >
          <span className={`transition-transform ${showTimeSeries ? "rotate-90" : ""}`}>▶</span>
          {t("dashboard.performance.spendVsRevenue")}
        </button>
        {showTimeSeries && (
          <div className="border border-[hsl(var(--dash-border))] rounded-lg p-5">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTimeSeriesView("daily")}
                className={`text-[11px] font-medium px-2.5 py-1 rounded ${timeSeriesView === "daily" ? "bg-[hsl(var(--dash-text-primary))] text-white" : "text-[hsl(var(--dash-text-tertiary))] border border-[hsl(var(--dash-border))]"}`}
              >
                {t("dashboard.performance.daily")}
              </button>
              <button
                onClick={() => setTimeSeriesView("weekly")}
                className={`text-[11px] font-medium px-2.5 py-1 rounded ${timeSeriesView === "weekly" ? "bg-[hsl(var(--dash-text-primary))] text-white" : "text-[hsl(var(--dash-text-tertiary))] border border-[hsl(var(--dash-border))]"}`}
              >
                {t("dashboard.performance.weekly")}
              </button>
            </div>
            <div className="h-[160px] flex items-end gap-1 relative">
              {(timeSeriesView === "daily"
                ? [40,45,55,48,42,20,22,50,60,65,55,48,18,20,52,58,62,50,45,22,25,55,65,70,60,52,20,22]
                : [45,50,60,55]
              ).map((h, i) => (
                <div key={`spend-${i}`} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full bg-[hsl(var(--dash-text-primary))] rounded-sm" style={{ height: `${h * 1.6}px` }} />
                  <div className="w-full bg-[hsl(var(--dash-green))] rounded-sm opacity-60" style={{ height: `${h * 2.2}px` }} />
                </div>
              ))}
            </div>
            <div className="flex gap-4 mt-3 text-[11px] text-[hsl(var(--dash-text-tertiary))]">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 bg-[hsl(var(--dash-text-primary))] rounded-sm" /> {t("dashboard.performance.spend")}</div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-1.5 bg-[hsl(var(--dash-green))] rounded-sm opacity-60" /> {t("dashboard.performance.revenue")}</div>
            </div>
          </div>
        )}
      </div>

      {/* AI Weekly Brief */}
      <div className="bg-[hsl(var(--dash-lime-bg))] border-l-[3px] border-[hsl(var(--dash-lime))] rounded-lg p-5">
        <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-[hsl(var(--dash-lime))] mb-3">{t("dashboard.performance.weeklyBrief")}</div>
        <div className="text-[13.5px] text-[hsl(var(--dash-text-primary))] leading-relaxed space-y-2">
          {lang === "pt" ? (
            <>
              <p><strong>{t("dashboard.performance.whatWorked")}</strong> Lookalike 1% manteve 5.8× ROAS com baixa frequência (1.7). Remarketing 30d entregou o melhor CPL a R$45.</p>
              <p><strong>{t("dashboard.performance.whatUnderperformed")}</strong> Fictício v2 atingiu teto de frequência (4.8) com CTR caindo 28% WoW. Fadiga criativa confirmada.</p>
              <p><strong>{t("dashboard.performance.winningAngle")}</strong> Prova social com resultados numéricos (ex: "3.8× mais retorno") superou CTAs genéricos em 2.1×.</p>
              <div className="mt-3 pt-3 border-t border-[hsl(80,40%,80%)]">
                <div className="text-[12px] font-semibold text-[hsl(var(--dash-text-primary))] mb-1.5">{t("dashboard.performance.nextWeek")}</div>
                <ol className="list-decimal list-inside text-[12.5px] text-[hsl(var(--dash-text-secondary))] space-y-0.5">
                  <li>Pausar Fictício v2 e realocar R$280/dia para Lookalike 1%</li>
                  <li>Lançar 2 criativos novos para Interesse Educação BR (formato vídeo depoimento)</li>
                  <li>Testar expansão de audiência no Remarketing com janela de 60 dias</li>
                </ol>
              </div>
            </>
          ) : (
            <>
              <p><strong>{t("dashboard.performance.whatWorked")}</strong> Lookalike 1% maintained 5.8× ROAS with low frequency (1.7). Remarketing 30d delivered best CPL at R$45.</p>
              <p><strong>{t("dashboard.performance.whatUnderperformed")}</strong> Fictício v2 hit frequency ceiling (4.8) with CTR dropping 28% WoW. Creative fatigue confirmed.</p>
              <p><strong>{t("dashboard.performance.winningAngle")}</strong> Social proof with numeric results (e.g., "3.8× more return") outperformed generic CTAs by 2.1×.</p>
              <div className="mt-3 pt-3 border-t border-[hsl(80,40%,80%)]">
                <div className="text-[12px] font-semibold text-[hsl(var(--dash-text-primary))] mb-1.5">{t("dashboard.performance.nextWeek")}</div>
                <ol className="list-decimal list-inside text-[12.5px] text-[hsl(var(--dash-text-secondary))] space-y-0.5">
                  <li>Pause Fictício v2 and reallocate R$280/day to Lookalike 1%</li>
                  <li>Launch 2 new creatives for Interest Education BR (video testimonial format)</li>
                  <li>Test audience expansion on Remarketing with 60-day window</li>
                </ol>
              </div>
            </>
          )}
        </div>
        <div className="text-[11px] text-[hsl(var(--dash-text-tertiary))] mt-3">
          {lang === "pt" ? "Gerado Seg 7:00 AM · Baseado em 7 dias de dados" : "Generated Mon 7:00 AM · Based on 7-day data"}
        </div>
      </div>
    </div>
  );
};

const KPI = ({ label, value, color, note, noteColor, last }: {
  label: string; value: string; color?: string; note?: string; noteColor?: string; last?: boolean;
}) => (
  <div className={`p-5 ${!last ? "border-r border-[hsl(var(--dash-border))]" : ""}`}>
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.05em] text-[hsl(var(--dash-text-tertiary))] mb-1">{label}</div>
    <div className={`text-[28px] font-bold tracking-[-0.04em] leading-none ${
      color === "green" ? "text-[hsl(var(--dash-green))]" : color === "amber" ? "text-[hsl(var(--dash-amber))]" : "text-[hsl(var(--dash-text-primary))]"
    }`}>{value}</div>
    {note && (
      <div className={`text-[11px] mt-1 ${
        noteColor === "green" ? "text-[hsl(var(--dash-green))]" : noteColor === "amber" ? "text-[hsl(var(--dash-amber))]" : "text-[hsl(var(--dash-text-tertiary))]"
      }`}>{note}</div>
    )}
  </div>
);

const FunnelRow = ({ label, value, pct, width, highlight }: { label: string; value: string; pct: string; width: string; highlight?: boolean }) => (
  <div className="flex items-center gap-2">
    <div className="w-[110px] text-right text-[12px] text-[hsl(var(--dash-text-secondary))] shrink-0">{label}</div>
    <div className="flex-1 h-5 bg-[hsl(var(--dash-active))] rounded overflow-hidden">
      <div className={`h-full rounded ${highlight ? "bg-[hsl(var(--dash-amber))]" : "bg-[hsl(var(--dash-text-primary))]"}`} style={{ width }} />
    </div>
    <div className="w-[60px] text-[12px] text-[hsl(var(--dash-text-secondary))] shrink-0">{value}</div>
    <div className={`w-[40px] text-[11px] shrink-0 ${highlight ? "text-[hsl(var(--dash-amber))] font-medium" : "text-[hsl(var(--dash-text-tertiary))]"}`}>{pct}</div>
  </div>
);

const CampaignRow = ({ name, spend, roas, roasColor, cpl, freq, freqBold, ctr, status, statusColor, last }: {
  name: string; spend: string; roas: string; roasColor?: string; cpl: string; freq: string; freqBold?: boolean; ctr: string;
  status: string; statusColor: string; last?: boolean;
}) => {
  const statusStyles: Record<string, string> = {
    green: "bg-[hsl(var(--dash-green-bg))] text-[hsl(var(--dash-green))]",
    lime: "bg-[hsl(var(--dash-lime-bg))] text-[hsl(var(--dash-lime))]",
    amber: "bg-[hsl(var(--dash-amber-bg))] text-[hsl(var(--dash-amber))]",
  };
  return (
    <tr className={`hover:bg-[hsl(var(--dash-sidebar))] transition-colors ${!last ? "border-b border-[hsl(var(--dash-border))]" : ""}`}>
      <td className="px-5 py-3 font-medium text-[hsl(var(--dash-text-primary))]">{name}</td>
      <td className="px-5 py-3 text-[hsl(var(--dash-text-secondary))]">{spend}</td>
      <td className={`px-5 py-3 font-semibold ${roasColor === "green" ? "text-[hsl(var(--dash-green))]" : roasColor === "amber" ? "text-[hsl(var(--dash-amber))]" : "text-[hsl(var(--dash-text-primary))]"}`}>{roas}</td>
      <td className="px-5 py-3 text-[hsl(var(--dash-text-secondary))]">{cpl}</td>
      <td className={`px-5 py-3 ${freqBold ? "font-bold text-[hsl(var(--dash-amber))]" : "text-[hsl(var(--dash-text-secondary))]"}`}>{freq}</td>
      <td className="px-5 py-3 text-[hsl(var(--dash-text-secondary))]">{ctr}</td>
      <td className="px-5 py-3">
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyles[statusColor]}`}>{status}</span>
      </td>
    </tr>
  );
};

export default Performance;
