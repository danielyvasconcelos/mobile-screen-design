import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shield,
  Stethoscope,
  CheckCircle2,
  Clock,
  Info,
  MapPin,
  Map,
  MessageSquare,
  Phone,
  BotMessageSquare,
  History,
  HeadsetIcon,
  Trash2,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  Search,
  X,
} from "lucide-react";
import clinicBuilding from "@/assets/clinic-building.jpg";
import {
  clearTriagemHistory,
  deleteTriagemRecord,
  loadTriagemHistory,
  type TriagemClassification,
  type TriagemRecord,
} from "@/lib/triagem";

const HISTORY_KEY = "susy_triagem_history";

const classificationStyles: Record<
  TriagemClassification,
  { border: string; badgeBg: string; badgeText: string; dot: string; label: string }
> = {
  VERDE: {
    border: "hsl(142 72% 35%)",
    badgeBg: "hsl(142 70% 90%)",
    badgeText: "hsl(142 72% 20%)",
    dot: "hsl(142 72% 35%)",
    label: "Baixa prioridade",
  },
  AMARELO: {
    border: "hsl(42 95% 51%)",
    badgeBg: "hsl(45 100% 90%)",
    badgeText: "hsl(42 95% 25%)",
    dot: "hsl(42 95% 51%)",
    label: "Média prioridade",
  },
  VERMELHO: {
    border: "hsl(0 84% 60%)",
    badgeBg: "hsl(0 80% 92%)",
    badgeText: "hsl(0 63% 25%)",
    dot: "hsl(0 84% 60%)",
    label: "Alta prioridade",
  },
};

type Filter = "TODOS" | TriagemClassification;

