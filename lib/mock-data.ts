// ============================================================
// PALOMARES BEAUTY — Mock Data
// ============================================================

export const kpiData = {
  pacientesHoje: 38,
  tempoMedioEspera: 12,
  ocupacaoAgenda: 87,
  npsMedia: 9.2,
  conversaoComercial: 68,
  ticketMedio: 320,
  absenteismoMensal: 4.2,
};

export const globalSettings = {
  periodo: `mes:${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`,
};

export const atendimentosBrutos = [
  { id: "A1", data: "2026-05-26T09:00:00", paciente: "Ana Silva", profissional: "Dra. Ana Silva", status: "Realizado", valor: 350, nps: 10, espera: 10, tempoAtendimento: 45 },
  { id: "A2", data: "2026-05-26T10:00:00", paciente: "Carlos Mendes", profissional: "Dr. Felipe Costa", status: "Realizado", valor: 280, nps: 9, espera: 5, tempoAtendimento: 30 },
  { id: "A3", data: "2026-05-25T14:00:00", paciente: "Juliana Rocha", profissional: "Dra. Carla Mendes", status: "Realizado", valor: 400, nps: 8, espera: 15, tempoAtendimento: 60 },
  { id: "A4", data: "2026-05-24T11:00:00", paciente: "Marcos Lima", profissional: "Dra. Ana Silva", status: "Cancelado", valor: 0, nps: null, espera: null, tempoAtendimento: null },
  { id: "A5", data: "2026-05-20T16:00:00", paciente: "Fernanda Costa", profissional: "Dra. Juliana Rocha", status: "Realizado", valor: 500, nps: 10, espera: 12, tempoAtendimento: 50 },
  { id: "A6", data: "2026-04-15T09:30:00", paciente: "Ricardo Alves", profissional: "Dr. Marcos Lima", status: "Realizado", valor: 320, nps: 7, espera: 20, tempoAtendimento: 40 },
  { id: "A7", data: "2026-03-10T13:00:00", paciente: "Beatriz Santos", profissional: "Dra. Ana Silva", status: "Realizado", valor: 450, nps: 9, espera: 8, tempoAtendimento: 55 },
  { id: "A8", data: "2025-11-22T10:00:00", paciente: "João Pedro", profissional: "Dr. Felipe Costa", status: "Realizado", valor: 300, nps: 8, espera: 15, tempoAtendimento: 35 },
];

export const atendimentosSemana = [
  { dia: "Seg", atendimentos: 32, meta: 35 },
  { dia: "Ter", atendimentos: 41, meta: 35 },
  { dia: "Qua", atendimentos: 29, meta: 35 },
  { dia: "Qui", atendimentos: 38, meta: 35 },
  { dia: "Sex", atendimentos: 45, meta: 35 },
  { dia: "Sáb", atendimentos: 22, meta: 30 },
  { dia: "Dom", atendimentos: 10, meta: 15 },
];

export const receitaMensal = [
  { mes: "Jan", receita: 48200, meta: 45000 },
  { mes: "Fev", receita: 52100, meta: 48000 },
  { mes: "Mar", receita: 61800, meta: 55000 },
  { mes: "Abr", receita: 58400, meta: 58000 },
  { mes: "Mai", receita: 67200, meta: 62000 },
  { mes: "Jun", receita: 72800, meta: 65000 },
  { mes: "Jul", receita: 69500, meta: 68000 },
  { mes: "Ago", receita: 78300, meta: 70000 },
  { mes: "Set", receita: 82100, meta: 75000 },
  { mes: "Out", receita: 88600, meta: 80000 },
  { mes: "Nov", receita: 91200, meta: 85000 },
  { mes: "Dez", receita: 96400, meta: 90000 },
];

export const npsHistorico = [
  { mes: "Jan", nps: 8.1, satisfacao: 76 },
  { mes: "Fev", nps: 8.4, satisfacao: 79 },
  { mes: "Mar", nps: 8.7, satisfacao: 82 },
  { mes: "Abr", nps: 8.9, satisfacao: 84 },
  { mes: "Mai", nps: 9.0, satisfacao: 86 },
  { mes: "Jun", nps: 9.1, satisfacao: 87 },
  { mes: "Jul", nps: 8.8, satisfacao: 85 },
  { mes: "Ago", nps: 9.2, satisfacao: 88 },
  { mes: "Set", nps: 9.3, satisfacao: 90 },
  { mes: "Out", nps: 9.1, satisfacao: 88 },
  { mes: "Nov", nps: 9.4, satisfacao: 91 },
  { mes: "Dez", nps: 9.2, satisfacao: 89 },
];

// ============================================================
// MÓDULO OPERACIONAL
// ============================================================
export const operacionalDiario = [
  { hora: "08h", atendimentos: 3, espera: 8 },
  { hora: "09h", atendimentos: 6, espera: 14 },
  { hora: "10h", atendimentos: 8, espera: 18 },
  { hora: "11h", atendimentos: 7, espera: 12 },
  { hora: "12h", atendimentos: 4, espera: 10 },
  { hora: "13h", atendimentos: 5, espera: 9 },
  { hora: "14h", atendimentos: 9, espera: 20 },
  { hora: "15h", atendimentos: 8, espera: 16 },
  { hora: "16h", atendimentos: 6, espera: 13 },
  { hora: "17h", atendimentos: 4, espera: 8 },
  { hora: "18h", atendimentos: 3, espera: 6 },
];

