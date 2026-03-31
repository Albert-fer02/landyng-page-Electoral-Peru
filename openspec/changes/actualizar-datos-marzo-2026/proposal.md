# Proposal: Actualizar Datos Marzo 2026

## Intent

Actualizar el scorecard electoral con los datos de la encuesta Ipsos Peru21 (26-27 marzo 2026) y reflejar el impacto del debate presidencial (23-25 marzo 2026). El proyecto actualmente muestra datos de enero-febrero 2026 con 10 candidatos, pero el panorama electoral ha cambiado significativamente: 5 candidatos fueron removidos, 4 nuevos entraron, y las preferencias electorales se movieron tras el debate y la proximidad de las elecciones (12 abril 2026).

## Scope

### In Scope
- Eliminar candidatos sin relevancia: Mario Vizcarra, César Acuña, Mesías Guevara, Fiorella Molinelli, George Forsyth
- Agregar nuevos candidatos: Jorge Nieto (5%, Partido del Buen Gobierno), Roberto Sánchez (4%, Juntos por el Perú), Fernando Olivera (2%, Frente de la Esperanza), Wolfgang Grozo (investigación needed)
- Actualizar porcentajes de encuesta para candidatos vigentes según Ipsos marzo 2026
- Actualizar tendencias (tendencia) basadas en desempeño en debate
- Documentar notas de cada candidato con información del debate y contexto actual
- Incluir análisis de impacto del debate en la visualización

### Out of Scope
- Modificar criterios de evaluación o pesos (weights en criteria.js)
- Agregar nuevas métricas de análisis más allá de debate impact
- Cambiar arquitectura de componentes React

## Approach

1. **Data Update**: Modificar `src/data/candidates.js` removiendo 5 candidatos, agregando 4 nuevos, actualizando `encuesta` y `tendencia` de los vigentes
2. **Research Required**: Buscar información de Wolfgang Grozo (posición política, partido, propuestas) para crear entrada completa
3. **Notes Enhancement**: Actualizar campo `notas` de cada candidato para incluir contexto post-debate
4. **Verification**: Verificar que el cálculo de score funcione correctamente con el nuevo set de candidatos

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/data/candidates.js` | Modified | Remove 5, add 4, update poll numbers and tendencies |
| `src/data/candidates.js` | Modified | Actualizar notas con análisis post-debate |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Datos de Wolfgang Grozo incompletos | Medium | Investigar antes de implementar; si no hay info, no incluir o marcar como "pendiente" |
| Error en cálculo de scores con nuevo set | Low | Verificar que weighted average funcione post-cambios |
| Desbalanceo visual por cambio en número de candidatos | Low | Revisar que UI no se rompa con 9 candidatos en vez de 10 |

## Rollback Plan

1. Revertir cambios en `src/data/candidates.js` al commit anterior
2. Verificar que la aplicación renderice correctamente con los 10 candidatos originales
3. No se requiere rollback de archivos de build ya que solo se modifica data

## Dependencies

- Encuesta Ipsos Peru21 (26-27 marzo 2026) - proporcionada por usuario
- Información de Wolfgang Grozo - requiere investigación adicional
- Resultados oficiales del debate JNE (23-25 marzo 2026) - contexto para actualización de tendencias

## Success Criteria

- [ ] La aplicación muestra 9 candidatos (5 removidos + 4 nuevos = 9 restantes)
- [ ] Porcentajes de encuesta coinciden con datos Ipsos marzo 2026
- [ ] Tendencias reflejan desempeño post-debate
- [ ] Scorecard calcula correctamente weighted scores para todos los candidatos
- [ ] La aplicación compila sin errores (`npm run build`)
