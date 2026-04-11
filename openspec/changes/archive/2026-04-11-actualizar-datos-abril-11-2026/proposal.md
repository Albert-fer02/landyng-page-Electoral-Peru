# Proposal: Actualizar Datos - Abril 11 2026

## Context

- **Elecciones**: 12 de abril 2026 (1 día restante)
- **Fuente principal**: Ipsos Perú21 (1-2 abril, tercer simulacro, última encuesta publicable)
- **Otras fuentes**: Datum (1-4 abril), CPI (abril)
- **Fecha actual en dataset**: 27 marzo 2026 (obsoleta, 15 días atrás)
- **Estado**: Las encuestas muestran cambios dramática —Carlos Álvarez supera a López Aliaga, Keiko lidera con 18.6%

## Problem

El dataset actual (`src/data/candidates.js`) contiene datos de Ipsos 26-27 marzo 2026, que están 15 días obsoletos. La последняя semana de campagne ha producida cambios significativos:

- **Keiko Fujimori**: 11% → 15% (intención) / 18.6% (simulacro)
- **Carlos Álvarez**: 7% → 8-9% (intención) / 12.1% (simulacro) — **2do lugar**
- **Rafael López Aliaga**: 9% → 7% (intención) / 10.9% (simulacro) — **cae al 3er lugar**
- **Roberto Sánchez**: 4% → 5-6% (intención) / 9% (simulacro)
- **Jorge Nieto**: 5% → 4-6%
- **Alfonso López Chau**: 4% → 3.3-4.7%
- **Ricardo Belmont**: 3% → 3.2-6% ( creeping up)
- **Marisol Pérez Tello**: 2% → 2.8-4.5%
- **César Acuña**: 3.2% → 3.2%
- **Fernando Olivera**: 2% → 1.8-3%

## Intent

Actualizar el dataset con los números más recientes de Ipsos (1-2 abril) antes de las elecciones del 12 de abril. La actualización debe reflejar el "efecto debate" y la consolidación de Álvarez como segundo lugar.

## Scope

### Incluido
- Actualizar `POLL_DATE` = "2026-04-02"
- Actualizar `POLL_SOURCE` = "Ipsos Perú21"
- Actualizar campos `encuesta` con nuevos valores de Ipsos
- Actualizar `tendencia` según comparación marzo → abril
- Actualizar `notas` con nueva información y fechas
- Actualizar `regional` con datos de Ipsos por región

### No incluido (out of scope)
- Agregar nuevos candidatos (ninguno nuevo aparece desde marzo)
- Remover candidatos (todos los 10 siguen activos)
- Cambiar estructura de datos
- Modificar componentes UI

## Approach

**Estrategia**: Actualización in-place de `candidates.js` con datos Ipsos 1-2 abril

1. **Fase 1** — Investigar y compilar datos de encuestas (COMPLETADO)
   - Ipsos 1-2 abril (fuente principal)
   - Datum 1-4 abril (cross-reference)
   - CPI abril (cross-reference)

2. **Fase 2** — Escribir specs (este documento)

3. **Fase 3** — Implementar cambios en `candidates.js`

4. **Fase 4** — Verificar UI renderiza correctamente

## Data Notes

### Ipsos 1-2 abril — Tercer Simulacro Nacional
| Candidato | Intención | Simulacro (votos válidos) |
|-----------|-----------|----------------------------|
| Keiko Fujimori | 13-15% | 18.6% |
| Carlos Álvarez | 8-9% | 12.1% |
| Rafael López Aliaga | 7-8% | 10.9% |
| Roberto Sánchez | 5-6% | 9.0% |
| Jorge Nieto | 4-5% | 5.6% |
| César Acuña | 3% | 5.1% |
| Alfonso López Chau | 3.3-4% | 4.4% |
| Ricardo Belmont | 3.2-6% | 4.3% |
| Marisol Pérez Tello | 2.8-4.5% | 3.9% |
| Fernando Olivera | 1.8-3% | N/A |

### Cambios clave desde marzo
- **Carlos Álvarez** pasa de 7% a 12.1% (+5.1) — segundo lugar, gran salto post-debate
- **Roberto Sánchez** de 4% a 9% (+5) — recupera momentum post-debate
- **Rafael López Aliaga** de 9% a 10.9% (+1.9) — caída sostenida desde liderazgo enero
- **Alfonso López Chau** cae de 4% a 4.4% — estancado
- **Keiko Fujimori** crece 11% → 18.6% — consolidación liderazgo

### Datos regionales (Ipsos abril)
- Lima: Keiko 18.2%, Álvarez 18.6%, López Aliaga 15.5%
- Norte: Keiko 20.3%, Álvarez 11.2%, López Aliaga 8.4%
- Oriente: Datos dispersos

## Timeline

- Elecciones: 12 abril 2026
- Actualización debe completarse: Antes del 12 de madrugada (ideal 11 abril)
- Última encuesta publicable: 6 abril (veda electoral inicia 7 abril)

## Risks

- **Precisión de datos**: Ipsos es la fuente más confiable, pero Datum y CPI muestran variaciones
- **Voto indeciso**: 23-30% del electorado aún no define
- **Resultado real**: Todas las encuestas predicen segunda vuelta Keiko vs alguien ( Álvarez o López Aliaga )

## Success Criteria

- [ ] `POLL_DATE` = "2026-04-02"
- [ ] `POLL_SOURCE` = "Ipsos Perú21"
- [ ] Keiko Fujimori = 18.6% (simulacro)
- [ ] Carlos Álvarez = 12.1% (simulacro) — segundo lugar
- [ ] Rafael López Aliaga = 10.9% — tercer lugar
- [ ] Las 10 candidatos presentes con datos actualizados
- [ ] Tendencias actualizadas según cambios marzo → abril
- [ ] UI renderiza correctamente

## Dependencies

- Ninguna — actualización autónoma de `candidates.js`