export const heatmapData = [
  { dia: "Seg", hora: "08h", valor: 45 },
  { dia: "Seg", hora: "09h", valor: 78 },
  { dia: "Seg", hora: "10h", valor: 92 },
  { dia: "Seg", hora: "11h", valor: 88 },
  { dia: "Seg", hora: "12h", valor: 55 },
  { dia: "Seg", hora: "13h", valor: 40 },
  { dia: "Seg", hora: "14h", valor: 95 },
  { dia: "Seg", hora: "15h", valor: 87 },
  { dia: "Seg", hora: "16h", valor: 70 },
  { dia: "Seg", hora: "17h", valor: 52 },
  { dia: "Ter", hora: "08h", valor: 50 },
  { dia: "Ter", hora: "09h", valor: 82 },
  { dia: "Ter", hora: "10h", valor: 96 },
  { dia: "Ter", hora: "11h", valor: 91 },
  { dia: "Ter", hora: "12h", valor: 60 },
  { dia: "Ter", hora: "13h", valor: 45 },
  { dia: "Ter", hora: "14h", valor: 98 },
  { dia: "Ter", hora: "15h", valor: 90 },
  { dia: "Ter", hora: "16h", valor: 75 },
  { dia: "Ter", hora: "17h", valor: 58 },
  { dia: "Qua", hora: "08h", valor: 35 },
  { dia: "Qua", hora: "09h", valor: 65 },
  { dia: "Qua", hora: "10h", valor: 80 },
  { dia: "Qua", hora: "11h", valor: 75 },
  { dia: "Qua", hora: "12h", valor: 45 },
  { dia: "Qua", hora: "13h", valor: 30 },
  { dia: "Qua", hora: "14h", valor: 85 },
  { dia: "Qua", hora: "15h", valor: 78 },
  { dia: "Qua", hora: "16h", valor: 62 },
  { dia: "Qua", hora: "17h", valor: 40 },
  { dia: "Qui", hora: "08h", valor: 55 },
  { dia: "Qui", hora: "09h", valor: 88 },
  { dia: "Qui", hora: "10h", valor: 100 },
  { dia: "Qui", hora: "11h", valor: 95 },
  { dia: "Qui", hora: "12h", valor: 65 },
  { dia: "Qui", hora: "13h", valor: 50 },
  { dia: "Qui", hora: "14h", valor: 100 },
  { dia: "Qui", hora: "15h", valor: 93 },
  { dia: "Qui", hora: "16h", valor: 80 },
  { dia: "Qui", hora: "17h", valor: 62 },
  { dia: "Sex", hora: "08h", valor: 60 },
  { dia: "Sex", hora: "09h", valor: 90 },
  { dia: "Sex", hora: "10h", valor: 98 },
  { dia: "Sex", hora: "11h", valor: 94 },
  { dia: "Sex", hora: "12h", valor: 70 },
  { dia: "Sex", hora: "13h", valor: 55 },
  { dia: "Sex", hora: "14h", valor: 97 },
  { dia: "Sex", hora: "15h", valor: 91 },
  { dia: "Sex", hora: "16h", valor: 82 },
  { dia: "Sex", hora: "17h", valor: 65 },
];

export const rankingProfissionais = [
  { nome: "Dra. Ana Silva", atendimentos: 142, nps: 9.8, ocupacao: 96 },
  { nome: "Dra. Carla Mendes", atendimentos: 128, nps: 9.5, ocupacao: 92 },
  { nome: "Dr. Felipe Costa", atendimentos: 115, nps: 9.1, ocupacao: 87 },
  { nome: "Dra. Juliana Rocha", atendimentos: 108, nps: 8.9, ocupacao: 82 },
  { nome: "Dr. Marcos Lima", atendimentos: 95, nps: 8.7, ocupacao: 78 },
];

// ============================================================
// MÓDULO NPS / COMPORTAMENTAL
// ============================================================
export const avaliacaoComportamental = [
  {
    profissional: "Dra. Ana Silva",
    comunicacao: 9.8,
    organizacao: 9.5,
    proatividade: 9.7,
    postura: 9.9,
    autonomia: 9.6,
    media: 9.7,
  },
  {
    profissional: "Dra. Carla Mendes",
    comunicacao: 9.2,
    organizacao: 9.4,
    proatividade: 9.0,
    postura: 9.3,
    autonomia: 9.1,
    media: 9.2,
  },
  {
    profissional: "Dr. Felipe Costa",
    comunicacao: 8.8,
    organizacao: 8.5,
    proatividade: 9.1,
    postura: 8.7,
    autonomia: 9.0,
    media: 8.82,
  },
  {
    profissional: "Dra. Juliana Rocha",
    comunicacao: 8.6,
    organizacao: 9.0,
    proatividade: 8.4,
    postura: 8.8,
    autonomia: 8.5,
    media: 8.66,
  },
  {
    profissional: "Dr. Marcos Lima",
    comunicacao: 8.2,
    organizacao: 8.0,
    proatividade: 8.5,
    postura: 8.3,
    autonomia: 8.4,
    media: 8.28,
  },
];

