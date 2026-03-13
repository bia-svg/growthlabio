import { useState } from "react";

const Billing = () => {
  const [approved, setApproved] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleApprove = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setApproved(true);
    }, 1200);
  };

  return (
    <div className="p-10 dash-page-enter">
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Billing</h1>
      <p className="text-[14px] text-dash-text-secondary mb-8">March invoice · Pending approval</p>

      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* Main invoice */}
        <div className="border border-dash-border rounded-lg overflow-hidden">
          <div className="bg-dash-sidebar px-5 py-4 border-b border-dash-border flex justify-between items-center">
            <div className="text-[14px] font-semibold text-dash-text-primary">Invoice #GL-2026-03</div>
            <div className="text-[12px] text-dash-text-tertiary">Period: Mar 1–31, 2026</div>
          </div>

          {/* Line items */}
          <div className="divide-y divide-dash-border">
            <div className="px-5 py-4 flex justify-between">
              <div>
                <div className="text-[14px] text-dash-text-primary">Professional monthly subscription</div>
                <div className="text-[12px] text-dash-text-tertiary">Up to 5 users · 10 ad accounts</div>
              </div>
              <div className="text-[14px] font-medium text-dash-text-primary">R$479.00</div>
            </div>
            <div className="px-5 py-4 flex justify-between">
              <div>
                <div className="text-[14px] text-dash-text-tertiary">Invoice issuance (automatic)</div>
              </div>
              <div className="text-[14px] text-dash-text-tertiary">Included</div>
            </div>
            <div className="px-5 py-3 flex justify-between">
              <div className="text-[13px] text-dash-text-secondary">Subtotal</div>
              <div className="text-[14px] font-medium text-dash-text-primary">R$479.00</div>
            </div>
          </div>

          {/* Total */}
          <div className="bg-dash-sidebar border-t border-dash-border px-5 py-4 flex justify-between items-center">
            <div className="text-[14px] font-semibold text-dash-text-primary">Total March 2026</div>
            <div className="text-[22px] font-bold tracking-[-0.04em] text-dash-text-primary">R$479.00</div>
          </div>

          {/* Actions */}
          <div className="px-5 py-4 border-t border-dash-border">
            {approved ? (
              <div className="bg-dash-green-bg border border-[hsl(155,40%,85%)] rounded-lg px-4 py-3 text-[13px] text-dash-green">
                ✓ Charge approved. Invoice will be issued within 2h.
              </div>
            ) : (
              <>
                <div className="flex gap-2 mb-3">
                  <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="text-[13px] font-medium bg-dash-text-primary text-white px-5 py-2 rounded-md hover:opacity-90 transition-opacity disabled:opacity-60"
                  >
                    {loading ? "Processing…" : "✓ Approve & charge"}
                  </button>
                  <button className="text-[13px] font-medium text-dash-text-secondary border border-dash-border px-5 py-2 rounded-md hover:bg-dash-hover transition-colors">
                    ↓ Download PDF
                  </button>
                </div>
                <div className="text-[12px] text-dash-text-tertiary">
                  ⚡ Stripe charges automatically after approval. Invoice issued within 2h.
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="flex flex-col gap-4">
          <div className="border border-dash-border rounded-lg p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Current Plan</div>
            <div className="text-[15px] font-semibold text-dash-text-primary mb-1">Professional · R$479/mo</div>
            <div className="text-[12.5px] text-dash-text-secondary space-y-0.5">
              <div>Up to 5 users · 10 ad accounts</div>
              <div>Automated reports · auto alerts</div>
              <div>Renewal: Apr 1, 2026</div>
            </div>
            <button className="text-[12px] text-dash-blue hover:underline mt-3">Manage plan →</button>
          </div>

          <div className="border border-dash-border rounded-lg p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Invoice History</div>
            <div className="space-y-2.5">
              {[
                { month: "Feb 2026", value: "R$479", status: "Paid" },
                { month: "Jan 2026", value: "R$479", status: "Paid" },
                { month: "Dec 2025", value: "R$479", status: "Paid" },
              ].map(inv => (
                <div key={inv.month} className="flex items-center justify-between text-[12.5px]">
                  <div className="text-dash-text-secondary">{inv.month} · {inv.value}</div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dash-green-bg text-dash-green">{inv.status}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
