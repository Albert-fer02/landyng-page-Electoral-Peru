# Design: Actualizar Datos Marzo 2026

## Overview

This change updates the electoral scorecard data layer to reflect the March 2026 landscape: 5 candidates removed, 4 new candidates added, poll numbers and tendencies updated for all remaining candidates, and UI metadata refreshed to match the new dataset. No component architecture changes, no scoring methodology modifications — pure data replacement.

## Architecture Decisions

### Decision 1: Direct data replacement in candidates.js

**Approach:** Rewrite the entire `candidates` array in `src/data/candidates.js` rather than applying incremental patches.

**Rationale:**
- The change touches 13 of 14 candidate entries (5 removals, 4 additions, 5 modifications) plus all `notas` and `riesgo` fields — effectively a full rewrite
- Incremental patching (filter then push) would be harder to review and more error-prone
- A single clean array is easier to validate against the spec requirements
- The file is a plain data export with no logic — safe to replace wholesale

**Tradeoff:** Larger diff, but every line is intentional and reviewable.

### Decision 2: Keep criteria.js untouched

**Approach:** No modifications to `src/data/criteria.js`.

**Rationale:**
- The spec explicitly excludes criterion weight changes (Out of Scope in proposal)
- All 10 criteria remain valid for the new candidate set
- New candidates receive scores on the same 10-criterion scale (1-10 integers)
- The scoring formula in `scorecard.js` is criterion-agnostic — it works with any candidate set

### Decision 3: Conservative scoring for Wolfgang Grozo

**Approach:** Assign conservative but plausible scores (range 2-6) across all 10 criteria, with notas explicitly flagging data limitations.

**Rationale:**
- Public information on Wolfgang Grozo is limited as of March 2026
- Conservative scores prevent artificial inflation in the ranking
- The notas field documents the data gap, maintaining transparency
- All 10 criteria must still be populated (spec: Score Integrity requirement)

### Decision 4: UI metadata updates are inline in App.jsx

**Approach:** Update hardcoded strings directly in App.jsx (lede, stats, insightText) rather than extracting to a separate config file.

**Rationale:**
- These are single-use values that don't benefit from abstraction
- The app has no i18n or content management layer — extracting would be premature
- The change is small (4 string updates) — extraction adds indirection without value
- If content becomes dynamic in the future, extraction can happen then

### Decision 5: No changes to scorecard.js

**Approach:** The scoring utility (`rankCandidates`, `calculateCandidateScore`) remains untouched.

**Rationale:**
- The weighted-average formula is candidate-count agnostic
- New candidates have all 10 criterion keys populated (spec validation)
- No new sort modes or scoring dimensions are introduced
- `getScoreTone` and `getMetricTone` thresholds remain valid

## Files Changed

### 1. `src/data/candidates.js` — MODIFIED (primary change)

**What changes:**
- **Remove** 5 candidates: Mario Vizcarra, César Acuña, Mesías Guevara, Fiorella Molinelli, George Forsyth
- **Add** 4 candidates: Jorge Nieto Montesinos, Roberto Sánchez, Fernando Olivera, Wolfgang Grozo
- **Update** 5 existing candidates with new poll data and tendencies:

| Candidate | encuesta (old → new) | tendencia (old → new) |
|-----------|---------------------|----------------------|
| Rafael López Aliaga | 13.9 → 9.0 | estable → bajando |
| Keiko Fujimori | 7.0 → 11.0 | estable → estable |
| Alfonso López Chau | 5.1 → 4.0 | subiendo → bajando |
| Carlos Álvarez | 4.0 → 7.0 | variable → subiendo |
| Marisol Pérez Tello | 0.5 → 2.0 | estable → subiendo |

- **Update** `notas` field for all 9 candidates to include post-debate context (JNE debate 23-25 marzo 2026)
- **Update** `riesgo` field for candidates with changed tendencies or new entries

**New candidate profiles:**

| Field | Jorge Nieto | Roberto Sánchez | Fernando Olivera | Wolfgang Grozo |
|-------|-------------|-----------------|------------------|----------------|
| party | Partido del Buen Gobierno | Juntos por el Perú | Frente de la Esperanza | [TBD - research] |
| encuesta | 5.0 | 4.0 | 2.0 | 1.5 |
| tendencia | estable | estable | subiendo | estable |
| color | [TBD] | [TBD] | [TBD] | [TBD] |

**Color assignment strategy:** Assign distinct hex colors that don't clash with existing candidates or each other. Use a muted palette consistent with the current design system.

