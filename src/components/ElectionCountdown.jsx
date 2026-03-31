import { useCountdown } from "../hooks/useCountdown";

const ELECTION_DATE = "2026-04-12T08:00:00-05:00";

export function ElectionCountdown() {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(ELECTION_DATE);

  if (isExpired) {
    return (
      <div className="countdown countdown--expired">
        <span className="countdown__label">Elecciones en curso</span>
      </div>
    );
  }

  return (
    <div className="countdown" aria-label={`${days} días, ${hours} horas, ${minutes} minutos hasta las elecciones`}>
      <div className="countdown__item">
        <span className="countdown__number">{days}</span>
        <span className="countdown__label">días</span>
      </div>
      <span className="countdown__separator">:</span>
      <div className="countdown__item">
        <span className="countdown__number">{String(hours).padStart(2, "0")}</span>
        <span className="countdown__label">horas</span>
      </div>
      <span className="countdown__separator">:</span>
      <div className="countdown__item">
        <span className="countdown__number">{String(minutes).padStart(2, "0")}</span>
        <span className="countdown__label">min</span>
      </div>
      <span className="countdown__separator countdown__separator--mobile">:</span>
      <div className="countdown__item countdown__item--mobile">
        <span className="countdown__number">{String(seconds).padStart(2, "0")}</span>
        <span className="countdown__label">seg</span>
      </div>
    </div>
  );
}
