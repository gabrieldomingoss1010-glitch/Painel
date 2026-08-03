"use client";

import { useMemo, useState } from "react";
import {
  Users, CalendarCheck, TrendingUp, DollarSign,
  Heart, Star, AlertCircle, Award, Target,
  Video, Repeat, Phone, UserCheck, ChevronDown,
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import { useData } from "@/lib/data-store";
import {
  contatos as defaultContatos,
  agenda as defaultAgenda,
  oportunidades as defaultOportunidades,
  vendas as defaultVendas,
  followUps as defaultFollowUps,
  indicacoes as defaultIndicacoes,
} from "@/lib/mock-data";
import {
  calcDashboardKPIs,
  groupByMotivoPerdas,
  groupByVideo,
  fmtBRL,
  fmtPct,
  safeDivide,
  filterByMonth,
  getAvailableMonths,
} from "@/lib/commercial-metrics";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 rounded-xl text-sm"
        style={{ background: "#16161f", border: "1px solid rgba(202,178,161,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}
      >
        <p className="font-semibold mb-1" style={{ color: "#cab2a1" }}>{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="text-xs">
            {p.name}: <strong>{p.value}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function DashboardPage() {
  const [contatosRaw] = useData("contatos", defaultContatos);
  const [agendaRaw] = useData("agenda", defaultAgenda);
  const [oportunidadesRaw] = useData("oportunidades", defaultOportunidades);
  const [vendasRaw] = useData("vendas", defaultVendas);
  const [followUpsRaw] = useData("followUps", defaultFollowUps);
  const [indicacoesRaw] = useData("indicacoes", defaultIndicacoes);

  // Default to current month
  const defaultMonth = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  const availableMonths = useMemo(
    () =>
      getAvailableMonths([
        { data: contatosRaw as any[], dateField: "dataContato" },
        { data: vendasRaw as any[], dateField: "dataVenda" },
        { data: agendaRaw as any[], dateField: "dataAgendamento" },
      ]),
    [contatosRaw, vendasRaw, agendaRaw]
  );

  // Filtered data
  const contatos = useMemo(() => filterByMonth(contatosRaw as any[], "dataContato", selectedMonth), [contatosRaw, selectedMonth]);
  const agenda = useMemo(() => filterByMonth(agendaRaw as any[], "dataAgendamento", selectedMonth), [agendaRaw, selectedMonth]);
  const oportunidades = useMemo(() => filterByMonth(oportunidadesRaw as any[], "data", selectedMonth), [oportunidadesRaw, selectedMonth]);
  const vendas = useMemo(() => filterByMonth(vendasRaw as any[], "dataVenda", selectedMonth), [vendasRaw, selectedMonth]);
  const followUps = useMemo(() => filterByMonth(followUpsRaw as any[], "dataFollowUp", selectedMonth), [followUpsRaw, selectedMonth]);
  const indicacoes = useMemo(() => filterByMonth(indicacoesRaw as any[], "data", selectedMonth), [indicacoesRaw, selectedMonth]);

  const kpis = useMemo(
    () =>
      calcDashboardKPIs(contatos, agenda, oportunidades, vendas, followUps, indicacoes),
    [contatos, agenda, oportunidades, vendas, followUps, indicacoes]
  );

  const motivosPerdas = useMemo(
    () => groupByMotivoPerdas(oportunidades),
    [oportunidades]
  );

  const videosData = useMemo(
    () => groupByVideo(contatos, vendas),
    [contatos, vendas]
  );

  const selectedLabel = availableMonths.find((m) => m.key === selectedMonth)?.label || selectedMonth;

  const BAR_COLORS = ["#cab2a1", "#a78b7a", "#8b6b5a", "#6d4f4f", "#543c3c"];

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
              Painel CEO
            </h1>
            <p className="text-xs text-gray-500">Visao executiva do comercial — {selectedLabel}</p>
          </div>
        </div>
        {/* Month Selector */}
        <div className="relative">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="appearance-none pl-4 pr-9 py-2 rounded-xl text-sm font-semibold cursor-pointer outline-none"
            style={{
              background: "rgba(202,178,161,0.08)",
              border: "1px solid rgba(202,178,161,0.15)",
              color: "#cab2a1",
            }}
          >
            {availableMonths.map((m) => (
              <option key={m.key} value={m.key} style={{ background: "#111118", color: "#f0ece8" }}>
                {m.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#cab2a1" }} />
        </div>
      </div>

      {/* KPI Grid — linha 1: funil principal */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Funil Comercial</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
          <KPICard title="Contatos" value={kpis.totalContatos} icon={<Users size={18} />} color="#cab2a1" delay={0} />
          <KPICard title="Agendamentos" value={kpis.totalAgendamentos} icon={<CalendarCheck size={18} />} color="#a78b7a" delay={60} />
          <KPICard title="Comparecimentos" value={kpis.comparecimentos} icon={<UserCheck size={18} />} color="#8b6b5a" delay={120} />
          <KPICard title="Fechamentos" value={kpis.totalFechamentos} icon={<Award size={18} />} color="#cab2a1" delay={180} />
          <KPICard title="Oportunidades" value={kpis.totalOportunidades} icon={<Target size={18} />} color="#b09080" delay={240} />
        </div>
      </section>

      {/* KPI Grid — linha 2: financeiros e indicacoes */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Financeiro & Retencao</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-4">
          <KPICard
            title="Valor Vendido"
            value={fmtBRL(kpis.valorTotal)}
            icon={<DollarSign size={18} />}
            color="#cab2a1"
            delay={0}
          />
          <KPICard
            title="Ticket Medio"
            value={fmtBRL(kpis.ticketMedio)}
            icon={<DollarSign size={18} />}
            color="#a78b7a"
            delay={60}
          />
          <KPICard
            title="Conversao Geral"
            value={fmtPct(kpis.convGeral)}
            icon={<TrendingUp size={18} />}
            color="#8b6b5a"
            delay={120}
          />
          <KPICard title="Indicacoes Coletadas" value={kpis.indicacoesColetadas} icon={<Heart size={18} />} color="#c4a090" delay={180} />
          <KPICard title="Remarcacoes" value={kpis.remarcacoes} icon={<Repeat size={18} />} color="#f87171" delay={240} />
        </div>
      </section>

      {/* Destaque Cards — Melhores e Piores */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Destaques & Alertas</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {[
            { label: "Melhor Estrategia", value: kpis.melhorEstrategia, color: "#4ade80", icon: <Star size={14} /> },
            { label: "Pior Estrategia", value: kpis.piorEstrategia, color: "#f87171", icon: <AlertCircle size={14} /> },
            { label: "Maior Motivo de Perda", value: kpis.maiorMotivoPerdas, color: "#fb923c", icon: <AlertCircle size={14} /> },
            { label: "Melhor Recepcionista", value: kpis.melhorRecepcao, color: "#cab2a1", icon: <Award size={14} /> },
            { label: "Melhor Comercial", value: kpis.melhorComercial, color: "#cab2a1", icon: <Award size={14} /> },
            { label: "Video c/ Mais Clientes", value: kpis.videoMaisClientes || "-", color: "#a78b7a", icon: <Video size={14} /> },
            { label: "Video que Mais Vendeu", value: kpis.videoMaisVendas || "-", color: "#8b6b5a", icon: <Video size={14} /> },
            { label: "Video Maior Ticket", value: kpis.videoMaiorTicket || "-", color: "#c4a090", icon: <Video size={14} /> },
          ].map((item, i) => (
            <div
              key={i}
              className="card p-4 flex items-start gap-3"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: `${item.color}20`, color: item.color }}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-medium text-gray-500 uppercase tracking-wide leading-tight">
                  {item.label}
                </p>
                <p
                  className="text-sm font-bold mt-1 truncate"
                  style={{ color: item.color }}
                >
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Motivos de Perda */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Motivos de Perda
            </h3>
            <p className="text-xs text-gray-500">Frequencia por categoria</p>
          </div>
          {motivosPerdas.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={motivosPerdas} layout="vertical" margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="motivo"
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  width={100}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" name="Ocorrencias" radius={[0, 4, 4, 0]} maxBarSize={20}>
                  {motivosPerdas.map((_, idx) => (
                    <Cell key={idx} fill={BAR_COLORS[idx % BAR_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-gray-600 text-sm">
              Nenhuma perda registrada
            </div>
          )}
        </div>

        {/* Performance por Video */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Performance por Video / Criativo
            </h3>
            <p className="text-xs text-gray-500">Contatos vs. vendas por anuncio</p>
          </div>
          {videosData.length > 0 ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={videosData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis
                  dataKey="video"
                  tick={{ fill: "#6b7280", fontSize: 9 }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="contatos" name="Contatos" fill="rgba(202,178,161,0.4)" radius={[4, 4, 0, 0]} maxBarSize={28} />
                <Bar dataKey="vendas" name="Vendas" fill="#cab2a1" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[220px] text-gray-600 text-sm">
              Nenhum dado de video encontrado
            </div>
          )}
        </div>
      </div>

      {/* Tabela de Videos */}
      {videosData.length > 0 && (
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
              Ranking de Videos / Anuncios / Criativos
            </h3>
            <p className="text-xs text-gray-500">Comparativo completo de performance</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
                  {["Video / Criativo", "Contatos", "Vendas", "Valor Vendido", "Ticket Medio"].map((h) => (
                    <th
                      key={h}
                      className="pb-3 text-xs font-semibold text-right first:text-left pr-4"
                      style={{ color: "rgba(202,178,161,0.6)" }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {videosData.map((v, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 hover:bg-white/[0.02] transition-colors"
                    style={{ borderColor: "rgba(202,178,161,0.04)" }}
                  >
                    <td className="py-3 pr-4 font-medium" style={{ color: "#f0ece8" }}>{v.video}</td>
                    <td className="py-3 pr-4 text-right" style={{ color: "#cab2a1" }}>{v.contatos}</td>
                    <td className="py-3 pr-4 text-right" style={{ color: "#cab2a1" }}>{v.vendas}</td>
                    <td className="py-3 pr-4 text-right text-gray-400">{fmtBRL(v.valorVendido)}</td>
                    <td className="py-3 pr-4 text-right text-gray-400">{fmtBRL(v.ticketMedio)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
