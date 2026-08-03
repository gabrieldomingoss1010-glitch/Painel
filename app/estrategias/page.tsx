"use client";

import { useMemo, useState } from "react";
import { Target, TrendingUp, DollarSign, Users, ChevronDown } from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import { useData } from "@/lib/data-store";
import {
  contatos as defaultContatos,
  agenda as defaultAgenda,
  vendas as defaultVendas,
} from "@/lib/mock-data";
import {
  groupByStrategy,
  fmtBRL,
  fmtPct,
  filterByMonth,
  getAvailableMonths,
} from "@/lib/commercial-metrics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-xl text-sm" style={{ background: "#16161f", border: "1px solid rgba(202,178,161,0.15)" }}>
        <p className="font-semibold mb-1" style={{ color: "#cab2a1" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="text-xs">
            {p.name}: <strong>{p.name.includes("Conversao") ? fmtPct(p.value) : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function EstrategiasPage() {
  const [contatosRaw] = useData("contatos", defaultContatos);
  const [agendaRaw] = useData("agenda", defaultAgenda);
  const [vendasRaw] = useData("vendas", defaultVendas);

  const defaultMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  const availableMonths = useMemo(
    () => getAvailableMonths([
      { data: contatosRaw as any[], dateField: "dataContato" },
      { data: vendasRaw as any[], dateField: "dataVenda" },
      { data: agendaRaw as any[], dateField: "dataAgendamento" },
    ]),
    [contatosRaw, vendasRaw, agendaRaw]
  );

  const contatos = useMemo(() => filterByMonth(contatosRaw as any[], "dataContato", selectedMonth), [contatosRaw, selectedMonth]);
  const agenda = useMemo(() => filterByMonth(agendaRaw as any[], "dataAgendamento", selectedMonth), [agendaRaw, selectedMonth]);
  const vendas = useMemo(() => filterByMonth(vendasRaw as any[], "dataVenda", selectedMonth), [vendasRaw, selectedMonth]);

  const estrategias = useMemo(
    () => groupByStrategy(contatos, agenda, vendas),
    [contatos, agenda, vendas]
  );

  const totalContatos = contatos.length;
  const totalVendas = vendas.length;
  const totalValor = vendas.reduce((a: number, v: any) => a + (Number(v.valorVendido) || 0), 0);

  const selectedLabel = availableMonths.find((m) => m.key === selectedMonth)?.label || selectedMonth;

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #cab2a1 0%, #543c3c 100%)" }}
          >
            <Target size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>
              Estrategias e Campanhas
            </h1>
            <p className="text-xs text-gray-500">Desempenho por campanha e midia — {selectedLabel}</p>
          </div>
        </div>
        <div className="relative">
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 rounded-xl text-sm font-semibold cursor-pointer outline-none"
            style={{ background: "rgba(202,178,161,0.08)", border: "1px solid rgba(202,178,161,0.15)", color: "#cab2a1" }}>
            {availableMonths.map((m) => (
              <option key={m.key} value={m.key} style={{ background: "#111118", color: "#f0ece8" }}>{m.label}</option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#cab2a1" }} />
        </div>
      </div>

      {/* KPIs de resumo */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Estrategias Ativas" value={estrategias.length} icon={<Target size={18} />} color="#cab2a1" delay={0} />
        <KPICard title="Total Contatos" value={totalContatos} icon={<Users size={18} />} color="#a78b7a" delay={60} />
        <KPICard title="Total Fechamentos" value={totalVendas} icon={<TrendingUp size={18} />} color="#8b6b5a" delay={120} />
        <KPICard title="Valor Total" value={fmtBRL(totalValor)} icon={<DollarSign size={18} />} color="#4ade80" delay={180} />
      </div>

      {/* Grafico de conversao por estrategia */}
      <div className="card p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
            Conversao Geral por Estrategia (%)
          </h3>
          <p className="text-xs text-gray-500">Fechamentos / Contatos por campanha</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={estrategias} margin={{ top: 5, right: 10, left: -10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis
              dataKey="estrategia"
              tick={{ fill: "#6b7280", fontSize: 9 }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-20}
              textAnchor="end"
              height={50}
            />
            <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v.toFixed(0)}%`} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="convGeral" name="Conversao Geral" fill="#cab2a1" radius={[4, 4, 0, 0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabela detalhada */}
      <div className="card p-5 overflow-hidden">
        <div className="mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
            Tabela de Performance por Estrategia
          </h3>
          <p className="text-xs text-gray-500">Todas as metricas por campanha — ordenado por valor vendido</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
                {[
                  "Estrategia",
                  "Contatos",
                  "Agendamentos",
                  "Compareceram",
                  "Fecharam",
                  "Valor Vendido",
                  "Ticket Medio",
                  "Conv. Geral",
                  "Conv. Agend.",
                  "Conv. Comp.",
                  "Conv. Fecha.",
                ].map((h) => (
                  <th
                    key={h}
                    className="pb-3 pr-4 font-semibold text-right first:text-left"
                    style={{ color: "rgba(202,178,161,0.6)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {estrategias.map((est, i) => (
                <tr
                  key={est.estrategia}
                  className="border-b last:border-0 hover:bg-white/[0.02] transition-colors"
                  style={{ borderColor: "rgba(202,178,161,0.04)" }}
                >
                  <td className="py-3 pr-4 font-semibold" style={{ color: "#f0ece8" }}>
                    {est.estrategia}
                  </td>
                  <td className="py-3 pr-4 text-right" style={{ color: "#cab2a1" }}>{est.contatos}</td>
                  <td className="py-3 pr-4 text-right text-gray-400">{est.agendamentos}</td>
                  <td className="py-3 pr-4 text-right text-gray-400">{est.compareceram}</td>
                  <td className="py-3 pr-4 text-right" style={{ color: "#4ade80" }}>{est.fecharam}</td>
                  <td className="py-3 pr-4 text-right text-gray-400">{fmtBRL(est.valorVendido)}</td>
                  <td className="py-3 pr-4 text-right text-gray-400">{fmtBRL(est.ticketMedio)}</td>
                  <td className="py-3 pr-4 text-right">
                    <span
                      className="px-2 py-0.5 rounded-lg text-[10px] font-bold"
                      style={{
                        background: "rgba(202,178,161,0.1)",
                        color: "#cab2a1",
                      }}
                    >
                      {fmtPct(est.convGeral)}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-right text-gray-400">{fmtPct(est.convAgendamento)}</td>
                  <td className="py-3 pr-4 text-right text-gray-400">{fmtPct(est.convComparecimento)}</td>
                  <td className="py-3 pr-4 text-right text-gray-400">{fmtPct(est.convFechamento)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {estrategias.length === 0 && (
            <div className="py-12 text-center text-gray-600 text-sm">
              Nenhuma estrategia encontrada nos dados.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
