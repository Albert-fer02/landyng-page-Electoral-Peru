# Tasks: Actualizar Datos Abril 11 2026

## Overview

Update `src/data/candidates.js` with latest Ipsos poll data (April 1-2, 2026).

## Tasks

### Task 1: Update Metadata
**File**: `src/data/candidates.js`  
**Type**: Data Update  
**Priority**: P0

- Change `POLL_DATE` from "2026-03-27" to "2026-04-02"
- Change `POLL_SOURCE` to "Ipsos Perú21 (Abril 1-2)"
- Verify the export is correct

**Acceptance Criteria**:
- [x] POLL_DATE = "2026-04-02"
- [x] POLL_SOURCE = "Ipsos Perú21"

### Task 2: Update Top 3 Candidates (Keiko, Carlos Álvarez, López Aliaga)
**File**: `src/data/candidates.js`  
**Type**: Data Update  
**Priority**: P0

Update the following candidates with their new `encuesta` values:

| Candidate | New encuesta | New tendencia |
|----------|-------------|--------------|
| Keiko Fujimori | 18.6 | subiendo |
| Carlos Álvarez | 12.1 | subiendo |
| Rafael López Aliaga | 10.9 | subiendo |

Update `notas` to reference "Ipsos 1-2 abril (tercer simulacro nacional)"  
Update `regional` data where available

**Acceptance Criteria**:
- [x] Keiko Fujimori has 18.6%
- [x] Carlos Álvarez has 12.1%
- [x] López Aliaga has 10.9%
- [x] All tendencias are "subiendo"
- [x] Notas reference correct Ipsos date

### Task 3: Update Mid-Tier Candidates (Nieto, López Chau, Sánchez, Belmont)
**File**: `src/data/candidates.js`  
**Type**: Data Update  
**Priority**: P0

| Candidate | New encuesta | New tendencia |
|----------|-------------|--------------|
| Jorge Nieto | 5.6 | estable |
| Alfonso López Chau | 4.4 | estable |
| Roberto Sánchez | 9.0 | subiendo |
| Ricardo Belmont | 4.3 | subiendo |

Update `notas` for each candidate

**Acceptance Criteria**:
- [x] Jorge Nieto has 5.6%
- [x] Alfonso López Chau has 4.4%
- [x] Roberto Sánchez has 9.0%
- [x] Ricardo Belmont has 4.3%
- [x] Notas updated

### Task 4: Update Lower-Tier Candidates (Acuña, Pérez Tello, Olivera)
**File**: `src/data/candidates.js`  
**Type**: Data Update  
**Priority**: P1

| Candidate | New encuesta | New tendencia |
|----------|-------------|--------------|
| César Acuña | 5.1 | subiendo |
| Marisol Pérez Tello | 3.9 | subiendo |
| Fernando Olivera | 2.8 | subiendo |

Update `notas` for each candidate

**Acceptance Criteria**:
- [x] César Acuña has 5.1%
- [x] Marisol Pérez Tello has 3.9%
- [x] Fernando Olivera has 2.8%
- [x] Notas updated

### Task 5: Final Data Validation
**File**: `src/data/candidates.js`  
**Type**: Validation  
**Priority**: P0

- Verify all 10 candidates present
- Verify no duplicate names or colors
- Verify scores objects each have 10 keys
- Verify tendencias are valid (subiendo/bajando/estable)
- Export validation passes

**Acceptance Criteria**:
- [x] 10 candidates in array
- [x] All unique names
- [x] All unique colors
- [x] All scores objects valid
- [x] All tendencias valid

### Task 6: UI Verification
**Type**: Test  
**Priority**: P0

- Run dev server
- Verify page loads without errors
- Verify candidate cards display correctly
- Verify ranking is correct (Keiko 1st, Álvarez 2nd, López Aliaga 3rd)

**Acceptance Criteria**:
- [ ] App renders without console errors
- [ ] Top 3 candidates in correct order
- [ ] All 10 candidates visible

## Sequential Dependencies

Task 1 must complete before Tasks 2-4.  
Tasks 2-4 can run in parallel.  
Task 5 must complete after Tasks 2-4.  
Task 6 runs after Task 5.

## Implementation Notes

- No components modify — only data file
- No tests to update — data file has no test suite
- Use simulacro values (votos válidos) as `encuesta`
