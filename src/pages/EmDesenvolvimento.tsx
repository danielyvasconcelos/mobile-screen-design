import { useNavigate } from "react-router-dom";
import { Construction, ArrowLeft, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";

const EmDesenvolvimento = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col">
      {/* Top Header */}
      <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
            <Stethoscope className="w-4 h-4 text-primary" />
          </div>
          <span className="text-base font-bold text-foreground">SUSy - ChatBot de Triagem</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center px-8 py-16">
        <div className="max-w-md w-full bg-card rounded-2xl border border-border p-10 text-center space-y-6 shadow-sm">
          <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Construction className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-foreground">Ainda em desenvolvimento</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Esta funcionalidade está sendo construída e estará disponível em breve.
            </p>
          </div>
          <Button onClick={() => navigate("/dashboard")} className="w-full">
            Voltar ao Painel
          </Button>
        </div>
      </main>
    </div>
  );
};

export default EmDesenvolvimento;
