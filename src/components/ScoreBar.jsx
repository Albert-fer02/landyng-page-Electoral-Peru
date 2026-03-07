export function ScoreBar({ value, color, max = 10, variant = "default" }) {
  const percentage = (value / max) * 100;

  return (
    <div className={`score-bar score-bar--${variant}`} aria-hidden="true">
      <div
        className="score-bar__fill"
        style={{ width: `${percentage}%`, background: color }}
      />
    </div>
  );
}