### 2. `src/App.jsx` — MODIFIED (UI metadata)

**What changes:**

| Line | Field | Old Value | New Value |
|------|-------|-----------|-----------|
| 9-10 | `insightText` | References 42% undecided, Jan-Feb data | References post-debate analysis, 13% undecided, March 2026 data, April 12 election proximity |
| 31 | `hero__lede` | "10 candidatos principales" + "Ene-Feb 2026" | "9 candidatos principales" + "Marzo 2026" |
| 37 | stat value | 10 (Candidatos auditados) | 9 |
| 45 | stat value | 42% (Electorado indeciso) | 13% |

**New insightText content direction:**
- Reference the debate impact (23-25 marzo 2026)
- Note the reshuffled landscape (5 out, 4 in)
- Highlight the 13% undecided figure
- Mention election proximity (12 abril 2026)
- Maintain the analytical tone of the original text

### 3. `src/data/criteria.js` — NO CHANGES

Confirmed: all 10 criteria remain valid, weights unchanged, no new criteria added.

### 4. `src/lib/scorecard.js` — NO CHANGES

Confirmed: scoring formula is candidate-agnostic, no logic changes needed.

### 5. Component files — NO CHANGES

`CandidateCard.jsx`, `TrendBadge.jsx`, `SortControls.jsx`, `ScoreBar.jsx`, `MethodologyPanel.jsx` — all remain untouched. The existing components already handle:
- Dynamic candidate count (maps over array)
- All 4 tendency values via `trendMap` (subiendo, bajando, estable, variable)
- Score calculation via `rankCandidates` utility
- Expandable detail panels with notas and riesgo

## Data Transformation Approach

### Step 1: Remove departed candidates

Filter out the 5 candidates who no longer appear in recent measurements. This is a simple deletion — no data migration needed.

### Step 2: Update existing candidates

For each of the 5 remaining candidates with changed data:
1. Update `encuesta` value to match Ipsos March 2026
2. Update `tendencia` based on debate performance and poll movement
3. Rewrite `notas` to include post-debate context
4. Review and update `riesgo` if the risk profile changed

**Preserved fields:** `name`, `party`, `color`, `scores` (all 10 criteria) — unless the spec explicitly calls for a change.

### Step 3: Add new candidates

For each new candidate, construct a complete entry with:
- `name`: Full name as it appears in official sources
- `party`: Official party/alliance name
- `color`: Unique hex color (no duplicates with existing candidates)
- `scores`: All 10 criteria as integers 1-10 (conservative for data-limited candidates)
- `encuesta`: Poll percentage from Ipsos March 2026
- `tendencia`: One of "subiendo", "bajando", "estable", "variable"
- `notas`: Contextual notes including background and debate performance
- `riesgo`: Risk factors specific to the candidate

### Step 4: Validate the final array

Before considering the change complete:
1. Count = exactly 9 candidates
2. Every candidate has all 10 score keys present
3. Every score is an integer between 1 and 10
4. Every `encuesta` is a positive number
5. Every `tendencia` is one of the 4 valid values
6. No duplicate `color` values
7. No duplicate `name` values

## Validation Checklist

| Check | Method | Expected |
|-------|--------|----------|
| Candidate count | `candidates.length` | 9 |
| All scores present | Each candidate has 10 keys in `scores` | ✅ |
| Score range | All values in `scores` are 1-10 | ✅ |
| Tendency values | All `tendencia` ∈ {subiendo, bajando, estable, variable} | ✅ |
| Unique colors | No duplicate hex values | ✅ |
| Unique names | No duplicate name strings | ✅ |
| App renders | `npm run dev` or `npm run build` | No errors |
| Score calculation | `rankCandidates()` returns sorted array | ✅ |

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Wolfgang Grozo data incomplete | Use conservative scores, flag in notas, document source limitations |
| Score calculation breaks | Utility is candidate-agnostic; validate with manual spot-check |
| Color collision | Assign colors sequentially from a pre-checked palette |
| UI text mismatch | Cross-reference all 4 string updates against spec requirements |

## Rollback Plan

1. `git revert` the commit containing this change
2. Verify app renders with original 10 candidates
3. No build artifacts or database state to clean up — data-only change

## Dependencies

- Ipsos Peru21 survey data (26-27 marzo 2026) — source of truth for poll numbers
- JNE debate coverage (23-25 marzo 2026) — source for tendency changes and notas context
- Research on Wolfgang Grozo — needed for complete candidate profile
