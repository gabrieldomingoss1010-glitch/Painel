"use client";

import { useEffect, useState } from "react";

interface GaugeChartProps {
  value: number;
  max?: number;
  label?: string;
  size?: number;
  color?: string;
}

export default function GaugeChart({
  value,
  max = 100,
  label = "",
  size = 180,
  color = "#cab2a1",
}: GaugeChartProps) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setAnimatedValue(Math.floor(value * eased));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  const percentage = animatedValue / max;
  const strokeWidth = size * 0.08;
  const radius = (size - strokeWidth * 2) / 2;
  const center = size / 2;

  // Gauge goes from 210deg to -30deg (240deg arc)
  const startAngle = 210;
  const endAngle = -30;
  const totalAngle = 240;

  const polarToCartesian = (angle: number, r: number) => {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  };

  const describeArc = (startAng: number, endAng: number, r: number) => {
    const s = polarToCartesian(startAng, r);
    const e = polarToCartesian(endAng, r);
    const largeArc = Math.abs(endAng - startAng) > 180 ? 1 : 0;
    return `M ${s.x} ${s.y} A ${r} ${r} 0 ${largeArc} 1 ${e.x} ${e.y}`;
  };

  const progressEndAngle = startAngle - percentage * totalAngle;
  const circumference = (totalAngle / 360) * 2 * Math.PI * radius;
  const progressLength = percentage * circumference;

  const getColor = (pct: number) => {
    if (pct >= 0.85) return "#4ade80";
    if (pct >= 0.65) return color;
    if (pct >= 0.45) return "#fb923c";
    return "#f87171";
  };

  const dynamicColor = getColor(percentage);

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.75} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id={`gauge-gradient-${label}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.6" />
            <stop offset="100%" stopColor={dynamicColor} />
          </linearGradient>
        </defs>

        {/* Track */}
        <path
          d={describeArc(startAngle, endAngle, radius)}
          fill="none"
          stroke="#1e1e2a"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Progress */}
        {percentage > 0 && (
          <path
            d={describeArc(startAngle, progressEndAngle, radius)}
            fill="none"
            stroke={`url(#gauge-gradient-${label})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${dynamicColor}60)` }}
          />
        )}

        {/* Center text */}
        <text
          x={center}
          y={center - 4}
          textAnchor="middle"
          fontSize={size * 0.16}
          fontWeight="700"
          fill="#f0ece8"
          fontFamily="Outfit, Inter, sans-serif"
        >
          {animatedValue}
          <tspan fontSize={size * 0.08} fill={color}>%</tspan>
        </text>

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const angle = startAngle - (tick / 100) * totalAngle;
          const outer = polarToCartesian(angle, radius + strokeWidth / 2 + 2);
          const inner = polarToCartesian(angle, radius - strokeWidth / 2 - 2);
          return (
            <line
              key={tick}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke="rgba(202,178,161,0.2)"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {label && (
        <p className="text-sm font-medium text-gray-400 -mt-4">{label}</p>
      )}
    </div>
  );
}
