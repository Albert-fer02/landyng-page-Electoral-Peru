# Candidate Data Specification

## Purpose

Define the structure, validation, and lifecycle of candidate data in `src/data/candidates.js` for the Electoral Peru 2026 scorecard application.

## Requirements

### Requirement: Candidate Record Structure

Each candidate record MUST contain: `name` (string, unique), `party` (string), `color` (hex string, unique), `scores` (object with exactly 10 numeric keys, values 1-10), `encuesta` (number, percentage), `tendencia` (one of: "subiendo", "bajando", "estable"), `notas` (string), `riesgo` (string).

#### Scenario: Valid candidate record

- GIVEN a candidate object in `candidates.js`
- WHEN the record is loaded
- THEN all 8 fields are present and typed correctly
- AND `scores` contains exactly 10 keys: experiencia, propuesta_tech, anticorrupcion, seguridad, descentralizacion, viabilidad, equipo_tecnico, integridad, gobernabilidad, plan_concreto

#### Scenario: Unique candidate name

- GIVEN two candidate records
- WHEN their `name` fields are compared
- THEN they MUST NOT be identical

#### Scenario: Unique candidate color

- GIVEN two candidate records
- WHEN their `color` fields are compared
- THEN they MUST NOT be identical

### Requirement: Poll Data Currency

The `encuesta` field MUST reflect the most recent verified poll (Ipsos 26-27 marzo 2026). The `notas` field MUST cite the poll source and date.

#### Scenario: Update poll numbers

- GIVEN new Ipsos poll data is published
- WHEN the data refresh is performed
- THEN each candidate's `encuesta` value is updated to the Ipsos figure
- AND `notas` references "Ipsos 26-27 marzo" as the primary source

#### Scenario: Candidate without Ipsos measurement

- GIVEN a candidate has no Ipsos measurement (e.g., César Acuña)
- WHEN updating poll data
- THEN the candidate retains their CPI figure with a clarifying note in `notas`
- AND the note states "no aparece en Ipsos" or equivalent

### Requirement: Candidate Composition (Abril 1, 2026)

The candidate list MUST contain exactly 10 candidates as of this update: López Aliaga, Fujimori, López Chau, Álvarez, Nieto, Sánchez, Acuña, Pérez Tello, Olivera, Belmont. Wolfgang Grozo MUST be removed. Ricardo Belmont MUST be added.

#### Scenario: Remove collapsed candidate

- GIVEN Wolfgang Grozo has collapsed to "Otros" in Ipsos
- WHEN the data refresh executes
- THEN the Wolfgang Grozo record is removed from `candidates.js`
- AND the total candidate count is 10

#### Scenario: Add new candidate

- GIVEN Ricardo Belmont appears at 3% in Ipsos
- WHEN the data refresh executes
- THEN a new Ricardo Belmont record is added with party "Somos Perú", encuesta 3, tendencia "subiendo"
- AND scores are conservatively estimated: experiencia 7, propuesta_tech 3, anticorrupcion 6, seguridad 5, descentralizacion 5, viabilidad 3, equipo_tecnico 4, integridad 6, gobernabilidad 5, plan_concreto 4

### Requirement: Trend Accuracy

The `tendencia` field MUST reflect the direction of change between the previous and current Ipsos measurement.

#### Scenario: Trend direction mapping

- GIVEN a candidate's poll change from previous Ipsos to current Ipsos
- WHEN the change is positive (>0) THEN tendencia = "subiendo"
- WHEN the change is negative (<0) THEN tendencia = "bajando"
- WHEN the change is zero (=0) THEN tendencia = "estable"

#### Scenario: Trend update for specific candidates

- GIVEN the Ipsos 26-27 marzo data
- WHEN trends are evaluated
- THEN: Keiko Fujimori = "estable" (11%→11%), Carlos Álvarez = "subiendo" (+2), López Aliaga = "bajando" (-1), López Chau = "bajando" (-1), Roberto Sánchez = "bajando" (-1), Belmont = "subiendo" (+1), Olivera = "subiendo", Pérez Tello = "subiendo"

### Requirement: Risk Documentation

Each candidate MUST have a `riesgo` field describing their primary electoral risk in 1-2 sentences.

#### Scenario: Risk field present

- GIVEN any candidate record
- WHEN the record is validated
- THEN `riesgo` is a non-empty string
