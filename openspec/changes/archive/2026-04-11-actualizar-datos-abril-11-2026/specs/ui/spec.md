# UI Specification

## Purpose

Define UI behavioral requirements for displaying updated candidate data as of Ipsos Abril 1-2, 2026.

## Requirements

### REQ-1: Display Updated Poll Metadata

The UI MUST display the current poll source and date in the hero section.

#### Scenario: Poll metadata display

- GIVEN the user views the main page
- WHEN the candidate data loads with poll date "2026-04-02"
- THEN the hero MUST display "Ipsos Perú21 (Abril 1-2, 2026)"

### REQ-2: Display Candidate Count

The UI MUST show the total number of candidates (10).

#### Scenario: Candidate count display

- GIVEN the user views the main page
- WHEN candidates data is loaded
- THEN the UI displays "10 candidatos" or equivalent

### REQ-3: Display Updated Candidates

All 10 candidates must be displayed with their updated scores.

#### Candidates (in order, simulacro ranking)

1. Keiko Fujimori — 18.6%
2. Carlos Álvarez — 12.1%
3. Rafael López Aliaga — 10.9%
4. Roberto Sánchez — 9.0%
5. Jorge Nieto — 5.6%
6. César Acuña — 5.1%
7. Alfonso López Chau — 4.4%
8. Ricardo Belmont — 4.3%
9. Marisol Pérez Tello — 3.9%
10. Fernando Olivera — 2.8%

### REQ-4: Display Insights

The UI SHOULD display relevant insights about the current electoral situation.

#### Required insights

- Top 3 candidates show clear separation
- Carlos Álvarez has displaced López Aliaga to 2nd place
- Keiko Fujimori leads with 18.6% simulacro
- Vote blank/null at ~17-22%

### REQ-5: Sort Functionality

The ranking reflects simulacro results by default:

| Rank | Candidate | Score |
|------|-----------|-------|
| 1 | Keiko Fujimori | 18.6 |
| 2 | Carlos Álvarez | 12.1 |
| 3 | Rafael López Aliaga | 10.9 |
| 4 | Roberto Sánchez | 9.0 |
| 5 | Jorge Nieto | 5.6 |
| 6 | César Acuña | 5.1 |
| 7 | Alfonso López Chau | 4.4 |
| 8 | Ricardo Belmont | 4.3 |
| 9 | Marisol Pérez Tello | 3.9 |
| 10 | Fernando Olivera | 2.8 |

## Out of Scope

- No changes to visual design
- No changes to score calculation logic
- No new components needed