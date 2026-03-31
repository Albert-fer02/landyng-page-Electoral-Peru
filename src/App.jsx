import { useState } from "react";
import { CandidateCard } from "./components/CandidateCard";
import { MethodologyPanel } from "./components/MethodologyPanel";
import { SortControls } from "./components/SortControls";
import { candidates } from "./data/candidates";
import { criteria } from "./data/criteria";
import { rankCandidates } from "./lib/scorecard";

const insightText =
  "El scoring post-debate revela un tablero electoral fragmentado: Keiko Fujimori se mantiene en la punta (11%) mientras López Aliaga cae a 9%. Carlos Álvarez emerge como tercer fuerza (7%) impulsado por su mensaje propositivo. El debate JNE (23-25 marzo) movió fichas: Marisol Pérez Tello y Fernando Olivera subieron, López-Chau y Sánchez no convencieron. Con 13% de indecisos y 14 días para las elecciones del 12 de abril, el resultado sigue abierto.";

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
              Análisis cuantificado de 9 candidatos principales · 10 criterios ponderados · Fuentes: Ipsos Perú21 (Marzo 26-27, 2026) · JNE Voto Informado · Post-debate presidencial
            </p>
            <div className="hero__stats" aria-label="Resumen del panel">
              <span className="hero__stat">
                <strong>9</strong>
                <span>Candidatos auditados</span>
              </span>
              <span className="hero__stat">
                <strong>10</strong>
                <span>Criterios ponderados</span>
              </span>
              <span className="hero__stat">
                <strong>13%</strong>
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
