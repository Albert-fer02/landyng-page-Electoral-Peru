# Proposal: Actualizar Datos Abril 1, 2026

## Intent

Actualizar el scorecard electoral con datos Ipsos 26-27 marzo 2026 (post-segundo-debate, publicada 30 marzo), la medición más reciente antes de las elecciones del 12 de abril. Reflejar cambios en intención de voto, tendencias y panorama competitivo.

## Scope

### In Scope
- Actualizar `encuesta`, `tendencia`, `notas` y `riesgo` de todos los candidatos vigentes con datos Ipsos 26-27 marzo
- Agregar Ricardo Belmont (3%, Somos Perú) con scores estimados conservadoramente
- Remover Wolfgang Grozo (colapsó a "Otros" tras escándalo)
- Mantener César Acuña con nota aclaratoria (3.2% CPI, sin medición Ipsos reciente)
- Actualizar `insightText`, `hero__lede` y stats en `App.jsx` (10 candidatos, 13% indecisos)

### Out of Scope
- No modificar `criteria.js` ni `scorecard.js` (metodología intacta)
- No cambiar componentes UI (CandidateCard, SortControls, MethodologyPanel)
- No implementar visualización dual de encuestas (CPI + Ipsos)
- No agregar candidatos bajo 2% (Lescano, Atencio, etc.)

## Approach

**Full Data Refresh** — Reemplazar datos de candidatos con Ipsos 26-27 marzo post-debate. Misma arquitectura: datos en `candidates.js`, UI data-agnostic.

Cambios de composición:
- **Sale:** Wolfgang Grozo (1.5% → "Otros")
- **Entra:** Ricardo Belmont (3%, subiendo)
- **Resultado:** 10 candidatos (misma cantidad)

Scores Belmont estimados: experiencia 7, propuesta_tech 3, anticorrupcion 6, seguridad 5, descentralizacion 5, viabilidad 3, equipo_tecnico 4, integridad 6, gobernabilidad 5, plan_concreto 4.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/candidates.js` | Modified | Actualizar 9 candidatos existentes, agregar Belmont, remover Grozo |
| `src/App.jsx` | Modified | Actualizar insightText, hero__lede, stats (10 candidatos, 13% indecisos) |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Scores estimados para Belmont inexactos | Medium | Scores conservadores, notas aclaran que son estimaciones |
| Datos de encuesta cambian rápidamente | High | Fecha de encuesta documentada en notas de cada candidato |
| César Acuña sin medición Ipsos | Medium | Mantener con nota explicativa, fácil de remover si cae más |

## Rollback Plan

Revertir el commit con `git revert HEAD`. Los únicos archivos modificados son `candidates.js` y `App.jsx` — ambos se restauran completamente al estado anterior sin dependencias cruzadas.

## Dependencies

- Ninguna externa. Datos de Ipsos 26-27 marzo ya publicados y verificados.

## Success Criteria

- [ ] 10 candidatos en `candidates.js` con datos Ipsos 26-27 marzo
- [ ] Ricardo Belmont incluido con scores y datos de encuesta
- [ ] Wolfgang Grozo removido
- [ ] `App.jsx` refleja 10 candidatos y 13% indecisos
- [ ] `insightText` actualizado con contexto post-segundo-debate
- [ ] Build pasa sin errores (`npm run build`)
- [ ] Todos los candidatos validan: 10 scores (1-10), tendencia válida, color único, nombre único
