import { ScoreBar } from "./ScoreBar";
import { TrendBadge } from "./TrendBadge";
import { getScoreTone } from "../lib/scorecard";

function buildNotesList(notes) {
  return notes
    .split(". ")
    .map((item) => item.trim().replace(/\.$/, ""))
    .filter(Boolean);
}

export function CandidateCard({
  candidate,
  criteria,
  rank,
  isExpanded,
  isTopScore,
  onToggle,
}) {
  const detailsId = `candidate-panel-${rank}`;
  const noteItems = buildNotesList(candidate.notas);
  const scoreTone = getScoreTone(candidate.finalScore);

  return (
    <article
      className={`candidate-card${isExpanded ? " is-expanded" : ""}${isTopScore ? " is-top-score" : ""}`}
      style={{ "--candidate-color": candidate.color }}
    >
      <button
        type="button"
        className="candidate-card__trigger"
        onClick={onToggle}
        aria-expanded={isExpanded}
        aria-controls={detailsId}
      >
        <div className="candidate-card__rank-block" aria-hidden="true">
          <span className={`candidate-rank${rank <= 3 ? " is-podium" : ""}`}>
            #{String(rank).padStart(2, "0")}
          </span>
        </div>

        <div className="candidate-card__summary candidate-card__summary--identity">
          <div className="candidate-card__identity">
            <h2 className="candidate-card__name">{candidate.name}</h2>
            <span className="candidate-card__party">
              <span className="candidate-card__party-dot" aria-hidden="true" />
              {candidate.party}
            </span>
          </div>
        </div>

        <div className="candidate-card__summary candidate-card__summary--metrics">
          <span className="candidate-card__eyebrow">Señal electoral</span>
          <div className="candidate-card__meta">
            <span className="candidate-card__poll">
              <span className="candidate-card__meta-label">Encuesta</span>
              <strong>{candidate.encuesta}%</strong>
            </span>
            <TrendBadge trend={candidate.tendencia} />
          </div>
        </div>

        <div className="candidate-card__score">
          <span className="candidate-card__score-label">Score / 100</span>
          <strong
            className="candidate-card__score-value"
            style={{ color: scoreTone }}
          >
            {candidate.finalScore}
          </strong>
          <ScoreBar
            value={candidate.finalScore}
            max={100}
            color={scoreTone}
            variant="score"
          />
        </div>
      </button>

      <div
        id={detailsId}
        className={`candidate-card__details${isExpanded ? " is-open" : ""}`}
      >
        <section className="detail-panel" aria-labelledby={`${detailsId}-analysis`}>
          <h3 id={`${detailsId}-analysis`} className="detail-panel__title">
            Lectura analítica
          </h3>
          <ul className="candidate-card__notes">
            {noteItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="detail-panel" aria-labelledby={`${detailsId}-criteria`}>
          <h3 id={`${detailsId}-criteria`} className="detail-panel__title">
            Desglose por criterio
          </h3>
          <div className="criteria-grid">
            {criteria.map((criterion) => (
              <div key={criterion.key} className="criteria-grid__item">
                <div className="criteria-grid__header">
                  <span title={criterion.desc}>{criterion.label}</span>
                  <strong>
                    {candidate.scores[criterion.key]}/10
                  </strong>
                </div>
                <ScoreBar
                  value={candidate.scores[criterion.key]}
                  color={candidate.color}
                />
              </div>
            ))}
          </div>
        </section>

        <aside className="risk-box" aria-label="Riesgo principal">
          <span className="risk-box__label">
            <span aria-hidden="true">⚠</span>
            Riesgo
          </span>
          <p className="risk-box__text">{candidate.riesgo}</p>
        </aside>
      </div>
    </article>
  );
}
