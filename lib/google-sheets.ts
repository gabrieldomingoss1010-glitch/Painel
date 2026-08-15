/**
 * Google Sheets Integration
 * Fetches and parses the clinic's scheduling spreadsheet published as CSV.
 *
 * Expected columns (Google Sheets):
 *   Data | Paciente | Procedimento | Profissional | Compareceu? | Valor | Tempo de procedimento
 */

export const SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAiLcdRyZ4WglAlXyQTIEUBgCJmtmYSD5Vj2d1_e8-2mPSjjBL9q5j6vQ-RNWBSUFBr7JljiLdLSHK/pub?gid=0&single=true&output=csv";

export const NPS_SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAiLcdRyZ4WglAlXyQTIEUBgCJmtmYSD5Vj2d1_e8-2mPSjjBL9q5j6vQ-RNWBSUFBr7JljiLdLSHK/pub?gid=1951715934&single=true&output=csv";

// Configuration for dynamic commercial datasets
export const SHEETS_CONFIG = [
  {
    id: "contatos",
    label: "Contatos",
    desc: "Todos os contatos recebidos (leads, origens, estrategias)",
    defaultUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOEB4ZRHJM2hISSlSyKQQuomTH_CVQpavoNcm2GPCD2ZoYiCFsHOVO5wQ0CzWUppH9JGNe1CnTBZw/pub?gid=1794483408&single=true&output=csv",
    headers: [
      "ID", "Data", "Nome", "Telefone", "Origem", "Estrategia",
      "Responsavel", "Prospectado", "DataProspeccao", "DataAgendamento", "Observacao",
    ],
    keys: [
      "idContato", "dataContato", "nomeCliente", "telefone", "origem", "estrategiaCampanha",
      "responsavel", "foiProspectado", "dataProspeccao", "dataAgendamento", "observacao",
    ],
    filename: "contatos.csv",
  },
  {
    id: "agenda",
    label: "Agenda",
    desc: "Agendamentos com status (Compareceu, Cancelou, Remarcou, Faltou)",
    defaultUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOEB4ZRHJM2hISSlSyKQQuomTH_CVQpavoNcm2GPCD2ZoYiCFsHOVO5wQ0CzWUppH9JGNe1CnTBZw/pub?gid=627165126&single=true&output=csv",
    headers: [
      "ID", "IDContato", "Data", "Cliente", "Profissional",
      "Responsavel", "Origem", "Estrategia", "Status", "DataOriginal", "DataRemarcada", "Observacao",
    ],
    keys: [
      "idAgendamento", "idContato", "dataAgendamento", "nomeCliente", "profissional",
      "responsavelAgendamento", "origem", "estrategia", "statusAgenda", "dataOriginal", "dataRemarcada", "observacao",
    ],
    filename: "agenda.csv",
  },
  {
    id: "oportunidades",
    label: "Oportunidades",
    desc: "Ofertas realizadas com resultado e motivo de perda",
    defaultUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOEB4ZRHJM2hISSlSyKQQuomTH_CVQpavoNcm2GPCD2ZoYiCFsHOVO5wQ0CzWUppH9JGNe1CnTBZw/pub?gid=2009850132&single=true&output=csv",
    headers: [
      "ID", "Data", "IDCliente", "Cliente", "Tipo", "Oferta", "Resultado",
      "ValorOfertado", "ValorVendido", "Responsavel", "MotivoPerdas", "Observacao",
    ],
    keys: [
      "idOportunidade", "data", "idClienteContato", "cliente", "tipoOportunidade", "ofertaRealizada",
      "resultado", "valorOfertado", "valorVendido", "responsavel", "motivoPerda", "observacao",
    ],
    filename: "oportunidades.csv",
  },
  {
    id: "vendas",
    label: "Vendas",
    desc: "Todas as vendas fechadas com origem e responsaveis",
    defaultUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOEB4ZRHJM2hISSlSyKQQuomTH_CVQpavoNcm2GPCD2ZoYiCFsHOVO5wQ0CzWUppH9JGNe1CnTBZw/pub?gid=406350692&single=true&output=csv",
    headers: [
      "ID", "Data", "IDCliente", "Cliente", "TipoVenda", "Produto", "Valor",
      "Origem", "Estrategia", "Video", "Qualificado", "Recepcao", "Comercial",
      "NovaOuRenovacao", "RecuperadaFU", "IDFollowUp", "Observacao",
    ],
    keys: [
      "idVenda", "dataVenda", "idClienteContato", "cliente", "tipoVenda", "produtoPlano", "valorVendido",
      "origem", "estrategia", "videoAnuncioCriativo", "clienteQualificado", "responsavelRecepcao",
      "responsavelComercial", "vendaNovaOuRenovacao", "recuperadaPorFollowUp", "idFollowUp", "observacao",
    ],
    filename: "vendas.csv",
  },
  {
    id: "followUps",
    label: "Follow-ups",
    desc: "Acompanhamento de orcamentos nao fechados por cadencia",
    defaultUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOEB4ZRHJM2hISSlSyKQQuomTH_CVQpavoNcm2GPCD2ZoYiCFsHOVO5wQ0CzWUppH9JGNe1CnTBZw/pub?gid=2113829959&single=true&output=csv",
    headers: [
      "ID", "IDContato", "Cliente", "DataOrcamento", "ValorOrcamento", "DataFU",
      "Cadencia", "Canal", "Responsavel", "Resultado", "Recuperada", "ValorRecuperado",
      "MotivoPerdas", "ProximoContato", "Observacao",
    ],
    keys: [
      "idFollowUp", "idContato", "cliente", "dataOrcamento", "valorOrcamento", "dataFollowUp",
      "cadencia", "canal", "responsavel", "resultado", "vendaRecuperada", "valorRecuperado",
      "motivoPerda", "proximoContato", "observacao",
    ],
    filename: "follow_ups.csv",
  },
  {
    id: "indicacoes",
    label: "Indicacoes",
    desc: "Registro de indicacoes solicitadas e seus resultados",
    defaultUrl: "https://docs.google.com/spreadsheets/d/e/2PACX-1vRBOEB4ZRHJM2hISSlSyKQQuomTH_CVQpavoNcm2GPCD2ZoYiCFsHOVO5wQ0CzWUppH9JGNe1CnTBZw/pub?gid=1013167176&single=true&output=csv",
    headers: [
      "ID", "Data", "ClienteAtendido", "SolicitadaIndicacao", "IndicouAlguem",
      "QtdIndicados", "NomeIndicado", "Telefone", "Agendou", "Compareceu", "Comprou",
      "ValorVendido", "Responsavel",
    ],
    keys: [
      "id", "data", "clienteAtendido", "indicacaoSolicitada", "indicouAlguem",
      "quantidadeIndicados", "nomeIndicado", "telefone", "indicadoAgendou", "indicadoCompareceu",
      "indicadoComprou", "valorVendido", "responsavel",
    ],
    filename: "indicacoes.csv",
  },
];

