"use client";

// Export helper to download CSV files
export function downloadCSV(csvContent: string, fileName: string): void {
  // UTF-8 BOM to ensure Excel opens special characters (like Accents, ç, etc.) correctly
  const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Convert JSON array of objects to Excel-compatible CSV
export function convertToCSV(data: any[], headers: string[], keys: string[]): string {
  const rowHeaders = headers.join(";");
  const rows = data.map((item) => {
    return keys
      .map((key) => {
        const val = item[key];
        if (val === undefined || val === null) return '""';
        if (typeof val === "number") {
          // Replace dot with comma for Portuguese Excel compatibility
          return val.toString().replace(".", ",");
        }
        // Escape quotes
        return `"${String(val).replace(/"/g, '""')}"`;
      })
      .join(";");
  });
  return [rowHeaders, ...rows].join("\n");
}

// Convert single KPI object to CSV rows
export function convertKpisToCSV(kpis: Record<string, number>): string {
  const headers = ["Métrica", "Valor"];
  const keysMap: Record<string, string> = {
    pacientesHoje: "Pacientes Atendidos Hoje",
    tempoMedioEspera: "Tempo Médio de Espera (min)",
    ocupacaoAgenda: "Ocupação da Agenda (%)",
    npsMedia: "NPS Médio Geral",
    conversaoComercial: "Conversão Comercial (%)",
    ticketMedio: "Ticket Médio (R$)",
    absenteismoMensal: "Absenteísmo Mensal (%)",
  };

  const rows = Object.entries(kpis).map(([key, val]) => {
    const label = keysMap[key] || key;
    const formattedVal = typeof val === "number" ? val.toString().replace(".", ",") : val;
    return `"${label}";"${formattedVal}"`;
  });

  return [headers.join(";"), ...rows].join("\n");
}

// Parse Excel-compatible CSV lines back into JSON arrays of objects
export function parseCSV(csvText: string, keys: string[]): any[] {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length <= 1) return [];

  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ";" && !inQuotes) {
        values.push(current);
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current);

    const obj: any = {};
    keys.forEach((key, idx) => {
      let rawVal = values[idx] ? values[idx].trim().replace(/^"|"$/g, "") : "";
      
      // Convert decimal comma to dot before checking NaN
      const normalizedNumStr = rawVal.replace(",", ".");
      if (!isNaN(Number(normalizedNumStr)) && rawVal !== "") {
        obj[key] = Number(normalizedNumStr);
      } else {
        obj[key] = rawVal;
      }
    });
    return obj;
  });
}

// Parse single KPI object CSV back to JSON
export function parseKpiCSV(csvText: string): Record<string, number> {
  const lines = csvText.split(/\r?\n/).filter((line) => line.trim() !== "");
  if (lines.length <= 1) return {};

  const keysMap: Record<string, string> = {
    "Pacientes Atendidos Hoje": "pacientesHoje",
    "Tempo Médio de Espera (min)": "tempoMedioEspera",
    "Ocupação da Agenda (%)": "ocupacaoAgenda",
    "NPS Médio Geral": "npsMedia",
    "Conversão Comercial (%)": "conversaoComercial",
    "Ticket Médio (R$)": "ticketMedio",
    "Absenteísmo Mensal (%)": "absenteismoMensal",
  };

  const kpis: Record<string, number> = {};

  lines.slice(1).forEach((line) => {
    const parts = line.split(";").map((p) => p.trim().replace(/^"|"$/g, ""));
    if (parts.length >= 2) {
      const label = parts[0];
      const valStr = parts[1].replace(",", ".");
      const key = keysMap[label] || label;
      const numVal = Number(valStr);
      if (!isNaN(numVal)) {
        kpis[key] = numVal;
      }
    }
  });

  return kpis;
}
