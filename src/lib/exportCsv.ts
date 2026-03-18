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
    ["Lookalike 1% Clientes", "R$3,600", "4.8×", "R$62", "1.9", "3.2%", "Healthy"],
    ["Interesse — Educação BR", "R$5,200", "3.6×", "R$78", "2.5", "2.3%", "Good"],
    ["Fictício v2", "R$3,800", "2.9×", "R$105", "4.8", "1.1%", "Saturated"],
    ["Remarketing 30d", "R$1,600", "5.6×", "R$45", "1.7", "4.5%", "Healthy"],
  ];

  const date = new Date().toISOString().slice(0, 10);
  downloadCsv(`campaigns-${date}.csv`, headers, rows);
};
