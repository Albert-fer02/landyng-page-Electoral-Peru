# Delta for Candidate Data

## ADDED Requirements

### Requirement: New Candidate — Jorge Nieto Montesinos

The system SHALL include Jorge Nieto Montesinos as a trackable candidate with complete scoring profile, poll data, and contextual notes reflecting post-debate status.

#### Scenario: Candidate is displayed in ranking

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered sorted by score or encuesta
- THEN Jorge Nieto Montesinos appears with party "Partido del Buen Gobierno", encuesta 5%, tendencia "estable"
- AND all 10 criterion scores are populated with values between 1 and 10

#### Scenario: Candidate notes reflect debate context

- GIVEN the candidate detail panel is expanded
- WHEN notes are rendered
- THEN notes include: exministro de Defensa, técnico, propuesta de sistema único de salud, and debate performance context

### Requirement: New Candidate — Roberto Sánchez

The system SHALL include Roberto Sánchez as a trackable candidate with complete scoring profile.

#### Scenario: Candidate is displayed in ranking

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Roberto Sánchez appears with party "Juntos por el Perú", encuesta 4%, tendencia "estable"
- AND all 10 criterion scores are populated with values between 1 and 10

#### Scenario: Candidate notes reflect political context

- GIVEN the candidate detail panel is expanded
- WHEN notes are rendered
- THEN notes include: exministro de Pedro Castillo, congresista en funciones

### Requirement: New Candidate — Fernando Olivera

The system SHALL include Fernando Olivera as a trackable candidate with complete scoring profile.

#### Scenario: Candidate is displayed in ranking

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Fernando Olivera appears with party "Frente de la Esperanza", encuesta 2%, tendencia "subiendo"
- AND all 10 criterion scores are populated with values between 1 and 10

#### Scenario: Tendency reflects debate impact

- GIVEN Fernando Olivera's tendency is "subiendo"
- WHEN the TrendBadge component renders
- THEN it displays ↗ with positive color and label "Subiendo"

### Requirement: New Candidate — Wolfgang Grozo

The system SHALL include Wolfgang Grozo with available data, marking limitations where data is incomplete.

#### Scenario: Candidate is displayed with limited data

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Wolfgang Grozo appears with encuesta 1.5%, tendencia "estable"
- AND all 10 criterion scores are populated (conservative estimates due to limited data)

#### Scenario: Notes indicate data limitations

- GIVEN the candidate detail panel is expanded
- WHEN notes are rendered
- THEN notes indicate that candidate data is under investigation and may be incomplete

## MODIFIED Requirements

### Requirement: Keiko Fujimori Poll Data

The candidate's encuesta value SHALL be updated from 7.0% to 11%, and tendencia SHALL remain "estable".

#### Scenario: Updated poll is reflected in ranking

- GIVEN the candidate list is loaded
- WHEN the ranking is sorted by encuesta
- THEN Keiko Fujimori shows encuesta 11.0% with tendencia estable
- AND the scorecard recalculates with the new encuesta value

### Requirement: Rafael López Aliaga Poll Data

The candidate's encuesta value SHALL be updated from 13.9% to 9%, and tendencia SHALL change from "estable" to "bajando".

#### Scenario: Updated poll and tendency are reflected

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Rafael López Aliaga shows encuesta 9.0% with tendencia bajando
- AND TrendBadge displays ↘ with danger color

### Requirement: Carlos Álvarez Poll Data

The candidate's encuesta value SHALL be updated from 4.0% to 7%, and tendencia SHALL change from "variable" to "subiendo".

#### Scenario: Updated poll and tendency are reflected

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Carlos Álvarez shows encuesta 7.0% with tendencia subiendo
- AND TrendBadge displays ↗ with positive color

### Requirement: Alfonso López Chau Poll Data

The candidate's encuesta value SHALL be updated from 5.1% to 4%, and tendencia SHALL change from "subiendo" to "bajando".

#### Scenario: Updated poll and tendency are reflected

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Alfonso López Chau shows encuesta 4.0% with tendencia bajando
- AND notes reflect that candidate did not convince in debate

### Requirement: Marisol Pérez Tello Poll Data

The candidate's encuesta value SHALL be updated from 0.5% to 2%, and tendencia SHALL change from "estable" to "subiendo".

#### Scenario: Updated poll and tendency are reflected

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Marisol Pérez Tello shows encuesta 2.0% with tendencia subiendo
- AND notes reflect good debate performance

