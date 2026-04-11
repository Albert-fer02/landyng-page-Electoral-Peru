export const criteria = [
  {
    key: "propuesta_tech",
    label: "Tecnología e Innovación",
    weight: 0.15,
    desc: "Propuestas concretas en tecnología, digitalización, innovación productiva",
    methodology: "Análisis del plan de gobierno registrado en el JNE. Mínimo 3 propuestas específicas relacionadas a tecnología.",
    sources: ["Plan de Gobierno JNE", "Debates"],
  },
  {
    key: "anticorrupcion",
    label: "Anticorrupción",
    weight: 0.15,
    desc: "Mecanismos institucionales contra corrupción, transparencia",
    methodology: "Verificación de hoja de vida + histórico de procesos + propuestas concretas anticorrupción",
    sources: ["Sunedu/Constancia", "PJ", "CSM"],
  },
  {
    key: "seguridad",
    label: "Seguridad y Justicia",
    weight: 0.12,
    desc: "Reforma judicial, seguridad ciudadana, propuestas ejecutables",
    methodology: "Propuestas del plan de gobierno + histórico parlamentario + viabilidad fiscal",
    sources: ["Plan de Gobierno JNE", "Congreso"],
  },
  {
    key: "descentralizacion",
    label: "Descentralización",
    weight: 0.06,
    desc: "Desarrollo territorial, gestión descentralizada",
    methodology: "Análisis de propuestas de descentralización + histórico de gestión regional",
    sources: ["Plan de Gobierno JNE"],
  },
  {
    key: "intencion_voto",
    label: "Intención de Voto",
    weight: 0.12,
    desc: "Porcentaje de intención de voto en encuestas (NO es viabilidad de gobierno)",
    methodology: "Promedio ponderado de últimas 3 encuestas (Ipsos, Datum, CPI). Peso: 0.4, 0.3, 0.3",
    sources: ["Ipsos", "Datum", "CPI"],
    isPoll: true,
  },
  {
    key: "gobernabilidad",
    label: "Gobernabilidad",
    weight: 0.08,
    desc: "Capacidad de formar coaliciones + apoyo congressional",
    methodology: "Análisis de estructura partidaria + histórico de acuerdos + tamaño de bancada",
    sources: ["ONPE", "Congreso"],
  },
  {
    key: "equipo_tecnico",
    label: "Equipo Técnico",
    weight: 0.06,
    desc: "Equipo identificable y calificado propuesto por el candidato",
    methodology: "Verificación de currículos de asesores declarados al JNE",
    sources: ["JNE", "Sunat"],
  },
  {
    key: "integridad",
    label: "Integridad Personal",
    weight: 0.10,
    desc: "Hoja de vida limpia, coherencia ética",
    methodology: "CSM + procesos judiciales activos + investigación de medios",
    sources: ["CSM", "PJ", "Medios"],
  },
  {
    key: "plan_concreto",
    label: "Plan de Gobierno",
    weight: 0.10,
    desc: "Nivel de detalle, ejecutabilidad y costo estimado",
    methodology: "Análisis cualitativo del plan de gobierno JNE: propuestas específicas, cronograma, presupuesto",
    sources: ["Plan de Gobierno JNE"],
  },
  {
    key: "experiencia",
    label: "Experiencia Gestora",
    weight: 0.06,
    desc: "Gestión pública o privada demostrable",
    methodology: "Constancia de servicios + verificación de datos",
    sources: ["Sunedu", "Sunat"],
  },
];

export const METHODOLOGY_NOTES = {
  lastUpdate: "2026-04-11",
  pollSources: ["Ipsos Perú21", "Datum Internacional", "CPI"],
  pollWeight: { ipsos: 0.4, datum: 0.3, cpi: 0.3 },
  pollingPeriod: "2026-03-25 to 2026-04-06",
  marginOfError: "~2.8%",
  dataDisclaimers: [
    "Las encuestas son fotografías, no predicciones",
    "Alto nivel de indecisos (13-16%)",
    "Voto nulo/blanco: 11-17%",
  ],
};

export function getPollAverage(polls) {
  const { ipsos, datum, cpi } = METHODOLOGY_NOTES.pollWeight;
  return ((polls.ipsos * ipsos + polls.datum * datum + polls.cpi * cpi)).toFixed(1);
}