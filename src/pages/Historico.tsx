import { useState } from "react";
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
} from "lucide-react";
import clinicBuilding from "@/assets/clinic-building.jpg";

const Historico = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"triage" | "history" | "support">("history");

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col max-w-md mx-auto">
      {/* Header */}
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
        {/* Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Resultado da Triagem</h1>
          <p className="text-xs text-muted-foreground">Protocolo Manchester Finalizado</p>
        </div>

        {/* Classification Card */}
        <div className="bg-card rounded-xl border-l-4 shadow-sm p-5 space-y-4" style={{ borderLeftColor: "hsl(142 72% 35%)" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "hsl(142 72% 35%)" }}>
              <CheckCircle2 className="w-5 h-5 text-primary-foreground" strokeWidth={3} />
            </div>
            <span className="text-sm font-semibold text-foreground">Sua classificação é:</span>
          </div>

          <div className="rounded-lg px-4 py-3" style={{ backgroundColor: "hsl(142 70% 80%)" }}>
            <p className="text-xl font-bold" style={{ color: "hsl(142 72% 20%)" }}>VERDE (Pouco Urgente)</p>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            Você será atendido, mas há casos mais graves na frente. Este nível de prioridade indica
            que seu quadro clínico é estável e permite uma espera segura.
          </p>

          <div className="bg-muted rounded-lg p-3 flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Tempo estimado de espera</p>
              <p className="text-2xl font-bold text-primary">120 min</p>
            </div>
          </div>
        </div>

        {/* What to do */}
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

        {/* Location card */}
        <div className="bg-card rounded-xl border border-border p-3 space-y-3">
          <img
            src={clinicBuilding}
            alt="Unidade Sede da clínica"
            loading="lazy"
            width={768}
            height={512}
            className="w-full h-36 object-cover rounded-lg"
          />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-foreground">Unidade Sede</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>Av. da Saúde, 450 - Centro</span>
            </div>
          </div>
          <button onClick={() => navigate("/suporte")} className="w-full bg-muted hover:bg-muted/70 transition-colors rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-primary">
            <Map className="w-4 h-4" />
            Ver no Mapa
          </button>
        </div>

        {/* Support */}
        <div className="bg-card rounded-xl border border-border p-4 space-y-3">
          <h3 className="text-sm font-bold text-foreground">Suporte Imediato</h3>
          <button onClick={() => navigate("/suporte")} className="w-full bg-primary hover:bg-primary/90 transition-colors rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold text-primary-foreground">
            <MessageSquare className="w-4 h-4" />
            Falar com Suporte
          </button>
          <button onClick={() => navigate("/suporte")} className="w-full bg-muted hover:bg-muted/70 transition-colors rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-semibold text-foreground">
            <Phone className="w-4 h-4" />
            Ligar para Central
          </button>
        </div>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="flex items-center justify-around py-2 bg-card border-t border-border sticky bottom-0">
        <button
          onClick={() => {
            setActiveTab("triage");
            navigate("/triagem");
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "triage" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "triage" ? "bg-primary text-primary-foreground" : ""}`}>
            <BotMessageSquare className="w-5 h-5" />
          </div>
          Triagem
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "history" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "history" ? "bg-primary text-primary-foreground" : ""}`}>
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

export default Historico;
