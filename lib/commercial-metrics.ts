// ============================================================
// PALOMARES BEAUTY — Commercial Metrics Helper
// ============================================================
// Nunca retorna NaN, Infinity ou undefined em calculos.

// ============================================================
// DATE UTILITIES — Formato brasileiro DD/MM/YYYY
// ============================================================

/** Converte string DD/MM/YYYY ou YYYY-MM-DD para Date */
export function parseDateBR(dateStr: any): Date | null {
  if (!dateStr) return null;
  const str = String(dateStr);
  
  // Formato brasileiro DD/MM/YYYY
  if (str.includes("/")) {
    const parts = str.split("/");
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2].split(" ")[0], 10);
      const d = new Date(year, month, day);
      return isNaN(d.getTime()) ? null : d;
    }
  }
  
  // Fallback ISO YYYY-MM-DD
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}  
/** Helper to get ISO week number */
function getWeekNumber(d: Date): number {
  const date = new Date(d.getTime());
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
  const week1 = new Date(date.getFullYear(), 0, 4);
  return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
}

/** Extrai chaves de periodo (dia, semana, mes, ano) de uma string de data */
export function getPeriodKeysFromDate(dateStr: string): { day: string, week: string, month: string, year: string } | null {
  const d = parseDateBR(dateStr);
  if (!d) return null;
  
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const w = getWeekNumber(d);

  return {
    day: `dia:${y}-${m}-${day}`,
    week: `semana:${y}-W${String(w).padStart(2, "0")}`,
    month: `mes:${y}-${m}`,
    year: `ano:${y}`,
  };
}

/** Filtra array por periodo usando um campo de data */
export function filterByPeriod(arr: any[], dateField: string, periodKey: string): any[] {
  if (!periodKey || periodKey === "all") return arr;
  
  return arr.filter((item) => {
    const keys = getPeriodKeysFromDate(item[dateField]);
    if (!keys) return false;
    
    if (periodKey.startsWith("dia:")) return keys.day === periodKey;
    if (periodKey.startsWith("semana:")) return keys.week === periodKey;
    if (periodKey.startsWith("mes:")) return keys.month === periodKey;
    if (periodKey.startsWith("ano:")) return keys.year === periodKey;
    
    return false;
  });
}

/** Retorna lista agrupada de periodos disponiveis */
export function getAvailablePeriods(datasets: { data: any[]; dateField: string }[]) {
  const days = new Set<string>();
  const weeks = new Set<string>();
  const months = new Set<string>();
  const years = new Set<string>();
  
  datasets.forEach(({ data, dateField }) => {
    data.forEach((item) => {
      const keys = getPeriodKeysFromDate(item[dateField]);
      if (keys) {
        days.add(keys.day);
        weeks.add(keys.week);
        months.add(keys.month);
        years.add(keys.year);
      }
    });
  });
  
  const formatMonth = (k: string) => {
    const [y, m] = k.replace("mes:", "").split("-");
    const d = new Date(Number(y), Number(m) - 1, 1);
    const label = d.toLocaleString("pt-BR", { month: "short", year: "numeric" }).replace(".", "");
    return label;
  };
  
  const formatDay = (k: string) => {
    const [y, m, d] = k.replace("dia:", "").split("-");
    return `${d}/${m}/${y}`;
  };

  return {
    days: Array.from(days).sort().reverse().map(k => ({ key: k, label: formatDay(k) })),
    weeks: Array.from(weeks).sort().reverse().map(k => ({ key: k, label: k.replace("semana:", "Semana ").replace("-W", " (") + ")" })),
    months: Array.from(months).sort().reverse().map(k => ({ key: k, label: formatMonth(k) })),
    years: Array.from(years).sort().reverse().map(k => ({ key: k, label: k.replace("ano:", "") })),
  };
}

/** Divisao segura — retorna 0 quando denominador for zero */
export function safeDivide(a: number, b: number): number {
  if (!b || !isFinite(b) || b === 0) return 0;
  const result = a / b;
  return isFinite(result) ? result : 0;
}

/** Soma segura de um campo numerico em um array */
export function safeSum(arr: any[], key: string): number {
  return arr.reduce((acc, item) => {
    const val = Number(item[key]);
    return acc + (isFinite(val) ? val : 0);
  }, 0);
}

/** Formata percentual como string pt-BR */
export function fmtPct(value: number, decimals = 1): string {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value) + "%";
}