### Requirement: Candidate Notes — Debate Impact

All candidates' `notas` field SHALL be updated to include post-debate context (JNE debate 23-25 marzo 2026) where relevant to their performance or standing.

#### Scenario: Notes include debate context

- GIVEN any candidate's detail panel is expanded
- WHEN notes are rendered
- THEN notes contain information relevant to current electoral context (post-debate, proximity to April 12 elections)

### Requirement: Candidate Risk Descriptions

The `riesgo` field for candidates with changed tendencies or new entries SHALL be reviewed and updated to reflect current electoral risk factors.

#### Scenario: Risk descriptions are current

- GIVEN a candidate's detail panel is expanded
- WHEN the risk box is rendered
- THEN the risk description reflects current context (debate performance, poll movement, legal status)

## REMOVED Requirements

### Requirement: Candidate — Mario Vizcarra

(Reason: Dropped to "Otros" — no longer in top-tier measurement)

### Requirement: Candidate — César Acuña

(Reason: No longer appears in recent electoral measurements)

### Requirement: Candidate — Mesías Guevara

(Reason: No longer appears in recent electoral measurements)

### Requirement: Candidate — Fiorella Molinelli

(Reason: No longer appears in recent electoral measurements)

### Requirement: Candidate — George Forsyth

(Reason: No longer appears in recent electoral measurements)

#### Scenario: Removed candidates do not appear in ranking

- GIVEN the candidate list is loaded
- WHEN the ranking is rendered
- THEN Mario Vizcarra, César Acuña, Mesías Guevara, Fiorella Molinelli, and George Forsyth do NOT appear
- AND exactly 9 candidates are displayed

## Data Validation Requirements

### Requirement: Score Integrity

All candidates SHALL have exactly 10 criterion scores, each an integer between 1 and 10 inclusive.

#### Scenario: Score validation on load

- GIVEN a candidate entry in the data file
- WHEN the scorecard calculates the candidate's weighted score
- THEN all 10 criteria keys are present with valid integer values
- AND no score is null, undefined, or outside the 1-10 range

### Requirement: Poll Data Format

All candidates SHALL have an `encuesta` value as a positive number and a `tendencia` value from the set: "subiendo", "bajando", "estable", "variable".

#### Scenario: Tendency validation

- GIVEN a candidate entry
- WHEN the TrendBadge renders the tendency
- THEN the tendency value maps to a valid entry in trendMap
- AND unknown tendency values fall back to "estable"

### Requirement: Candidate Count Consistency

After all changes, the candidate list SHALL contain exactly 9 candidates.

#### Scenario: Final candidate count

- GIVEN all additions and removals are applied
- WHEN the candidates array is counted
- THEN the count equals 9
- AND the application renders without errors

---

# Delta for UI Metadata

## MODIFIED Requirements

### Requirement: Hero Lede Text

The hero lede text SHALL be updated to reflect the current candidate count, data sources, and date range (Ipsos Marzo 2026).

#### Scenario: Updated lede is displayed

- GIVEN the App component renders
- WHEN the hero section is displayed
- THEN the lede shows "9 candidatos principales" (previously 10)
- AND the source includes "Ipsos Peru21 (Marzo 2026)"
- AND the date range reflects March 2026 data

### Requirement: Hero Stats — Candidate Count

The "Candidatos auditados" stat SHALL be updated from 10 to 9.

#### Scenario: Stat reflects current candidate count

- GIVEN the App component renders
- WHEN the hero stats section is displayed
- THEN the first stat shows "9" with label "Candidatos auditados"

### Requirement: Hero Stats — Undecided Voters

The "Electorado indeciso" stat SHALL be updated from 42% to 13%.

#### Scenario: Stat reflects current undecided percentage

- GIVEN the App component renders
- WHEN the hero stats section is displayed
- THEN the third stat shows "13%" with label "Electorado indeciso"

### Requirement: Insight Text

The insight text SHALL be updated to reflect post-debate analysis, new candidate dynamics, and proximity to April 12 elections.

#### Scenario: Updated insight is displayed

- GIVEN the App component renders
- WHEN the insight section is displayed
- THEN the text references debate impact (23-25 marzo 2026)
- AND the text reflects the updated candidate landscape (9 candidates)
- AND the text mentions election proximity (12 abril 2026)
