const trendMap = {
  subiendo: { icon: "↗", color: "var(--positive)", label: "Subiendo" },
  bajando: { icon: "↘", color: "var(--danger)", label: "Bajando" },
  estable: { icon: "→", color: "var(--text-tertiary)", label: "Estable" },
  variable: { icon: "↕", color: "var(--warning)", label: "Variable" },
};

export function TrendBadge({ trend }) {
  const currentTrend = trendMap[trend] ?? trendMap.estable;

  return (
    <span
      className="trend-badge"
      style={{ color: currentTrend.color }}
      aria-label={`Tendencia ${currentTrend.label}`}
    >
      <span aria-hidden="true">{currentTrend.icon}</span>
      {currentTrend.label}
    </span>
  );
}