/** Formata moeda como string pt-BR */
export function fmtBRL(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Formata numero inteiro pt-BR */
export function fmtNum(value: number): string {
  return new Intl.NumberFormat("pt-BR").format(Math.round(value));
}

// ============================================================
// AGRUPAMENTOS
// ============================================================

/** Agrupa array por campo e aplica reducao */
export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc: Record<string, T[]>, item) => {
    const k = String(item[key] ?? "Sem classificacao");
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

/** Retorna o item com maior contagem por campo */
export function topByCount(arr: any[], key: string): string {
  if (!arr.length) return "-";
  const counts: Record<string, number> = {};
  arr.forEach((item) => {
    const k = String(item[key] ?? "");
    if (k) counts[k] = (counts[k] || 0) + 1;
  });
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] ?? "-";
}

/** Agrupa por estrategia e calcula metricas de funil */
export function groupByStrategy(
  contatos: any[],
  agenda: any[],
  vendas: any[]
): {
  estrategia: string;
  contatos: number;
  agendamentos: number;
  compareceram: number;
  fecharam: number;
  valorVendido: number;
  ticketMedio: number;
  convGeral: number;
  convAgendamento: number;
  convComparecimento: number;
  convFechamento: number;
}[] {
  const normalize = (s: any) => String(s || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const allStrats = new Set([
    ...contatos.map((c) => normalize(c.estrategiaCampanha)),
    ...agenda.map((a) => normalize(a.estrategia)),
    ...vendas.map((v) => normalize(v.estrategia)),
  ]);

  return Array.from(allStrats)
    .filter(Boolean)
    .map((est) => {
      // achar a versão "bonita" do nome na primeira vez que aparece
      let displayLabel = est;
      const original = 
        contatos.find((c) => normalize(c.estrategiaCampanha) === est)?.estrategiaCampanha ||
        agenda.find((a) => normalize(a.estrategia) === est)?.estrategia ||
        vendas.find((v) => normalize(v.estrategia) === est)?.estrategia;
      
      if (original) displayLabel = String(original).trim();

      const ctts = contatos.filter((c) => normalize(c.estrategiaCampanha) === est);
      const ags = agenda.filter((a) => normalize(a.estrategia) === est);
      const compareceram = ags.filter((a) =>
        ["Compareceu", "Fechou", "Vendeu"].includes(a.statusAgenda)
      );
      const vds = vendas.filter((v) => normalize(v.estrategia) === est);
      const valor = safeSum(vds, "valorVendido");

      return {
        estrategia: displayLabel,
        contatos: ctts.length,
        agendamentos: ags.length,
        compareceram: compareceram.length,
        fecharam: vds.length,
        valorVendido: valor,
        ticketMedio: safeDivide(valor, vds.length),
        convGeral: safeDivide(vds.length, ctts.length) * 100,
        convAgendamento: safeDivide(ags.length, ctts.length) * 100,
        convComparecimento: safeDivide(compareceram.length, ags.length) * 100,
        convFechamento: safeDivide(vds.length, compareceram.length) * 100,
      };
    })
    .sort((a, b) => b.valorVendido - a.valorVendido);
}

/** Agrupa vendas por responsavel comercial */
export function groupByResponsavelComercial(vendas: any[]): {
  responsavel: string;
  vendas: number;
  valorVendido: number;
  ticketMedio: number;
}[] {
  const grouped = groupBy(vendas, "responsavelComercial");
  return Object.entries(grouped)
    .map(([responsavel, vds]) => {
      const valor = safeSum(vds, "valorVendido");
      return {
        responsavel,
        vendas: vds.length,
        valorVendido: valor,
        ticketMedio: safeDivide(valor, vds.length),
      };
    })
    .sort((a, b) => b.valorVendido - a.valorVendido);
}

/** Agrupa vendas por responsavel recepcao */
export function groupByResponsavelRecepcao(vendas: any[]): {
  responsavel: string;
  vendas: number;
  valorVendido: number;
}[] {
  const grouped = groupBy(vendas, "responsavelRecepcao");
  return Object.entries(grouped)
    .map(([responsavel, vds]) => ({
      responsavel,
      vendas: vds.length,
      valorVendido: safeSum(vds, "valorVendido"),
    }))
    .sort((a, b) => b.valorVendido - a.valorVendido);
}

/** Conta motivos de perda em oportunidades */
export function groupByMotivoPerdas(oportunidades: any[]): {
  motivo: string;
  count: number;
}[] {
  const perdidas = oportunidades.filter((o) => {
    const res = String(o.resultado || "").trim().toLowerCase();
    return res === "perdeu" || res === "não fechado" || res === "nao fechado" || res === "sem interesse" || res === "oportunidade não trabalhada" || res === "oportunidade nao trabalhada";
  });
  const counts: Record<string, number> = {};
  perdidas.forEach((o) => {
    const m = o.motivoPerda || "Nao informado";
    counts[m] = (counts[m] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([motivo, count]) => ({ motivo, count }))
    .sort((a, b) => b.count - a.count);
}

/** Metricas por video/anuncio/criativo */
export function groupByVideo(
  contatos: any[],
  vendas: any[]
): {
  video: string;
  contatos: number;
  vendas: number;
  valorVendido: number;
  ticketMedio: number;
}[] {
  const videos = new Set([
    ...contatos.map((c) => c.videoAnuncioCriativo).filter(Boolean),
    ...vendas.map((v) => v.videoAnuncioCriativo).filter(Boolean),
  ]);

  return Array.from(videos)
    .map((video) => {
      const ctts = contatos.filter((c) => c.videoAnuncioCriativo === video);
      const vds = vendas.filter((v) => v.videoAnuncioCriativo === video);
      const valor = safeSum(vds, "valorVendido");
      return {
        video,
        contatos: ctts.length,
        vendas: vds.length,
        valorVendido: valor,
        ticketMedio: safeDivide(valor, vds.length),
      };
    })
    .sort((a, b) => b.valorVendido - a.valorVendido);
}

// ============================================================
// KPIs POR PAINEL
// ============================================================

/** KPIs para o Painel CEO (Dashboard) */
export function calcDashboardKPIs(
  contatos: any[],
  agenda: any[],
  oportunidades: any[],
  vendas: any[],
  followUps: any[],
  indicacoes: any[]
) {
  const totalContatos = contatos.length;
  const totalAgendamentos = agenda.length;
  const comparecimentos = agenda.filter((a) =>
    ["Compareceu"].includes(a.statusAgenda)
  ).length;
  const remarcacoes = agenda.filter((a) => a.statusAgenda === "Remarcou").length;
  const totalOportunidades = oportunidades.filter(o => String(o.tipoOportunidade).toLowerCase() === "orçamento").length;
  const avaliacoes = oportunidades.filter(o => String(o.tipoOportunidade).toLowerCase() === "avaliação").length;
  const totalFechamentos = vendas.length;
  const valorTotal = safeSum(vendas, "valorVendido");
  const indicacoesColetadas = indicacoes.filter((i) => i.indicouAlguem === "Sim").length;
  const indicacoesSolicitadas = indicacoes.filter((i) => i.indicacaoSolicitada === "Sim").length;
  const prospectados = contatos.filter((c) => 
    String(c.foiProspectado).trim().toLowerCase() === "sim" || (c.dataProspeccao && String(c.dataProspeccao).trim() !== "")
  ).length;

  const taxaProspeccao = safeDivide(prospectados, totalContatos) * 100;
  const taxaAgendamento = safeDivide(totalAgendamentos, prospectados) * 100;

  const convGeral = safeDivide(totalFechamentos, totalContatos) * 100;
  const ticketMedio = safeDivide(valorTotal, totalFechamentos);

  // Melhor/Pior estrategia por conversao geral
  const estrategias = groupByStrategy(contatos, agenda, vendas);
  const melhorEstrategia = estrategias[0]?.estrategia ?? "-";
  const piorEstrategia = estrategias[estrategias.length - 1]?.estrategia ?? "-";

  // Maior motivo de perda
  const motivosPerdas = groupByMotivoPerdas(oportunidades);
  const maiorMotivoPerdas = motivosPerdas[0]?.motivo ?? "-";

  // Melhor recepcionista e comercial
  const rankingRecepcao = groupByResponsavelRecepcao(vendas);
  const rankingComercial = groupByResponsavelComercial(vendas);
  const melhorRecepcao = rankingRecepcao[0]?.responsavel ?? "-";
  const melhorComercial = rankingComercial[0]?.responsavel ?? "-";

  // Video que mais trouxe clientes, mais vendeu e maior ticket
  const videosData = groupByVideo(contatos, vendas);
  const videoMaisClientes = [...videosData].sort((a, b) => b.contatos - a.contatos)[0]?.video ?? "-";
  const videoMaisVendas = [...videosData].sort((a, b) => b.valorVendido - a.valorVendido)[0]?.video ?? "-";
  const videoMaiorTicket = [...videosData].sort((a, b) => b.ticketMedio - a.ticketMedio)[0]?.video ?? "-";

  return {
    totalContatos,
    totalAgendamentos,
    comparecimentos,
    totalFechamentos,
    totalOportunidades,
    planosVendidos: totalFechamentos,
    indicacoesColetadas,
    remarcacoes,
    valorTotal,
    ticketMedio,
    convGeral,
    taxaProspeccao,
    taxaAgendamento,
    melhorEstrategia,
    piorEstrategia,
    maiorMotivoPerdas,
    melhorRecepcao,
    melhorComercial,
    videoMaisClientes,
    videoMaisVendas,
    videoMaiorTicket,
    prospectados,
    indicacoesSolicitadas,
    avaliacoes,
  };
}

/** KPIs para o Painel Recepcao (Operacional) */
export function calcOperacionalKPIs(
  agenda: any[],
  oportunidades: any[],
  vendas: any[],
  indicacoes: any[]
) {
  const safeTipo = (tipo: any) => String(tipo || "").trim().toLowerCase();
  
  const kpiOportunidades = oportunidades.filter((o) => safeTipo(o.tipoOportunidade) !== "orçamento");

  const avaliacoes = kpiOportunidades.filter((o) => {
    const t = safeTipo(o.tipoOportunidade);
    return t === "avaliação" || t === "avaliacao" || t === "avaliações" || t === "avaliacoes";
  }).length;

  const indicacaoLifting = kpiOportunidades.filter((o) => {
    const t = safeTipo(o.tipoOportunidade);
    return t.includes("indicação") || t.includes("indicacao") || t.includes("lifting");
  }).length;

  const trafegoPago = kpiOportunidades.filter((o) => {
    const t = safeTipo(o.tipoOportunidade);
    return t.includes("tráfego") || t.includes("trafego");
  }).length;

  const aniversariantes = kpiOportunidades.filter((o) => {
    const t = safeTipo(o.tipoOportunidade);
    return t.includes("aniversariante");
  }).length;

  const ticketBaixoAvulsos = kpiOportunidades.filter((o) => {
    const t = safeTipo(o.tipoOportunidade);
    return t.includes("ticket baixo") || t.includes("sessão avulsa") || t.includes("sessao avulsa") || t.includes("sessões avulsas") || t.includes("sessoes avulsas") || t.includes("avulso") || t.includes("avulsas");
  }).length;

  // Keep these fallback values for compatibility if referenced elsewhere
  const prospectados = 0;
  const renovacoes = 0;
  const ticketBaixo = 0;
  const orcamentos = oportunidades.filter((o) => safeTipo(o.tipoOportunidade) === "orçamento").length;

  const totalOpportunidades = kpiOportunidades.length;
  const planosVendidos = vendas.length;
  const aproveitamento = safeDivide(planosVendidos, totalOpportunidades) * 100;

  const safeEst = (est: any) => String(est || "").trim().toLowerCase();

  const vendasRenovacao = vendas.filter((v) => {
    const e = safeEst(v.estrategia);
    return e.includes("renovação") || e.includes("renovacao");
  }).length;

  const vendasIndicacaoLifting = vendas.filter((v) => {
    const e = safeEst(v.estrategia);
    return e.includes("indicação") || e.includes("indicacao") || e.includes("lifting");
  }).length;

  const vendasTrafego = vendas.filter((v) => {
    const e = safeEst(v.estrategia);
    return e.includes("tráfego") || e.includes("trafego");
  }).length;

  const vendasAniversariantes = vendas.filter((v) => {
    const e = safeEst(v.estrategia);
    return e.includes("aniversariante");
  }).length;

  const vendasTicketBAvulsos = vendas.filter((v) => {
    const e = safeEst(v.estrategia);
    return e.includes("ticket") || e.includes("avulso") || e.includes("avulsas") || e.includes("sessões avulsas") || e.includes("sessoes avulsas");
  }).length;

  const vendasAvaliacoes = vendas.filter((v) => {
    const e = safeEst(v.estrategia);
    return e.includes("avaliação") || e.includes("avaliacao");
  }).length;

  const indSolicitadas = indicacoes.filter((i) => i.indicacaoSolicitada === "Sim").length;
  const indColetadas = indicacoes.filter((i) => i.indicouAlguem === "Sim").length;
  const taxaIndicacao = safeDivide(indColetadas, indSolicitadas) * 100;

  const valorTotal = safeSum(vendas, "valorVendido");
  const ticketMedio = safeDivide(valorTotal, planosVendidos);

  const orcamentosNaoFechados = oportunidades.filter(
    (o) => safeTipo(o.tipoOportunidade) === "orçamento" && safeTipo(o.resultado) !== "fechou"
  ).length;

  const valorOrcamentosNaoFechados = safeSum(
    oportunidades.filter((o) => safeTipo(o.tipoOportunidade) === "orçamento" && safeTipo(o.resultado) !== "fechou"),
    "valorOfertado"
  );

  const motivosPerdas = groupByMotivoPerdas(oportunidades);

  const totalAgendamentos = agenda.length;
  const remarcacoes = agenda.filter((a) => a.statusAgenda === "Remarcou").length;
  const cancelamentos = agenda.filter((a) => a.statusAgenda === "Cancelou").length;
  const faltas = agenda.filter((a) => a.statusAgenda === "Faltou").length;
  const comparecimentos = agenda.filter((a) => a.statusAgenda === "Compareceu").length;

  const taxaRemarcacao = safeDivide(remarcacoes, totalAgendamentos) * 100;
  const taxaComparecimento = safeDivide(comparecimentos, totalAgendamentos) * 100;
  const taxaAusencia = safeDivide(faltas, totalAgendamentos) * 100;

  return {
    avaliacoes,
    indicacaoLifting,
    trafegoPago,
    aniversariantes,
    ticketBaixoAvulsos,
    prospectados,
    renovacoes,
    ticketBaixo,
    orcamentos,
    totalOpportunidades,
    planosVendidos,
    aproveitamento,
    vendasRenovacao,
    vendasIndicacaoLifting,
    vendasTrafego,
    vendasAniversariantes,
    vendasTicketBAvulsos,
    vendasAvaliacoes,
    indSolicitadas,
    indColetadas,
    taxaIndicacao,
    valorTotal,
    ticketMedio,
    orcamentosNaoFechados,
    valorOrcamentosNaoFechados,
    motivosPerdas,
    totalAgendamentos,
    remarcacoes,
    cancelamentos,
    faltas,
    comparecimentos,
    taxaRemarcacao,
    taxaComparecimento,
    taxaAusencia,
  };
}

/** Dados do funil para o Painel Comercial */
export function calcComercialFunil(
  contatos: any[],
  agenda: any[],
  vendas: any[]
): { etapa: string; valor: number; percentual: number; taxa: string }[] {
  const totalContatos = contatos.length;
  const prospectados = contatos.filter((c) => c.foiProspectado === "Sim").length;
  const followUpsCount = contatos.filter((c) => c.foiProspectado === "Sim").length; // proxy
  const agendamentos = agenda.length;
  const comparecimentos = agenda.filter((a) => a.statusAgenda === "Compareceu").length;
  const fechamentos = vendas.length;

  const base = totalContatos || 1;

  return [
    {
      etapa: "Contatos",
      valor: totalContatos,
      percentual: 100,
      taxa: "Base",
    },
    {
      etapa: "Prospectados",
      valor: prospectados,
      percentual: Math.round(safeDivide(prospectados, base) * 100),
      taxa: fmtPct(safeDivide(prospectados, totalContatos) * 100),
    },
    {
      etapa: "Follow-ups",
      valor: followUpsCount,
      percentual: Math.round(safeDivide(followUpsCount, base) * 100),
      taxa: fmtPct(safeDivide(followUpsCount, prospectados) * 100),
    },
    {
      etapa: "Agendamentos",
      valor: agendamentos,
      percentual: Math.round(safeDivide(agendamentos, base) * 100),
      taxa: fmtPct(safeDivide(agendamentos, prospectados) * 100),
    },
    {
      etapa: "Comparecimentos",
      valor: comparecimentos,
      percentual: Math.round(safeDivide(comparecimentos, base) * 100),
      taxa: fmtPct(safeDivide(comparecimentos, agendamentos) * 100),
    },
    {
      etapa: "Fechamentos",
      valor: fechamentos,
      percentual: Math.round(safeDivide(fechamentos, base) * 100),
      taxa: fmtPct(safeDivide(fechamentos, comparecimentos) * 100),
    },
  ];
}

/** KPIs para o Painel Follow-up */
export function calcFollowUpKPIs(followUps: any[]) {
  const acompanhados = followUps.length;
  const recuperados = followUps.filter((f) => f.vendaRecuperada === "Sim").length;
  const valorRecuperado = safeSum(followUps, "valorRecuperado");
  const taxaRecuperacao = safeDivide(recuperados, acompanhados) * 100;

  const cadencias = ["1 dia", "3 dias", "7 dias", "15 dias", "30 dias"];
  const porCadencia = cadencias.map((cad) => {
    const cadNum = cad.replace(/\D/g, "");
    const items = followUps.filter((f) => String(f.cadencia).replace(/\D/g, "") === cadNum);
    const rec = items.filter((f) => f.vendaRecuperada === "Sim").length;
    const valRec = safeSum(items, "valorRecuperado");
    return {
      cadencia: cad,
      acompanhados: items.length,
      recuperados: rec,
      valorRecuperado: valRec,
      taxa: safeDivide(rec, items.length) * 100,
    };
  });

  return { acompanhados, recuperados, valorRecuperado, taxaRecuperacao, porCadencia };
}

/** Consolida dados semanais/mensais por periodo */
export function calcConsolidadoMensal(
  contatos: any[],
  agenda: any[],
  vendas: any[],
  followUps: any[],
  indicacoes: any[]
): {
  label: string;
  contatos: number;
  agendamentos: number;
  comparecimentos: number;
  fechamentos: number;
  convVenda: number;
  convAgendamento: number;
  ticketMedio: number;
  faturamento: number;
  indicacoes: number;
  remarcacoes: number;
  followUpsCount: number;
  recuperados: number;
}[] {
  const meses: Record<string, any> = {};

  const getMonthKey = (dateStr: any) => {
    if (!dateStr) return null;
    const str = String(dateStr);
    
    // Suporte para formato brasileiro (DD/MM/YYYY ou DD/MM/YYYY HH:mm)
    if (str.includes("/")) {
      const parts = str.split("/");
      if (parts.length >= 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2].split(" ")[0]; // remove hora se houver
        return `${year}-${month.padStart(2, "0")}`;
      }
    }
    
    // Fallback padrão ISO (YYYY-MM-DD)
    const d = new Date(str);
    if (isNaN(d.getTime())) return null;
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const getLabel = (key: string) => {
    const [year, month] = key.split("-");
    const d = new Date(Number(year), Number(month) - 1, 1);
    return d.toLocaleString("pt-BR", { month: "short" }).replace(".", "");
  };

  const ensureMonth = (key: string) => {
    if (!meses[key]) {
      meses[key] = {
        contatos: 0, agendamentos: 0, comparecimentos: 0, fechamentos: 0,
        faturamento: 0, indicacoes: 0, remarcacoes: 0, followUpsCount: 0, recuperados: 0,
      };
    }
  };

  contatos.forEach((c) => {
    const k = getMonthKey(c.dataContato);
    if (!k) return;
    ensureMonth(k);
    meses[k].contatos++;
  });

  agenda.forEach((a) => {
    const k = getMonthKey(a.dataAgendamento);
    if (!k) return;
    ensureMonth(k);
    meses[k].agendamentos++;
    if (a.statusAgenda === "Compareceu") meses[k].comparecimentos++;
    if (a.statusAgenda === "Remarcou") meses[k].remarcacoes++;
  });

  vendas.forEach((v) => {
    const k = getMonthKey(v.dataVenda);
    if (!k) return;
    ensureMonth(k);
    meses[k].fechamentos++;
    meses[k].faturamento += Number(v.valorVendido) || 0;
  });

  followUps.forEach((f) => {
    const k = getMonthKey(f.dataFollowUp);
    if (!k) return;
    ensureMonth(k);
    meses[k].followUpsCount++;
    if (f.vendaRecuperada === "Sim") meses[k].recuperados++;
  });

  indicacoes.forEach((i) => {
    const k = getMonthKey(i.data);
    if (!k) return;
    ensureMonth(k);
    if (i.indicouAlguem === "Sim") meses[k].indicacoes++;
  });

  return Object.keys(meses)
    .sort()
    .map((key) => {
      const m = meses[key];
      return {
        label: getLabel(key),
        ...m,
        convVenda: safeDivide(m.fechamentos, m.comparecimentos) * 100,
        convAgendamento: safeDivide(m.agendamentos, m.contatos) * 100,
        ticketMedio: safeDivide(m.faturamento, m.fechamentos),
      };
    });
}
