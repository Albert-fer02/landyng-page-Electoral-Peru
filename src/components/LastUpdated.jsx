export function LastUpdated({ source, date }) {
  return (
    <div className="last-updated" aria-label="Última actualización">
      <span className="last-updated__icon" aria-hidden="true">◉</span>
      <span className="last-updated__text">
        <strong>Última actualización:</strong> {source} · {date}
      </span>
    </div>
  );
}
