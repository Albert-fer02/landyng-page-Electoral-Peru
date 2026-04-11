export const criteria = [
  {
    key: "propuesta_tech",
    label: "Tecnología e Inovação",
    weight: 0.15,
    desc: "Propostas concretas em tech, digitalização, inovação produtiva",
    methodology: "Análise do plano de governo registrado no JNE. Mínimo 3 propostas específicas relacionadas a tecnología.",
    sources: ["Plan de Gobierno JNE", "Debates"],
  },
  {
    key: "anticorrupcion",
    label: "Anticorrupção",
    weight: 0.15,
    desc: "Mecanismos institucionais contra corrupção, transparência",
    methodology: "Verificação de folhas de vida + histórico de processos + propostas concretas anti-corrupção",
    sources: ["Sunedu/ Constancia", "PJ", "CSM"],
  },
  {
    key: "seguranca",
    label: "Segurança e Justiça",
    weight: 0.12,
    desc: "Reforma judicial, segurança cidadãos, propostas executáveis",
    methodology: "Propostas do plano de governo + histórico parlamentar + viabilidade fiscal",
    sources: ["Plan de Gobierno JNE", "Congresso"],
  },
  {
    key: "descentralizacao",
    label: "Descentralização",
    weight: 0.06,
    desc: "Desenvolvimento territorial, gestão descentralizada",
    methodology: "Análisis de propuestas de descentralización + histórico de gestão regional",
    sources: ["Plan de Gobierno JNE"],
  },
  {
    key: "intencao_voto",
    label: "Intenção de Voto",
    weight: 0.12,
    desc: "Porcentaje de intención de voto em encuestas (NÃO é viabilidade de governo)",
    methodology: "Promedio ponderado de ultime 3 encuestas (Ipsos, Datum, CPI). Peso: 0.4, 0.3, 0.3",
    sources: ["Ipsos", "Datum", "CPI"],
    isPoll: true,
  },
  {
    key: "governabilidade",
    label: "Governabilidade",
    weight: 0.08,
    desc: "Capacidade de formar coalizões + apoio congressual",
    methodology: "Análise de estructura partidária + histórico de acordos + tamanho da bancada",
    sources: ["ONPE", "Congresso"],
  },
  {
    key: "equipe_tecnico",
    label: "Equipe Técnica",
    weight: 0.06,
    desc: "Equipe identificável e cualificada propuesta pelo candidato",
    methodology: "Verificación de currículos dos asesores declarados ao JNE",
    sources: ["JNE", "Sunat"],
  },
  {
    key: "integridade",
    label: "Integridade Pessoal",
    weight: 0.10,
    desc: "Folha de vida limpa, coerência ética",
    methodology: "CSM + processos judiciais activos + investigação de medios",
    sources: ["CSM", "PJ", "Medios"],
  },
  {
    key: "plan_concreto",
    label: "Plano de Gobierno",
    weight: 0.10,
    desc: "Nível de detalhe, executabilidade e custo estimado",
    methodology: "Análisis cualitativo do plano de gobierno JNE: propostas específicas, cronograma, presupuesto",
    sources: ["Plan de Gobierno JNE"],
  },
  {
    key: "experiencia",
    label: "Experiência Gestora",
    weight: 0.06,
    desc: "Gestão pública ou privada demonstrável",
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
    "Encuestas son fotografías, não prediciones",
    "Alto nível de indecisos (13-16%)",
    "Voto nulo/branco: 11-17%",
  ],
};

export function getPollAverage(polls) {
  const { ipsos, datum, cpi } = METHODOLOGY_NOTES.pollWeight;
  return (polls.ipsos * ipsos + polls.datum * datum + polls.cpi * cpi).toFixed(1);
}