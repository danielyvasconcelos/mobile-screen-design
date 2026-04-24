import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Share2, CheckCircle2, Camera, FileText, Plus, Smile, Send, BotMessageSquare, History, HeadsetIcon } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
  time: string;
}

const Triagem = () => {
  const [messages, setMessages] = useState<Message[]>([
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
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState<"triage" | "estory" | "support">("triage");

  const quickReplies = ["Começou hoje", "Muitos dias", "Não tenho certeza", "🎙 Desejo falar"];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

    setMessages((prev) => [...prev, { id: Date.now(), text, sender: "user", time }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Entendi. Há quanto tempo você percebeu que a febre começou?",
          sender: "bot",
          time,
        },
      ]);
    }, 2000);
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
      <div className="flex items-center justify-center gap-2 py-2 bg-card">
        <span className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
          Protocolo de Triagem Ativo
        </span>
      </div>

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
            <button className="flex flex-col items-center gap-1 text-primary">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase">Câmera</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-primary">
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
          onClick={() => setActiveTab("triage")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "triage" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "triage" ? "bg-primary text-primary-foreground" : ""}`}>
            <BotMessageSquare className="w-5 h-5" />
          </div>
          Triage
        </button>
        <button
          onClick={() => setActiveTab("estory")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "estory" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "estory" ? "bg-primary text-primary-foreground" : ""}`}>
            <BookOpen className="w-5 h-5" />
          </div>
          eStory
        </button>
        <button
          onClick={() => setActiveTab("support")}
          className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold ${activeTab === "support" ? "text-primary" : "text-muted-foreground"}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${activeTab === "support" ? "bg-primary text-primary-foreground" : ""}`}>
            <HeadsetIcon className="w-5 h-5" />
          </div>
          Support
        </button>
      </nav>
    </div>
  );
};

export default Triagem;
