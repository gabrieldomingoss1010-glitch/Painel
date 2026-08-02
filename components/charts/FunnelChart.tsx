"use client";

interface FunnelItem {
  etapa: string;
  valor: number;
  percentual: number;
}

interface FunnelChartProps {
  data: FunnelItem[];
}

export default function FunnelChart({ data }: FunnelChartProps) {
  const maxVal = data[0]?.valor || 1;

  return (
    <div className="space-y-2">
      {data.map((item, idx) => {
        const widthPct = (item.valor / maxVal) * 100;
        const opacity = 1 - (idx * 0.12);

        return (
          <div key={item.etapa} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-gray-400">{item.etapa}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold" style={{ color: "#cab2a1" }}>
                  {item.valor.toLocaleString("pt-BR")}
                </span>
                <span
                  className="text-xs px-1.5 py-0.5 rounded"
                  style={{
                    background: "rgba(202,178,161,0.1)",
                    color: "rgba(202,178,161,0.7)",
                    fontSize: "10px",
                  }}
                >
                  {item.percentual}%
                </span>
              </div>
            </div>
            <div
              className="h-9 rounded-lg overflow-hidden"
              style={{ background: "#1e1e2a" }}
            >
              <div
                className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-1000"
                style={{
                  width: `${widthPct}%`,
                  background: `linear-gradient(90deg, rgba(84,60,60,${opacity}) 0%, rgba(202,178,161,${opacity}) 100%)`,
                  boxShadow: `0 0 12px rgba(202,178,161,${0.2 * opacity})`,
                }}
              >
                {widthPct > 20 && (
                  <span className="text-xs font-semibold text-white/80">
                    {item.percentual}%
                  </span>
                )}
              </div>
            </div>
            {idx < data.length - 1 && (
              <div className="flex justify-center mt-1">
                <div className="w-0.5 h-2 bg-gray-700 rounded" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
