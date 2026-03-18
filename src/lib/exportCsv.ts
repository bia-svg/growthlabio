export const downloadCsv = (filename: string, headers: string[], rows: string[][]) => {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csvContent = [
    headers.map(escape).join(","),
    ...rows.map(row => row.map(escape).join(","))
  ].join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportCampaigns = () => {
  const headers = ["Campaign", "Spend", "ROAS", "CPL", "Frequency", "CTR", "Status"];
  const rows = [
    ["Lookalike 1% Customers", "R$4,200", "5.1×", "R$74", "2.1", "3.4%", "Healthy"],
    ["SaaS Interest BR", "R$6,800", "4.0×", "R$92", "2.8", "2.1%", "Good"],
    ["Orbit v3", "R$5,100", "3.2×", "R$118", "4.8", "1.2%", "Saturated"],
    ["Remarketing 30d", "R$2,300", "6.2×", "R$51", "1.9", "4.8%", "Healthy"],
  ];

  const date = new Date().toISOString().slice(0, 10);
  downloadCsv(`campaigns-${date}.csv`, headers, rows);
};
