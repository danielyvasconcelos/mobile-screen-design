import { Share2, CheckCircle2, Brain, Shield, ShieldCheck, Lock, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aiHead from "@/assets/ai-head.png";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-background flex flex-col max-w-md mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-card">
        <Share2 className="w-5 h-5 text-primary" />
        <h1 className="text-sm font-bold text-foreground">SUSy - ChatBot de Triagem</h1>
        <CheckCircle2 className="w-5 h-5 text-primary" />
      </header>

      {/* Hero */}
      <div className="flex flex-col items-center px-6 pt-2 pb-4">
        <div className="w-36 h-36 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
          <img src={aiHead} alt="IA de Triagem" width={120} height={120} className="object-contain" />
        </div>
        <h2 className="text-2xl font-extrabold text-foreground text-center leading-tight">
          Bem-vindo à sua<br />Triagem Digital
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-2 leading-relaxed">
          Estamos aqui para oferecer suporte imediato e orientação personalizada. Sua saúde é nossa prioridade absoluta.
        </p>
      </div>

      {/* Info Cards */}
      <div className="px-4 space-y-3 flex-1">
        {/* AI Support Card */}
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground text-sm">Suporte de IA</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Nossa IA é uma ferramenta de triagem para auxiliar na compreensão dos seus sintomas.{" "}
            <strong className="text-foreground">Ela não substitui a consulta médica presencial.</strong>
          </p>
        </div>

        {/* LGPD Card */}
        <div className="bg-card rounded-lg border p-4">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-bold text-foreground text-sm">Privacidade LGPD</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Seus dados são criptografados e processados conforme a Lei Geral de Proteção de Dados. Mantemos total sigilo sobre suas informações clínicas.
          </p>
        </div>

        {/* Security Badge */}
        <div className="bg-muted rounded-lg px-4 py-3 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-success flex-shrink-0" />
          <div className="flex-1">
            <span className="text-xs font-bold text-foreground">Ambiente 100% Seguro</span>
            <p className="text-[10px] text-muted-foreground">Auditado por protocolos de segurança hospitalar</p>
          </div>
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>

        {/* Voice Tip */}
        <div className="bg-primary/10 rounded-lg px-4 py-3 flex items-center gap-3">
          <Mic className="w-5 h-5 text-primary flex-shrink-0" />
          <p className="text-xs text-primary font-medium">
            Prefere falar? Você pode usar comandos de voz em qualquer momento.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="px-4 pt-4 pb-6">
        <button onClick={() => navigate("/identificacao")} className="w-full bg-primary text-primary-foreground font-bold text-base py-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
          Aceitar e Iniciar <span aria-hidden>→</span>
        </button>
        <p className="text-[10px] text-muted-foreground text-center mt-3">
          Ao clicar em Iniciar, você concorda com nossos{" "}
          <a href="#" className="text-primary underline">Termos de Uso</a> e{" "}
          <a href="#" className="text-primary underline">Política de Privacidade</a>.
        </p>
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
        <Mic className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Index;
