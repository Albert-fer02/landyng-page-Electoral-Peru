# Exploration: Actualizar Datos Abril 1, 2026

## Current State

La aplicación muestra datos de la encuesta CPI (21-23 marzo, pre-debate) e Ipsos (26-27 marzo, post-primer-debate) con 10 candidatos. El último commit (0630a1e) ya incluyó la actualización de marzo 2026 con los cambios post-primer-debate JNE (23-25 marzo).

**Datos actuales en `candidates.js` (10 candidatos):**
1. Rafael López Aliaga — 11.7% CPI, bajando
2. Keiko Fujimori — 11.0%, subiendo
3. Alfonso López Chau — 6.6%, bajando
4. Carlos Álvarez — 7.0%, subiendo
5. Jorge Nieto Montesinos — 5.0%, subiendo
6. Roberto Sánchez — 3.1%, estable
7. César Acuña — 3.2%, estable
8. Marisol Pérez Tello — 2.0%, subiendo
9. Wolfgang Grozo — 1.5%, bajando
10. Fernando Olivera — 2.0%, subiendo

**UI metadata en `App.jsx`:**
- Lede: "10 candidatos principales"
- Stats: "10 Candidatos auditados", "23% Electorado indeciso"
- Insight: texto sobre debate JNE 23-25 marzo, segundo debate 30 marzo-1 abril

## What Changed Since Last Update

### Ipsos Post-Segundo-Debate (26-27 marzo, publicada 30 marzo)
La encuesta Ipsos más reciente (26-27 marzo, publicada 30 marzo en RPP/Perú21) refleja el impacto del **segundo debate** (30 marzo - 1 abril aún en curso al momento de la encuesta):

| Candidato | Ipsos anterior | Ipsos 26-27 marzo | Cambio |
|-----------|---------------|-------------------|--------|
| Keiko Fujimori | 11% | 11% | = (estable) |
| R. López Aliaga | 10% → 9% | 9% | -1 (bajando) |
| Carlos Álvarez | 5% | 7% | +2 (subiendo, 3er lugar) |
| Jorge Nieto | 2% → 5% | 5% | = (estable en 4to) |
| Alfonso López Chau | 5% | 4% | -1 (bajando, 5to) |
| Roberto Sánchez | 5% | 4% | -1 (bajando, 6to) |
| Ricardo Belmont | 2% | 3% | +1 (nuevo en top) |
| Fernando Olivera | "Otros" | 2% | + (subiendo) |
| Marisol Pérez Tello | "Otros" | 2% | + (subiendo) |
| Yohny Lescano | — | 2% | nuevo |
| Ronald Atencio | — | 2% | nuevo |
| Wolfgang Grozo | 4% | "Otros" | colapsó |

### CPI 26 Marzo 2026 (publicada 26 marzo)
| Candidato | CPI Marzo | Cambio vs anterior |
|-----------|-----------|-------------------|
| R. López Aliaga | 11.2% | -1.5 |
| Keiko Fujimori | 10.1% | +2.1 |
| Alfonso López Chau | 6.6% | +1.0 |
| Jorge Nieto | 3.9% | nuevo |
| Carlos Álvarez | 3.5% | -1.5 |
| César Acuña | 3.2% | -0.2 |
| Roberto Sánchez | 3.1% | +1.4 |
| José Luna Gálvez | 3.0% | = |
| Wolfgang Grozo | 2.9% | -1.9 |
| George Forsyth | 2.3% | -0.1 |
| Ricardo Belmont | 2.1% | nuevo |
| Yonhy Lescano | 1.1% | -0.8 |
| Rosario Fernández | 0.9% | nuevo |
| Mario Vizcarra | 0.9% | -1.6 |
| Vladimir Cerrón | 0.8% | nuevo |

**Indecisos CPI:** 23.1% (bajaron de 30%+ en enero)
**Indec Ipsos:** 13% (voto indeciso) + 21% blanco/nulo/viciado

