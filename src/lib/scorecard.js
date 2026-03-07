export function calculateCandidateScore(candidate, criteria) {
  const weightedTotal = criteria.reduce(
    (total, criterion) =>
      total + candidate.scores[criterion.key] * criterion.weight,
    0,
  );

  const totalWeight = criteria.reduce(
    (total, criterion) => total + criterion.weight,
    0,
  );

  return Number(((weightedTotal / totalWeight) * 10).toFixed(1));
}

export function rankCandidates(candidates, criteria, sortBy) {
  return candidates
    .map((candidate) => ({
      ...candidate,
      finalScore: calculateCandidateScore(candidate, criteria),
    }))
    .sort((left, right) => {
      if (sortBy === "encuesta") {
        return right.encuesta - left.encuesta;
      }

      return right.finalScore - left.finalScore;
    });
}

export function getScoreTone(score) {
  if (score >= 60) {
    return "var(--accent)";
  }

  if (score >= 45) {
    return "var(--warning)";
  }

  return "var(--danger)";
}

export function formatWeight(weight) {
  return `${Math.round(weight * 100)}%`;
}
