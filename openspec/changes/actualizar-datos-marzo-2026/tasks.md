# Tasks: Actualizar Datos Marzo 2026

## Phase 1: Research & Preparation

- [ ] 1.1 Research Wolfgang Grozo: party affiliation, political position, proposals, and public data for candidate profile
- [ ] 1.2 Assign distinct hex colors to 4 new candidates (Jorge Nieto, Roberto Sánchez, Fernando Olivera, Wolfgang Grozo) ensuring no collision with existing 5 candidates

## Phase 2: Rewrite candidates.js — Remove Departed Candidates

- [ ] 2.1 Remove Mario Vizcarra entry from candidates array
- [ ] 2.2 Remove César Acuña entry from candidates array
- [ ] 2.3 Remove Mesías Guevara entry from candidates array
- [ ] 2.4 Remove Fiorella Molinelli entry from candidates array
- [ ] 2.5 Remove George Forsyth entry from candidates array

## Phase 3: Rewrite candidates.js — Update Existing Candidates

- [ ] 3.1 Update Rafael López Aliaga: encuesta 13.9→9.0, tendencia estable→bajando, rewrite notas with post-debate context, update riesgo
- [ ] 3.2 Update Keiko Fujimori: encuesta 7.0→11.0, tendencia stays estable, rewrite notas with post-debate context
- [ ] 3.3 Update Alfonso López Chau: encuesta 5.1→4.0, tendencia subiendo→bajando, rewrite notas reflecting debate performance, update riesgo
- [ ] 3.4 Update Carlos Álvarez: encuesta 4.0→7.0, tendencia variable→subiendo, rewrite notas with post-debate context
- [ ] 3.5 Update Marisol Pérez Tello: encuesta 0.5→2.0, tendencia estable→subiendo, rewrite notas reflecting good debate performance

## Phase 4: Rewrite candidates.js — Add New Candidates

- [ ] 4.1 Add Jorge Nieto Montesinos: party "Partido del Buen Gobierno", encuesta 5.0, tendencia "estable", all 10 scores (1-10), notas with exministro de Defensa context, riesgo
- [ ] 4.2 Add Roberto Sánchez: party "Juntos por el Perú", encuesta 4.0, tendencia "estable", all 10 scores (1-10), notas with exministro Castillo context, riesgo
- [ ] 4.3 Add Fernando Olivera: party "Frente de la Esperanza", encuesta 2.0, tendencia "subiendo", all 10 scores (1-10), notas, riesgo
- [ ] 4.4 Add Wolfgang Grozo: encuesta 1.5, tendencia "estable", conservative scores (2-6 range), notas flagging data limitations, riesgo

## Phase 5: Update App.jsx — UI Metadata

- [ ] 5.1 Update insightText: reference debate impact (23-25 marzo), reshuffled landscape, 13% undecided, April 12 election proximity
- [ ] 5.2 Update hero__lede: change "10 candidatos" to "9 candidatos", "Ene-Feb 2026" to "Marzo 2026", add "Ipsos Peru21" to sources
- [ ] 5.3 Update "Candidatos auditados" stat: 10 → 9
- [ ] 5.4 Update "Electorado indeciso" stat: 42% → 13%

## Phase 6: Validation & Verification

- [ ] 6.1 Verify candidates array has exactly 9 entries
- [ ] 6.2 Verify all 9 candidates have exactly 10 score keys, each integer 1-10
- [ ] 6.3 Verify all encuesta values are positive numbers and all tendencias are valid (subiendo/bajando/estable/variable)
- [ ] 6.4 Verify no duplicate color hex values and no duplicate name strings
- [ ] 6.5 Run `npm run build` — must complete without errors
- [ ] 6.6 Spot-check scorecard calculation: rankCandidates returns sorted array with correct finalScore for at least 3 candidates
