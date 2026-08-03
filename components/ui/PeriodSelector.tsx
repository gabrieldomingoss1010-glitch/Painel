"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Calendar, CalendarDays, Clock, CalendarRange, Check } from "lucide-react";

type PeriodItem = { key: string; label: string };
export type AvailablePeriods = {
  days: PeriodItem[];
  weeks: PeriodItem[];
  months: PeriodItem[];
  years: PeriodItem[];
};

type TabId = "months" | "days" | "weeks" | "years";

export default function PeriodSelector({
  availablePeriods,
  selectedPeriod,
  onChange,
}: {
  availablePeriods: AvailablePeriods;
  selectedPeriod: string;
  onChange: (val: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("months");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Find the label for the selected period to show on the button
  const getSelectedLabel = () => {
    if (selectedPeriod === "all") return "Todo o período";
    for (const group of Object.values(availablePeriods)) {
      const found = group.find((m: PeriodItem) => m.key === selectedPeriod);
      if (found) return found.label;
    }
    return selectedPeriod;
  };

  const tabs: { id: TabId; label: string; icon: any }[] = [
    { id: "days", label: "Dias", icon: Calendar },
    { id: "weeks", label: "Semanas", icon: Clock },
    { id: "months", label: "Meses", icon: CalendarDays },
    { id: "years", label: "Anos", icon: CalendarRange },
  ];

  const handleSelect = (key: string) => {
    onChange(key);
    setIsOpen(false);
  };

  const currentItems = availablePeriods[activeTab] || [];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 pl-4 pr-3 py-2 rounded-xl text-sm font-semibold transition-all outline-none group"
        style={{ 
          background: isOpen ? "rgba(202,178,161,0.15)" : "rgba(202,178,161,0.08)", 
          border: "1px solid rgba(202,178,161,0.15)", 
          color: isOpen ? "#f0ece8" : "#cab2a1",
          boxShadow: isOpen ? "0 0 0 2px rgba(202,178,161,0.1)" : "none"
        }}
      >
        <CalendarDays size={15} className="opacity-70" />
        <span>{getSelectedLabel()}</span>
        <ChevronDown 
          size={14} 
          className="opacity-70 transition-transform duration-200" 
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }} 
        />
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div 
          className="absolute right-0 top-[calc(100%+8px)] w-80 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200"
          style={{ 
            background: "#16161f", 
            border: "1px solid rgba(202,178,161,0.15)",
            boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)"
          }}
        >
          {/* Tabs Header */}
          <div className="flex p-1.5 gap-1" style={{ background: "rgba(0,0,0,0.2)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
                    isActive ? "shadow-sm" : "hover:bg-white/5 opacity-60 hover:opacity-100"
                  }`}
                  style={{ 
                    background: isActive ? "rgba(202,178,161,0.12)" : "transparent",
                    color: isActive ? "#f0ece8" : "#9ca3af"
                  }}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* List Area */}
          <div className="p-2 max-h-72 overflow-y-auto custom-scrollbar">
            {currentItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                <Calendar size={24} className="mb-2 opacity-20" style={{ color: "#cab2a1" }} />
                <p className="text-xs text-gray-500">Nenhum registro encontrado nesta categoria.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                {currentItems.map((item) => {
                  const isSelected = selectedPeriod === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSelect(item.key)}
                      className="flex items-center justify-between w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all group"
                      style={{ 
                        background: isSelected ? "rgba(202,178,161,0.08)" : "transparent",
                        color: isSelected ? "#f0ece8" : "#9ca3af"
                      }}
                    >
                      <span className={`font-medium group-hover:text-white transition-colors ${isSelected ? "text-[#cab2a1]" : ""}`}>
                        {item.label}
                      </span>
                      {isSelected && <Check size={14} style={{ color: "#cab2a1" }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer actions */}
          <div className="p-2" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(0,0,0,0.1)" }}>
             <button
                onClick={() => handleSelect("all")}
                className="w-full py-2 rounded-xl text-xs font-semibold transition-all hover:bg-white/5"
                style={{ 
                  color: selectedPeriod === "all" ? "#cab2a1" : "#6b7280"
                }}
              >
                Visualizar todo o período
              </button>
          </div>
        </div>
      )}
    </div>
  );
}
