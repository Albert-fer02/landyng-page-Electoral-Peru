import { useState } from "react";

const REGION_LABELS = {
  lima: { label: "Lima", icon: "🏙️" },
  interior: { label: "Interior", icon: "🗺️" },
  norte: { label: "Norte", icon: "🧭" },
  centro: { label: "Centro", icon: "⛰️" },
  oriente: { label: "Oriente", icon: "🌿" },
  sur: { label: "Sur", icon: "🏔️" },
};

export function RegionalBreakdown({ candidates, pollSource }) {
  const [isOpen, setIsOpen] = useState(false);

  // Build regional leaders: for each region, find who leads
  const regions = {};
  for (const [key, meta] of Object.entries(REGION_LABELS)) {
    const leaders = candidates
      .filter((c) => c.regional?.[key] != null)
      .map((c) => ({ name: c.name, pct: c.regional[key], color: c.color, party: c.party }))
      .sort((a, b) => b.pct - a.pct);

    if (leaders.length > 0) {
      regions[key] = { ...meta, key, leaders };
    }
  }

  if (Object.keys(regions).length === 0) return null;

  return (
    <details className="regional" open={isOpen}>
      <summary
        className="regional__trigger"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <span className="regional__icon">🗺️</span>
        <span className="regional__title">Desglose Regional</span>
        <span className="regional__arrow">{isOpen ? "▲" : "▼"}</span>
      </summary>

      <div className="regional__content">
        <div className="regional__grid">
          {Object.values(regions).map((region) => (
            <div key={region.key} className="regional__card">
              <span className="regional__region-name">
                {region.icon} {region.label}
              </span>
              <div className="regional__leaders">
                {region.leaders.map((leader, i) => (
                  <div key={leader.name} className={`regional__leader ${i === 0 ? "regional__leader--first" : ""}`}>
                    <span
                      className="regional__dot"
                      style={{ background: leader.color }}
                      aria-hidden="true"
                    />
                    <span className="regional__name">{leader.name}</span>
                    <span className="regional__pct" style={{ color: leader.color }}>
                      {leader.pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="regional__footer">
          <span className="regional__note">
            Solo se muestran candidatos con datos regionales publicados. Fuente: {pollSource}
          </span>
        </div>
      </div>
    </details>
  );
}
