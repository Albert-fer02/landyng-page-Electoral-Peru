import { formatWeight } from "../lib/scorecard";

export function MethodologyPanel({ criteria }) {
  return (
    <section className="methodology-card" aria-labelledby="methodology-title">
      <h2 id="methodology-title" className="section-title">
        Metodología
      </h2>

      <div className="methodology-grid">
        {criteria.map((criterion) => (
          <div key={criterion.key} className="methodology-grid__item">
            <span>{criterion.label}</span>
            <strong>{formatWeight(criterion.weight)}</strong>
          </div>
        ))}
      </div>

      <p className="methodology-card__copy">
        Score final = Σ(criterio × peso) normalizado a escala 0-100. Cada
        criterio evaluado de 1-10 basado en: propuestas verificables en planes
        de gobierno (JNE), encuestas CPI/Ipsos/IEP/Datum (Ene-Mar 2026), hojas
        de vida declaradas ante JNE, cobertura mediática verificada, y
        estructura partidaria registrada. Los pesos reflejan una distribución
        neutral orientada a gobernabilidad efectiva y calidad de propuesta. No
        constituye recomendación de voto.
      </p>
    </section>
  );
}
