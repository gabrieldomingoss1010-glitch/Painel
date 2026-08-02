"use client";

import { useState, useRef } from "react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from "recharts";
import KPICard from "@/components/cards/KPICard";
import { Star, Users, TrendingUp, Award } from "lucide-react";
import { useData } from "@/lib/data-store";
import { filterByPeriod, parseDate } from "@/lib/date-utils";
import {
  avaliacaoComportamental as defaultAvaliacaoComportamental,
} from "@/lib/mock-data";
import { Download, Upload, Check, AlertCircle } from "lucide-react";
import { downloadCSV, convertToCSV, parseCSV } from "@/lib/excel-utils";

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

const COLORS = ["#cab2a1", "#8b6b5a", "#a07060", "#c4a090", "#b09080"];

export default function NPSPage() {
  const [{ periodo }] = useData("globalSettings", { periodo: "Este mês" });
  const [atendimentosBrutos] = useData("atendimentosBrutos", []);
  const [comportamentalStored, setComportamentalStored] = useData("avaliacaoComportamental", defaultAvaliacaoComportamental);

  const fileEquipeRef = useRef<HTMLInputElement>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const triggerSuccessFeedback = () => {
    setSaveSuccess(true);
    setErrorMessage("");
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleExportEquipeExcel = () => {
    const csv = convertToCSV(
      comportamentalStored,
      ["Profissional", "Comunicação", "Organização", "Proatividade", "Postura", "Autonomia", "Média NPS"],
      ["profissional", "comunicacao", "organizacao", "proatividade", "postura", "autonomia", "media"]
    );
    downloadCSV(csv, "equipe_nps.csv");
  };

  const handleImportEquipeExcel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const files = e.target.files;
    if (!files || files.length === 0) return;
    fileReader.onload = (event) => {
      try {
        const parsed = parseCSV(event.target?.result as string, [
          "profissional", "comunicacao", "organizacao", "proatividade", "postura", "autonomia", "media"
        ]);
        if (parsed.length === 0) {
          setErrorMessage("O arquivo não possui registros válidos de profissionais.");
          return;
        }
        const updated = parsed.map(p => {
          const media = (p.comunicacao + p.organizacao + p.proatividade + p.postura + p.autonomia) / 5;
          return { ...p, media };
        });
        setComportamentalStored(updated as any);
        triggerSuccessFeedback();
      } catch (err) {
        setErrorMessage("Erro ao ler o arquivo Excel CSV.");
      }
    };
    fileReader.readAsText(files[0]);
  };

  const atendimentosFiltrados = filterByPeriod(atendimentosBrutos as any[], periodo);
  let avaliacoesComNps = atendimentosFiltrados.filter(a => a.nps !== null && a.status === "Realizado");
  const hasFilteredData = avaliacoesComNps.length > 0;

  if (!hasFilteredData) {
    avaliacoesComNps = (atendimentosBrutos as any[]).filter(a => a.nps !== null && a.status === "Realizado");
  }

  const npsMedia = avaliacoesComNps.length ? Number((avaliacoesComNps.reduce((acc, a) => acc + a.nps, 0) / avaliacoesComNps.length).toFixed(1)) : 0;
  const avaliacoesRecebidas = avaliacoesComNps.length;
  const promotoresCount = avaliacoesComNps.filter(a => a.nps >= 9).length;
  const promotores = avaliacoesRecebidas ? Math.round((promotoresCount / avaliacoesRecebidas) * 100) : 0;

  const rawComportamental = Object.values(avaliacoesComNps.reduce((acc: any, a) => {
    if (!acc[a.profissional]) {
      acc[a.profissional] = {
        nome: a.profissional,
        npsTotal: 0,
        npsCount: 0,
        atendimentoTotal: 0,
        comportamentoTotal: 0,
        posturaTotal: 0,
        autonomiaTotal: 0,
        produtividadeTotal: 0,
        evalCount: 0
      };
    }
    acc[a.profissional].npsTotal += a.nps;
    acc[a.profissional].npsCount++;

    if (a.comportamental) {
      acc[a.profissional].atendimentoTotal += a.comportamental.atendimento;
      acc[a.profissional].comportamentoTotal += a.comportamental.comportamento;
      acc[a.profissional].posturaTotal += a.comportamental.postura;
      acc[a.profissional].autonomiaTotal += a.comportamental.autonomia;
      acc[a.profissional].produtividadeTotal += a.comportamental.produtividade;
      acc[a.profissional].evalCount++;
    }
    return acc;
  }, {})).map((p: any) => {
    const media = p.npsCount ? Number((p.npsTotal / p.npsCount).toFixed(1)) : 0;
    const e = p.evalCount || 1;
    return {
      profissional: p.nome,
      atendimento: Number((p.atendimentoTotal / e).toFixed(1)),
      comportamento: Number((p.comportamentoTotal / e).toFixed(1)),
      postura: Number((p.posturaTotal / e).toFixed(1)),
      autonomia: Number((p.autonomiaTotal / e).toFixed(1)),
      produtividade: Number((p.produtividadeTotal / e).toFixed(1)),
      media,
    };
  }).sort((a: any, b: any) => b.media - a.media);

  const comportamental = rawComportamental.length > 0 ? rawComportamental : [];
  const [selectedProf, setSelectedProf] = useState(0);

  const p = comportamental[selectedProf] || comportamental[0] || {
    profissional: "Nenhum", atendimento: 0, comportamento: 0, postura: 0, autonomia: 0, produtividade: 0, media: 0
  };

  const radarData = [
    { categoria: "Atendimento", valor: p.atendimento },
    { categoria: "Comportamento", valor: p.comportamento },
    { categoria: "Postura", valor: p.postura },
    { categoria: "Autonomia", valor: p.autonomia },
    { categoria: "Produtividade", valor: p.produtividade },
  ];

  const sortedComp = [...comportamental].sort((a, b) => b.media - a.media);
  const bestProfName = sortedComp[0]?.profissional || "Nenhum";
  const bestProfScore = sortedComp[0]?.media ? sortedComp[0].media.toFixed(1) : "0.0";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>Equipe & NPS</h2>
          <p className="text-xs text-gray-500 mt-1">Ranking de profissionais e notas comportamentais.</p>
        </div>
      </div>

      {saveSuccess && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm transition-all duration-300 font-semibold mb-4"
          style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
        >
          <Check size={16} />
          Planilha de Equipe importada e indicadores atualizados!
        </div>
      )}
      {errorMessage && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold mb-4"
          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}
        >
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="NPS Médio Geral" value={npsMedia} icon={<Star size={18} />} color="#cab2a1" change={3} delay={0} />
        <KPICard title="Avaliações Recebidas" value={avaliacoesRecebidas} icon={<Users size={18} />} color="#a78b7a" change={8} delay={80} />
        <KPICard title="Promotores" value={promotores} unit="%" icon={<TrendingUp size={18} />} color="#4ade80" change={5} delay={160} />
        <KPICard title="Melhor Profissional" value={bestProfScore} icon={<Award size={18} />} color="#c4a090" delay={240} subtitle={bestProfName} />
      </div>

      {/* Radar + Ranking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Radar Chart */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Avaliação Comportamental</h3>
              <p className="text-xs text-gray-500">Selecione um profissional</p>
            </div>
            <select
              value={selectedProf}
              onChange={(e) => setSelectedProf(Number(e.target.value))}
              className="input-brand text-xs px-3 py-1.5 cursor-pointer"
            >
              {comportamental.map((p, i) => (
                <option key={i} value={i}>{p.profissional.replace("Dr", "Dr.")}</option>
              ))}
            </select>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="rgba(202,178,161,0.1)" />
              <PolarAngleAxis dataKey="categoria" tick={{ fill: "#9ca3af", fontSize: 11 }} />
              <Radar
                name={p.profissional}
                dataKey="valor"
                stroke="#cab2a1"
                fill="#cab2a1"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
          {/* Scores */}
          <div className="grid grid-cols-5 gap-2 mt-2">
            {radarData.map((d) => (
              <div key={d.categoria} className="text-center">
                <p className="text-base font-bold font-display" style={{ color: "#cab2a1" }}>{d.valor}</p>
                <p className="text-[10px] text-gray-500 leading-tight">{d.categoria}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ranking da Equipe */}
        <div className="card p-5">
          <div className="mb-4">
            <h3 className="text-sm font-semibold" style={{ color: "#f0ece8" }}>Ranking da Equipe</h3>
            <p className="text-xs text-gray-500">NPS médio por profissional</p>
          </div>
          <div className="space-y-3">
            {comportamental
              .sort((a, b) => b.media - a.media)
              .map((p, idx) => (
                <div
                  key={p.profissional}
                  className="flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all"
                  style={{
                    border: `1px solid ${selectedProf === comportamental.indexOf(p) ? "rgba(202,178,161,0.3)" : "rgba(202,178,161,0.06)"}`,
                    background: selectedProf === comportamental.indexOf(p) ? "rgba(202,178,161,0.06)" : "transparent",
                  }}
                  onClick={() => setSelectedProf(comportamental.indexOf(p))}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: idx === 0 ? "linear-gradient(135deg, #cab2a1, #543c3c)" : `${COLORS[idx]}20`,
                      color: idx === 0 ? "white" : COLORS[idx],
                    }}
                  >
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate" style={{ color: "#f0ece8" }}>{p.profissional}</p>
                    <div className="flex gap-2 mt-1">
                      {["Atendimento", "Comportamento", "Postura"].map((attr) => (
                        <span key={attr} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "rgba(202,178,161,0.08)", color: "#9ca3af" }}>{attr.slice(0, 3)}</span>
                      ))}
                    </div>
                  </div>
                  {/* Stars */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-lg font-bold font-display" style={{ color: "#cab2a1" }}>{p.media.toFixed(1)}</p>
                    <div className="flex gap-0.5 justify-end mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={8} fill={i < Math.round(p.media / 2) ? "#cab2a1" : "transparent"} style={{ color: "#cab2a1" }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

    </div>
  );
}
