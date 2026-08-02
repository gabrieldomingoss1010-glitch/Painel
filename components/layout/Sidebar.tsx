"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ClipboardList,
  TrendingUp,
  Target,
  MessageSquare,
  BarChart2,
  Database,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  LogOut,
  User,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "CEO", icon: LayoutDashboard, desc: "Painel executivo" },
  { href: "/operacional", label: "Recepcao", icon: ClipboardList, desc: "Painel de recepcao" },
  { href: "/comercial", label: "Comercial", icon: TrendingUp, desc: "Funil de vendas" },
  { href: "/estrategias", label: "Estrategias", icon: Target, desc: "Por campanha" },
  { href: "/follow-up", label: "Follow-up", icon: MessageSquare, desc: "Orcamentos" },
  { href: "/operacao-mensal", label: "Consolidado", icon: BarChart2, desc: "Semanal / Mensal" },
  { href: "/dados", label: "Dados", icon: Database, desc: "Import / Export" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col transition-all duration-300 ease-in-out ${
        collapsed ? "w-[72px]" : "w-[240px]"
      }`}
      style={{
        background: "linear-gradient(180deg, #1e1212 0%, #140f0f 40%, #0d0a0a 100%)",
        borderRight: "1px solid rgba(202,178,161,0.08)",
        boxShadow: "4px 0 24px rgba(0,0,0,0.4)",
      }}
    >
      {/* Logo */}
      <div
        className="flex items-center px-4 py-5 border-b"
        style={{ borderColor: "rgba(202,178,161,0.08)" }}
      >
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #cab2a1 0%, #543c3c 100%)" }}
        >
          <Sparkles size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-bold font-display leading-none" style={{ color: "#cab2a1" }}>
              Palomares
            </p>
            <p className="text-xs text-gray-500 mt-0.5 leading-none">Beauty Analytics</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {!collapsed && (
          <p className="text-xs font-semibold uppercase tracking-wider px-3 mb-3" style={{ color: "rgba(202,178,161,0.35)" }}>
            Menu
          </p>
        )}
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`sidebar-item flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                  isActive ? "active" : "text-gray-400"
                } ${collapsed ? "justify-center" : ""}`}
                title={collapsed ? item.label : undefined}
              >
                <Icon size={18} className="flex-shrink-0" />
                {!collapsed && (
                  <div>
                    <p className="text-sm font-medium leading-none">{item.label}</p>
                    <p className="text-xs mt-0.5 opacity-50">{item.desc}</p>
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-2 py-4 space-y-1 border-t" style={{ borderColor: "rgba(202,178,161,0.08)" }}>
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
            collapsed ? "justify-center" : ""
          }`}
          style={{
            background: "rgba(202,178,161,0.05)",
            border: "1px solid rgba(202,178,161,0.08)",
          }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #cab2a1, #543c3c)" }}
          >
            <User size={14} className="text-white" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate" style={{ color: "#cab2a1" }}>
                Admin
              </p>
              <p className="text-xs text-gray-500 truncate">Gerente Geral</p>
            </div>
          )}
          {!collapsed && (
            <LogOut size={14} className="text-gray-500 flex-shrink-0" />
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 rounded-full flex items-center justify-center transition-all hover:scale-110"
        style={{
          background: "linear-gradient(135deg, #cab2a1, #543c3c)",
          boxShadow: "0 2px 8px rgba(84,60,60,0.5)",
        }}
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-white" />
        ) : (
          <ChevronLeft size={12} className="text-white" />
        )}
      </button>
    </aside>
  );
}
