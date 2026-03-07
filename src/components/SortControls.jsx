const sortingOptions = [
  { key: "score", label: "Por score ponderado" },
  { key: "encuesta", label: "Por intención de voto" },
];

export function SortControls({ currentValue, onChange }) {
  const activeIndex = sortingOptions.findIndex(
    (option) => option.key === currentValue,
  );

  return (
    <section className="toolbar" aria-labelledby="sort-title">
      <div className="toolbar__copy">
        <p id="sort-title" className="toolbar__label">
          Orden de lectura
        </p>
        <p className="toolbar__caption">
          Compara el score estructural frente a la intención de voto sin perder
          contexto de tendencia.
        </p>
      </div>
      <div
        className="segmented-control"
        role="radiogroup"
        aria-labelledby="sort-title"
        style={{ "--active-index": activeIndex }}
      >
        {sortingOptions.map((option) => {
          const isActive = currentValue === option.key;

          return (
            <button
              key={option.key}
              type="button"
              className={`segmented-control__button${isActive ? " is-active" : ""}`}
              onClick={() => onChange(option.key)}
              role="radio"
              aria-checked={isActive}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
