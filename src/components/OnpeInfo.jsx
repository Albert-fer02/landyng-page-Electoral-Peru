import { useState } from "react";

export function OnpeInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <details className="onpe-info" open={isOpen}>
      <summary 
        className="onpe-info__trigger" 
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <span className="onpe-info__icon">📋</span>
        <span className="onpe-info__title">Información para votar</span>
        <span className="onpe-info__arrow">{isOpen ? "▲" : "▼"}</span>
      </summary>
      
      <div className="onpe-info__content">
        <div className="onpe-info__grid">
          <div className="onpe-info__item">
            <span className="onpe-info__label">📅 Fecha</span>
            <span className="onpe-info__value">Domingo 12 de abril de 2026</span>
          </div>
          
          <div className="onpe-info__item">
            <span className="onpe-info__label">🕗 Horario</span>
            <span className="onpe-info__value">8:00 a.m. - 4:00 p.m.</span>
          </div>
          
          <div className="onpe-info__item">
            <span className="onpe-info__label">🪪 Documento</span>
            <span className="onpe-info__value">DNI obligatorio (vigente o vencido)</span>
          </div>
          
          <div className="onpe-info__item">
            <span className="onpe-info__label">📍 Consulta</span>
            <a 
              href="https://www.engomado.gob.pe/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="onpe-info__link"
            >
              engomado.onpe.gob.pe ↗
            </a>
          </div>
        </div>
        
        <div className="onpe-info__footer">
          <span className="onpe-info__note">
            ⚠️ Jóvenes de 18 años pueden votar con DNI amarillo vencido
          </span>
        </div>
      </div>
    </details>
  );
}
