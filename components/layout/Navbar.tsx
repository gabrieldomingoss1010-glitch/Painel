"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, RefreshCw, Download, ChevronDown } from "lucide-react";
import { getEntireStore, useData } from "@/lib/data-store";
import GoogleSheetsSync from "./GoogleSheetsSync";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Visão geral executiva" },
  "/operacional": { title: "Operacional", subtitle: "Clínica & Agenda" },
  "/nps": { title: "NPS & Equipe", subtitle: "Avaliação comportamental" },
  "/comercial": { title: "Comercial", subtitle: "Vendas & Conversão" },
  "/operacao-mensal": { title: "Operação Mensal", subtitle: "Indicadores consolidados" },
};

const periodOptions = ["Hoje", "Esta semana", "Este mês", "Trimestre", "Este ano"];

const formatPeriodLabel = (p: string) => {
  if (p.startsWith("dia:")) {
    const rawDate = p.replace("dia:", "");
    const [year, month, day] = rawDate.split("-");
    return `Dia: ${day}/${month}/${year}`;
  }
  if (p.startsWith("mes:")) {
    const rawMonth = p.replace("mes:", "");
    const [year, month] = rawMonth.split("-");
    const months = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
    const monthName = months[parseInt(month, 10) - 1] || month;
    return `Mês: ${monthName}/${year}`;
  }
  if (p.startsWith("semana:")) {
    const rawWeek = p.replace("semana:", "");
    const [year, week] = rawWeek.split("-W");
    return `Semana ${week} (${year})`;
  }
  return p;
};

export default function Navbar() {
  const pathname = usePathname();
  const [{ periodo: period }, setGlobalSettings] = useData("globalSettings", { periodo: "Este mês" });
  const setPeriod = (p: string) => setGlobalSettings({ periodo: p });
  const [showPeriods, setShowPeriods] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const customDateVal = period.startsWith("dia:") ? period.replace("dia:", "") : "";
  const customWeekVal = period.startsWith("semana:") ? period.replace("semana:", "") : "";
  const customMonthVal = period.startsWith("mes:") ? period.replace("mes:", "") : "";

  const pageInfo = pageTitles[pathname] || { title: "Palomares Beauty", subtitle: "" };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 1000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  };

  const handleExport = () => {
    try {
      const data = getEntireStore();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `palomares_dados_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Erro ao exportar:", error);
      alert("Erro ao exportar dados.");
    }
  };

  return (
    <header
      className="fixed top-0 right-0 z-30 h-16 flex items-center px-6 gap-4"
      style={{
        left: "240px",
        background: "rgba(10,10,15,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(202,178,161,0.06)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
        transition: "left 0.3s ease",
      }}
    >
      {/* Title */}
      <div className="flex-1">
        <h1 className="text-base font-bold font-display" style={{ color: "#f0ece8" }}>
          {pageInfo.title}
        </h1>
        <p className="text-xs text-gray-500">{pageInfo.subtitle}</p>
      </div>

      {/* Live indicator */}
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: "rgba(202,178,161,0.06)", border: "1px solid rgba(202,178,161,0.1)" }}>
        <span className="w-2 h-2 rounded-full bg-green-400 pulse-dot" />
        <span className="text-xs text-gray-400">Ao vivo · {formatTime(lastUpdated)}</span>
      </div>

      {/* Google Sheets Sync */}
      <GoogleSheetsSync />

      {/* Period filter */}
      <div className="relative">
        <button
          onClick={() => setShowPeriods(!showPeriods)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
          style={{
            background: "rgba(202,178,161,0.08)",
            border: "1px solid rgba(202,178,161,0.15)",
            color: "#cab2a1",
          }}
        >
          {formatPeriodLabel(period)}
          <ChevronDown size={14} />
        </button>
        {showPeriods && (
          <div
            className="absolute right-0 top-full mt-2 w-64 p-3 rounded-xl shadow-2xl z-50 flex flex-col gap-3"
            style={{ background: "#16161f", border: "1px solid rgba(202,178,161,0.12)" }}
          >
            {/* Presets */}
            <div className="grid grid-cols-2 gap-1">
              {periodOptions.map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setShowPeriods(false); }}
                  className="text-left px-3 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/5"
                  style={{ color: p === period ? "#cab2a1" : "#9ca3af", background: p === period ? "rgba(202,178,161,0.04)" : "transparent" }}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/[0.06] my-1" />

            {/* Custom Filters */}
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Filtros Personalizados</span>
              
              {/* Day filter */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 block font-medium">Escolher Dia</label>
                <input
                  type="date"
                  value={customDateVal}
                  onChange={(e) => {
                    if (e.target.value) {
                      setPeriod(`dia:${e.target.value}`);
                      setShowPeriods(false);
                    }
                  }}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-[#cab2a1]/40 transition-colors"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              {/* Week filter */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 block font-medium">Escolher Semana</label>
                <input
                  type="week"
                  value={customWeekVal}
                  onChange={(e) => {
                    if (e.target.value) {
                      setPeriod(`semana:${e.target.value}`);
                      setShowPeriods(false);
                    }
                  }}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-[#cab2a1]/40 transition-colors"
                  style={{ colorScheme: "dark" }}
                />
              </div>

              {/* Month filter */}
              <div className="space-y-1">
                <label className="text-[10px] text-gray-400 block font-medium">Escolher Mês</label>
                <input
                  type="month"
                  value={customMonthVal}
                  onChange={(e) => {
                    if (e.target.value) {
                      setPeriod(`mes:${e.target.value}`);
                      setShowPeriods(false);
                    }
                  }}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-[#cab2a1]/40 transition-colors"
                  style={{ colorScheme: "dark" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleRefresh}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all hover:bg-white/5"
          style={{ border: "1px solid rgba(202,178,161,0.1)", color: "#cab2a1" }}
        >
          <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
        </button>

        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold btn-brand"
        >
          <Download size={14} />
          Exportar
        </button>
      </div>
    </header>
  );
}
