"use client";

interface HeatmapProps {
  data: { dia: string; hora: string; valor: number }[];
}

const DIAS = ["Seg", "Ter", "Qua", "Qui", "Sex"];
const HORAS = ["08h", "09h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"];

export default function HeatmapChart({ data }: HeatmapProps) {
  const getValue = (dia: string, hora: string) => {
    const item = data.find((d) => d.dia === dia && d.hora === hora);
    return item?.valor || 0;
  };

  const getColor = (value: number) => {
    if (value === 0) return "rgba(30,30,42,0.5)";
    const opacity = value / 100;
    // Pure vivid red (#ff0000) to green (#22c55e)
    const r1 = 255, g1 = 0, b1 = 0;
    const r2 = 34, g2 = 197, b2 = 94;

    const r = Math.round(r1 + (r2 - r1) * opacity);
    const g = Math.round(g1 + (g2 - g1) * opacity);
    const b = Math.round(b1 + (b2 - b1) * opacity);

    return `rgba(${r},${g},${b},${0.35 + opacity * 0.45})`;
  };

  const getTextColor = (value: number) => {
    if (value === 0) return "#6b7280";
    return "#f0ece8";
  };

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px]">
        {/* Header - hours */}
        <div className="flex mb-1">
          <div className="w-12 flex-shrink-0" />
          {HORAS.map((h) => (
            <div key={h} className="flex-1 text-center text-[10px] text-gray-500 font-medium">
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {DIAS.map((dia) => (
          <div key={dia} className="flex mb-1 items-center">
            <div className="w-12 flex-shrink-0 text-xs text-gray-500 font-medium">{dia}</div>
            {HORAS.map((hora) => {
              const val = getValue(dia, hora);
              return (
                <div key={hora} className="flex-1 px-0.5">
                  <div
                    className="h-8 rounded-md flex items-center justify-center text-[11px] font-semibold transition-all duration-200 hover:scale-105 cursor-default"
                    style={{
                      background: getColor(val),
                      color: getTextColor(val),
                      border: val >= 90 ? "1px solid rgba(202,178,161,0.3)" : "1px solid transparent",
                    }}
                    title={`${dia} ${hora}: ${val}%`}
                  >
                    {val >= 70 ? "Bom" : val >= 30 ? "Médio" : val > 0 ? "Ruim" : ""}
                  </div>
                </div>
              );
            })}
          </div>
        ))}

        {/* Legend */}
        <div className="flex items-center gap-2 mt-3 justify-end">
          <span className="text-xs text-gray-500">Baixo</span>
          <div className="flex gap-0.5">
            {[10, 30, 50, 70, 90].map((v) => (
              <div
                key={v}
                className="w-5 h-4 rounded-sm"
                style={{ background: getColor(v) }}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">Alto</span>
        </div>
      </div>
    </div>
  );
}
