# Spec: Actualizar Datos Abril 1 2026

## Context
- Elecciones: 12 de abril 2026 (11 días)
- Fuente principal: Ipsos Perú21 (26-27 marzo, post-primer-debate, publicada 30 marzo)
- Segundo debate: 30 marzo - 1 abril (en curso/completándose)
- Ricardo Belmont emerge con 3% (Ipsos), Wolfgang Grozo cae a "Otros"

## Requirements

### REQ-1: Actualizar candidatos existentes
El sistema DEBE actualizar los datos de los 9 candidatos existentes con valores Ipsos post-debate.

#### Escenarios
- Given Keiko Fujimori, When encuestas actualizadas, Then 11%, tendencia estable
- Given R. López Aliaga, When encuestas actualizadas, Then 9%, tendencia bajando
- Given Carlos Álvarez, When encuestas actualizadas, Then 7%, tendencia subiendo
- Given Jorge Nieto, When encuestas actualizadas, Then 5%, tendencia subiendo
- Given Alfonso López Chau, When encuestas actualizadas, Then 4%, tendencia bajando
- Given Roberto Sánchez, When encuestas actualizadas, Then 4%, tendencia bajando
- Given Fernando Olivera, When encuestas actualizadas, Then 2%, tendencia subiendo
- Given Marisol Pérez Tello, When encuestas actualizadas, Then 2%, tendencia subiendo
- Given César Acuña, When encuestas actualizadas, Then 3.2% CPI (sin dato Ipsos), tendencia estable

### REQ-2: Agregar Ricardo Belmont
El sistema DEBE agregar a Ricardo Belmont como candidato activo con 3% de intención de voto.

#### Escenarios
- Given nuevo candidato Ricardo Belmont, When agregado al sistema, Then debe tener scores en los 10 criterios
- Given Ricardo Belmont, When renderizado, Then debe mostrar partido "Obras", color único, tendencia subiendo

### REQ-3: Remover Wolfgang Grozo
El sistema DEBE remover a Wolfgang Grozo del dataset activo.

#### Escenarios
- Given Wolfgang Grozo en dataset, When actualización aplicada, Then debe ser eliminado completamente
- Given dataset actualizado, When conteo de candidatos, Then debe ser 10 (9 existentes + Belmont)

### REQ-4: Actualizar metadata UI
El sistema DEBE actualizar toda la metadata visible en la interfaz.

#### Escenarios
- Given App.jsx, When renderizado, Then hero lede debe mencionar "Ipsos Perú21 (Marzo 26-27, 2026)"
- Given App.jsx, When renderizado, Then debe mostrar "10 candidatos auditados"
- Given App.jsx, When renderizado, Then indecisos debe mostrar "33%" (21% blanco/nulo + 13% indeciso)
- Given App.jsx, When renderizado, Then insight debe reflejar segundo debate y Belmont/Grozo

## Notas de Implementación
- Solo 2 archivos cambian: candidates.js y App.jsx
- criteria.js, scorecard.js y componentes NO cambian
- Scores de Belmont estimados conservadoramente (exalcalde Lima, perfil técnico, sin escándalos)
