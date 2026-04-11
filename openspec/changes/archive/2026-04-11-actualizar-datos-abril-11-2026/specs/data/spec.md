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

The `encuesta` field MUST reflect the most recent verified poll (Ipsos 1-2 abril 2026). The `notas` field MUST cite the poll source and date.

#### Scenario: Update poll numbers

- GIVEN new Ipsos poll data is published
- WHEN the data refresh is performed
- THEN each candidate's `encuesta` value is updated to the Ipsos figure
- AND `notas` references "Ipsos 1-2 abril" as the primary source

### Requirement: Candidate Composition (Abril 11, 2026)

The candidate list MUST contain exactly 10 candidates as of this update. All 10 candidates from the previous update remain active.

#### Current candidate list (10 candidates)

1. Keiko Fujimori — Fuerza Popular
2. Rafael López Aliaga — Renovación Popular
3. Carlos Álvarez — País para Todos
4. Jorge Nieto — Partido del Buen Gobierno
5. Alfonso López Chau — Ahora Nación
6. Roberto Sánchez — Juntos por el Perú
7. Ricardo Belmont — Obras
8. César Acuña — Alianza para el Progreso
9. Marisol Pérez Tello — Primero La Gente
10. Fernando Olivera — Frente de la Esperanza

### Requirement: Poll Values (Ipsos Abril 1-2, 2026)

The following `encuesta` values MUST be used:

| Candidato | Ipsos Intención | Ipsos Simulacro |
|-----------|----------------|----------------|
| Keiko Fujimori | 15 | 18.6 |
| Carlos Álvarez | 9 | 12.1 |
| Rafael López Aliaga | 8 | 10.9 |
| Roberto Sánchez | 6 | 9.0 |
| Jorge Nieto | 5 | 5.6 |
| César Acuña | 3 | 5.1 |
| Alfonso López Chau | 4 | 4.4 |
| Ricardo Belmont | 6 | 4.3 |
| Marisol Pérez Tello | 4 | 3.9 |
| Fernando Olivera | 3 | 2.8 |

Note: Use simulacro values as `encuesta` since they represent votes válidos (more accurate for scorecard purposes).

### Requirement: Trend Accuracy

The `tendencia` field MUST reflect the direction of change between the previous (marzo 27) and current (abril 2) Ipsos measurement.

#### Trend calculation

- GIVEN a candidate's poll change from Ipsos marzo 27 to Ipsos abril 2
- WHEN the change is >0 THEN tendencia = "subiendo"
- WHEN the change is <0 THEN tendencia = "bajando"
- WHEN the change is ≈0 THEN tendencia = "estable"

#### Trend mappings (marzo → abril)

- Keiko Fujimori: 11% → 18.6% (+7.6) = "subiendo"
- Carlos Álvarez: 7% → 12.1% (+5.1) = "subiendo"
- Rafael López Aliaga: 9% → 10.9% (+1.9) = "subiendo" (pero cayó en intención)
- Roberto Sánchez: 4% → 9.0% (+5.0) = "subiendo"
- Jorge Nieto: 5% → 5.6% (+0.6) = "estable"
- César Acuña: 3.2% → 5.1% (+1.9) = "subiendo"
- Alfonso López Chau: 4% → 4.4% (+0.4) = "estable" (pero cayó en intención)
- Ricardo Belmont: 3% → 4.3% (+1.3) = "subiendo"
- Marisol Pérez Tello: 2% → 3.9% (+1.9) = "subiendo"
- Fernando Olivera: 2% → 2.8% (+0.8) = "subiendo"

### Requirement: Regional Data

The `regional` field MUST contain available Ipsos regional breakdown, updated for abril 2026.

### Requirement: Risk Documentation

Each candidate MUST have a `riesgo` field describing their primary electoral risk in 1-2 sentences.

### Requirement: Metadata

The module MUST export:
- `POLL_DATE`: "2026-04-02"
- `POLL_SOURCE`: "Ipsos Perú21"

## Validation Rules

1. All 10 candidates present
2. `POLL_DATE` = "2026-04-02"
3. `POLL_SOURCE` = "Ipsos Perú21"
4. Each `scores` object has exactly 10 keys
5. All `encuesta` values are numeric (0-100)
6. All `tendencia` values are "subiendo", "bajando", or "estable"