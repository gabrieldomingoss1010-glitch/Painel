"use client";

import { useMemo } from "react";
import {
  MessageSquare, DollarSign, TrendingUp, CheckCircle,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import { useData } from "@/lib/data-store";
import { followUps as defaultFollowUps } from "@/lib/mock-data";
import { calcFollowUpKPIs, fmtBRL, fmtPct } from "@/lib/commercial-metrics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-xl text-sm" style={{ background: "#16161f", border: "1px solid rgba(202,178,161,0.15)" }}>
        <p className="font-semibold mb-1" style={{ color: "#cab2a1" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="text-xs">
            {p.name}: <strong>{p.name === "Valor Recuperado" ? fmtBRL(p.value) : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const CADENCIA_COLORS: Record<string, string> = {
  "1 dia": "#cab2a1",
  "3 dias": "#a78b7a",
  "7 dias": "#8b6b5a",
  "15 dias": "#6d4f4f",
  "30 dias": "#543c3c",
};

export default function FollowUpPage() {
  const [followUps] = useData("followUps", defaultFollowUps);

  const kpis = useMemo(
    () => calcFollowUpKPIs(followUps as any[]),
    [followUps]
  );

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #cab2a1 0%, #543c3c 100%)" }}
        >
          <MessageSquare size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>
            Follow-up de Orcamentos
          </h1>
          <p className="text-xs text-gray-500">Recuperacao de orcamentos perdidos por cadencia — julho 2026</p>
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Orcamentos Acompanhados"
          value={kpis.acompanhados}
          icon={<MessageSquare size={18} />}
          color="#cab2a1"
          delay={0}
        />
        <KPICard
          title="Orcamentos Recuperados"
          value={kpis.recuperados}
          icon={<CheckCircle size={18} />}
          color="#4ade80"
          delay={60}
        />
        <KPICard
          title="Valor Recuperado"
          value={fmtBRL(kpis.valorRecuperado)}
          icon={<DollarSign size={18} />}
          color="#a78b7a"
          delay={120}
        />
        <KPICard
          title="Taxa de Recuperacao"
          value={fmtPct(kpis.taxaRecuperacao)}
          icon={<TrendingUp size={18} />}
          color={kpis.taxaRecuperacao >= 30 ? "#4ade80" : "#f87171"}
          delay={180}
        />
      </div>

      {/* Graficos por cadencia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recuperados por cadencia */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Recuperacoes por Cadencia
            </h3>
            <p className="text-xs text-gray-500">Quantitativo de orcamentos recuperados em cada intervalo</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={kpis.porCadencia} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="cadencia" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="acompanhados" name="Acompanhados" fill="rgba(202,178,161,0.3)" radius={[4, 4, 0, 0]} maxBarSize={36} />
              <Bar dataKey="recuperados" name="Recuperados" fill="#4ade80" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Valor recuperado por cadencia */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Valor Recuperado por Cadencia
            </h3>
            <p className="text-xs text-gray-500">Receita gerada pelo follow-up em cada intervalo de tempo</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={kpis.porCadencia} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="cadencia" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="valorRecuperado" name="Valor Recuperado" radius={[4, 4, 0, 0]} maxBarSize={40}>
                {kpis.porCadencia.map((entry: any) => (
                  <Cell key={entry.cadencia} fill={CADENCIA_COLORS[entry.cadencia] ?? "#cab2a1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabela detalhada por cadencia */}
      <div className="card p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
            Detalhamento por Cadencia
          </h3>
          <p className="text-xs text-gray-500">Resultados de cada intervalo de follow-up</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
                {["Cadencia", "Acompanhados", "Recuperados", "Valor Recuperado", "Taxa de Recuperacao"].map((h) => (
                  <th
                    key={h}
                    className="pb-3 pr-4 text-xs font-semibold text-right first:text-left"
                    style={{ color: "rgba(202,178,161,0.6)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {kpis.porCadencia.map((c: any) => (
                <tr
                  key={c.cadencia}
                  className="border-b last:border-0 hover:bg-white/[0.02] transition-colors"
                  style={{ borderColor: "rgba(202,178,161,0.04)" }}
                >
                  <td className="py-3 pr-4 font-semibold" style={{ color: "#cab2a1" }}>
                    {c.cadencia}
                  </td>
                  <td className="py-3 pr-4 text-right text-gray-400">{c.acompanhados}</td>
                  <td className="py-3 pr-4 text-right" style={{ color: "#4ade80" }}>{c.recuperados}</td>
                  <td className="py-3 pr-4 text-right text-gray-400">{fmtBRL(c.valorRecuperado)}</td>
                  <td className="py-3 pr-4 text-right">
                    <span
                      className="px-2 py-0.5 rounded-lg text-[10px] font-bold"
                      style={{
                        background: c.taxa > 0 ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
                        color: c.taxa > 0 ? "#4ade80" : "#6b7280",
                      }}
                    >
                      {fmtPct(c.taxa)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lista de follow-ups */}
      <div className="card p-5">
        <div className="mb-4">
          <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
            Historico de Follow-ups
          </h3>
          <p className="text-xs text-gray-500">Todos os acompanhamentos registrados</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs whitespace-nowrap">
            <thead>
              <tr className="border-b" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
                {["Cliente", "Orcamento", "Data FU", "Cadencia", "Canal", "Responsavel", "Resultado", "Recuperado"].map((h) => (
                  <th
                    key={h}
                    className="pb-3 pr-4 font-semibold"
                    style={{ color: "rgba(202,178,161,0.6)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(followUps as any[]).map((f: any, index: number) => (
                <tr
                  key={f.idFollowUp || `fu-${index}`}
                  className="border-b last:border-0 hover:bg-white/[0.02] transition-colors"
                  style={{ borderColor: "rgba(202,178,161,0.04)" }}
                >
                  <td className="py-3 pr-4 font-medium" style={{ color: "#f0ece8" }}>{f.cliente}</td>
                  <td className="py-3 pr-4 text-gray-400">{fmtBRL(f.valorOrcamento)}</td>
                  <td className="py-3 pr-4 text-gray-400">{f.dataFollowUp}</td>
                  <td className="py-3 pr-4" style={{ color: "#cab2a1" }}>{f.cadencia}</td>
                  <td className="py-3 pr-4 text-gray-400">{f.canal}</td>
                  <td className="py-3 pr-4 text-gray-400">{f.responsavel}</td>
                  <td className="py-3 pr-4 text-gray-400">{f.resultado}</td>
                  <td className="py-3 pr-4">
                    <span
                      className="px-2 py-0.5 rounded-lg text-[10px] font-bold"
                      style={{
                        background: f.vendaRecuperada === "Sim" ? "rgba(74,222,128,0.1)" : "rgba(255,255,255,0.04)",
                        color: f.vendaRecuperada === "Sim" ? "#4ade80" : "#6b7280",
                      }}
                    >
                      {f.vendaRecuperada === "Sim" ? `Sim — ${fmtBRL(f.valorRecuperado)}` : "Nao"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(followUps as any[]).length === 0 && (
            <div className="py-12 text-center text-gray-600 text-sm">
              Nenhum follow-up registrado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
