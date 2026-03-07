import { useState } from "react";
import { CandidateCard } from "./components/CandidateCard";
import { MethodologyPanel } from "./components/MethodologyPanel";
import { SortControls } from "./components/SortControls";
import { candidates } from "./data/candidates";
import { criteria } from "./data/criteria";
import { rankCandidates } from "./lib/scorecard";

const insightText =
  "El scoring revela una tensión estructural en el campo electoral peruano 2026: los candidatos con mejores propuestas técnicas tienen la menor viabilidad electoral, y los que lideran las encuestas tienen las propuestas más débiles. Ningún candidato supera el 70/100 combinando ambas dimensiones. El 42% de electores indecisos indica que el resultado real se decidirá en las últimas semanas.";

export default function App() {
  const [selectedName, setSelectedName] = useState(candidates[0]?.name ?? null);
  const [sortBy, setSortBy] = useState("score");

  const rankedCandidates = rankCandidates(candidates, criteria, sortBy);
  const maxScore = Math.max(...rankedCandidates.map((candidate) => candidate.finalScore));

  return (
    <div className="app-shell">
      <div className="background-orb background-orb--cyan" aria-hidden="true" />
      <div className="background-orb background-orb--amber" aria-hidden="true" />
      <div className="background-grid" aria-hidden="true" />

      <main className="page">
        <header className="hero">
          <div className="hero__content">
            <p className="hero__kicker">Análisis comparativo 2026</p>
            <h1 className="hero__title">Scorecard Electoral Perú 2026</h1>
            <p className="hero__lede">
              Análisis cuantificado de 10 candidatos principales · 10 criterios
              ponderados · Fuentes: CPI, Ipsos, IEP, Datum (Ene-Feb 2026) · JNE
              Voto Informado
            </p>
            <div className="hero__stats" aria-label="Resumen del panel">
              <span className="hero__stat">
                <strong>10</strong>
                <span>Candidatos auditados</span>
              </span>
              <span className="hero__stat">
                <strong>10</strong>
                <span>Criterios ponderados</span>
              </span>
              <span className="hero__stat">
                <strong>42%</strong>
                <span>Electorado indeciso</span>
              </span>
            </div>
          </div>
        </header>

        <SortControls currentValue={sortBy} onChange={setSortBy} />

        <section className="ranking-head" aria-hidden="true">
          <span className="ranking-head__label">Rank</span>
          <span className="ranking-head__label">Candidatura</span>
          <span className="ranking-head__label">Encuesta / tendencia</span>
          <span className="ranking-head__label ranking-head__label--score">
            Score
          </span>
        </section>

        <section className="ranking-list" aria-label="Ranking de candidatos">
          {rankedCandidates.map((candidate, index) => {
            const isExpanded = selectedName === candidate.name;

            return (
              <CandidateCard
                key={candidate.name}
                candidate={candidate}
                criteria={criteria}
                rank={index + 1}
                isExpanded={isExpanded}
                isTopScore={candidate.finalScore === maxScore}
                onToggle={() =>
                  setSelectedName((currentName) =>
                    currentName === candidate.name ? null : candidate.name,
                  )
                }
              />
            );
          })}
        </section>

        <MethodologyPanel criteria={criteria} />

        <section className="insight-card" aria-labelledby="insight-title">
          <h2 id="insight-title" className="section-title">
            Insight
          </h2>
          <p>{insightText}</p>
        </section>
      </main>
    </div>
  );
}
