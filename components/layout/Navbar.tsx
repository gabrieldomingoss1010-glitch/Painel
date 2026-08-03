"use client";

import { usePathname } from "next/navigation";
import GoogleSheetsSync from "./GoogleSheetsSync";

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Visão geral executiva" },
  "/operacional": { title: "Operacional", subtitle: "Clínica & Agenda" },
  "/nps": { title: "NPS & Equipe", subtitle: "Avaliação comportamental" },
  "/comercial": { title: "Comercial", subtitle: "Vendas & Conversão" },
  "/operacao-mensal": { title: "Operação Mensal", subtitle: "Indicadores consolidados" },
  "/estrategias": { title: "Estratégias", subtitle: "Campanhas & Mídias" },
  "/follow-up": { title: "Follow-up", subtitle: "Recuperação de orçamentos" },
  "/dados": { title: "Gestão de Dados", subtitle: "Configuração & Importação" },
};

export default function Navbar() {
  const pathname = usePathname();
  const pageInfo = pageTitles[pathname] || { title: "Palomares Beauty", subtitle: "" };

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

      {/* Google Sheets Sync */}
      <GoogleSheetsSync />
    </header>
  );
}
