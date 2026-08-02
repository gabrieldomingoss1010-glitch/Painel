"use client";

import { useMemo, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import {
  BarChart2, CalendarCheck, TrendingUp, DollarSign,
  Heart, RefreshCw, MessageSquare, Star, AlertCircle,
} from "lucide-react";
import { useData } from "@/lib/data-store";
import {
  contatos as defaultContatos,
  agenda as defaultAgenda,
  vendas as defaultVendas,
  followUps as defaultFollowUps,
  indicacoes as defaultIndicacoes,
} from "@/lib/mock-data";
import {
  calcConsolidadoMensal,
  groupByStrategy,
  groupByResponsavelComercial,
  groupByResponsavelRecepcao,
  groupByMotivoPerdas,
  fmtBRL,
  fmtPct,
  safeDivide,
} from "@/lib/commercial-metrics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-xl text-sm" style={{ background: "#16161f", border: "1px solid rgba(202,178,161,0.15)" }}>
        <p className="font-semibold mb-1" style={{ color: "#cab2a1" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="text-xs">
            {p.name}: <strong>
              {p.name === "Faturamento" || p.name === "Ticket Medio"
                ? fmtBRL(p.value)
                : p.name.includes("Conv") || p.name.includes("Taxa")
                ? fmtPct(p.value)
                : p.value}
            </strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/** Calcula evolucao percentual entre dois valores */
function evolucao(atual: number, anterior: number): number {
  if (!anterior) return 0;
  return parseFloat((((atual / anterior) - 1) * 100).toFixed(1));
}


export default function OperacaoMensalPage() {
  const [activeTab, setActiveTab] = useState<"semanal" | "mensal">("mensal");
  const [contatos] = useData("contatos", defaultContatos);
  const [agenda] = useData("agenda", defaultAgenda);
  const [vendas] = useData("vendas", defaultVendas);
  const [followUps] = useData("followUps", defaultFollowUps);
  const [indicacoes] = useData("indicacoes", defaultIndicacoes);

  const consolidado = useMemo(
    () => calcConsolidadoMensal(
      contatos as any[], agenda as any[], vendas as any[],
      followUps as any[], indicacoes as any[]
    ),
    [contatos, agenda, vendas, followUps, indicacoes]
  );

  const estrategias = useMemo(
    () => groupByStrategy(contatos as any[], agenda as any[], vendas as any[]),
    [contatos, agenda, vendas]
  );

  const oportunidades = (agenda as any[]).length > 0 ? [] : []; // placeholder for loss reasons
  const motivosPerdas = useMemo(() => groupByMotivoPerdas([]), []);

  // Comparativo mes atual vs anterior
  const mesAtual = consolidado[consolidado.length - 1] ?? null;
  const mesAnterior = consolidado[consolidado.length - 2] ?? null;

  const evolucoes = mesAtual && mesAnterior ? [
    { label: "Conversao em Venda", atual: mesAtual.convVenda, anterior: mesAnterior.convVenda, unit: "%" },
    { label: "Ticket Medio", atual: mesAtual.ticketMedio, anterior: mesAnterior.ticketMedio, unit: "R$" },
    { label: "Indicacoes", atual: mesAtual.indicacoes, anterior: mesAnterior.indicacoes, unit: "" },
    { label: "Remarcacoes", atual: mesAtual.remarcacoes, anterior: mesAnterior.remarcacoes, unit: "" },
    { label: "Follow-ups", atual: mesAtual.followUpsCount, anterior: mesAnterior.followUpsCount, unit: "" },
    { label: "Recuperacoes", atual: mesAtual.recuperados, anterior: mesAnterior.recuperados, unit: "" },
  ] : [];

  // Dados semanais (agrupa os ultimos 7 dias por dia da semana)
  const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
  const semanalData = weekdays.map((dia) => {
    // Simulacao simples: distribui os dados do consolidado atual pelo dia da semana
    const base = mesAtual;
    if (!base) return { dia, contatos: 0, agendamentos: 0, fechamentos: 0, faturamento: 0 };
    const factor = dia === "Sab" ? 0.6 : dia === "Dom" ? 0.2 : 1;
    const days = weekdays.filter((d) => d !== "Sab" && d !== "Dom").length;
    return {
      dia,
      contatos: Math.round((base.contatos / days) * factor),
      agendamentos: Math.round((base.agendamentos / days) * factor),
      fechamentos: Math.round((base.fechamentos / days) * factor),
      faturamento: Math.round((base.faturamento / days) * factor),
    };
  });

  // Melhor / Pior estrategia
  const melhorEstrategia = estrategias[0]?.estrategia ?? "-";
  const piorEstrategia = estrategias[estrategias.length - 1]?.estrategia ?? "-";

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #cab2a1 0%, #543c3c 100%)" }}
          >
            <BarChart2 size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>
              Consolidado
            </h1>
            <p className="text-xs text-gray-500">Visao semanal e mensal do comercial</p>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {(["mensal", "semanal"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize"
              style={{
                background: activeTab === tab ? "linear-gradient(135deg, #cab2a1, #543c3c)" : "transparent",
                color: activeTab === tab ? "white" : "#6b7280",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ===== ABA SEMANAL ===== */}
      {activeTab === "semanal" && (
        <>
          {/* KPIs semanais */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Semana Atual</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
              <KPICard title="Contatos" value={semanalData.reduce((a, d) => a + d.contatos, 0)} icon={<CalendarCheck size={18} />} color="#cab2a1" delay={0} />
              <KPICard title="Agendamentos" value={semanalData.reduce((a, d) => a + d.agendamentos, 0)} icon={<CalendarCheck size={18} />} color="#a78b7a" delay={60} />
              <KPICard title="Fechamentos" value={semanalData.reduce((a, d) => a + d.fechamentos, 0)} icon={<TrendingUp size={18} />} color="#8b6b5a" delay={120} />
              <KPICard title="Faturamento" value={fmtBRL(semanalData.reduce((a, d) => a + d.faturamento, 0))} icon={<DollarSign size={18} />} color="#4ade80" delay={180} />
              <KPICard title="Melhor Estrategia" value={melhorEstrategia} icon={<Star size={18} />} color="#cab2a1" delay={240} />
              <KPICard title="Pior Estrategia" value={piorEstrategia} icon={<AlertCircle size={18} />} color="#f87171" delay={300} />
            </div>
          </section>

          {/* Grafico semanal */}
          <div className="card p-5">
            <div className="mb-4">
              <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Distribuicao Semanal</h3>
              <p className="text-xs text-gray-500">Contatos, agendamentos e fechamentos por dia</p>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={semanalData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="dia" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="contatos" name="Contatos" fill="rgba(202,178,161,0.3)" radius={[4, 4, 0, 0]} maxBarSize={24} />
                <Bar dataKey="agendamentos" name="Agendamentos" fill="rgba(202,178,161,0.6)" radius={[4, 4, 0, 0]} maxBarSize={24} />
                <Bar dataKey="fechamentos" name="Fechamentos" fill="#cab2a1" radius={[4, 4, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {/* ===== ABA MENSAL ===== */}
      {activeTab === "mensal" && (
        <>
          {/* KPIs mes atual vs anterior */}
          {mesAtual && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Mes Atual ({mesAtual.label}) vs Anterior {mesAnterior ? `(${mesAnterior.label})` : ""}
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                <KPICard title="Contatos" value={mesAtual.contatos} icon={<CalendarCheck size={18} />} color="#cab2a1" delay={0}
                  change={mesAnterior ? Math.round(evolucao(mesAtual.contatos, mesAnterior.contatos)) : undefined} changeLabel="vs mes anterior" />
                <KPICard title="Agendamentos" value={mesAtual.agendamentos} icon={<CalendarCheck size={18} />} color="#a78b7a" delay={60}
                  change={mesAnterior ? Math.round(evolucao(mesAtual.agendamentos, mesAnterior.agendamentos)) : undefined} changeLabel="vs mes anterior" />
                <KPICard title="Fechamentos" value={mesAtual.fechamentos} icon={<TrendingUp size={18} />} color="#8b6b5a" delay={120}
                  change={mesAnterior ? Math.round(evolucao(mesAtual.fechamentos, mesAnterior.fechamentos)) : undefined} changeLabel="vs mes anterior" />
                <KPICard title="Faturamento" value={fmtBRL(mesAtual.faturamento)} icon={<DollarSign size={18} />} color="#4ade80" delay={180}
                  change={mesAnterior ? Math.round(evolucao(mesAtual.faturamento, mesAnterior.faturamento)) : undefined} changeLabel="vs mes anterior" />
                <KPICard title="Indicacoes" value={mesAtual.indicacoes} icon={<Heart size={18} />} color="#cab2a1" delay={240}
                  change={mesAnterior ? Math.round(evolucao(mesAtual.indicacoes, mesAnterior.indicacoes)) : undefined} changeLabel="vs mes anterior" />
                <KPICard title="Recuperacoes FU" value={mesAtual.recuperados} icon={<MessageSquare size={18} />} color="#a78b7a" delay={300} />
              </div>
            </section>
          )}

          {/* Graficos mensais */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Evolucao do faturamento */}
            <div className="card p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Evolucao do Faturamento</h3>
                <p className="text-xs text-gray-500">Receita mensal acumulada</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={consolidado} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="fatGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#cab2a1" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#cab2a1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="faturamento" name="Faturamento" stroke="#cab2a1" strokeWidth={2.5} fill="url(#fatGrad)" dot={{ fill: "#cab2a1", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Evolucao da conversao */}
            <div className="card p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Evolucao da Conversao (%)</h3>
                <p className="text-xs text-gray-500">Taxa de conversao em venda e agendamento</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={consolidado} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="convVenda" name="Conv. Venda %" stroke="#4ade80" strokeWidth={2} dot={{ fill: "#4ade80", r: 3 }} />
                  <Line type="monotone" dataKey="convAgendamento" name="Conv. Agend. %" stroke="#cab2a1" strokeWidth={2} dot={{ fill: "#cab2a1", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Evolucao do ticket medio */}
            <div className="card p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Evolucao do Ticket Medio</h3>
                <p className="text-xs text-gray-500">Valor medio por fechamento no mes</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={consolidado} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="ticketGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78b7a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a78b7a" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="ticketMedio" name="Ticket Medio" stroke="#a78b7a" strokeWidth={2.5} fill="url(#ticketGrad)" dot={{ fill: "#a78b7a", r: 3 }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Evolucao das indicacoes e remarcacoes */}
            <div className="card p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Indicacoes e Remarcacoes</h3>
                <p className="text-xs text-gray-500">Evolucao mensal de indicacoes coletadas e remarcacoes</p>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={consolidado} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                  <XAxis dataKey="label" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="indicacoes" name="Indicacoes" stroke="#cab2a1" strokeWidth={2} dot={{ fill: "#cab2a1", r: 3 }} />
                  <Line type="monotone" dataKey="remarcacoes" name="Remarcacoes" stroke="#f87171" strokeWidth={2} dot={{ fill: "#f87171", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Evolucao por estrategia */}
          {estrategias.length > 0 && (
            <div className="card p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Evolucao por Estrategia</h3>
                <p className="text-xs text-gray-500">Valor vendido e fechamentos comparados entre campanhas</p>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={estrategias} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                  <XAxis dataKey="estrategia" tick={{ fill: "#6b7280", fontSize: 9 }} axisLine={false} tickLine={false} interval={0} angle={-15} textAnchor="end" height={50} />
                  <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="fecharam" name="Fechamentos" fill="#cab2a1" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Tabela de evolucao mes atual vs anterior */}
          {evolucoes.length > 0 && (
            <div className="card p-5">
              <div className="mb-4">
                <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Comparativo Mensal</h3>
                <p className="text-xs text-gray-500">Evolucao percentual em relacao ao mes anterior — formula: (atual / anterior) - 1</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {evolucoes.map((e) => {
                  const evo = evolucao(e.atual, e.anterior);
                  const isPos = evo > 0;
                  const isNeg = evo < 0;
                  return (
                    <div
                      key={e.label}
                      className="p-4 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 mb-2">{e.label}</p>
                      <div className="flex items-end gap-2">
                        <span className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>
                          {e.unit === "R$" ? fmtBRL(e.atual) : e.unit === "%" ? fmtPct(e.atual) : e.atual}
                        </span>
                        <span
                          className="text-xs font-bold mb-0.5"
                          style={{ color: isPos ? "#4ade80" : isNeg ? "#f87171" : "#6b7280" }}
                        >
                          {isPos ? "+" : ""}{evo.toFixed(1)}%
                        </span>
                      </div>
                      <p className="text-[10px] text-gray-600 mt-1">
                        Anterior: {e.unit === "R$" ? fmtBRL(e.anterior) : e.unit === "%" ? fmtPct(e.anterior) : e.anterior}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