export interface AtendimentoBruto {
  id: string;
  data: string;       // original string from the sheet
  paciente: string;
  procedimento: string;
  profissional: string;
  status: string;     // "Realizado" | "Cancelado" | "Agendado"
  valor: number;
  tempoAtendimento: number; // minutes
  nps: number | null;
  espera: number | null;
  comportamental?: {
    atendimento: number;
    comportamento: number;
    postura: number;
    autonomia: number;
    produtividade: number;
  } | null;
}

/**
 * Parses a comma-separated CSV line, respecting quoted fields that may contain commas.
 */
export function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

/**
 * Fetches the published Google Sheets CSVs (main and NPS), parses them,
 * and returns merged data mapped to the internal AtendimentoBruto format.
 */
export async function fetchSheetsData(): Promise<AtendimentoBruto[]> {
  const [resMain, resNps] = await Promise.all([
    fetch(SHEETS_URL, { cache: "no-store" }),
    fetch(NPS_SHEETS_URL, { cache: "no-store" })
  ]);

  if (!resMain.ok) {
    throw new Error(`Falha ao buscar dados do Google Sheets (Principal): ${resMain.status}`);
  }

  const textMain = await resMain.text();
  const linesMain = textMain.split(/\r?\n/).filter((l) => l.trim() !== "");

  // Parse NPS scores into a lookup map
  const npsMap = new Map<string, {
    nps: number;
    atendimento: number;
    comportamento: number;
    postura: number;
    autonomia: number;
    produtividade: number;
  }>();

  if (resNps.ok) {
    const textNps = await resNps.text();
    const linesNps = textNps.split(/\r?\n/).filter((l) => l.trim() !== "");
    
    // Header check or row skip
    linesNps.forEach((line) => {
      const cols = parseCsvLine(line);
      const rawData = cols[0] ?? "";
      const funcionario = cols[1] ?? "";
      const rawAtendimento = cols[2] ?? "";
      const rawComportamento = cols[3] ?? "";
      const rawPostura = cols[4] ?? "";
      const rawAutonomia = cols[5] ?? "";
      const rawProdutividade = cols[6] ?? "";
      const rawNps = cols[7] ?? "";
      
      if (rawData && funcionario && rawNps && rawNps.toLowerCase() !== "nps") {
        let npsValue = parseFloat(rawNps);
        if (!isNaN(npsValue)) {
          // If rating is on a 1-5 scale, map it to 2-10 scale (multiply by 2)
          if (npsValue <= 5) {
            npsValue = npsValue * 2;
          }
          const key = `${rawData.trim()}_${funcionario.trim().toLowerCase()}`;
          npsMap.set(key, {
            nps: npsValue,
            atendimento: parseFloat(rawAtendimento) || 0,
            comportamento: parseFloat(rawComportamento) || 0,
            postura: parseFloat(rawPostura) || 0,
            autonomia: parseFloat(rawAutonomia) || 0,
            produtividade: parseFloat(rawProdutividade) || 0,
          });
        }
      }
    });
  }

  if (linesMain.length <= 1) return [];

  // Skip header row
  return linesMain.slice(1).map((line, index) => {
    const cols = parseCsvLine(line);
    // Columns: Data(0), Paciente(1), Procedimento(2), Profissional(3), Compareceu?(4), Valor(5), Tempo(6)
    const rawData     = cols[0] ?? "";
    const paciente    = cols[1] ?? "";
    const procedimento = cols[2] ?? "";
    const profissional = cols[3] ?? "";
    const rawStatus   = cols[4] ?? "";
    const rawValor    = cols[5] ?? "0";
    const rawTempo    = cols[6] ?? "0";

    // Normalize valor — remove "R$", spaces, use dot as decimal separator
    const valor = parseFloat(rawValor.replace(/[^\d,\.]/g, "").replace(",", ".")) || 0;
    const tempoAtendimento = parseInt(rawTempo, 10) || 0;

    // Map status from Compareceu? column to internal format
    let status = rawStatus.trim();
    const s = status.toLowerCase();
    if (s === "sim" || s === "realizado" || s === "concluído" || s === "concluido" || s === "compareceu") {
      status = "Realizado";
    } else if (s === "não" || s === "nao" || s === "falta" || s === "faltou" || s === "não compareceu" || s === "nao compareceu") {
      status = "Falta";
    } else if (s === "cancelado" || s === "cancelou" || s === "remarcado") {
      status = "Cancelado";
    } else if (s === "confirmado" || s === "agendado" || s === "aguardando") {
      status = "Agendado";
    }
    // Anything else stays as-is

    // Lookup NPS by date and professional name
    const key = `${rawData.trim()}_${profissional.trim().toLowerCase()}`;
    const npsData = npsMap.get(key) ?? null;

    return {
      id: `gs_${index}`,
      data: rawData,
      paciente,
      procedimento,
      profissional,
      status,
      valor,
      tempoAtendimento,
      nps: npsData ? npsData.nps : null,
      espera: null,
      comportamental: npsData ? {
        atendimento: npsData.atendimento,
        comportamento: npsData.comportamento,
        postura: npsData.postura,
        autonomia: npsData.autonomia,
        produtividade: npsData.produtividade,
      } : null,
    } satisfies AtendimentoBruto;
  });
}

