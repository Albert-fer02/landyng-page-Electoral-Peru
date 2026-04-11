# Technical Design: Actualizar Datos Abril 11 2026

## Overview

Update `src/data/candidates.js` with the latest Ipsos poll data (Abril 1-2, 2026).

## Files Changed

- `src/data/candidates.js` — ONLY FILE

## Data Changes

### Metadata Update

| Field | Before | After |
|-------|--------|-------|
| POLL_DATE | "2026-03-27" | "2026-04-02" |
| POLL_SOURCE | "Ipsos Perú21" | "Ipsos Perú21" |

### Candidate Updates

| Candidate | Before (marzo) | After (abril) | Trend |
|-----------|-----------------|---------------|------|
| Keiko Fujimori | 11.0% | 18.6% | subiendo |
| Rafael López Aliaga | 9.0% | 10.9% | subiendo |
| Carlos Álvarez | 7.0% | 12.1% | subiendo |
| Jorge Nieto | 5.0% | 5.6% | estable |
| Alfonso López Chau | 4.0% | 4.4% | estable |
| Roberto Sánchez | 4.0% | 9.0% | subiendo |
| Ricardo Belmont | 3.0% | 4.3% | subiendo |
| César Acuña | 3.2% | 5.1% | subiendo |
| Marisol Pérez Tello | 2.0% | 3.9% | subiendo |
| Fernando Olivera | 2.0% | 2.8% |-subiendo |

### Regional Data Update

Update `regional` object for each candidate based on Ipsos abril 2026 regional breakdown where available.

### Notas Update

Update each candidate's `notas` field to reference:
- "Ipsos 1-2 abril (tercer simulacro nacional)" instead of "Ipsos 26-27 marzo"
- Current context about the election (12 de abril)

### Riesgo Updates

Review and update `riesgo` fields to reflect current electoral risks based on april data.

## Implementation Notes

1. Use simulacro values (votos válidos) as `encuesta` values for consistency
2. Verify scores remain appropriate for each candidate
3. Maintain colors and party assignments
4. No changes to other files required

## Verification

After implementation:
1. Verify `POLL_DATE` is "2026-04-02"
2. Verify 10 candidates present
3. Verify top 3 ranking: Keiko (18.6), Carlos Álvarez (12.1), López Aliaga (10.9)
4. Run dev server and verify UI renders