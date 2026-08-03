"use client";

import { ChevronDown } from "lucide-react";

type PeriodItem = { key: string; label: string };
export type AvailablePeriods = {
  days: PeriodItem[];
  weeks: PeriodItem[];
  months: PeriodItem[];
  years: PeriodItem[];
};

export default function PeriodSelector({
  availablePeriods,
  selectedPeriod,
  onChange,
}: {
  availablePeriods: AvailablePeriods;
  selectedPeriod: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="relative">
      <select
        value={selectedPeriod}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none pl-4 pr-9 py-2 rounded-xl text-sm font-semibold cursor-pointer outline-none"
        style={{ background: "rgba(202,178,161,0.08)", border: "1px solid rgba(202,178,161,0.15)", color: "#cab2a1" }}
      >
        <option value="all" style={{ background: "#111118", color: "#f0ece8" }}>Todo o período</option>
        
        {availablePeriods.days.length > 0 && (
          <optgroup label="Dias" style={{ background: "#111118", color: "#cab2a1" }}>
            {availablePeriods.days.map((m) => (
              <option key={m.key} value={m.key} style={{ background: "#111118", color: "#f0ece8" }}>{m.label}</option>
            ))}
          </optgroup>
        )}
        
        {availablePeriods.weeks.length > 0 && (
          <optgroup label="Semanas" style={{ background: "#111118", color: "#cab2a1" }}>
            {availablePeriods.weeks.map((m) => (
              <option key={m.key} value={m.key} style={{ background: "#111118", color: "#f0ece8" }}>{m.label}</option>
            ))}
          </optgroup>
        )}
        
        {availablePeriods.months.length > 0 && (
          <optgroup label="Meses" style={{ background: "#111118", color: "#cab2a1" }}>
            {availablePeriods.months.map((m) => (
              <option key={m.key} value={m.key} style={{ background: "#111118", color: "#f0ece8" }}>{m.label}</option>
            ))}
          </optgroup>
        )}
        
        {availablePeriods.years.length > 0 && (
          <optgroup label="Anos" style={{ background: "#111118", color: "#cab2a1" }}>
            {availablePeriods.years.map((m) => (
              <option key={m.key} value={m.key} style={{ background: "#111118", color: "#f0ece8" }}>{m.label}</option>
            ))}
          </optgroup>
        )}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "#cab2a1" }} />
    </div>
  );
}
