"use client";

import { useState, useEffect, useRef } from "react";
import {
  Upload, Download, Check, AlertCircle, Trash2,
  Users, Calendar, TrendingUp, DollarSign, MessageSquare, Heart, Database,
} from "lucide-react";
import {
  useData,
  getEntireStore,
  saveEntireStore,
  clearStoredData,
  isUsingCustomData,
} from "@/lib/data-store";
import {
  contatos as defaultContatos,
  agenda as defaultAgenda,
  oportunidades as defaultOportunidades,
  vendas as defaultVendas,
  followUps as defaultFollowUps,
  indicacoes as defaultIndicacoes,
} from "@/lib/mock-data";
import { downloadCSV, convertToCSV, parseCSV } from "@/lib/excel-utils";

import { SHEETS_CONFIG as SHEETS } from "@/lib/google-sheets";

export default function DadosPage() {
  const [activeTab, setActiveTab] = useState("google_sheets");
  const [isCustom, setIsCustom] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Google Sheets URLs state
  const [gsUrls, setGsUrls] = useState<Record<string, string>>({});
  
  useEffect(() => {
    // Load URLs from localStorage
    const savedUrls = localStorage.getItem("palomares_gs_urls");
    if (savedUrls) {
      try {
        setGsUrls(JSON.parse(savedUrls));
      } catch (e) {}
    }
  }, []);

  const handleSaveUrls = () => {
    localStorage.setItem("palomares_gs_urls", JSON.stringify(gsUrls));
    triggerSuccess();
  };

  // Refs de importacao para cada planilha
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  // Dados dos 6 datasets
  const [contatos, setContatos] = useData("contatos", defaultContatos);
  const [agenda, setAgenda] = useData("agenda", defaultAgenda);
  const [oportunidades, setOportunidades] = useData("oportunidades", defaultOportunidades);
  const [vendas, setVendas] = useData("vendas", defaultVendas);
  const [followUps, setFollowUps] = useData("followUps", defaultFollowUps);
  const [indicacoes, setIndicacoes] = useData("indicacoes", defaultIndicacoes);

  const setters: Record<string, (val: any) => void> = {
    contatos: setContatos,
    agenda: setAgenda,
    oportunidades: setOportunidades,
    vendas: setVendas,
    followUps: setFollowUps,
    indicacoes: setIndicacoes,
  };

  const getters: Record<string, any[]> = {
    contatos: contatos as any[],
    agenda: agenda as any[],
    oportunidades: oportunidades as any[],
    vendas: vendas as any[],
    followUps: followUps as any[],
    indicacoes: indicacoes as any[],
  };

  useEffect(() => {
    setIsCustom(isUsingCustomData());
  }, [contatos, agenda, oportunidades, vendas, followUps, indicacoes]);

  const triggerSuccess = () => {
    setSaveSuccess(true);
    setErrorMessage("");
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Export JSON backup (all data)
  const handleExportJSON = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(getEntireStore(), null, 2));
    const a = document.createElement("a");
    a.setAttribute("href", dataStr);
    a.setAttribute("download", "dados_palomares_beauty.json");
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  // Import JSON backup
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        saveEntireStore(parsed);
        setIsCustom(true);
        triggerSuccess();
      } catch {
        setErrorMessage("Erro ao ler o arquivo JSON. Verifique se e um backup valido.");
      }
    };
    reader.readAsText(files[0]);
  };

  // Reset all data
  const handleReset = () => {
    if (confirm("Restaurar dados de demonstracao originais? Suas alteracoes serao perdidas.")) {
      clearStoredData();
      setIsCustom(false);
      triggerSuccess();
    }
  };

  // Export CSV for a specific sheet
  const handleExport = (sheet: (typeof SHEETS)[0]) => {
    const data = getters[sheet.id] ?? [];
    const csv = convertToCSV(data, sheet.headers, sheet.keys);
    downloadCSV(csv, sheet.filename);
  };

  // Import CSV for a specific sheet
  const handleImport = (sheet: (typeof SHEETS)[0], e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files.length) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = parseCSV(ev.target?.result as string, sheet.keys);
        if (!parsed.length) {
          setErrorMessage(`Nenhum registro valido encontrado em "${sheet.label}".`);
          return;
        }
        setters[sheet.id](parsed);
        setIsCustom(true);
        triggerSuccess();
      } catch {
        setErrorMessage("Erro ao ler o arquivo CSV.");
      }
    };
    reader.readAsText(files[0]);
    // Reset input so same file can be re-imported
    e.target.value = "";
  };

  const tabs = [
    { id: "google_sheets", label: "Google Sheets", icon: Database },
    { id: "arquivo", label: "Backup JSON", icon: Upload },
    ...SHEETS.map((s) => ({ id: s.id, label: s.label, icon: (s as any).icon || Users })),
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto page-enter">
      {/* Alertas */}
      {saveSuccess && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.2)", color: "#4ade80" }}
        >
          <Check size={16} />
          Operacao realizada com sucesso! Todos os indicadores foram atualizados.
        </div>
      )}
      {errorMessage && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
          style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.2)", color: "#f87171" }}
        >
          <AlertCircle size={16} />
          {errorMessage}
        </div>
      )}

      {/* Header status */}
      <section
        className="card p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
        style={{
          background: "linear-gradient(135deg, rgba(30,18,18,0.7) 0%, rgba(20,15,15,0.7) 100%)",
          border: "1px solid rgba(202,178,161,0.12)",
        }}
      >
        <div>
          <h2 className="text-xl font-bold font-display" style={{ color: "#f0ece8" }}>
            Gestao de Dados
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Importe e exporte os dados comerciais por planilha ou como backup JSON completo.
          </p>
          <div className="flex items-center gap-3 mt-4">
            <span className={`w-3 h-3 rounded-full pulse-dot ${isCustom ? "bg-amber-400" : "bg-gray-600"}`} />
            <span className="text-sm font-semibold" style={{ color: isCustom ? "#f59e0b" : "#9ca3af" }}>
              {isCustom ? "Utilizando Dados Reais (Customizados)" : "Modo de Demonstracao (Simulado)"}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
            style={{
              background: "rgba(202,178,161,0.08)",
              border: "1px solid rgba(202,178,161,0.15)",
              color: "#cab2a1",
            }}
          >
            <Download size={14} />
            Exportar Backup JSON
          </button>

          <label
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
            style={{
              background: "rgba(202,178,161,0.08)",
              border: "1px solid rgba(202,178,161,0.15)",
              color: "#cab2a1",
            }}
          >
            <Upload size={14} />
            Importar Backup JSON
            <input type="file" ref={fileInputRef} onChange={handleImportJSON} accept=".json" className="hidden" />
          </label>

          {isCustom && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
              style={{
                background: "rgba(248,113,113,0.08)",
                border: "1px solid rgba(248,113,113,0.15)",
                color: "#f87171",
              }}
            >
              <Trash2 size={14} />
              Restaurar Demonstracao
            </button>
          )}
        </div>
      </section>

      {/* Layout com tabs verticais */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Tabs verticais */}
        <div className="w-full lg:w-56 flex-shrink-0 flex flex-row lg:flex-col overflow-x-auto gap-2 p-1 bg-white/[0.01] rounded-2xl border border-white/[0.04] lg:h-fit">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-semibold whitespace-nowrap transition-all duration-300 w-full"
                style={{
                  background: active ? "linear-gradient(135deg, #cab2a1, #8b6b5a)" : "transparent",
                  color: active ? "black" : "#9ca3af",
                  boxShadow: active ? "0 4px 16px rgba(139,107,90,0.25)" : "none",
                }}
              >
                <Icon size={14} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Conteudo da aba */}
        <div className="flex-1 min-w-0">
          {/* ABA: Google Sheets */}
          {activeTab === "google_sheets" && (
            <div className="card p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold font-display" style={{ color: "#f0ece8" }}>
                  Sincronizacao via Google Sheets
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Cole as URLs de publicacao CSV de cada aba da sua planilha para atualizar o painel automaticamente a cada 5 minutos.
                </p>
              </div>

              <div className="space-y-4">
                {SHEETS.map((sheet) => (
                  <div key={sheet.id} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-gray-400">
                      URL da aba: <span style={{ color: "#cab2a1" }}>{sheet.label}</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://docs.google.com/spreadsheets/d/e/.../pub?output=csv"
                      value={gsUrls[sheet.id] || ""}
                      onChange={(e) => setGsUrls(prev => ({ ...prev, [sheet.id]: e.target.value }))}
                      className="px-4 py-2.5 rounded-xl text-sm w-full outline-none transition-all focus:border-[#cab2a1]"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "#f0ece8"
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end pt-4 border-t" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
                <button
                  onClick={handleSaveUrls}
                  className="btn-brand px-6 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
                >
                  <Check size={16} />
                  Salvar URLs
                </button>
              </div>
            </div>
          )}

          {/* ABA: Backup JSON */}
          {activeTab === "arquivo" && (
            <div className="card p-6 space-y-6">
              <div>
                <h3 className="text-base font-bold font-display" style={{ color: "#f0ece8" }}>
                  Backup Completo (JSON)
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Exporta ou importa todos os datasets de uma vez em formato JSON.
                </p>
              </div>

              {/* Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed rounded-2xl py-12 px-6 text-center cursor-pointer transition-all hover:bg-white/[0.02] flex flex-col items-center gap-4"
                style={{ borderColor: "rgba(202,178,161,0.25)", background: "rgba(202,178,161,0.02)" }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(202,178,161,0.08)", color: "#cab2a1" }}>
                  <Upload size={22} />
                </div>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#f0ece8" }}>
                    Clique para importar um backup JSON
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Apenas arquivos .json exportados por esta plataforma
                  </p>
                </div>
              </div>

              {/* Resumo dos datasets */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {SHEETS.map((sheet) => {
                  const Icon = sheet.icon;
                  const count = (getters[sheet.id] ?? []).length;
                  return (
                    <div
                      key={sheet.id}
                      className="p-4 rounded-xl flex items-center gap-3"
                      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "rgba(202,178,161,0.08)", color: "#cab2a1" }}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: "#cab2a1" }}>{sheet.label}</p>
                        <p className="text-[10px] text-gray-500">{count} registro{count !== 1 ? "s" : ""}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ABAS: Planilhas individuais */}
          {SHEETS.map((sheet) => {
            if (activeTab !== sheet.id) return null;
            const Icon = sheet.icon;
            const data = getters[sheet.id] ?? [];
            return (
              <div key={sheet.id} className="card p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-display flex items-center gap-2" style={{ color: "#f0ece8" }}>
                      <Icon size={16} style={{ color: "#cab2a1" }} />
                      {sheet.label}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">{sheet.desc}</p>
                  </div>
                  <span
                    className="px-3 py-1 rounded-lg text-xs font-bold"
                    style={{ background: "rgba(202,178,161,0.1)", color: "#cab2a1" }}
                  >
                    {data.length} registros
                  </span>
                </div>

                {/* Botoes de importar/exportar */}
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => handleExport(sheet)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(202,178,161,0.08)", border: "1px solid rgba(202,178,161,0.15)", color: "#cab2a1" }}
                  >
                    <Download size={14} />
                    Exportar CSV
                  </button>

                  <label
                    className="btn-brand flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    <Upload size={14} />
                    Importar CSV
                    <input
                      type="file"
                      accept=".csv"
                      className="hidden"
                      onChange={(e) => handleImport(sheet, e)}
                    />
                  </label>
                </div>

                {/* Preview da tabela */}
                {data.length > 0 ? (
                  <div>
                    <p className="text-xs text-gray-500 mb-3">
                      Exibindo {Math.min(data.length, 10)} de {data.length} registros
                    </p>
                    <div className="overflow-x-auto max-h-[420px] overflow-y-auto custom-scrollbar">
                      <table className="w-full text-left text-xs whitespace-nowrap">
                        <thead className="sticky top-0" style={{ background: "#111118" }}>
                          <tr className="border-b" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
                              {/* @ts-ignore */}
                              {((sheet as any).headers || sheet.keys).slice(0, 8).map((h: string) => (
                                <th
                                  key={h}
                                  className="pb-3 pr-4 font-semibold"
                                  style={{ color: "rgba(202,178,161,0.6)" }}
                                >
                                  {h}
                                </th>
                              ))}
                              {/* @ts-ignore */}
                              {((sheet as any).headers || sheet.keys).length > 8 && (
                                <th className="pb-3 pr-4 font-semibold" style={{ color: "rgba(202,178,161,0.4)" }}>
                                  +{((sheet as any).headers || sheet.keys).length - 8} cols
                                </th>
                              )}
                          </tr>
                        </thead>
                        <tbody>
                          {data.slice(0, 10).map((row: any, i: number) => (
                            <tr
                              key={i}
                              className="border-b last:border-0 hover:bg-white/[0.02] transition-colors"
                              style={{ borderColor: "rgba(202,178,161,0.04)" }}
                            >
                              {sheet.keys.slice(0, 8).map((k) => (
                                <td key={k} className="py-2.5 pr-4 text-gray-400 max-w-[140px] truncate">
                                  {String(row[k] ?? "")}
                                </td>
                              ))}
                              {sheet.keys.length > 8 && (
                                <td className="py-2.5 pr-4 text-gray-600">...</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-gray-600 text-sm">
                    Nenhum dado carregado. Importe um arquivo CSV para comecar.
                  </div>
                )}

                {/* Instrucoes de formato */}
                <div
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
                >
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#cab2a1" }}>
                    Colunas esperadas no CSV
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono break-all">
                    {/* @ts-ignore */}
                    {((sheet as any).headers || sheet.keys).join(" ; ")}
                  </p>
                  <p className="text-[10px] text-gray-600 mt-2">
                    Separador: ponto-e-virgula (;) — Numeros: virgula decimal — Codificacao: UTF-8
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
