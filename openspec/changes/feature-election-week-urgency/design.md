# Design: election-week-urgency

## Technical Approach

Agregar indicadores de urgencia visual en el hero de la página: un countdown timer mostrando días/horas hasta las elecciones del 12 de abril, un badge de última actualización, y una sección informativa de ONPE. Los tres componentes se integran en el hero section existente, manteniendo consistencia con los patrones visuales y de código del proyecto.

## Architecture Decisions

### Decision: Cálculo de timezone para countdown

**Choice**: Función utilitaria propia usando `Date.UTC()` con offset fijo UTC-5 (PET)
**Alternatives considered**: 
- date-fns o dayjs (añade dependencia externa)
- `Intl.DateTimeFormat` con timezone hardcodeado
**Rationale**: Proyecto no tiene dependencias de fecha. Perú no usa DST, UTC-5 es estable. Función simple permite testing directo y no requiere bundle adicional.

### Decision: Ubicación de componentes en UI

**Choice**: Agregar en hero section, debajo del texto "11 días para elecciones" existente
**Alternatives considered**: 
- Componente separado arriba del ranking (rompe flujo narrativo)
- Footer (menor urgencia visual)
**Rationale**: El hero ya contiene "11 días para elecciones" en el lede. Agregar countdown y badge ahí concentra la urgencia donde el usuario lee el contexto.

### Decision: Estructura de datos para ONPE info

**Choice**: Objeto de configuración hardcodeado en componente
**Alternatives considered**:
- Extender data/candidates.js (fuera de scope)
- Fetch de JSON externo (overengineering)
**Rationale**: Info de ONPE es estática hasta las elecciones. Hardcode simplifica mantenimiento.

## Data Flow

```
┌─────────────────────────────┐
│     App.jsx (root)           │
│  ├─ electionDate = new Date()│
│  │   "2026-04-12T00:00:00Z"  │
│  └─ passes date to children  │
└──────────────┬──────────────┘
               │
        ┌──────┴──────┬──────────────┐
        ▼             ▼              ▼
┌──────────────┐ ┌───────────┐ ┌────────────┐
│ElectionCount │ │LastUpdated│ │  OnpeInfo  │
│ down.jsx     │ │.jsx       │ │.jsx        │
│              │ │           │ │            │
│ useCountdown │ │ Static    │ │ Static     │
│ hook (1sec)  │ │ badge     │ │ info card  │
└──────────────┘ └───────────┘ └────────────┘
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/hooks/useCountdown.js` | Create | Hook que calcula tiempo restante hasta fecha objetivo |
| `src/components/ElectionCountdown.jsx` | Create | Componente display con días/horas/minutos/segundos |
| `src/components/LastUpdated.jsx` | Create | Badge estático "Ipsos 26-27 marzo" |
| `src/components/OnpeInfo.jsx` | Create | Tarjeta colapsable con info de votación |
| `src/App.jsx` | Modify | Importar y renderizar tres componentes en hero |
| `src/styles.css` | Modify | Estilos para countdown, badge, y sección ONPE |

## Interfaces / Contracts

```javascript
// useCountdown.js
function useCountdown(targetDate: Date) {
  // Returns: { days, hours, minutes, seconds, isExpired }
}
```

```jsx
// ElectionCountdown.jsx
<ElectionCountdown 
  targetDate={new Date('2026-04-12T00:00:00-05:00')} 
/>
// Renders: "11 días 08:32:15" con actualización cada segundo
```

```jsx
// LastUpdated.jsx
<LastUpdated source="Ipsos" dates="26-27 marzo" />
// Renders: badge con "Ipsos · 26-27 marzo"
```

```jsx
// OnpeInfo.jsx
<OnpeInfo />
// Renders: sección colapsable con:
// - Fecha: domingo 12 de abril de 2026
// - Horario: 8:00 a.m. - 4:00 p.m.
// - Documento: DNI obligatorio
// - Link: engomado.onpe.gob.pe
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | useCountdown calculations | Test con fechas conocidas (1 día antes, día exacto, después) |
| Unit | Timezone UTC-5 | Verificar que 12 abril 00:00 PET = 05:00 UTC |
| Visual | Responsive breakpoints | Verificar en 760px y 980px |
| E2E | Componentes visibles | Playwright: verificar countdown muestra números |

**Nota**: Proyecto no tiene test framework configurado según context. Testing manual o integración futura.

## Migration / Rollout

No migration required. Los cambios son puramente additive:
- 3 componentes nuevos
- 1 hook nuevo
- Estilos nuevos (sin modificar existentes)
- No hay datos que migrar

**Rollback** (si es necesario):
1. `git checkout src/App.jsx` — remover imports y componentes del hero
2. `rm src/hooks/useCountdown.js src/components/{ElectionCountdown,LastUpdated,OnpeInfo}.jsx`
3. `git checkout src/styles.css` — rollback estilos

## Open Questions

- [ ] ¿El countdown debe mostrar "0 días" cuando falten menos de 24 horas, o siempre mostrar días?
- [ ] ¿OnpeInfo debería ser colapsable (details/summary) o siempre visible?
- [ ] ¿El badge "Last Updated" necesita incluir año (2026) o solo fecha es suficiente?

Todos son menores y pueden resolverse durante implementación sin afectar arquitectura.