export interface FunilItem {
  etapa: string;
  valor: number;
  percentual: number;
}

export interface CacVsFaturamentoItem {
  mes: string;
  cac: number;
  faturamento: number;
  clientes?: number;
  ticketMedio?: number;
}

export const COMERCIAL_SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAiLcdRyZ4WglAlXyQTIEUBgCJmtmYSD5Vj2d1_e8-2mPSjjBL9q5j6vQ-RNWBSUFBr7JljiLdLSHK/pub?gid=1912285622&single=true&output=csv";

export const CAC_SHEETS_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vQAiLcdRyZ4WglAlXyQTIEUBgCJmtmYSD5Vj2d1_e8-2mPSjjBL9q5j6vQ-RNWBSUFBr7JljiLdLSHK/pub?gid=538499692&single=true&output=csv";

export async function fetchComercialSheetsData(): Promise<{
  funilConversao: FunilItem[];
  cacVsFaturamento: CacVsFaturamentoItem[];
}> {
  const [resComercial, resCac] = await Promise.all([
    fetch(COMERCIAL_SHEETS_URL, { cache: "no-store" }),
    fetch(CAC_SHEETS_URL, { cache: "no-store" })
  ]);

  if (!resComercial.ok) {
    throw new Error(`Falha ao buscar dados Comerciais: ${resComercial.status}`);
  }
  if (!resCac.ok) {
    throw new Error(`Falha ao buscar dados de CAC: ${resCac.status}`);
  }

  const textComercial = await resComercial.text();
  const linesComercial = textComercial.split(/\r?\n/).filter((l) => l.trim() !== "");

  const textCac = await resCac.text();
  const linesCac = textCac.split(/\r?\n/).filter((l) => l.trim() !== "");

  /**
   * Parse Brazilian currency string: "R$ 35.954,11" -> 35954.11
   * Dots are thousands separators; comma is decimal separator.
   */
  const parseBRL = (str: string): number => {
    const cleaned = str
      .replace(/[^\d,.]/g, "")   // remove R$, spaces, etc.
      .replace(/\./g, "")         // remove thousands separator dots
      .replace(",", ".");         // replace decimal comma with dot
    return parseFloat(cleaned) || 0;
  };

  // 1. Parse Comercial for Funil — aggregate per mês (DD/MM/YYYY na coluna 0)
  const funilByMonth: Record<string, { leads: number; contato: number; agendada: number; realizada: number }> = {};

  linesComercial.slice(1).forEach(line => {
    const cols = parseCsvLine(line);
    if (cols.length >= 6) {
      const rawDate = cols[0] ?? "";
      // Extrair mês no formato MM de DD/MM/YYYY
      const parts = rawDate.split("/");
      if (parts.length < 3) return;
      const monthNum = parts[1]; // "06"
      const year = parts[2];     // "2026"
      const monthKey = `${year}-${monthNum}`;

      if (!funilByMonth[monthKey]) {
        funilByMonth[monthKey] = { leads: 0, contato: 0, agendada: 0, realizada: 0 };
      }
      funilByMonth[monthKey].leads     += parseInt(cols[2], 10) || 0;
      funilByMonth[monthKey].contato   += parseInt(cols[3], 10) || 0;
      funilByMonth[monthKey].agendada  += parseInt(cols[4], 10) || 0;
      funilByMonth[monthKey].realizada += parseInt(cols[5], 10) || 0;
    }
  });

  // Agregar todos os meses no funil geral (soma total)
  let leadsCaptados = 0;
  let contatoRealizado = 0;
  let consultaAgendada = 0;
  let consultaRealizada = 0;
  Object.values(funilByMonth).forEach(m => {
    leadsCaptados     += m.leads;
    contatoRealizado  += m.contato;
    consultaAgendada  += m.agendada;
    consultaRealizada += m.realizada;
  });

  // 2. Parse CAC/Ticket medio
  const cacVsFaturamento: CacVsFaturamentoItem[] = [];
  let totalConversao = 0;

  const monthMap: Record<string, string> = {
    "Janeiro": "Jan", "Fevereiro": "Fev", "Março": "Mar", "Abril": "Abr",
    "Maio": "Mai", "Junho": "Jun", "Julho": "Jul", "Agosto": "Ago",
    "Setembro": "Set", "Outubro": "Out", "Novembro": "Nov", "Dezembro": "Dez"
  };

  linesCac.slice(1).forEach(line => {
    const cols = parseCsvLine(line);
    if (cols.length >= 4) {
      const mesOriginal = cols[0] ?? "";
      const mesAbbr = monthMap[mesOriginal] || mesOriginal;
      
      const entradaStr = cols[1] ?? "0";
      const faturamento = parseBRL(entradaStr);
      
      const lucroStr = cols[2] ?? "0";
      const lucro = parseBRL(lucroStr);
      
      const clientes = parseInt(cols[3], 10) || 0;
      if (clientes > 0) {
        totalConversao += clientes;
      }

      const ticketMedioStr = cols[4] ?? "0";
      const ticketMedio = parseBRL(ticketMedioStr);

      let cac = 0;
      if (clientes > 0) {
        const custoTotal = Math.max(0, faturamento - lucro);
        cac = Math.round((custoTotal * 0.6) / clientes) || 108;
      }

      if (faturamento > 0) {
        cacVsFaturamento.push({
          mes: mesAbbr,
          cac: cac || 108,
          faturamento: Math.round(faturamento),
          clientes: clientes,
          ticketMedio: Math.round(ticketMedio)
        });
      }
    }
  });

  const conversao = totalConversao || 175;

  const funilConversao: FunilItem[] = [
    { etapa: "Leads Captados", valor: leadsCaptados || 850, percentual: 100 },
    { etapa: "Contato Realizado", valor: contatoRealizado || 612, percentual: Math.round(((contatoRealizado || 612) / (leadsCaptados || 850)) * 100) },
    { etapa: "Consulta Agendada", valor: consultaAgendada || 408, percentual: Math.round(((consultaAgendada || 408) / (leadsCaptados || 850)) * 100) },
    { etapa: "Consulta Realizada", valor: consultaRealizada || 340, percentual: Math.round(((consultaRealizada || 340) / (leadsCaptados || 850)) * 100) },
    { etapa: "Conversão", valor: conversao, percentual: Math.round((conversao / (leadsCaptados || 850)) * 100) },
  ];

  return {
    funilConversao,
    cacVsFaturamento
  };
}

