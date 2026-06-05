export type PatientType = "eu" | "dependente";

export interface TriagemAnswer {
  question: string;
  answer: string;
}

export interface TriagemMessage {
  id: number;
  sender: "bot" | "user";
  text: string;
  time: string;
}

export type TriagemClassification = "VERDE" | "AMARELO" | "VERMELHO";

export interface TriagemRecord {
  id: string;
  protocol: string;
  createdAt: string;
  patientType: PatientType;
  cpf: string;
  classification: TriagemClassification;
  priorityLabel: string;
  summary: string;
  answers: TriagemAnswer[];
  messages: TriagemMessage[];
}

const HISTORY_KEY = "susy_triagem_history";
const IDENTIFICATION_KEY = "susy_triagem_identification";

export interface IdentificationData {
  cpf: string;
  patientType: PatientType;
}

function safeParse<T>(value: string | null, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function loadTriagemHistory(): TriagemRecord[] {
  return safeParse<TriagemRecord[]>(typeof window !== "undefined" ? window.localStorage.getItem(HISTORY_KEY) : null, []);
}

export function saveTriagemHistory(history: TriagemRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function addTriagemRecord(record: TriagemRecord) {
  const history = loadTriagemHistory();
  saveTriagemHistory([record, ...history]);
}

export function loadIdentification(): IdentificationData | null {
  return safeParse<IdentificationData>(typeof window !== "undefined" ? window.localStorage.getItem(IDENTIFICATION_KEY) : null, null);
}

export function saveIdentification(data: IdentificationData) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(IDENTIFICATION_KEY, JSON.stringify(data));
}

export function buildProtocol(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const suffix = Math.floor(Math.random() * 9000 + 1000);
  return `SUSY-${year}${month}${day}-${suffix}`;
}

export function classifyTriagem(answers: TriagemAnswer[]): TriagemClassification {
  const fullText = answers.map((answer) => answer.answer.toLowerCase()).join(" ");

  if (fullText.includes("dor no peito") || fullText.includes("falta de ar") || fullText.includes("tontura") || fullText.includes("samu") || fullText.includes("emergência")) {
    return "VERMELHO";
  }

  if (fullText.includes("febre") || fullText.includes("hipertensão") || fullText.includes("diabetes") || fullText.includes("asma") || fullText.includes("1 a 3 dias") || fullText.includes("mais de 1 semana")) {
    return "AMARELO";
  }

  return "VERDE";
}

export function buildPriorityLabel(classification: TriagemClassification) {
  switch (classification) {
    case "VERMELHO":
      return "Alta prioridade";
    case "AMARELO":
      return "Média prioridade";
    default:
      return "Baixa prioridade";
  }
}

export function buildSummary(classification: TriagemClassification): string {
  switch (classification) {
    case "VERMELHO":
      return "Encaminhar imediatamente para atendimento de emergência.";
    case "AMARELO":
      return "Recomenda-se atendimento preferencial em até 2 horas.";
    default:
      return "Quadro estável, aguardar seu atendimento no fluxo comum.";
  }
}
