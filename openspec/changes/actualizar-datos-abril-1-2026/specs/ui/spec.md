# UI Metadata Specification

## Purpose

Define the hero section metadata, stats, and insight text in `src/App.jsx` that reflects the current electoral context.

## Requirements

### Requirement: Hero Lede Currency

The `hero__lede` paragraph MUST accurately state the number of candidates, criteria count, poll sources with dates, and current debate status.

#### Scenario: Update lede after data refresh

- GIVEN the candidate count changes from the previous version
- WHEN the data refresh is applied
- THEN `hero__lede` reflects the new candidate count (10)
- AND poll sources include "Ipsos Perú21 (Marzo 26-27, 2026)"

#### Scenario: Lede format consistency

- GIVEN the hero lede text
- WHEN rendered
- THEN it follows the format: "Análisis cuantificado de {N} candidatos principales · 10 criterios ponderados · Fuentes: {sources} · {context}"

### Requirement: Stats Accuracy

The hero stats MUST display the correct candidate count and current undecided voter percentage from the most recent poll.

#### Scenario: Update undecided percentage

- GIVEN Ipsos reports 13% undecided voters
- WHEN the data refresh is applied
- THEN the undecided stat displays "13%" (not the previous 23% from CPI)
- AND the label reads "Electorado indeciso"

#### Scenario: Candidate count stat

- GIVEN the candidate list contains 10 candidates
- WHEN the stats are rendered
- THEN the candidate stat displays "10" with label "Candidatos auditados"

### Requirement: Insight Text Relevance

The `insightText` MUST summarize the current electoral landscape including: poll comparison (CPI vs Ipsos), key movements, debate context, and days remaining until elections.

#### Scenario: Update insight post-segundo-debate

- GIVEN the second debate context (30 marzo - 1 abril)
- WHEN the insight is updated
- THEN it mentions the second debate as completed or in progress
- AND it references Carlos Álvarez as 3rd place (7% Ipsos)
- AND it notes Wolfgang Grozo's collapse
- AND it mentions Ricardo Belmont's entry at 3%

#### Scenario: Insight mentions election proximity

- GIVEN elections are on April 12, 2026
- WHEN the insight is rendered
- THEN it includes the number of days remaining until elections
- AND it references the election date (12 de abril)

### Requirement: Meta Description Currency

The `index.html` meta description MUST reflect the current candidate count.

#### Scenario: Update meta description

- GIVEN the candidate count is 10
- WHEN the data refresh is applied
- THEN the meta description states "10 candidatos presidenciales"
