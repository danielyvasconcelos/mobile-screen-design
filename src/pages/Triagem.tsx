import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Share2, CheckCircle2, Camera, FileText, Plus, Smile, Send, BotMessageSquare, History, HeadsetIcon } from "lucide-react";
import {
  addTriagemRecord,
  buildPriorityLabel,
  buildProtocol,
  buildSummary,
  classifyTriagem,
  loadIdentification,
  type PatientType,
  type TriagemAnswer,
  type TriagemMessage,
  type TriagemClassification,
} from "@/lib/triagem";
import { findAnyNearbyUnits } from "@/lib/healthUnits";

interface Message extends TriagemMessage {}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "Olá, sou sua assistente digital de triagem. Para te ajudar melhor, preciso fazer algumas perguntas sobre seus sintomas.",
    sender: "bot",
    time: "14:02",
  },
  {
    id: 2,
    text: "Onde exatamente você está sentindo dor ou desconforto?",
    sender: "bot",
    time: "14:02",
  },
];

const Triagem = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState(0);
  const [activeTab, setActiveTab] = useState<"triagem" | "historico" | "support">("triagem");
  const [answers, setAnswers] = useState<TriagemAnswer[]>([]);
  const [savedSession, setSavedSession] = useState(false);
  const [patientType, setPatientType] = useState<PatientType>("eu");
  const [cpf, setCpf] = useState("");
  const [classification, setClassification] = useState<TriagemClassification>("VERDE");

  useEffect(() => {
    const saved = loadIdentification();
    if (saved) {
      setPatientType(saved.patientType);
      setCpf(saved.cpf);
    }
  }, []);

  const botScript: { text: string; quickReplies: string[] }[] = [
    {
      text: "Entendi. Em uma escala de 0 a 10, qual a intensidade da sua dor ou desconforto?",
      quickReplies: ["0 - 3 (Leve)", "4 - 6 (Moderada)", "7 - 10 (Forte)", "Sem dor"],
    },
    {
      text: "Obrigada. Há quanto tempo você está sentindo esses sintomas?",
      quickReplies: ["Menos de 1 hora", "Algumas horas", "1 a 3 dias", "Mais de 1 semana"],
    },
    {
      text: "Você está com febre, calafrios ou suor excessivo no momento?",
      quickReplies: ["Sim, febre alta", "Febre baixa", "Apenas calafrios", "Não"],
    },
    {
      text: "Você sente falta de ar, dor no peito ou tontura?",
      quickReplies: ["Falta de ar", "Dor no peito", "Tontura", "Nenhum desses"],
    },
    {
      text: "Você possui alguma condição de saúde pré-existente? (ex: diabetes, hipertensão, asma)",
      quickReplies: ["Diabetes", "Hipertensão", "Asma", "Nenhuma"],
    },
    {
      text: "Está fazendo uso de algum medicamento contínuo no momento?",
      quickReplies: ["Sim, diariamente", "Apenas esporádico", "Não", "Prefiro não dizer"],
    },
    {
      text: "Você tem alguma alergia conhecida a medicamentos ou alimentos?",
      quickReplies: ["Sim, medicamentos", "Sim, alimentos", "Outras alergias", "Não tenho"],
    },
    {
      text: "Com base nas suas respostas, sua triagem foi classificada como prioridade MODERADA (amarelo). Recomendo procurar atendimento na unidade mais próxima nas próximas 2 horas. Deseja que eu localize uma unidade de saúde para você?",
      quickReplies: ["Sim, localizar", "Falar com atendente", "Ligar para o SAMU", "Finalizar triagem"],
    },
    {
      text: "Por favor, informe seu endereço ou bairro em Maceió. Vou indicar a UPA, hospital ou UBS/USF mais próximo com base nas unidades cadastradas.",
      quickReplies: ["Jaraguá", "Tabuleiro do Martins", "Cidade Universitária", "Poço"],
    },
    {
      text: "Triagem concluída com sucesso. Cuide-se bem! Em caso de piora, procure imediatamente uma emergência ou ligue 192 (SAMU).",
      quickReplies: ["Iniciar nova triagem"],
    },
  ];

  const normalizeAnswer = (answer: string) =>
    answer
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .trim();

  const contains = (value: string, terms: string[]) =>
    terms.some((term) => value.includes(term));

  const buildLocationResponse = (query: string) => {
    const units = findAnyNearbyUnits(query, 3);
    if (units.length === 0) {
      return `Não encontrei unidades próximas para "${query}". Tente outro bairro ou referência de Maceió.`;
    }

    const list = units
      .map((unit) => `${unit.name} (${unit.type}) — ${unit.address}, ${unit.neighborhood}`)
      .join("; ");

    return `Com base em "${query}", as unidades mais próximas são: ${list}.`;
  };

  const getBotResponse = (stepIndex: number, answer: string) => {
    const normalized = normalizeAnswer(answer);

    if (stepIndex === 0) {
      if (contains(normalized, ["peito", "peitoral", "cardiaco", "cardiaca", "chest"])) {
        return `Você mencionou "${answer}" no peito. Isso pode ser um sinal de atenção urgente. Em uma escala de 0 a 10, qual a intensidade?`;
      }
      if (contains(normalized, ["cabeca", "cabeça", "dor de cabeca", "migranea", "enxaqueca", "cefaleia"])) {
        return `Anotado: "${answer}". Dor de cabeça pode ter várias causas. Em uma escala de 0 a 10, qual a intensidade?`;
      }
      if (contains(normalized, ["abdomen", "abdominal", "estomago", "barriga", "ventre"])) {
        return `Obrigado. Você relatou "${answer}". Dor abdominal pode variar bastante. Em uma escala de 0 a 10, qual a intensidade?`;
      }
      if (contains(normalized, ["costas", "ombro", "braco", "braço", "perna", "joelho", "coluna"])) {
        return `Entendi, você está sentindo desconforto em "${answer}". Em uma escala de 0 a 10, qual a intensidade?`;
      }
      return `Obrigado. Você relatou "${answer}". Agora, em uma escala de 0 a 10, qual a intensidade da sua dor ou desconforto?`;
    }

    if (stepIndex === 1) {
      if (contains(normalized, ["7", "8", "9", "10", "forte", "intensa", "muito forte", "grave"])) {
        return `Você disse "${answer}", o que indica dor intensa. Vou continuar a avaliação com prioridade mais alta.`;
      }
      if (contains(normalized, ["0", "1", "2", "3", "leve", "suave", "pequena"])) {
        return `Dor leve registrada como "${answer}". Agora preciso saber há quanto tempo você sente esse sintoma.`;
      }
      return `Entendi que a intensidade foi "${answer}". Há quanto tempo você está com esse sintoma?`;
    }

    if (stepIndex === 2) {
      if (contains(normalized, ["menos de 1 hora", "hoje", "pouco", "ultimas horas", "ultima hora"])) {
        return `Sintomas recentes como "${answer}" podem evoluir rápido. Você está com febre, calafrios ou suor excessivo agora?`;
      }
      if (contains(normalized, ["1 a 3 dias", "mais de 1 semana", "algumas horas", "dias", "semanas", "muitos dias"])) {
        return `Entendi, "${answer}" indica que o quadro já está presente há algum tempo. Você está com febre, calafrios ou suor excessivo agora?`;
      }
      return `Obrigado. Você disse "${answer}". Agora preciso saber se há febre, calafrios ou suor excessivo no momento.`;
    }

    if (stepIndex === 3) {
      if (contains(normalized, ["sim", "febre", "calafrios", "suor", "suando", "quente"])) {
        return `Anotado: "${answer}". Esses sinais podem indicar infecção ou inflamação. Você sente falta de ar, dor no peito ou tontura?`;
      }
      return `Certo, "${answer}" foi registrado. Mesmo assim, preciso saber se há falta de ar, dor no peito ou tontura.`;
    }

    if (stepIndex === 4) {
      if (contains(normalized, ["falta de ar", "dor no peito", "tontura", "respiracao", "respiração", "vertigem", "mareado"])) {
        return `Entendi: "${answer}". Isso pode elevar o nível de prioridade. Você possui alguma condição de saúde pré-existente?`;
      }
      return `Obrigado. Você disse "${answer}". Agora preciso confirmar se tem alguma condição de saúde pré-existente, como diabetes, hipertensão ou asma.`;
    }

    if (stepIndex === 5) {
      if (contains(normalized, ["diabetes", "hipertensao", "hipertensão", "asma"])) {
        return `Certo, "${answer}" registrado. Essas condições são importantes. Você faz uso de algum medicamento contínuo?`;
      }
      if (contains(normalized, ["nenhuma", "nao", "não", "nenhum"])) {
        return `Entendido: "${answer}". Sem condições pré-existentes relatadas. Você faz uso de algum medicamento contínuo?`;
      }
      return `Obrigado, "${answer}" foi anotado. Você faz uso de algum medicamento contínuo?`;
    }

    if (stepIndex === 6) {
      if (contains(normalized, ["sim", "diariamente", "controle", "remedio", "medicamento", "medicamentos", "antihipertensivo"])) {
        return `Anotado: "${answer}". Vou considerar isso na recomendação. Você tem alguma alergia conhecida a medicamentos ou alimentos?`;
      }
      return `Entendido, "${answer}" foi registrado. Você tem alguma alergia conhecida a medicamentos ou alimentos?`;
    }

    if (stepIndex === 7) {
      if (contains(normalized, ["samu", "192", "emergencia", "emergência", "urgente", "socorro", "hospital"])) {
        return `Você escolheu "${answer}". Recomendo contato imediato com o SAMU e atendimento prioritário na unidade mais próxima. Agora, informe seu endereço ou bairro em Maceió para indicar unidades próximas.`;
      }
      if (contains(normalized, ["atendente", "falar", "suporte", "humano", "pessoa"])) {
        return `Entendido, "${answer}". Vou direcionar você ao suporte humano. Enquanto isso, informe seu endereço ou bairro em Maceió para indicar a unidade mais próxima.`;
      }
      if (contains(normalized, ["finalizar", "concluir", "nao", "não", "terminar"])) {
        return `Certo, "${answer}" registrado. Antes de finalizar, informe seu endereço ou bairro em Maceió para indicar a unidade de saúde mais próxima.`;
      }
      return `Qual seu endereço ou bairro em Maceió? Vou indicar a UPA, hospital ou UBS/USF mais próxima.`;
    }

    if (stepIndex === 8) {
      return buildLocationResponse(answer);
    }

    return "Obrigada por compartilhar. Vou registrar essa informação no seu prontuário digital.";
  };

  const quickReplies = useMemo(() => {
    if (step === 0) {
      return ["Começou hoje", "Muitos dias", "Não tenho certeza", "🎙 Desejo falar"];
    }

    if (step < botScript.length) {
      return botScript[step - 1]?.quickReplies ?? [];
    }

    return ["Iniciar nova triagem"];
  }, [step]);

  const isCompleted = step >= botScript.length && !isTyping;

  useEffect(() => {
    if (!isCompleted || savedSession || answers.length === 0) {
      return;
    }

    const classification = classifyTriagem(answers);
    setClassification(classification);
    const protocol = buildProtocol();

    addTriagemRecord({
      id: protocol,
      protocol,
      createdAt: new Date().toISOString(),
      patientType,
      cpf,
      classification,
      priorityLabel: buildPriorityLabel(classification),
      summary: buildSummary(classification),
      answers,
      messages,
    });
    setSavedSession(true);
  }, [isCompleted, savedSession, answers, messages, patientType, cpf]);

  const resetSession = () => {
    setMessages(initialMessages);
    setStep(0);
    setAnswers([]);
    setSavedSession(false);
    setInput("");
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    if (text === "Iniciar nova triagem") {
      resetSession();
      return;
    }

    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    const question = step === 0 ? initialMessages[1].text : botScript[step - 1]?.text ?? "Informação registrada";

    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user", time }]);
    setAnswers((prev) => [...prev, { question, answer: text }]);
    setInput("");
    setIsTyping(true);

    const nextBot = getBotResponse(step, text);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: nextBot,
          sender: "bot",
          time,
        },
      ]);
      setStep((s) => s + 1);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <Share2 className="w-5 h-5 text-primary" />
        <h1 className="text-sm font-bold text-foreground">SUSy - ChatBot de Triagem</h1>
        <CheckCircle2 className="w-5 h-5 text-primary" />
      </header>

      {/* Status */}
      <div className="flex items-center justify-between gap-2 py-2 px-4 bg-card border-b border-border">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Protocolo de Triagem Ativo
          </span>
        </div>
        <div className="text-[10px] text-muted-foreground">
          {cpf ? `CPF: ${cpf}` : "CPF não identificado"}
        </div>
      </div>

      {savedSession && (
        <div className="mx-4 mt-4 rounded-2xl border border-success/40 bg-success/10 p-4 text-sm text-success">
          Triagem salva como <strong>{classification}</strong>. Você pode acessar o histórico para rever os detalhes.
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card border border-border text-foreground rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
            <span className="text-[10px] text-muted-foreground mt-1 px-1">
              {msg.time} {msg.sender === "user" && "✓✓"}
            </span>
          </div>
        ))}

        {/* Quick Replies */}
        {!isTyping && (
          <div className="flex flex-wrap gap-2 pt-2">
            {quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => sendMessage(reply)}
                className="px-4 py-2 rounded-full border border-primary text-primary text-xs font-semibold bg-card hover:bg-primary/10 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        )}

        {/* Media Attach */}
        <div className="bg-card border border-border rounded-xl p-4 mt-2">
          <p className="text-sm font-bold text-foreground text-center">Anexar Mídias</p>
          <p className="text-[11px] text-muted-foreground text-center mt-1">
            Você pode enviar fotos de manchas na pele ou exames anteriores.
          </p>
          <div className="flex justify-center gap-6 mt-3">
            <button onClick={() => navigate("/suporte")} className="flex flex-col items-center gap-1 text-primary">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase">Câmera</span>
            </button>
            <button onClick={() => navigate("/suporte")} className="flex flex-col items-center gap-1 text-primary">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase">Arquivos</span>
            </button>
          </div>
        </div>

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="text-xs">IA digitando...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="px-3 py-2 bg-card border-t border-border flex items-center gap-2">
        <button className="text-muted-foreground">
          <Plus className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          placeholder="Digite sua resposta..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
        />
        <button className="text-muted-foreground">
          <Smile className="w-5 h-5" />
        </button>
        <button
          onClick={() => sendMessage(input)}
          className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-primary-foreground"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Tab Bar */}
      <nav className="flex items-center justify-around py-2 bg-card border-t border-border">
        <button
          onClick={() => setActiveTab("triagem")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "triagem" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "triagem" ? "bg-primary text-primary-foreground" : ""}`}>
            <BotMessageSquare className="w-5 h-5" />
          </div>
          Triagem
        </button>
        <button
          onClick={() => {
            setActiveTab("historico");
            navigate("/historico");
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "historico" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "historico" ? "bg-primary text-primary-foreground" : ""}`}>
            <History className="w-5 h-5" />
          </div>
          Histórico
        </button>
        <button
          onClick={() => {
            setActiveTab("support");
            navigate("/suporte");
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "support" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "support" ? "bg-primary text-primary-foreground" : ""}`}>
            <HeadsetIcon className="w-5 h-5" />
          </div>
          Suporte
        </button>
      </nav>
    </div>
  );
};

export default Triagem;
