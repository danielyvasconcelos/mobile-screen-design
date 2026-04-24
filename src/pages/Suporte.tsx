import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Stethoscope, Construction, BotMessageSquare, History, HeadsetIcon } from "lucide-react";

const Suporte = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"triage" | "history" | "support">("support");

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

      {/* Empty State */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-5">
          <Construction className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Em desenvolvimento</h1>
        <p className="text-sm text-muted-foreground max-w-xs">
          Esta funcionalidade estará disponível em breve.
        </p>
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
          onClick={() => {
            setActiveTab("history");
            navigate("/historico");
          }}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "history" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "history" ? "bg-primary text-primary-foreground" : ""}`}>
            <History className="w-5 h-5" />
          </div>
          Histórico
        </button>
        <button
          onClick={() => setActiveTab("support")}
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

export default Suporte;
