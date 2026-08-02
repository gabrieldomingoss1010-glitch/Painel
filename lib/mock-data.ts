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
  periodo: "Mensal", // 'Hoje', 'Semana', 'Mensal', 'Trimestral', 'Anual'
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

export const contatos = [
  { idContato: "C001", dataContato: "2026-07-01", nomeCliente: "Ana Paula Souza", telefone: "11999110001", origem: "Instagram", estrategiaCampanha: "Story Antes e Depois", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavel: "Juliana", foiProspectado: "Sim", dataProspeccao: "2026-07-01", foiAgendado: "Sim", dataAgendamento: "2026-07-05", statusAtual: "Agendado", observacao: "" },
  { idContato: "C002", dataContato: "2026-07-02", nomeCliente: "Beatriz Lima", telefone: "11999110002", origem: "Facebook", estrategiaCampanha: "Reels Depoimento", videoAnuncioCriativo: "Video Facial 02", clienteQualificado: "Sim", responsavel: "Carla", foiProspectado: "Sim", dataProspeccao: "2026-07-02", foiAgendado: "Sim", dataAgendamento: "2026-07-06", statusAtual: "Compareceu", observacao: "" },
  { idContato: "C003", dataContato: "2026-07-03", nomeCliente: "Carlos Ferreira", telefone: "11999110003", origem: "Indicacao", estrategiaCampanha: "Programa Indica", videoAnuncioCriativo: "", clienteQualificado: "Sim", responsavel: "Juliana", foiProspectado: "Sim", dataProspeccao: "2026-07-03", foiAgendado: "Sim", dataAgendamento: "2026-07-07", statusAtual: "Fechou", observacao: "" },
  { idContato: "C004", dataContato: "2026-07-04", nomeCliente: "Daniela Ramos", telefone: "11999110004", origem: "Google", estrategiaCampanha: "Search Ads", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Nao", responsavel: "Carla", foiProspectado: "Nao", dataProspeccao: "", foiAgendado: "Nao", dataAgendamento: "", statusAtual: "Nao qualificado", observacao: "Fora do perfil" },
  { idContato: "C005", dataContato: "2026-07-05", nomeCliente: "Eduardo Martins", telefone: "11999110005", origem: "Instagram", estrategiaCampanha: "Story Antes e Depois", videoAnuncioCriativo: "Video Facial 02", clienteQualificado: "Sim", responsavel: "Juliana", foiProspectado: "Sim", dataProspeccao: "2026-07-05", foiAgendado: "Sim", dataAgendamento: "2026-07-10", statusAtual: "Compareceu", observacao: "" },
  { idContato: "C006", dataContato: "2026-07-06", nomeCliente: "Fernanda Costa", telefone: "11999110006", origem: "Facebook", estrategiaCampanha: "Reels Depoimento", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavel: "Carla", foiProspectado: "Sim", dataProspeccao: "2026-07-06", foiAgendado: "Nao", dataAgendamento: "", statusAtual: "Prospectado", observacao: "" },
  { idContato: "C007", dataContato: "2026-07-07", nomeCliente: "Gabriela Alves", telefone: "11999110007", origem: "Instagram", estrategiaCampanha: "Story Promo", videoAnuncioCriativo: "Video Emagrecimento 03", clienteQualificado: "Sim", responsavel: "Juliana", foiProspectado: "Sim", dataProspeccao: "2026-07-07", foiAgendado: "Sim", dataAgendamento: "2026-07-14", statusAtual: "Fechou", observacao: "" },
  { idContato: "C008", dataContato: "2026-07-08", nomeCliente: "Helena Barbosa", telefone: "11999110008", origem: "Indicacao", estrategiaCampanha: "Programa Indica", videoAnuncioCriativo: "", clienteQualificado: "Sim", responsavel: "Carla", foiProspectado: "Sim", dataProspeccao: "2026-07-08", foiAgendado: "Sim", dataAgendamento: "2026-07-15", statusAtual: "Agendado", observacao: "" },
  { idContato: "C009", dataContato: "2026-07-09", nomeCliente: "Igor Pereira", telefone: "11999110009", origem: "Google", estrategiaCampanha: "Search Ads", videoAnuncioCriativo: "Video Facial 02", clienteQualificado: "Nao", responsavel: "Juliana", foiProspectado: "Nao", dataProspeccao: "", foiAgendado: "Nao", dataAgendamento: "", statusAtual: "Nao qualificado", observacao: "" },
  { idContato: "C010", dataContato: "2026-07-10", nomeCliente: "Julia Nunes", telefone: "11999110010", origem: "Instagram", estrategiaCampanha: "Story Antes e Depois", videoAnuncioCriativo: "Video Emagrecimento 03", clienteQualificado: "Sim", responsavel: "Carla", foiProspectado: "Sim", dataProspeccao: "2026-07-10", foiAgendado: "Sim", dataAgendamento: "2026-07-17", statusAtual: "Compareceu", observacao: "" },
  { idContato: "C011", dataContato: "2026-07-12", nomeCliente: "Karen Dias", telefone: "11999110011", origem: "Facebook", estrategiaCampanha: "Reels Depoimento", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavel: "Juliana", foiProspectado: "Sim", dataProspeccao: "2026-07-12", foiAgendado: "Sim", dataAgendamento: "2026-07-19", statusAtual: "Fechou", observacao: "" },
  { idContato: "C012", dataContato: "2026-07-14", nomeCliente: "Lucas Moreira", telefone: "11999110012", origem: "Instagram", estrategiaCampanha: "Story Promo", videoAnuncioCriativo: "Video Emagrecimento 03", clienteQualificado: "Sim", responsavel: "Carla", foiProspectado: "Sim", dataProspeccao: "2026-07-14", foiAgendado: "Nao", dataAgendamento: "", statusAtual: "Prospectado", observacao: "" },
  { idContato: "C013", dataContato: "2026-07-15", nomeCliente: "Marina Faria", telefone: "11999110013", origem: "Indicacao", estrategiaCampanha: "Programa Indica", videoAnuncioCriativo: "", clienteQualificado: "Sim", responsavel: "Juliana", foiProspectado: "Sim", dataProspeccao: "2026-07-15", foiAgendado: "Sim", dataAgendamento: "2026-07-22", statusAtual: "Fechou", observacao: "" },
  { idContato: "C014", dataContato: "2026-07-18", nomeCliente: "Nicolas Santos", telefone: "11999110014", origem: "Google", estrategiaCampanha: "Search Ads", videoAnuncioCriativo: "Video Facial 02", clienteQualificado: "Sim", responsavel: "Carla", foiProspectado: "Sim", dataProspeccao: "2026-07-18", foiAgendado: "Sim", dataAgendamento: "2026-07-25", statusAtual: "Agendado", observacao: "" },
  { idContato: "C015", dataContato: "2026-07-20", nomeCliente: "Olivia Campos", telefone: "11999110015", origem: "Instagram", estrategiaCampanha: "Story Antes e Depois", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavel: "Juliana", foiProspectado: "Sim", dataProspeccao: "2026-07-20", foiAgendado: "Sim", dataAgendamento: "2026-07-28", statusAtual: "Compareceu", observacao: "" },
];

export const agenda = [
  { idAgendamento: "AG001", idContato: "C001", dataAgendamento: "2026-07-05", nomeCliente: "Ana Paula Souza", tipoAtendimento: "Avaliacao", profissional: "Dra. Ana", responsavelAgendamento: "Juliana", origem: "Instagram", estrategia: "Story Antes e Depois", statusAgenda: "Compareceu", dataOriginal: "2026-07-05", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG002", idContato: "C002", dataAgendamento: "2026-07-06", nomeCliente: "Beatriz Lima", tipoAtendimento: "Avaliacao", profissional: "Dra. Carla", responsavelAgendamento: "Carla", origem: "Facebook", estrategia: "Reels Depoimento", statusAgenda: "Compareceu", dataOriginal: "2026-07-06", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG003", idContato: "C003", dataAgendamento: "2026-07-07", nomeCliente: "Carlos Ferreira", tipoAtendimento: "Avaliacao", profissional: "Dra. Ana", responsavelAgendamento: "Juliana", origem: "Indicacao", estrategia: "Programa Indica", statusAgenda: "Compareceu", dataOriginal: "2026-07-07", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG004", idContato: "C005", dataAgendamento: "2026-07-10", nomeCliente: "Eduardo Martins", tipoAtendimento: "Avaliacao", profissional: "Dra. Carla", responsavelAgendamento: "Juliana", origem: "Instagram", estrategia: "Story Antes e Depois", statusAgenda: "Faltou", dataOriginal: "2026-07-10", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG005", idContato: "C007", dataAgendamento: "2026-07-14", nomeCliente: "Gabriela Alves", tipoAtendimento: "Avaliacao", profissional: "Dra. Ana", responsavelAgendamento: "Juliana", origem: "Instagram", estrategia: "Story Promo", statusAgenda: "Compareceu", dataOriginal: "2026-07-14", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG006", idContato: "C008", dataAgendamento: "2026-07-15", nomeCliente: "Helena Barbosa", tipoAtendimento: "Avaliacao", profissional: "Dra. Carla", responsavelAgendamento: "Carla", origem: "Indicacao", estrategia: "Programa Indica", statusAgenda: "Agendado", dataOriginal: "2026-07-15", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG007", idContato: "C010", dataAgendamento: "2026-07-17", nomeCliente: "Julia Nunes", tipoAtendimento: "Avaliacao", profissional: "Dra. Ana", responsavelAgendamento: "Carla", origem: "Instagram", estrategia: "Story Antes e Depois", statusAgenda: "Remarcou", dataOriginal: "2026-07-17", dataRemarcada: "2026-07-24", observacao: "Viagem a trabalho" },
  { idAgendamento: "AG008", idContato: "C011", dataAgendamento: "2026-07-19", nomeCliente: "Karen Dias", tipoAtendimento: "Avaliacao", profissional: "Dra. Carla", responsavelAgendamento: "Juliana", origem: "Facebook", estrategia: "Reels Depoimento", statusAgenda: "Compareceu", dataOriginal: "2026-07-19", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG009", idContato: "C013", dataAgendamento: "2026-07-22", nomeCliente: "Marina Faria", tipoAtendimento: "Avaliacao", profissional: "Dra. Ana", responsavelAgendamento: "Juliana", origem: "Indicacao", estrategia: "Programa Indica", statusAgenda: "Compareceu", dataOriginal: "2026-07-22", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG010", idContato: "C014", dataAgendamento: "2026-07-25", nomeCliente: "Nicolas Santos", tipoAtendimento: "Avaliacao", profissional: "Dra. Carla", responsavelAgendamento: "Carla", origem: "Google", estrategia: "Search Ads", statusAgenda: "Cancelou", dataOriginal: "2026-07-25", dataRemarcada: "", observacao: "Desistiu" },
  { idAgendamento: "AG011", idContato: "C015", dataAgendamento: "2026-07-28", nomeCliente: "Olivia Campos", tipoAtendimento: "Avaliacao", profissional: "Dra. Ana", responsavelAgendamento: "Juliana", origem: "Instagram", estrategia: "Story Antes e Depois", statusAgenda: "Compareceu", dataOriginal: "2026-07-28", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG012", idContato: "C001", dataAgendamento: "2026-07-29", nomeCliente: "Ana Paula Souza", tipoAtendimento: "Retorno", profissional: "Dra. Ana", responsavelAgendamento: "Juliana", origem: "Instagram", estrategia: "Story Antes e Depois", statusAgenda: "Compareceu", dataOriginal: "2026-07-29", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG013", idContato: "C002", dataAgendamento: "2026-07-30", nomeCliente: "Beatriz Lima", tipoAtendimento: "Retorno", profissional: "Dra. Carla", responsavelAgendamento: "Carla", origem: "Facebook", estrategia: "Reels Depoimento", statusAgenda: "Faltou", dataOriginal: "2026-07-30", dataRemarcada: "", observacao: "" },
  { idAgendamento: "AG014", idContato: "C010", dataAgendamento: "2026-07-24", nomeCliente: "Julia Nunes", tipoAtendimento: "Avaliacao", profissional: "Dra. Ana", responsavelAgendamento: "Carla", origem: "Instagram", estrategia: "Story Antes e Depois", statusAgenda: "Compareceu", dataOriginal: "2026-07-24", dataRemarcada: "", observacao: "Remarcado de 17/07" },
  { idAgendamento: "AG015", idContato: "C012", dataAgendamento: "2026-07-31", nomeCliente: "Lucas Moreira", tipoAtendimento: "Avaliacao", profissional: "Dra. Carla", responsavelAgendamento: "Carla", origem: "Instagram", estrategia: "Story Promo", statusAgenda: "Agendado", dataOriginal: "2026-07-31", dataRemarcada: "", observacao: "" },
];

export const oportunidades = [
  { idOportunidade: "OP001", data: "2026-07-05", idClienteContato: "C001", cliente: "Ana Paula Souza", tipoOportunidade: "Avaliacao", ofertaRealizada: "Plano Corporal Premium", resultado: "Fechou", valorOfertado: 3200, valorVendido: 3200, responsavel: "Juliana", motivoPerda: "", observacao: "" },
  { idOportunidade: "OP002", data: "2026-07-06", idClienteContato: "C002", cliente: "Beatriz Lima", tipoOportunidade: "Avaliacao", ofertaRealizada: "Plano Facial", resultado: "Fechou", valorOfertado: 2800, valorVendido: 2800, responsavel: "Carla", motivoPerda: "", observacao: "" },
  { idOportunidade: "OP003", data: "2026-07-07", idClienteContato: "C003", cliente: "Carlos Ferreira", tipoOportunidade: "Plano novo", ofertaRealizada: "Plano Emagrecimento", resultado: "Fechou", valorOfertado: 4500, valorVendido: 4500, responsavel: "Juliana", motivoPerda: "", observacao: "" },
  { idOportunidade: "OP004", data: "2026-07-14", idClienteContato: "C007", cliente: "Gabriela Alves", tipoOportunidade: "Avaliacao", ofertaRealizada: "Plano Corporal Plus", resultado: "Fechou", valorOfertado: 3800, valorVendido: 3800, responsavel: "Juliana", motivoPerda: "", observacao: "" },
  { idOportunidade: "OP005", data: "2026-07-19", idClienteContato: "C011", cliente: "Karen Dias", tipoOportunidade: "Renovacao", ofertaRealizada: "Renovacao Plano Facial", resultado: "Fechou", valorOfertado: 2600, valorVendido: 2600, responsavel: "Juliana", motivoPerda: "", observacao: "" },
  { idOportunidade: "OP006", data: "2026-07-22", idClienteContato: "C013", cliente: "Marina Faria", tipoOportunidade: "Plano novo", ofertaRealizada: "Plano Emagrecimento Plus", resultado: "Fechou", valorOfertado: 5200, valorVendido: 5200, responsavel: "Carla", motivoPerda: "", observacao: "" },
  { idOportunidade: "OP007", data: "2026-07-10", idClienteContato: "C005", cliente: "Eduardo Martins", tipoOportunidade: "Avaliacao", ofertaRealizada: "Plano Corporal", resultado: "Perdeu", valorOfertado: 3000, valorVendido: 0, responsavel: "Carla", motivoPerda: "Preco", observacao: "Achou caro" },
  { idOportunidade: "OP008", data: "2026-07-28", idClienteContato: "C015", cliente: "Olivia Campos", tipoOportunidade: "Avaliacao", ofertaRealizada: "Plano Facial Plus", resultado: "Em negociacao", valorOfertado: 3500, valorVendido: 0, responsavel: "Juliana", motivoPerda: "", observacao: "Precisa decidir" },
  { idOportunidade: "OP009", data: "2026-07-29", idClienteContato: "C001", cliente: "Ana Paula Souza", tipoOportunidade: "Ticket baixo", ofertaRealizada: "Sessao avulsa corporal", resultado: "Fechou", valorOfertado: 350, valorVendido: 350, responsavel: "Carla", motivoPerda: "", observacao: "" },
  { idOportunidade: "OP010", data: "2026-07-24", idClienteContato: "C010", cliente: "Julia Nunes", tipoOportunidade: "Avaliacao", ofertaRealizada: "Plano Emagrecimento", resultado: "Perdeu", valorOfertado: 4800, valorVendido: 0, responsavel: "Carla", motivoPerda: "Sem decisao", observacao: "Precisa pensar" },
  { idOportunidade: "OP011", data: "2026-07-19", idClienteContato: "C011", cliente: "Karen Dias", tipoOportunidade: "Reativacao", ofertaRealizada: "Plano Facial Reativacao", resultado: "Perdeu", valorOfertado: 2200, valorVendido: 0, responsavel: "Juliana", motivoPerda: "Concorrencia", observacao: "" },
  { idOportunidade: "OP012", data: "2026-07-25", idClienteContato: "C014", cliente: "Nicolas Santos", tipoOportunidade: "Orcamento", ofertaRealizada: "Plano Corporal Completo", resultado: "Perdeu", valorOfertado: 5800, valorVendido: 0, responsavel: "Carla", motivoPerda: "Forma de pagamento", observacao: "" },
];

export const vendas = [
  { idVenda: "V001", dataVenda: "2026-07-05", idClienteContato: "C001", cliente: "Ana Paula Souza", tipoVenda: "Plano novo", produtoPlano: "Plano Corporal Premium", valorVendido: 3200, origem: "Instagram", estrategia: "Story Antes e Depois", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavelRecepcao: "Carla", responsavelComercial: "Juliana", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Nao", idFollowUp: "", observacao: "" },
  { idVenda: "V002", dataVenda: "2026-07-06", idClienteContato: "C002", cliente: "Beatriz Lima", tipoVenda: "Plano novo", produtoPlano: "Plano Facial", valorVendido: 2800, origem: "Facebook", estrategia: "Reels Depoimento", videoAnuncioCriativo: "Video Facial 02", clienteQualificado: "Sim", responsavelRecepcao: "Carla", responsavelComercial: "Carla", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Nao", idFollowUp: "", observacao: "" },
  { idVenda: "V003", dataVenda: "2026-07-07", idClienteContato: "C003", cliente: "Carlos Ferreira", tipoVenda: "Plano novo", produtoPlano: "Plano Emagrecimento", valorVendido: 4500, origem: "Indicacao", estrategia: "Programa Indica", videoAnuncioCriativo: "", clienteQualificado: "Sim", responsavelRecepcao: "Juliana", responsavelComercial: "Juliana", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Nao", idFollowUp: "", observacao: "" },
  { idVenda: "V004", dataVenda: "2026-07-14", idClienteContato: "C007", cliente: "Gabriela Alves", tipoVenda: "Plano novo", produtoPlano: "Plano Corporal Plus", valorVendido: 3800, origem: "Instagram", estrategia: "Story Promo", videoAnuncioCriativo: "Video Emagrecimento 03", clienteQualificado: "Sim", responsavelRecepcao: "Juliana", responsavelComercial: "Juliana", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Nao", idFollowUp: "", observacao: "" },
  { idVenda: "V005", dataVenda: "2026-07-19", idClienteContato: "C011", cliente: "Karen Dias", tipoVenda: "Renovacao", produtoPlano: "Renovacao Plano Facial", valorVendido: 2600, origem: "Facebook", estrategia: "Reels Depoimento", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavelRecepcao: "Carla", responsavelComercial: "Juliana", vendaNovaOuRenovacao: "Renovacao", recuperadaPorFollowUp: "Nao", idFollowUp: "", observacao: "" },
  { idVenda: "V006", dataVenda: "2026-07-22", idClienteContato: "C013", cliente: "Marina Faria", tipoVenda: "Plano novo", produtoPlano: "Plano Emagrecimento Plus", valorVendido: 5200, origem: "Indicacao", estrategia: "Programa Indica", videoAnuncioCriativo: "", clienteQualificado: "Sim", responsavelRecepcao: "Juliana", responsavelComercial: "Carla", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Nao", idFollowUp: "", observacao: "" },
  { idVenda: "V007", dataVenda: "2026-07-29", idClienteContato: "C001", cliente: "Ana Paula Souza", tipoVenda: "Avulso", produtoPlano: "Sessao avulsa corporal", valorVendido: 350, origem: "Instagram", estrategia: "Story Antes e Depois", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavelRecepcao: "Carla", responsavelComercial: "Carla", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Nao", idFollowUp: "", observacao: "" },
  { idVenda: "V008", dataVenda: "2026-07-20", idClienteContato: "C009", cliente: "Igor Pereira", tipoVenda: "Plano novo", produtoPlano: "Plano Facial Basic", valorVendido: 1900, origem: "Google", estrategia: "Search Ads", videoAnuncioCriativo: "Video Facial 02", clienteQualificado: "Sim", responsavelRecepcao: "Juliana", responsavelComercial: "Juliana", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Sim", idFollowUp: "FU003", observacao: "" },
  { idVenda: "V009", dataVenda: "2026-07-23", idClienteContato: "C004", cliente: "Daniela Ramos", tipoVenda: "Plano novo", produtoPlano: "Plano Corporal", valorVendido: 2500, origem: "Google", estrategia: "Search Ads", videoAnuncioCriativo: "Video Corporal 01", clienteQualificado: "Sim", responsavelRecepcao: "Carla", responsavelComercial: "Carla", vendaNovaOuRenovacao: "Nova", recuperadaPorFollowUp: "Sim", idFollowUp: "FU005", observacao: "" },
];

export const followUps = [
  { idFollowUp: "FU001", idContato: "C005", cliente: "Eduardo Martins", dataOrcamento: "2026-07-10", valorOrcamento: 3000, dataFollowUp: "2026-07-11", cadencia: "1 dia", canal: "WhatsApp", responsavel: "Carla", resultado: "Sem retorno", vendaRecuperada: "Nao", valorRecuperado: 0, motivoPerda: "Sem retorno", proximoContato: "2026-07-14", observacao: "" },
  { idFollowUp: "FU002", idContato: "C010", cliente: "Julia Nunes", dataOrcamento: "2026-07-17", valorOrcamento: 4800, dataFollowUp: "2026-07-20", cadencia: "3 dias", canal: "WhatsApp", responsavel: "Carla", resultado: "Sem retorno", vendaRecuperada: "Nao", valorRecuperado: 0, motivoPerda: "Sem retorno", proximoContato: "2026-07-24", observacao: "" },
  { idFollowUp: "FU003", idContato: "C009", cliente: "Igor Pereira", dataOrcamento: "2026-07-13", valorOrcamento: 1900, dataFollowUp: "2026-07-20", cadencia: "7 dias", canal: "Telefone", responsavel: "Juliana", resultado: "Vendeu", vendaRecuperada: "Sim", valorRecuperado: 1900, motivoPerda: "", proximoContato: "", observacao: "Recuperado apos follow-up de 7 dias" },
  { idFollowUp: "FU004", idContato: "C012", cliente: "Lucas Moreira", dataOrcamento: "2026-07-14", valorOrcamento: 3500, dataFollowUp: "2026-07-29", cadencia: "15 dias", canal: "WhatsApp", responsavel: "Carla", resultado: "Sem decisao", vendaRecuperada: "Nao", valorRecuperado: 0, motivoPerda: "Sem decisao", proximoContato: "2026-08-13", observacao: "" },
  { idFollowUp: "FU005", idContato: "C004", cliente: "Daniela Ramos", dataOrcamento: "2026-06-23", valorOrcamento: 2500, dataFollowUp: "2026-07-23", cadencia: "30 dias", canal: "Telefone", responsavel: "Juliana", resultado: "Vendeu", vendaRecuperada: "Sim", valorRecuperado: 2500, motivoPerda: "", proximoContato: "", observacao: "Recuperado apos 30 dias" },
  { idFollowUp: "FU006", idContato: "C014", cliente: "Nicolas Santos", dataOrcamento: "2026-07-25", valorOrcamento: 5800, dataFollowUp: "2026-07-26", cadencia: "1 dia", canal: "WhatsApp", responsavel: "Carla", resultado: "Sem retorno", vendaRecuperada: "Nao", valorRecuperado: 0, motivoPerda: "Forma de pagamento", proximoContato: "2026-07-29", observacao: "" },
  { idFollowUp: "FU007", idContato: "C011", cliente: "Karen Dias", dataOrcamento: "2026-07-15", valorOrcamento: 2200, dataFollowUp: "2026-07-18", cadencia: "3 dias", canal: "WhatsApp", responsavel: "Juliana", resultado: "Concorrencia", vendaRecuperada: "Nao", valorRecuperado: 0, motivoPerda: "Concorrencia", proximoContato: "", observacao: "" },
  { idFollowUp: "FU008", idContato: "C006", cliente: "Fernanda Costa", dataOrcamento: "2026-07-06", valorOrcamento: 2800, dataFollowUp: "2026-07-13", cadencia: "7 dias", canal: "WhatsApp", responsavel: "Carla", resultado: "Sem retorno", vendaRecuperada: "Nao", valorRecuperado: 0, motivoPerda: "Sem retorno", proximoContato: "2026-07-21", observacao: "" },
];

export const indicacoes = [
  { id: "IND001", data: "2026-07-05", clienteAtendido: "Ana Paula Souza", indicacaoSolicitada: "Sim", indicouAlguem: "Sim", quantidadeIndicados: 2, nomeIndicado: "Renata Souza, Paulo Souza", telefone: "11999120001", indicadoAgendou: "Sim", indicadoCompareceu: "Sim", indicadoComprou: "Nao", valorVendido: 0, responsavel: "Juliana" },
  { id: "IND002", data: "2026-07-06", clienteAtendido: "Beatriz Lima", indicacaoSolicitada: "Sim", indicouAlguem: "Sim", quantidadeIndicados: 1, nomeIndicado: "Sofia Lima", telefone: "11999120002", indicadoAgendou: "Sim", indicadoCompareceu: "Nao", indicadoComprou: "Nao", valorVendido: 0, responsavel: "Carla" },
  { id: "IND003", data: "2026-07-07", clienteAtendido: "Carlos Ferreira", indicacaoSolicitada: "Sim", indicouAlguem: "Nao", quantidadeIndicados: 0, nomeIndicado: "", telefone: "", indicadoAgendou: "Nao", indicadoCompareceu: "Nao", indicadoComprou: "Nao", valorVendido: 0, responsavel: "Juliana" },
  { id: "IND004", data: "2026-07-14", clienteAtendido: "Gabriela Alves", indicacaoSolicitada: "Sim", indicouAlguem: "Sim", quantidadeIndicados: 3, nomeIndicado: "Pedro Alves, Thais Alves, Marcos Alves", telefone: "11999120004", indicadoAgendou: "Sim", indicadoCompareceu: "Sim", indicadoComprou: "Sim", valorVendido: 2800, responsavel: "Juliana" },
  { id: "IND005", data: "2026-07-19", clienteAtendido: "Karen Dias", indicacaoSolicitada: "Sim", indicouAlguem: "Sim", quantidadeIndicados: 1, nomeIndicado: "Priscila Dias", telefone: "11999120005", indicadoAgendou: "Nao", indicadoCompareceu: "Nao", indicadoComprou: "Nao", valorVendido: 0, responsavel: "Juliana" },
  { id: "IND006", data: "2026-07-22", clienteAtendido: "Marina Faria", indicacaoSolicitada: "Sim", indicouAlguem: "Sim", quantidadeIndicados: 2, nomeIndicado: "Tatiane Faria, Rodrigo Faria", telefone: "11999120006", indicadoAgendou: "Sim", indicadoCompareceu: "Sim", indicadoComprou: "Sim", valorVendido: 3200, responsavel: "Carla" },
  { id: "IND007", data: "2026-07-29", clienteAtendido: "Ana Paula Souza", indicacaoSolicitada: "Sim", indicouAlguem: "Nao", quantidadeIndicados: 0, nomeIndicado: "", telefone: "", indicadoAgendou: "Nao", indicadoCompareceu: "Nao", indicadoComprou: "Nao", valorVendido: 0, responsavel: "Carla" },
  { id: "IND008", data: "2026-07-24", clienteAtendido: "Julia Nunes", indicacaoSolicitada: "Nao", indicouAlguem: "Nao", quantidadeIndicados: 0, nomeIndicado: "", telefone: "", indicadoAgendou: "Nao", indicadoCompareceu: "Nao", indicadoComprou: "Nao", valorVendido: 0, responsavel: "Carla" },
  { id: "IND009", data: "2026-07-28", clienteAtendido: "Olivia Campos", indicacaoSolicitada: "Sim", indicouAlguem: "Sim", quantidadeIndicados: 1, nomeIndicado: "Fernanda Campos", telefone: "11999120009", indicadoAgendou: "Nao", indicadoCompareceu: "Nao", indicadoComprou: "Nao", valorVendido: 0, responsavel: "Juliana" },
  { id: "IND010", data: "2026-07-06", clienteAtendido: "Beatriz Lima", indicacaoSolicitada: "Sim", indicouAlguem: "Sim", quantidadeIndicados: 1, nomeIndicado: "Vanessa Lima", telefone: "11999120010", indicadoAgendou: "Sim", indicadoCompareceu: "Sim", indicadoComprou: "Sim", valorVendido: 1900, responsavel: "Carla" },
];
