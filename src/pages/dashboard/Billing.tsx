import { useState } from "react";

interface InvoiceRow {
  month: string;
  plan: string;
  amount: string;
  status: string;
  nfe: string;
  lineItems: { desc: string; value: string }[];
}

const invoices: InvoiceRow[] = [
  {
    month: "Mar 2026",
    plan: "Professional",
    amount: "R$479",
    status: "Charged",
    nfe: "Issued",
    lineItems: [
      { desc: "Professional monthly subscription", value: "R$479.00" },
      { desc: "Invoice issuance (automatic)", value: "Included" },
    ],
  },
  {
    month: "Feb 2026",
    plan: "Professional",
    amount: "R$479",
    status: "Charged",
    nfe: "Issued",
    lineItems: [
      { desc: "Professional monthly subscription", value: "R$479.00" },
      { desc: "Invoice issuance (automatic)", value: "Included" },
    ],
  },
  {
    month: "Jan 2026",
    plan: "Professional",
    amount: "R$479",
    status: "Charged",
    nfe: "Issued",
    lineItems: [
      { desc: "Professional monthly subscription", value: "R$479.00" },
      { desc: "Invoice issuance (automatic)", value: "Included" },
    ],
  },
];

const Billing = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  return (
    <div className="p-10 dash-page-enter">
      <h1 className="text-[30px] font-bold tracking-[-0.04em] text-dash-text-primary mb-1">Billing</h1>
      <p className="text-[14px] text-dash-text-secondary mb-2">March subscription · Auto-renews Apr 1</p>
      <p className="text-[12px] text-dash-text-tertiary mb-8">Billing currency: BRL · To change to USD or EUR, contact support.</p>

      <div className="grid grid-cols-[1fr_280px] gap-6">
        {/* Main column */}
        <div className="flex flex-col gap-6">
          {/* Upcoming charge card */}
          <div className="bg-dash-sidebar border border-dash-border rounded-lg p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-2">Next Charge</div>
            <div className="text-[16px] font-medium text-dash-text-primary mb-1">Apr 1, 2026 · R$479.00 · Professional</div>
            <div className="text-[13px] text-dash-text-tertiary mb-3">Charged automatically to Visa ending 4242</div>
            <button className="text-[12px] text-dash-text-secondary border border-dash-border px-3.5 py-1.5 rounded-md hover:bg-dash-hover transition-colors">
              ↓ Download last invoice
            </button>
          </div>

          {/* Invoice history table */}
          <div className="border border-dash-border rounded-lg overflow-hidden">
            <div className="px-5 py-3 border-b border-dash-border">
              <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary">Invoice History</span>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-dash-border">
                  {["Month", "Plan", "Amount", "Status", "NF-e", ""].map(h => (
                    <th key={h} className="px-5 py-2.5 text-[11.5px] font-semibold uppercase tracking-[0.05em] text-dash-text-tertiary">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-[13px]">
                {invoices.map((inv, i) => (
                  <>
                    <tr
                      key={inv.month}
                      onClick={() => setExpandedRow(expandedRow === i ? null : i)}
                      className={`cursor-pointer hover:bg-dash-sidebar transition-colors ${i < invoices.length - 1 && expandedRow !== i ? "border-b border-dash-border" : ""}`}
                    >
                      <td className="px-5 py-3 text-dash-text-secondary">{inv.month}</td>
                      <td className="px-5 py-3 text-dash-text-secondary">{inv.plan}</td>
                      <td className="px-5 py-3 text-dash-text-secondary">{inv.amount}</td>
                      <td className="px-5 py-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dash-green-bg text-dash-green">{inv.status}</span>
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-dash-blue-bg text-dash-blue">{inv.nfe}</span>
                      </td>
                      <td className="px-5 py-3 text-dash-text-tertiary">↓ PDF</td>
                    </tr>
                    {expandedRow === i && (
                      <tr key={`${inv.month}-expanded`} className={`${i < invoices.length - 1 ? "border-b border-dash-border" : ""}`}>
                        <td colSpan={6} className="px-5 py-4 bg-dash-sidebar">
                          <div className="space-y-2 mb-3">
                            {inv.lineItems.map((li, j) => (
                              <div key={j} className="flex justify-between text-[12.5px]">
                                <span className="text-dash-text-secondary">{li.desc}</span>
                                <span className="text-dash-text-primary font-medium">{li.value}</span>
                              </div>
                            ))}
                          </div>
                          <button className="text-[12px] text-dash-text-secondary border border-dash-border px-3.5 py-1.5 rounded-md hover:bg-dash-hover transition-colors">
                            ↓ Download full invoice PDF
                          </button>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[12px] text-dash-text-tertiary">
            Billing is automatic. Your subscription renews on the 1st of each month. To cancel or change plan, go to Manage plan.
          </p>
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
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Payment Method</div>
            <div className="text-[13px] text-dash-text-primary mb-1">Visa ending 4242 · expires 09/28</div>
            <button className="text-[12px] text-dash-blue hover:underline mt-2">Update card →</button>
          </div>

          <div className="border border-dash-border rounded-lg p-5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.07em] text-dash-text-tertiary mb-3">Fiscal Data</div>
            <div className="text-[13px] text-dash-text-secondary space-y-0.5">
              <div>Razão social: Velaris Ltda</div>
              <div>CNPJ: 00.000.000/0001-00</div>
            </div>
            <button className="text-[12px] text-dash-blue hover:underline mt-2">Edit →</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