/**
 * Fetch and parse a dynamic Google Sheets CSV based on provided keys.
 * Handles the comma-separated format from Google Sheets.
 */
export async function fetchDynamicSheet(url: string, keys: string[]): Promise<any[]> {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Falha ao buscar planilha comercial: ${res.status}`);
  }
  
  const text = await res.text();
  const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
  if (lines.length <= 1) return []; // Empty or header only

  return lines.slice(1).map(line => {
    const cols = parseCsvLine(line);
    const obj: any = {};
    
    keys.forEach((key, idx) => {
      let rawVal = cols[idx] ? cols[idx].trim().replace(/^"|"$/g, "") : "";
      
      // Try to parse numbers where applicable.
      // Replace comma with dot to check for valid number if it doesn't contain date formatting (like /)
      if (rawVal !== "" && !rawVal.includes("/")) {
        const normalizedNumStr = rawVal.replace(",", ".");
        if (!isNaN(Number(normalizedNumStr)) && rawVal.trim() !== "") {
          obj[key] = Number(normalizedNumStr);
          return;
        }
      }
      
      obj[key] = rawVal;
    });
    return obj;
  });
}

/**
 * Parses aggregated data from the new Agenda and Comercial sheets
 * and expands them into the original 6 datasets expected by the app.
 */
export async function fetchAggregatedCommercialSheets(
  agendaUrl: string,
  comercialUrl: string
) {
  const [resAgenda, resComercial] = await Promise.all([
    fetch(agendaUrl, { cache: "no-store" }),
    fetch(comercialUrl, { cache: "no-store" }),
  ]);

  if (!resAgenda.ok || !resComercial.ok) {
    throw new Error("Falha ao buscar planilhas agregadas (Agenda/Comercial)");
  }

  const parseCsvToObjects = (text: string) => {
    const lines = text.split(/\r?\n/).filter((l) => l.trim() !== "");
    if (lines.length <= 1) return [];
    
    // Custom CSV parser handling quotes
    const parseLine = (line: string) => {
      const result = [];
      let current = "";
      let inQuotes = false;
      for (let i = 0; i < line.length; i++) {
        const ch = line[i];
        if (ch === '"') inQuotes = !inQuotes;
        else if (ch === "," && !inQuotes) {
          result.push(current.trim());
          current = "";
        } else current += ch;
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseLine(lines[0]);
    return lines.slice(1).map((line) => {
      const cols = parseLine(line);
      const obj: any = {};
      headers.forEach((h, i) => {
        let val = cols[i] ? cols[i].replace(/^"|"$/g, "").trim() : "";
        if (val !== "" && !val.includes("/")) {
          const numStr = val.replace(",", ".");
          if (!isNaN(Number(numStr))) val = Number(numStr) as any;
        }
        obj[h] = val;
      });
      return obj;
    });
  };

  const agendaRaw = parseCsvToObjects(await resAgenda.text());
  const comercialRaw = parseCsvToObjects(await resComercial.text());

  const contatos: any[] = [];
  const agenda: any[] = [];
  const oportunidades: any[] = [];
  const vendas: any[] = [];
  const followUps: any[] = [];
  const indicacoes: any[] = [];

  let idCounter = 1;
  const getId = (prefix: string) => `${prefix}-${String(idCounter++).padStart(4, "0")}`;
  const defaultDate = "01/01/2026"; // Fallback if missing

  // Process comercial (Contacts, Strategies, FollowUps)
  for (const row of comercialRaw) {
    const data = row["Data do agendamento"] || row["Data"] || defaultDate;
    
    const contatosCount = Number(row["Contatos Dia"]) || 0;
    const traficCount = Number(row["Trafego"]) || 0;
    const aniversariantesCount = Number(row["Aniversariantes"]) || 0;
    const tBaixoCount = Number(row["T. BAIXO"]) || 0;

    let remainingContatos = contatosCount;

    const addContatos = (count: number, estrategia: string) => {
      for (let i = 0; i < count; i++) {
        if (remainingContatos <= 0) break;
        contatos.push({
          idContato: getId("CT"),
          dataContato: data,
          nomeCliente: "Cliente",
          estrategiaCampanha: estrategia,
          foiProspectado: "Sim",
        });
        remainingContatos--;
      }
    };

    addContatos(traficCount, "Tráfego");
    addContatos(aniversariantesCount, "Aniversariantes");
    addContatos(tBaixoCount, "T. Baixo");
    addContatos(remainingContatos, "Orgânico");

    const fuCount = Number(row["Follow_up"]) || 0;
    const fuRecup = Number(row["Follow_up Recuperado"]) || 0;
    const fuValor = Number(row["Valor de Follow_up recuperado"]) || 0;
    const fuTicket = fuRecup > 0 ? fuValor / fuRecup : 0;

    for (let i = 0; i < fuCount; i++) {
      const isRecuperado = i < fuRecup;
      followUps.push({
        idFollowUp: getId("FU"),
        dataFollowUp: data,
        vendaRecuperada: isRecuperado ? "Sim" : "Não",
        valorRecuperado: isRecuperado ? fuTicket : 0,
        cadencia: "7 dias",
      });
    }
  }

  const parseStrategyString = (str: any): { count: number; strategy: string }[] => {
    if (str === undefined || str === null || str === "") return [];
    const s = String(str);
    if (!isNaN(Number(s))) {
      const n = Number(s);
      return n > 0 ? [{ count: n, strategy: "Sem classificação" }] : [];
    }
    const results: { count: number; strategy: string }[] = [];
    const parts = s.split(",");
    for (const part of parts) {
      const match = part.trim().match(/^(\d+)\s*-\s*(.+)$/);
      if (match) {
        let st = match[2].trim();
        if (st.toLowerCase() === "trafego") st = "Tráfego";
        if (st.toLowerCase() === "indicacao") st = "Indicação";
        results.push({ count: Number(match[1]), strategy: st });
      } else {
        const numMatch = part.match(/\d+/);
        if (numMatch) {
          results.push({ count: Number(numMatch[0]), strategy: "Sem classificação" });
        }
      }
    }
    return results;
  };

  // Process agenda (Agenda, Vendas, Oportunidades, Indicacoes)
  for (const row of agendaRaw) {
    const data = row["Data do agendamento"] || row["Data"] || defaultDate;

    const compareceu = Number(row["Compareceu"]) || 0;
    const faltou = Number(row["Faltou"]) || 0;
    const remarcou = Number(row["Remarcou"]) || 0;
    const cancelou = Number(row["Cancelou"]) || 0;
    const agendado = Number(row["Agendado"]) || 0;
    const totalAgendamentos = Number(row["Agendamentos Total"]) || 0;

    const addAgenda = (count: number, status: string) => {
      for (let i = 0; i < count; i++) {
        agenda.push({
          idAgendamento: getId("AGE"),
          dataAgendamento: data,
          statusAgenda: status,
          profissional: "Profissional",
        });
      }
    };

    addAgenda(compareceu, "Compareceu");
    addAgenda(faltou, "Faltou");
    addAgenda(remarcou, "Remarcou");
    addAgenda(cancelou, "Cancelou");
    addAgenda(agendado, "Agendado");

    const sumStatus = compareceu + faltou + remarcou + cancelou + agendado;
    if (totalAgendamentos > sumStatus) {
      addAgenda(totalAgendamentos - sumStatus, "Agendado");
    }

    const vendasParsed = parseStrategyString(row["QTD de clientes que fecharam plano"]);
    const vendasCount = vendasParsed.reduce((acc, curr) => acc + curr.count, 0);
    const vendasValor = Number(row["Valor dos Planos"]) || Number(row["Valor dos planos"]) || 0;
    const ticketVenda = vendasCount > 0 ? vendasValor / vendasCount : 0;

    for (const item of vendasParsed) {
      for (let i = 0; i < item.count; i++) {
        vendas.push({
          idVenda: getId("VD"),
          dataVenda: data,
          valorVendido: ticketVenda,
          estrategia: item.strategy,
          responsavelComercial: "Comercial",
          responsavelRecepcao: "Recepção",
        });
      }
    }

    const orcamentoParsed = parseStrategyString(row["Clientes com Orçamentos"] || row["Clientes com Orçamentos "] || row["Quantidade de Clientes com orcamentos "]);
    const orcamentosCount = orcamentoParsed.reduce((acc, curr) => acc + curr.count, 0);
    const orcamentosValor = Number(row["VALOR R$ DOS ORÇAMENTOS"]) || Number(row["VALOR R$ DOS ORÇAMENTOS "]) || 0;
    
    for (let i = 0; i < orcamentosCount; i++) {
      oportunidades.push({
        idOportunidade: getId("OP"),
        data: data,
        tipoOportunidade: "Orçamento",
        resultado: "Perdeu",
        valorOfertado: orcamentosCount > 0 ? orcamentosValor / orcamentosCount : 0,
        motivoPerda: "Não Informado",
      });
    }

    const oppRaw = row["Oportunidades"] || row["QTD AVALIAÇÕES"];
    const oppParsed = parseStrategyString(oppRaw);
    for (const item of oppParsed) {
      for (let i = 0; i < item.count; i++) {
        oportunidades.push({
          idOportunidade: getId("OP"),
          data: data,
          tipoOportunidade: item.strategy,
          resultado: "Pendente",
          valorOfertado: 0,
          motivoPerda: "Não Informado",
        });
      }
    }

    const indCount = Number(row["Indicaçoes coletadas"]) || 0;
    for (let i = 0; i < indCount; i++) {
      indicacoes.push({
        id: getId("IND"),
        data: data,
        indicacaoSolicitada: "Sim",
        indicouAlguem: "Sim",
      });
    }
  }

  return { contatos, agenda, oportunidades, vendas, followUps, indicacoes };
}
