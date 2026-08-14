"use client";

import { useMemo, useState } from "react";
import {
  ClipboardList, Users, Star, CalendarCheck,
  TrendingUp, DollarSign, AlertCircle, Heart,
  UserX, XCircle, RefreshCw, ChevronDown,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import PeriodSelector from "@/components/ui/PeriodSelector";
import { useData } from "@/lib/data-store";
import {
  agenda as defaultAgenda,
  oportunidades as defaultOportunidades,
  vendas as defaultVendas,
  indicacoes as defaultIndicacoes,
} from "@/lib/mock-data";
import {
  calcOperacionalKPIs,
  fmtBRL,
  fmtPct,
  filterByPeriod,
  getAvailablePeriods,
} from "@/lib/commercial-metrics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="px-3 py-2 rounded-xl text-sm" style={{ background: "#16161f", border: "1px solid rgba(202,178,161,0.15)" }}>
        <p className="font-semibold mb-1" style={{ color: "#cab2a1" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="text-xs">{p.name}: <strong>{p.value}</strong></p>
        ))}
      </div>
    );
  }
  return null;
};

const COLORS = ["#f87171", "#fb923c", "#fbbf24", "#cab2a1", "#a78b7a", "#8b6b5a", "#6d4f4f"];

export default function OperacionalPage() {
  const [agendaRaw] = useData("agenda", defaultAgenda);
  const [oportunidadesRaw] = useData("oportunidades", defaultOportunidades);
  const [vendasRaw] = useData("vendas", defaultVendas);
  const [indicacoesRaw] = useData("indicacoes", defaultIndicacoes);

  const defaultMonth = `mes:${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [globalSettings, setGlobalSettings] = useData("globalSettings", { periodo: defaultMonth });
  const selectedPeriod = globalSettings.periodo;
  const setSelectedPeriod = (val: string) => setGlobalSettings({ ...globalSettings, periodo: val });

  const availablePeriods = useMemo(
    () => getAvailablePeriods([
      { data: agendaRaw as any[], dateField: "dataAgendamento" },
      { data: oportunidadesRaw as any[], dateField: "data" },
      { data: vendasRaw as any[], dateField: "dataVenda" },
    ]),
    [agendaRaw, oportunidadesRaw, vendasRaw]
  );

  const agenda = useMemo(() => filterByPeriod(agendaRaw as any[], "dataAgendamento", selectedPeriod), [agendaRaw, selectedPeriod]);
  const oportunidades = useMemo(() => filterByPeriod(oportunidadesRaw as any[], "data", selectedPeriod), [oportunidadesRaw, selectedPeriod]);
  const vendas = useMemo(() => filterByPeriod(vendasRaw as any[], "dataVenda", selectedPeriod), [vendasRaw, selectedPeriod]);
  const indicacoes = useMemo(() => filterByPeriod(indicacoesRaw as any[], "data", selectedPeriod), [indicacoesRaw, selectedPeriod]);

  const kpis = useMemo(
    () => calcOperacionalKPIs(agenda, oportunidades, vendas, indicacoes),
    [agenda, oportunidades, vendas, indicacoes]
  );

  const getPeriodLabel = () => {
    if (selectedPeriod === "all") return "Todo o período";
    for (const group of Object.values(availablePeriods)) {
      const found = group.find((m: any) => m.key === selectedPeriod);
      if (found) return found.label;
    }
    return selectedPeriod;
  };

  const selectedLabel = getPeriodLabel();

  return (
    <div className="space-y-6 page-enter">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #cab2a1 0%, #543c3c 100%)" }}
          >
            <ClipboardList size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>
              Painel Recepcao
            </h1>
            <p className="text-xs text-gray-500">Oportunidades, agenda e indicacoes — {selectedLabel}</p>
          </div>
        </div>
        
        <PeriodSelector 
          availablePeriods={availablePeriods} 
          selectedPeriod={selectedPeriod} 
          onChange={setSelectedPeriod} 
        />
      </div>

      {/* Oportunidades */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Oportunidades</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard title="Avaliacoes" value={kpis.avaliacoes} icon={<Star size={18} />} color="#cab2a1" delay={0} />
          <KPICard title="Prospectados" value={kpis.prospectados} icon={<Users size={18} />} color="#a78b7a" delay={60} />
          <KPICard title="Renovacoes" value={kpis.renovacoes} icon={<RefreshCw size={18} />} color="#8b6b5a" delay={120} />
          <KPICard title="Ticket Baixo" value={kpis.ticketBaixo} icon={<TrendingUp size={18} />} color="#b09080" delay={180} />
          <KPICard title="Total Oportunidades" value={kpis.totalOpportunidades} icon={<ClipboardList size={18} />} color="#c4a090" delay={240} />
          <KPICard
            title="Aproveitamento"
            value={fmtPct(kpis.aproveitamento)}
            icon={<TrendingUp size={18} />}
            color="#4ade80"
            delay={300}
          />
        </div>
      </section>

      {/* Vendas e Ticket */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Vendas</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <KPICard title="Planos Vendidos" value={kpis.planosVendidos} icon={<Star size={18} />} color="#cab2a1" delay={0} />
          <KPICard
            title="Valor Total Vendido"
            value={fmtBRL(kpis.valorTotal)}
            icon={<DollarSign size={18} />}
            color="#a78b7a"
            delay={60}
          />
          <KPICard
            title="Ticket Medio"
            value={fmtBRL(kpis.ticketMedio)}
            icon={<DollarSign size={18} />}
            color="#8b6b5a"
            delay={120}
          />
          <KPICard
            title="Orcamentos Nao Fechados"
            value={kpis.orcamentosNaoFechados}
            icon={<AlertCircle size={18} />}
            color="#f87171"
            delay={180}
          />
          <KPICard
            title="Valor Nao Fechado"
            value={fmtBRL(kpis.valorOrcamentosNaoFechados)}
            icon={<DollarSign size={18} />}
            color="#f87171"
            delay={240}
          />
        </div>
      </section>

      {/* Indicacoes */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Indicacoes</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

          <KPICard title="Indicacoes Coletadas" value={kpis.indColetadas} icon={<Heart size={18} />} color="#a78b7a" delay={60} />

        </div>
      </section>

      {/* Agenda */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Agenda</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          <KPICard title="Agendamentos" value={kpis.totalAgendamentos} icon={<CalendarCheck size={18} />} color="#cab2a1" delay={0} />
          <KPICard title="Comparecimentos" value={kpis.comparecimentos} icon={<CalendarCheck size={18} />} color="#4ade80" delay={60} />
          <KPICard title="Remarcacoes" value={kpis.remarcacoes} icon={<RefreshCw size={18} />} color="#fb923c" delay={120} />
          <KPICard title="Cancelamentos" value={kpis.cancelamentos} icon={<XCircle size={18} />} color="#f87171" delay={180} />
          <KPICard title="Faltas" value={kpis.faltas} icon={<UserX size={18} />} color="#f87171" delay={240} />
          <div className="card p-4 space-y-2">
            <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">Taxas da Agenda</p>
            <div className="space-y-1.5">
              {[
                { label: "Comparecimento", value: kpis.taxaComparecimento, color: "#4ade80" },
                { label: "Remarcacao", value: kpis.taxaRemarcacao, color: "#fb923c" },
                { label: "Ausencia", value: kpis.taxaAusencia, color: "#f87171" },
              ].map((t) => (
                <div key={t.label}>
                  <div className="flex justify-between text-[10px] mb-0.5">
                    <span className="text-gray-400">{t.label}</span>
                    <span style={{ color: t.color }}>{fmtPct(t.value)}</span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: "#1e1e2a" }}>
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${Math.min(t.value, 100)}%`, background: t.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Motivos de Perda */}
      {kpis.motivosPerdas.length > 0 && (
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Perdas por Motivo
            </h3>
            <p className="text-xs text-gray-500">Frequencia de cada motivo de perda</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart
                data={kpis.motivosPerdas}
                layout="vertical"
                margin={{ top: 0, right: 16, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="motivo"
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={110}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Ocorrencias" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {kpis.motivosPerdas.map((_: any, i: number) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              {kpis.motivosPerdas.map((m: any, i: number) => (
                <div key={m.motivo} className="flex items-center gap-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: COLORS[i % COLORS.length] }}
                  />
                  <span className="text-xs text-gray-400 flex-1">{m.motivo}</span>
                  <span className="text-xs font-bold" style={{ color: COLORS[i % COLORS.length] }}>
                    {m.count}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
