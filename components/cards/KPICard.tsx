"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  color?: string;
  delay?: number;
  subtitle?: string;
}

function useCountUp(target: number, duration: number = 1500, start: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const startVal = 0;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(startVal + (target - startVal) * eased));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

export default function KPICard({
  title,
  value,
  unit,
  change,
  changeLabel,
  icon,
  color = "#cab2a1",
  delay = 0,
  subtitle,
}: KPICardProps) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const numericValue = typeof value === "number" ? value : parseFloat(String(value)) || 0;
  const animatedValue = useCountUp(numericValue, 1500, visible);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const displayValue = typeof value === "number"
    ? animatedValue.toLocaleString("pt-BR")
    : value;

  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      ref={ref}
      className="card relative overflow-hidden group cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `all 0.5s ease ${delay}ms`,
        padding: "1.5rem",
      }}
    >
      {/* Background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
          transform: "translate(30%, -30%)",
        }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${color}22, ${color}08)`,
            border: `1px solid ${color}25`,
          }}
        >
          <span style={{ color }}>{icon}</span>
        </div>

        {change !== undefined && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              isPositive ? "badge-positive" : isNegative ? "badge-negative" : "badge-neutral"
            }`}
          >
            {isPositive ? <TrendingUp size={11} /> : isNegative ? <TrendingDown size={11} /> : <Minus size={11} />}
            {Math.abs(change)}%
          </div>
        )}
      </div>

      {/* Value */}
      <div className="mb-1">
        <div className="flex items-baseline gap-1">
          <span
            className="text-3xl font-bold font-display leading-none"
            style={{ color: "#f0ece8" }}
          >
            {displayValue}
          </span>
          {unit && (
            <span className="text-sm font-medium" style={{ color }}>
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Title */}
      <p className="text-xs font-medium text-gray-400 mt-2">{title}</p>
      {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
      {changeLabel && (
        <p className="text-xs mt-1" style={{ color: "rgba(202,178,161,0.4)" }}>
          {changeLabel}
        </p>
      )}

      {/* Bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </div>
  );
}
