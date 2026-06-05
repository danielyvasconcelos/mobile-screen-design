import { useEffect, useState } from "react";
import { Share2, CheckCircle2, User, Users, Info, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadIdentification, saveIdentification, type PatientType } from "@/lib/triagem";

const Identificacao = () => {
  const [tipo, setTipo] = useState<PatientType>("eu");
  const [cpf, setCpf] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const saved = loadIdentification();
    if (saved) {
      setTipo(saved.patientType);
      setCpf(saved.cpf);
    }
  }, []);

  const formatCpf = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleContinue = () => {
    saveIdentification({ cpf, patientType: tipo });
    navigate("/triagem");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card">
        <Share2 className="w-5 h-5 text-primary" />
        <h1 className="text-sm font-bold text-foreground">SUSy - ChatBot de Triagem</h1>
        <CheckCircle2 className="w-5 h-5 text-primary" />
      </header>

      <div className="flex-1 px-5 pt-6 pb-4 flex flex-col">
        {/* Title */}
        <h2 className="text-2xl font-extrabold text-foreground text-center leading-tight">
          Identificação do<br />Paciente
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
          Para iniciar seu atendimento, precisamos localizar seu histórico clínico com segurança.
        </p>

        {/* Tipo selector */}
        <div className="mt-6">
          <span className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">
            Quem será atendido?
          </span>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setTipo("eu")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                tipo === "eu"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border"
              }`}
            >
              <User className="w-4 h-4" />
              Para mim
            </button>
            <button
              onClick={() => setTipo("dependente")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                tipo === "dependente"
                  ? "bg-foreground text-background border-foreground"
                  : "bg-card text-foreground border-border"
              }`}
            >
              <Users className="w-4 h-4" />
              Dependente
            </button>
          </div>
        </div>

        {/* CPF Input */}
        <div className="mt-6 bg-card rounded-xl border p-5">
          <label className="text-[11px] font-bold text-muted-foreground tracking-wide uppercase">
            CPF ou Cartão SUS
          </label>
          <div className="flex items-center mt-2 border-b border-border pb-2">
            <input
              type="text"
              inputMode="numeric"
              value={cpf}
              onChange={(e) => setCpf(formatCpf(e.target.value))}
              placeholder="000.000.000-00"
              className="flex-1 bg-transparent text-lg text-foreground placeholder:text-muted-foreground/40 outline-none font-medium"
            />
          </div>

          {/* Info */}
          <div className="flex items-start gap-2 mt-4 bg-primary/5 rounded-lg p-3">
            <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Seu número de identificação é utilizado apenas para acessar registros de saúde criptografados.
            </p>
          </div>
        </div>

        <div className="flex-1" />

        {/* CTA */}
        <button
          disabled={cpf.replace(/\D/g, "").length === 0}
          onClick={handleContinue}
          className="w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform mt-6 disabled:opacity-40 disabled:pointer-events-none"
        >
          Verificar Dados <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Identificacao;
