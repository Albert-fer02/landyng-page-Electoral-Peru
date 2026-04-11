import { METHODOLOGY, calculatePollAverage } from "../data/candidates";

export function calculateCandidateScore(candidate, criteria) {
  const weightedTotal = criteria.reduce(
    (total, criterion) => {
      const key = criterion.key;
      const value = candidate.scores[key];
      if (value === undefined) return total;
      return total + value * criterion.weight;
    },
    0,
  );

  const totalWeight = criteria.reduce(
    (total, criterion) => total + (candidate.scores[criterion.key] ? criterion.weight : 0),
    0,
  );

  if (totalWeight === 0) return 0;
  return Number(((weightedTotal / totalWeight) * 10).toFixed(1));
}

export function rankCandidates(candidates, criteria, sortBy) {
  return candidates
    .map((candidate) => ({
      ...candidate,
      finalScore: calculateCandidateScore(candidate, criteria),
      pollAverage: calculatePollAverage(candidate.polls),
    }))
    .sort((left, right) => {
      if (sortBy === "poll") {
        return (right.pollAverage || 0) - (left.pollAverage || 0);
      }
      if (sortBy === "encuesta") {
        return right.encuesta - left.encuesta;
      }
      return right.finalScore - left.finalScore;
    });
}

export function getScoreTone(score) {
  if (score >= 60) {
    return "var(--positive)";
  }

  if (score >= 45) {
    return "var(--warning)";
  }

  return "var(--danger)";
}

export function getMetricTone(score, max = 10) {
  const normalizedScore = (score / max) * 100;

  if (normalizedScore >= 70) {
    return "var(--positive)";
  }

  if (normalizedScore >= 40) {
    return "var(--warning)";
  }

  return "var(--danger)";
}

export function formatWeight(weight) {
  return `${Math.round(weight * 100)}%`;
}

export function getMethodologyDisclaimers() {
  return METHODOLOGY.disclaimers || [];
}

export function getPollSources() {
  return METHODOLOGY.pollSources || [];
}