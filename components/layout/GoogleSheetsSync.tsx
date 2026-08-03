"use client";

import { useEffect, useState, useCallback } from "react";
import { RefreshCw, CloudDownload, CheckCircle, XCircle, Wifi } from "lucide-react";
import { fetchSheetsData, fetchComercialSheetsData, fetchDynamicSheet, SHEETS_CONFIG } from "@/lib/google-sheets";
import { useData } from "@/lib/data-store";

const SYNC_INTERVAL_MS = 5 * 60 * 1000; // Auto-sync every 5 minutes
const STORAGE_KEY = "gs_last_sync";

function timeAgo(dateStr: string | null): string {
  if (!dateStr) return "Nunca";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Agora mesmo";
  if (mins === 1) return "1 min atrás";
  if (mins < 60) return `${mins} min atrás`;
  const hrs = Math.floor(mins / 60);
  if (hrs === 1) return "1h atrás";
  return `${hrs}h atrás`;
}

export default function GoogleSheetsSync() {
  const [, setAtendimentosBrutos] = useData("atendimentosBrutos", [] as any[]);
  const [, setFunilConversao] = useData("funilConversao", [] as any[]);
  const [, setCacVsFaturamento] = useData("cacVsFaturamento", [] as any[]);
  const [status, setStatus] = useState<"idle" | "syncing" | "success" | "error">("idle");
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [, forceRender] = useState(0);

  // Dynamic sheets setters
  const [, setContatos] = useData("contatos", [] as any[]);
  const [, setAgenda] = useData("agenda", [] as any[]);
  const [, setOportunidades] = useData("oportunidades", [] as any[]);
  const [, setVendas] = useData("vendas", [] as any[]);
  const [, setFollowUps] = useData("followUps", [] as any[]);
  const [, setIndicacoes] = useData("indicacoes", [] as any[]);

  // Read last sync time from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setLastSync(stored);
  }, []);

  // Update "X min atrás" every 30s
  useEffect(() => {
    const interval = setInterval(() => forceRender((n) => n + 1), 30000);
    return () => clearInterval(interval);
  }, []);

  const sync = useCallback(async (silent = false) => {
    if (status === "syncing") return;
    if (!silent) setStatus("syncing");
    setErrorMsg("");

    let agendaOk = false;
    let comercialOk = false;
    const errors: string[] = [];

    // Sync agenda (principal)
    try {
      const agendaData = await fetchSheetsData();
      setAtendimentosBrutos(agendaData as any);
      agendaOk = true;
    } catch (err: any) {
      errors.push(`Agenda: ${err?.message ?? "Erro desconhecido"}`);
    }

    // Sync comercial + CAC (independente)
    try {
      const comercialData = await fetchComercialSheetsData();
      setFunilConversao(comercialData.funilConversao);
      setCacVsFaturamento(comercialData.cacVsFaturamento);
      comercialOk = true;
    } catch (err: any) {
      errors.push(`Comercial/CAC: ${err?.message ?? "Erro desconhecido"}`);
    }

    // Sync Dynamic Commercial Sheets
    let dynamicOk = false;
    try {
      const savedUrls = localStorage.getItem("palomares_gs_urls");
      const customUrls = savedUrls ? JSON.parse(savedUrls) : {};
      const setters: Record<string, any> = {
        contatos: setContatos,
        agenda: setAgenda,
        oportunidades: setOportunidades,
        vendas: setVendas,
        followUps: setFollowUps,
        indicacoes: setIndicacoes,
      };

      const promises = SHEETS_CONFIG.map(async (sheet) => {
        // Use custom URL from localStorage, or fall back to the hardcoded defaultUrl
        const url = customUrls[sheet.id] || sheet.defaultUrl;
        if (url) {
          const data = await fetchDynamicSheet(url, sheet.keys);
          if (data && data.length > 0) {
            setters[sheet.id](data);
          }
        }
      });

      await Promise.allSettled(promises);
      dynamicOk = true;
    } catch (err: any) {
      errors.push(`Planilhas Comerciais: ${err?.message ?? "Erro desconhecido"}`);
    }

    if (agendaOk || comercialOk || dynamicOk) {
      const now = new Date().toISOString();
      localStorage.setItem(STORAGE_KEY, now);
      setLastSync(now);
      if (errors.length > 0) {
        // Partial success
        setStatus("error");
        setErrorMsg(errors.join(" | "));
        setTimeout(() => setStatus("idle"), 8000);
      } else {
        setStatus("success");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } else {
      setStatus("error");
      setErrorMsg(errors.join(" | "));
      setTimeout(() => setStatus("idle"), 8000);
    }
  }, [status, setAtendimentosBrutos, setFunilConversao, setCacVsFaturamento]);

  // Auto-sync on mount + every 5 minutes
  useEffect(() => {
    sync(true);
    const interval = setInterval(() => sync(true), SYNC_INTERVAL_MS);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSyncing = status === "syncing";

  const iconColor =
    status === "success" ? "#4ade80"
    : status === "error" ? "#f87171"
    : "#cab2a1";

  const label =
    status === "syncing" ? "Sincronizando..."
    : status === "success" ? "Sincronizado!"
    : status === "error" ? "Erro ao sincronizar"
    : `Google Sheets · ${timeAgo(lastSync)}`;

  return (
    <button
      onClick={() => sync(false)}
      disabled={isSyncing}
      title={errorMsg || "Sincronizar dados do Google Sheets agora"}
      className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-300 hover:bg-white/[0.04]"
      style={{
        border: `1px solid ${status === "error" ? "rgba(248,113,113,0.2)" : status === "success" ? "rgba(74,222,128,0.2)" : "rgba(202,178,161,0.12)"}`,
        color: iconColor,
        background: status === "error" ? "rgba(248,113,113,0.05)" : status === "success" ? "rgba(74,222,128,0.05)" : "rgba(202,178,161,0.04)",
      }}
    >
      {status === "success" ? (
        <CheckCircle size={12} />
      ) : status === "error" ? (
        <XCircle size={12} />
      ) : isSyncing ? (
        <RefreshCw size={12} className="animate-spin" />
      ) : (
        <Wifi size={12} />
      )}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}