export const radarDataProfissional = (idx: number) => {
  const p = avaliacaoComportamental[idx];
  return [
    { categoria: "Comunicação", valor: p.comunicacao },
    { categoria: "Organização", valor: p.organizacao },
    { categoria: "Proatividade", valor: p.proatividade },
    { categoria: "Postura", valor: p.postura },
    { categoria: "Autonomia", valor: p.autonomia },
  ];
};

export const evolucaoNPS = [
  { semana: "S1", ana: 9.5, carla: 9.0, felipe: 8.5, juliana: 8.3, marcos: 8.0 },
  { semana: "S2", ana: 9.6, carla: 9.1, felipe: 8.7, juliana: 8.4, marcos: 8.1 },
  { semana: "S3", ana: 9.7, carla: 9.3, felipe: 8.6, juliana: 8.6, marcos: 8.3 },
  { semana: "S4", ana: 9.8, carla: 9.2, felipe: 8.8, juliana: 8.7, marcos: 8.2 },
];

// ============================================================
// MÓDULO COMERCIAL
// ============================================================
export const funilConversao = [
  { etapa: "Leads Captados", valor: 850, percentual: 100 },
  { etapa: "Contato Realizado", valor: 612, percentual: 72 },
  { etapa: "Consulta Agendada", valor: 408, percentual: 48 },
  { etapa: "Consulta Realizada", valor: 340, percentual: 40 },
  { etapa: "Conversão", valor: 578, percentual: 68 },
];

export const cacVsFaturamento = [
  { mes: "Jan", cac: 185, faturamento: 48200 },
  { mes: "Fev", cac: 172, faturamento: 52100 },
  { mes: "Mar", cac: 165, faturamento: 61800 },
  { mes: "Abr", cac: 158, faturamento: 58400 },
  { mes: "Mai", cac: 142, faturamento: 67200 },
  { mes: "Jun", cac: 138, faturamento: 72800 },
  { mes: "Jul", cac: 145, faturamento: 69500 },
  { mes: "Ago", cac: 132, faturamento: 78300 },
  { mes: "Set", cac: 125, faturamento: 82100 },
  { mes: "Out", cac: 118, faturamento: 88600 },
  { mes: "Nov", cac: 112, faturamento: 91200 },
  { mes: "Dez", cac: 108, faturamento: 96400 },
];

export const metaVsRealizado = [
  { categoria: "Consultas", meta: 420, realizado: 398 },
  { categoria: "Procedimentos", meta: 280, realizado: 312 },
  { categoria: "Retornos", meta: 180, realizado: 165 },
  { categoria: "Planos", meta: 90, realizado: 104 },
];

// ============================================================
// MÓDULO OPERAÇÃO MENSAL
// ============================================================
export const operacaoMensal = [
  { mes: "Jan", ocupacao: 78, absenteismo: 6.2, cancelamento: 8.1, produtividade: 82 },
  { mes: "Fev", ocupacao: 81, absenteismo: 5.8, cancelamento: 7.5, produtividade: 84 },
  { mes: "Mar", ocupacao: 85, absenteismo: 5.2, cancelamento: 6.9, produtividade: 87 },
  { mes: "Abr", ocupacao: 83, absenteismo: 5.5, cancelamento: 7.2, produtividade: 85 },
  { mes: "Mai", ocupacao: 87, absenteismo: 4.8, cancelamento: 6.3, produtividade: 89 },
  { mes: "Jun", ocupacao: 89, absenteismo: 4.5, cancelamento: 5.8, produtividade: 91 },
  { mes: "Jul", ocupacao: 86, absenteismo: 4.9, cancelamento: 6.1, produtividade: 88 },
  { mes: "Ago", ocupacao: 91, absenteismo: 4.1, cancelamento: 5.2, produtividade: 93 },
  { mes: "Set", ocupacao: 93, absenteismo: 3.8, cancelamento: 4.9, produtividade: 94 },
  { mes: "Out", ocupacao: 90, absenteismo: 4.2, cancelamento: 5.4, produtividade: 92 },
  { mes: "Nov", ocupacao: 92, absenteismo: 3.9, cancelamento: 5.0, produtividade: 93 },
  { mes: "Dez", ocupacao: 87, absenteismo: 4.2, cancelamento: 5.6, produtividade: 90 },
];

export const jornadaPaciente = [
  { etapa: "Agendamento", tempo: 2 },
  { etapa: "Recepcao", tempo: 8 },
  { etapa: "Espera", tempo: 12 },
  { etapa: "Atendimento", tempo: 45 },
  { etapa: "Pos-atendimento", tempo: 5 },
];

// ============================================================
// MODULO COMERCIAL — Dados de Decisao
// ============================================================
export const contatos = [];
export const agenda = [];
export const oportunidades = [];
export const vendas = [];
export const followUps = [];
export const indicacoes = [];