### Key Discoveries
1. **Carlos Álvarez subió al 3er lugar** en Ipsos post-debate (7%), superando a López Chau y Sánchez
2. **Wolfgang Grozo colapsó** — pasó de 4% a "Otros" tras escándalo con Zamir Villaverde
3. **Ricardo Belmont aparece con 3%** en Ipsos — candidato nuevo relevante que no está en la app
4. **César Acuña sigue en CPI (3.2%) pero desapareció de Ipsos** — actualmente en la app pero sin medición Ipsos
5. **Elecciones son el 12 de abril** — quedan ~11 días desde hoy (1 abril)

## Affected Areas

- `src/data/candidates.js` — Actualizar porcentajes encuesta, tendencias, notas y riesgo para todos los candidatos vigentes
- `src/App.jsx` — Actualizar insightText, hero lede, stats (indecisos)
- `index.html` — Actualizar meta description si cambia número de candidatos

## Approaches

### 1. Update Only Poll Numbers (Minimal)
Actualizar solo los valores de `encuesta`, `tendencia`, `notas` y `riesgo` de los candidatos existentes con datos Ipsos 26-27 marzo.
- **Pros:** Cambio mínimo, bajo riesgo, rápido
- **Cons:** No incluye candidatos nuevos relevantes (Ricardo Belmont 3%)
- **Effort:** Low

### 2. Full Data Refresh (Recommended)
Actualizar todos los datos con Ipsos 26-27 marzo, agregar Ricardo Belmont (3%), remover candidatos que cayeron a "Otros" (Wolfgang Grozo), actualizar toda la metadata UI.
- **Pros:** Datos más actuales y precisos, incluye nuevo candidato relevante
- **Cons:** Requiere definir scores para Belmont, más cambios
- **Effort:** Medium

### 3. Dual-Poll Display
Mostrar ambas encuestas (CPI + Ipsos) lado a lado en la UI.
- **Pros:** Máxima transparencia, comparabilidad
- **Cons:** Cambio de arquitectura UI significativo, fuera de scope actual
- **Effort:** High

## Recommendation

**Approach 2: Full Data Refresh**

Actualizar con Ipsos 26-27 marzo (post-debate, la más reciente):
- **Keiko Fujimori:** 11%, estable (era 11%, sin cambio)
- **Rafael López Aliaga:** 9%, bajando (ya está en 11.7% CPI — ajustar a 9% Ipsos o mantener dual)
- **Carlos Álvarez:** 7%, subiendo (era 7.0% — ya correcto)
- **Jorge Nieto:** 5%, estable/subiendo (era 5.0% — ya correcto)
- **Alfonso López Chau:** 4%, bajando (era 6.6% CPI — ajustar)
- **Roberto Sánchez:** 4%, bajando (era 3.1% CPI — ajustar)
- **Fernando Olivera:** 2%, subiendo (ya está)
- **Marisol Pérez Tello:** 2%, subiendo (ya está)
- **Ricardo Belmont:** 3%, subiendo — **NUEVO**
- **Wolfgang Grozo:** REMOVER (cayó a "Otros")
- **César Acuña:** REMOVER o mantener con nota (3.2% CPI pero no aparece en Ipsos)

Indecisos: 13% (Ipsos) + 21% blanco/nulo/viciado

## Risks

- **Scores para Ricardo Belmont:** No existen scores evaluados — hay que estimarlos conservadoramente
- **Wolfgang Grozo removal:** Si se remueve, quedan 9 candidatos (ya contemplado en spec anterior)
- **César Acuña ambiguity:** Tiene 3.2% CPI pero no aparece en Ipsos — decisión de mantener o remover
- **Timing:** Las elecciones son el 12 de abril — cualquier cambio post-esta actualización podría ser la última antes del voto

## Ready for Proposal

**Yes** — Hay datos suficientes de Ipsos 26-27 marzo (publicada 30 marzo) para crear una propuesta de actualización. El scope sería:

1. Actualizar `encuesta` y `tendencia` de candidatos vigentes con Ipsos 26-27 marzo
2. Agregar Ricardo Belmont (3%, Obras) con scores estimados
3. Remover Wolfgang Grozo (cayó a "Otros")
4. Decidir sobre César Acuña (mantener con nota o remover)
5. Actualizar notas, riesgo, insightText, hero lede y stats
6. Actualizar indecisos: 13%
