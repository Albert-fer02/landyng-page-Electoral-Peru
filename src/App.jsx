import { useState } from "react";
import { CandidateCard } from "./components/CandidateCard";
import { MethodologyPanel } from "./components/MethodologyPanel";
import { SortControls } from "./components/SortControls";
import { ElectionCountdown } from "./components/ElectionCountdown";
import { LastUpdated } from "./components/LastUpdated";
import { OnpeInfo } from "./components/OnpeInfo";
import { candidates } from "./data/candidates";
import { criteria } from "./data/criteria";
import { rankCandidates } from "./lib/scorecard";

const insightText =
  "Ipsos 26-27 marzo (post-debates) confirma: Keiko lidera con 11% estable, RLA cae a 9%. Carlos Álvarez consolida 3er lugar (7%) con fuerte respaldo norte (9%) y centro (7%). Ricardo Belmont emerge con 3% (subió de 2%), Wolfgang Grozo colapsó a 'Otros'. López-Chau y Sánchez bajaron a 4%. Con 11 días para el 12 de abril, 33% sin candidato definido (13% indeciso + 21% blanco/nulo). Todo apunta a segunda vuelta entre Keiko y RLA.";

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
              Análisis cuantificado de 10 candidatos principales · 10 criterios ponderados · Fuente: Ipsos Perú21 (Marzo 26-27, 2026, post-debates) · JNE Voto Informado
            </p>
            <ElectionCountdown />
            <LastUpdated />
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
                <strong>33%</strong>
                <span>Sin candidato definido</span>
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

        <OnpeInfo />
      </main>
    </div>
  );
}
