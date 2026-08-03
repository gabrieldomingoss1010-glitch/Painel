"use client";

import { useMemo, useState } from "react";
import {
  TrendingUp, Users, Target, DollarSign, Award, ArrowRight, ChevronDown,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import FunnelChart from "@/components/charts/FunnelChart";
import { useData } from "@/lib/data-store";
import {
  contatos as defaultContatos,
  agenda as defaultAgenda,
  vendas as defaultVendas,
} from "@/lib/mock-data";
import {
  calcComercialFunil,
  groupByResponsavelComercial,
  groupByStrategy,
  fmtBRL,
  fmtPct,
  safeDivide,
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
            {p.name}: <strong>{typeof p.value === "number" && p.name.includes("Valor")
              ? fmtBRL(p.value)
              : p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function ComercialPage() {
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

  const funil = useMemo(
    () => calcComercialFunil(contatos, agenda, vendas),
    [contatos, agenda, vendas]
  );

  const rankingComercial = useMemo(
    () => groupByResponsavelComercial(vendas),
    [vendas]
  );

  const estrategias = useMemo(
    () => groupByStrategy(contatos, agenda, vendas),
    [contatos, agenda, vendas]
  );

  // Taxas entre etapas do funil para os KPI cards
  const totalContatos = contatos.length;
  const prospectados = contatos.filter((c: any) => c.foiProspectado === "Sim").length;
  const agendamentos = agenda.length;
  const comparecimentos = agenda.filter((a: any) => a.statusAgenda === "Compareceu").length;
  const fechamentos = vendas.length;
  const valorTotal = vendas.reduce((acc: number, v: any) => acc + (Number(v.valorVendido) || 0), 0);

  const taxaProspeccao = safeDivide(prospectados, totalContatos) * 100;
  const taxaAgendamento = safeDivide(agendamentos, prospectados) * 100;
  const taxaComparecimento = safeDivide(comparecimentos, agendamentos) * 100;
  const taxaFechamento = safeDivide(fechamentos, comparecimentos) * 100;
  const ticketMedio = safeDivide(valorTotal, fechamentos);

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
            <TrendingUp size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>
              Painel Comercial
            </h1>
            <p className="text-xs text-gray-500">Funil de vendas e performance comercial — {selectedLabel}</p>
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

      {/* Taxas do Funil — KPI Cards */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Taxas do Funil</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <KPICard
            title="Taxa de Prospeccao"
            value={fmtPct(taxaProspeccao)}
            subtitle="Prospectados / Contatos"
            icon={<Users size={18} />}
            color="#cab2a1"
            delay={0}
          />
          <KPICard
            title="Taxa de Agendamento"
            value={fmtPct(taxaAgendamento)}
            subtitle="Agendamentos / Prospectados"
            icon={<Target size={18} />}
            color="#a78b7a"
            delay={60}
          />
          <KPICard
            title="Taxa de Comparecimento"
            value={fmtPct(taxaComparecimento)}
            subtitle="Comparecimentos / Agendamentos"
            icon={<ArrowRight size={18} />}
            color="#8b6b5a"
            delay={120}
          />
          <KPICard
            title="Taxa de Fechamento"
            value={fmtPct(taxaFechamento)}
            subtitle="Fechamentos / Comparecimentos"
            icon={<Award size={18} />}
            color="#4ade80"
            delay={180}
          />
          <KPICard
            title="Ticket Medio"
            value={fmtBRL(ticketMedio)}
            subtitle="Valor medio por venda"
            icon={<DollarSign size={18} />}
            color="#cab2a1"
            delay={240}
          />
        </div>
      </section>

      {/* Funil + Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Funil Comercial */}
        <div className="card p-5">
          <div className="mb-5">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Funil Comercial
            </h3>
            <p className="text-xs text-gray-500">Contatos → Prospectados → Follow-ups → Agendamentos → Comparecimentos → Fechamentos</p>
          </div>
          <FunnelChart data={funil} />
          {/* Taxas entre etapas */}
          <div className="mt-4 space-y-1">
            {funil.slice(1).map((step, i) => (
              <div key={step.etapa} className="flex items-center justify-between text-[10px]">
                <span className="text-gray-500">
                  {funil[i].etapa} → {step.etapa}
                </span>
                <span style={{ color: "#cab2a1" }} className="font-bold">
                  {step.taxa}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking Comercial */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Ranking Comercial
            </h3>
            <p className="text-xs text-gray-500">Performance por responsavel de vendas</p>
          </div>
          {rankingComercial.length > 0 ? (
            <div className="space-y-3">
              {rankingComercial.map((resp, idx) => (
                <div
                  key={resp.responsavel}
                  className="flex items-center gap-4 p-3 rounded-xl transition-all hover:bg-white/[0.02]"
                  style={{ border: "1px solid rgba(202,178,161,0.06)" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{
                      background:
                        idx === 0
                          ? "linear-gradient(135deg, #cab2a1, #543c3c)"
                          : idx === 1
                          ? "rgba(202,178,161,0.15)"
                          : "rgba(255,255,255,0.05)",
                      color: idx === 0 ? "white" : "#cab2a1",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium" style={{ color: "#f0ece8" }}>
                      {resp.responsavel}
                    </p>
                    <p className="text-xs text-gray-500">{resp.vendas} venda{resp.vendas !== 1 ? "s" : ""}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold" style={{ color: "#cab2a1" }}>
                      {fmtBRL(resp.valorVendido)}
                    </p>
                    <p className="text-[10px] text-gray-500">Ticket: {fmtBRL(resp.ticketMedio)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-gray-600 text-sm">
              Nenhuma venda registrada
            </div>
          )}
        </div>
      </div>

      {/* Performance por Estrategia */}
      {estrategias.length > 0 && (
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Conversao por Estrategia
            </h3>
            <p className="text-xs text-gray-500">Comparativo de contatos e fechamentos por campanha</p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={estrategias} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis
                dataKey="estrategia"
                tick={{ fill: "#6b7280", fontSize: 9 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-15}
                textAnchor="end"
                height={40}
              />
              <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="contatos" name="Contatos" fill="rgba(202,178,161,0.35)" radius={[4, 4, 0, 0]} maxBarSize={30} />
              <Bar dataKey="agendamentos" name="Agendamentos" fill="rgba(202,178,161,0.6)" radius={[4, 4, 0, 0]} maxBarSize={30} />
              <Bar dataKey="fecharam" name="Fechamentos" fill="#cab2a1" radius={[4, 4, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