const Historico = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<TriagemRecord[]>([]);
  const [filter, setFilter] = useState<Filter>("TODOS");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const refresh = () => setHistory(loadTriagemHistory());

  useEffect(() => {
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (event.key === HISTORY_KEY) refresh();
    };
    const onFocus = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const filtered = useMemo(() => {
    return history.filter((record) => {
      if (filter !== "TODOS" && record.classification !== filter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const haystack = `${record.protocol} ${record.summary} ${record.cpf} ${record.answers
          .map((a) => `${a.question} ${a.answer}`)
          .join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [history, filter, search]);

  const latest = history[0];
  const hasHistory = history.length > 0;

  const counts = useMemo(
    () => ({
      total: history.length,
      VERDE: history.filter((r) => r.classification === "VERDE").length,
      AMARELO: history.filter((r) => r.classification === "AMARELO").length,
      VERMELHO: history.filter((r) => r.classification === "VERMELHO").length,
    }),
    [history]
  );

  const handleDelete = (id: string) => {
    deleteTriagemRecord(id);
    refresh();
    if (expandedId === id) setExpandedId(null);
  };

  const handleClearAll = () => {
    clearTriagemHistory();
    setConfirmClear(false);
    refresh();
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col max-w-md mx-auto">
      <header className="flex items-center justify-between px-4 py-3 bg-primary/5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-primary">SUSy - ChatBot de Triagem</span>
        </div>
        <Shield className="w-5 h-5 text-primary" />
      </header>

      <main className="flex-1 px-4 py-5 space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Histórico de Triagens</h1>
          <p className="text-xs text-muted-foreground">
            {hasHistory
              ? `${counts.total} ${counts.total === 1 ? "registro salvo" : "registros salvos"}`
              : "Nenhuma triagem registrada ainda"}
          </p>
        </div>

        {hasHistory && (
          <div className="grid grid-cols-3 gap-2">
            {(["VERDE", "AMARELO", "VERMELHO"] as const).map((key) => {
              const style = classificationStyles[key];
              return (
                <div
                  key={key}
                  className="bg-card rounded-xl border border-border p-3 flex flex-col items-center"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full mb-1"
                    style={{ backgroundColor: style.dot }}
                  />
                  <span className="text-lg font-bold text-foreground leading-none">
                    {counts[key]}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-1">{key}</span>
                </div>
              );
            })}
          </div>
        )}

        {hasHistory && latest && (
          <div
            className="bg-card rounded-xl border-l-4 shadow-sm p-5 space-y-4"
            style={{ borderLeftColor: classificationStyles[latest.classification].border }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: classificationStyles[latest.classification].border }}
              >
                <CheckCircle2 className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Sua triagem mais recente
              </span>
            </div>

            <div
              className="rounded-lg px-4 py-3"
              style={{ backgroundColor: classificationStyles[latest.classification].badgeBg }}
            >
              <p
                className="text-xl font-bold"
                style={{ color: classificationStyles[latest.classification].badgeText }}
              >
                {latest.classification} • {latest.priorityLabel}
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">{latest.summary}</p>

            <div className="bg-muted rounded-lg p-3 flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Protocolo {latest.protocol}</p>
                <p className="text-xs text-muted-foreground">{formatDate(latest.createdAt)}</p>
              </div>
            </div>
          </div>
        )}

        {hasHistory && (
          <div className="bg-card rounded-xl border border-border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-foreground">Registros salvos</h2>
              <button
                onClick={() => setConfirmClear(true)}
                className="text-[11px] font-semibold text-destructive hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Limpar tudo
              </button>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por protocolo, sintoma..."
                className="w-full bg-muted rounded-lg pl-8 pr-8 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {(["TODOS", "VERDE", "AMARELO", "VERMELHO"] as Filter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide transition-colors ${
                    filter === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/70"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              {filtered.length === 0 ? (
                <p className="text-xs text-center text-muted-foreground py-4">
                  Nenhum registro encontrado com os filtros atuais.
                </p>
              ) : (
                filtered.map((record) => {
                  const style = classificationStyles[record.classification];
                  const isOpen = expandedId === record.id;
                  return (
                    <div
                      key={record.id}
                      className="rounded-xl bg-muted/60 border border-border overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedId(isOpen ? null : record.id)}
                        className="w-full text-left p-3 flex items-start gap-3 hover:bg-muted transition-colors"
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                          style={{ backgroundColor: style.dot }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground truncate">
                              {record.protocol}
                            </p>
                            <span
                              className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0"
                              style={{ backgroundColor: style.badgeBg, color: style.badgeText }}
                            >
                              {record.classification}
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            {formatDate(record.createdAt)}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {record.summary}
                          </p>
                        </div>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="border-t border-border bg-card p-3 space-y-3">
                          <div className="grid grid-cols-2 gap-2 text-[11px]">
                            <div>
                              <p className="text-muted-foreground">Paciente</p>
                              <p className="font-semibold text-foreground">
                                {record.patientType === "eu" ? "Titular" : "Dependente"}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">CPF</p>
                              <p className="font-semibold text-foreground">
                                {record.cpf || "—"}
                              </p>
                            </div>
                          </div>

                          {record.answers.length > 0 && (
                            <div className="space-y-2">
                              <div className="flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-primary" />
                                <span className="text-[11px] font-bold text-foreground uppercase tracking-wide">
                                  Respostas da triagem
                                </span>
                              </div>
                              <ul className="space-y-1.5">
                                {record.answers.map((a, i) => (
                                  <li
                                    key={i}
                                    className="bg-muted rounded-lg px-3 py-2 text-[11px]"
                                  >
                                    <p className="text-muted-foreground leading-snug">
                                      {a.question}
                                    </p>
                                    <p className="text-foreground font-semibold mt-0.5">
                                      {a.answer}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <button
                            onClick={() => handleDelete(record.id)}
                            className="w-full bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg py-2 flex items-center justify-center gap-2 text-xs font-semibold transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Excluir registro
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {!hasHistory && (
          <div className="bg-card rounded-xl border border-border p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Seu histórico ainda está vazio. Inicie uma triagem para que seus dados sejam salvos
              automaticamente.
            </p>
            <button
              onClick={() => navigate("/triagem")}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Iniciar Triagem
            </button>
          </div>
        )}

        <div className="bg-primary/5 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-primary" />
            <h2 className="text-sm font-bold text-primary">O que fazer agora?</h2>
          </div>
          <ul className="space-y-2 text-sm text-foreground">
            {[
              "Dirija-se à recepção para confirmar seu registro.",
              "Mantenha-se hidratado e aguarde na sala de espera.",
              "Se sentir novos sintomas ou piora, informe à enfermagem imediatamente.",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card rounded-xl border border-border p-3 space-y-3">
          <img
            src={clinicBuilding}
            alt="Hospital Geral do Estado (HGE)"
            loading="lazy"
            width={768}
            height={512}
            className="w-full h-36 object-cover rounded-lg"
          />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">Hospital Geral do Estado (HGE)</h3>
            <p className="text-xs text-muted-foreground">Maior referência em urgência e emergência de Alagoas</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Av. Siqueira Campos, 2095 - Trapiche da Barra</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/suporte")}
            className="w-full bg-muted hover:bg-muted/70 transition-colors rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-primary"
          >
            <Map className="w-4 h-4" />
            Ver no Mapa
          </button>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 space-y-3">
          <h3 className="text-sm font-bold text-foreground">Suporte Imediato</h3>
          <button
            onClick={() => navigate("/suporte")}
            className="w-full bg-primary hover:bg-primary/90 transition-colors rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground"
          >
            <MessageSquare className="w-4 h-4" />
            Falar com Suporte
          </button>
          <button
            onClick={() => navigate("/suporte")}
            className="w-full bg-muted hover:bg-muted/70 transition-colors rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold text-foreground"
          >
            <Phone className="w-4 h-4" />
            Ligar para Central
          </button>
        </div>
      </main>

      {confirmClear && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <h3 className="text-base font-bold text-foreground">Limpar histórico?</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Esta ação removerá permanentemente todos os {counts.total} registros salvos no seu
              dispositivo. Não é possível desfazer.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmClear(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-muted text-foreground hover:bg-muted/70 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                Limpar tudo
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="flex items-center justify-around py-2 bg-card border-t border-border sticky bottom-0">
        <button
          onClick={() => navigate("/triagem")}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-muted-foreground"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <BotMessageSquare className="w-5 h-5" />
          </div>
          Triagem
        </button>
        <button className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-primary">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-primary-foreground">
            <History className="w-5 h-5" />
          </div>
          Histórico
        </button>
        <button
          onClick={() => navigate("/suporte")}
          className="flex flex-col items-center gap-0.5 text-[10px] font-semibold text-muted-foreground"
        >
          <div className="w-10 h-10 rounded-xl flex items-center justify-center">
            <HeadsetIcon className="w-5 h-5" />
          </div>
          Suporte
        </button>
      </nav>
    </div>
  );
};

export default Historico;
