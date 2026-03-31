# Design: Actualizar Datos Abril 1, 2026

## Technical Approach

Full data refresh of `candidates.js` with Ipsos 26-27 March 2026 post-second-debate polling data. One candidate swap (Grozo out, Belmont in) maintains the 10-candidate count. UI metadata in `App.jsx` updated to reflect new context. No component, scoring, or criteria changes — the architecture remains data-agnostic as established in the previous update.

## Architecture Decisions

### Decision: Direct data replacement in candidates.js

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Full array rewrite | Larger diff, but every line intentional and reviewable | ✅ Chosen |
| Incremental patches | Smaller diff, harder to review, more error-prone | Rejected |

**Rationale:** Same pattern as March 2026 update. The change touches 10 of 10 candidate entries (9 modifications, 1 addition, 1 removal) — effectively a full rewrite. A single clean array is easier to validate against spec requirements.

### Decision: Conservative scoring for Ricardo Belmont

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Conservative estimated scores (3-7 range) | Transparent but subjective | ✅ Chosen |
| Omit Belmont until real scores exist | More accurate, but misses relevant candidate | Rejected |
| Copy scores from similar candidate | Easy, but misleading | Rejected |

**Rationale:** Belmont has 3% Ipsos but no formal evaluation. Conservative scores prevent artificial inflation. The `notas` field explicitly flags these as estimates, maintaining transparency. All 10 criteria must be populated per spec.

### Decision: Keep César Acuña with clarifying note

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Keep with note explaining no Ipsos data | Preserves CPI data, acknowledges gap | ✅ Chosen |
| Remove entirely | Cleaner, but loses CPI 3.2% data point | Rejected |

**Rationale:** Acuña has 3.2% CPI (significant) but no Ipsos measurement. Keeping him with an explicit note preserves data completeness while being transparent about the measurement gap. Easy to remove later if he drops further.

### Decision: criteria.js and scorecard.js untouched

**Rationale:** No criterion weight changes, no new scoring dimensions. The weighted-average formula is candidate-count agnostic. All 10 criteria remain valid for the updated candidate set.

### Decision: UI metadata inline in App.jsx

**Rationale:** Single-use values (lede, stats, insightText) don't benefit from abstraction. The app has no i18n or content management layer. Four string updates — extraction would be premature indirection.

## Data Flow

```
candidates.js (data) ──→ rankCandidates() ──→ sorted array ──→ CandidateCard[]
       │                                              │
       │ (10 candidates, Ipsos 26-27 Mar)             │ (score, trend, poll)
       │                                              │
       └──────────────── App.jsx ─────────────────────┘
                    │
                    ├── hero__lede (metadata string)
                    ├── hero__stats (count, undecided %)
                    └── insightText (analysis paragraph)
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/data/candidates.js` | Modify | Update 9 existing candidates with Ipsos 26-27 March data, add Ricardo Belmont, remove Wolfgang Grozo |
| `src/App.jsx` | Modify | Update `insightText`, `hero__lede`, stats (10 candidates, 13% undecided) |
| `src/data/criteria.js` | No change | All 10 criteria remain valid, weights unchanged |
| `src/lib/scorecard.js` | No change | Scoring formula is candidate-agnostic |
| `src/components/*` | No change | All components are data-agnostic |

## Data Transformation Details

### Candidate Updates (Ipsos 26-27 March)

| Candidate | encuesta (old → new) | tendencia (old → new) |
|-----------|---------------------|----------------------|
| Keiko Fujimori | 11.0 → 11.0 | subiendo → estable |
| Rafael López Aliaga | 11.7 → 9.0 | bajando → bajando |
| Carlos Álvarez | 7.0 → 7.0 | subiendo → subiendo |
| Jorge Nieto Montesinos | 5.0 → 5.0 | subiendo → estable |
| Alfonso López Chau | 6.6 → 4.0 | bajando → bajando |
| Roberto Sánchez | 3.1 → 4.0 | estable → bajando |
| César Acuña | 3.2 → 3.2 | estable → estable (nota: sin Ipsos) |
| Fernando Olivera | 2.0 → 2.0 | subiendo → subiendo |
| Marisol Pérez Tello | 2.0 → 2.0 | subiendo → subiendo |

### Candidate Removal

| Candidate | Reason |
|-----------|--------|
| Wolfgang Grozo | Collapsed to "Otros" post-scandal (was 1.5%) |

### Candidate Addition

| Field | Ricardo Belmont |
|-------|-----------------|
| party | Somos Perú |
| color | `#1E88E5` (blue, distinct from existing palette) |
| encuesta | 3.0 |
| tendencia | subiendo |
| scores | experiencia: 7, propuesta_tech: 3, anticorrupcion: 6, seguridad: 5, descentralizacion: 5, viabilidad: 3, equipo_tecnico: 4, integridad: 6, gobernabilidad: 5, plan_concreto: 4 |
| notas | Exalcalde de Lima (2003-2006), ingeniero civil. 3% Ipsos 26-27 marzo (subió de 2%). Postura anticorrupción, enfoque en obras e infraestructura. Scores estimados conservadoramente — sin evaluación formal completa. |
| riesgo | Scores estimados, retorno político tras años alejado, partido con estructura limitada |

### UI Metadata Updates (App.jsx)

| Field | Old Value | New Value |
|-------|-----------|-----------|
| `insightText` | Post-primer-debate JNE, 23-25 marzo context | Post-segundo-debate context, Ipsos 26-27 marzo as latest, 12 days to April 12 election |
| `hero__lede` | "10 candidatos principales · ... · Segundo debate en curso" | "10 candidatos principales · ... · Datos Ipsos 26-27 marzo (post-segundo-debate) · 12 días para elecciones" |
| undecided stat | 23% (CPI figure) | 13% (Ipsos figure) |

## Interfaces / Contracts

No new interfaces. The existing candidate shape remains:

```javascript
{
  name: string,           // Unique identifier
  party: string,          // Political party/alliance
  color: string,          // Unique hex color
  scores: {               // 10 criteria, integers 1-10
    experiencia: number,
    propuesta_tech: number,
    anticorrupcion: number,
    seguridad: number,
    descentralizacion: number,
    viabilidad: number,
    equipo_tecnico: number,
    integridad: number,
    gobernabilidad: number,
    plan_concreto: number,
  },
  encuesta: number,       // Poll percentage (Ipsos 26-27 March)
  tendencia: "subiendo" | "bajando" | "estable" | "variable",
  notas: string,          // Contextual notes
  riesgo: string,         // Risk factors
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Manual | All 10 candidates render with correct data | Visual inspection of poll numbers, trends, colors |
| Manual | Belmont appears with estimated scores noted | Check notas field mentions estimation |
| Manual | Grozo does not appear in list | Verify candidate count = 10 |
| Manual | UI metadata reflects 10 candidates, 13% undecided | Check hero section |
| Build | `npm run build` passes without errors | CLI verification |
| Validation | All candidates have 10 scores (1-10), unique colors, unique names | Manual checklist |

## Migration / Rollout

No migration required. This is a data-only change with no state persistence or database.

**Rollback:** `git revert HEAD` — restores `candidates.js` and `App.jsx` to previous state with zero dependencies.

## Open Questions

- [ ] None — all data points sourced from published Ipsos 26-27 March survey and CPI March 2026