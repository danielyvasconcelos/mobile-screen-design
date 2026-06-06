import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Stethoscope, BotMessageSquare, History, HeadsetIcon, MapPin, Search, ArrowRight } from "lucide-react";
import { findNearestUbs, findAnyNearbyUnits, findNearestUrgencyUnits, type HealthUnit } from "@/lib/healthUnits";

const Suporte = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"triage" | "history" | "support">("support");
  const [query, setQuery] = useState("");
  const [bestUbs, setBestUbs] = useState<HealthUnit | null>(null);
  const [nearbyUnits, setNearbyUnits] = useState<HealthUnit[]>([]);
  const [urgentUnits, setUrgentUnits] = useState<HealthUnit[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setBestUbs(null);
      setNearbyUnits([]);
      setSearched(true);
      return;
    }

    const ubsList = findNearestUbs(trimmed);
    const nearest = ubsList.length ? ubsList[0] : null;
    setBestUbs(nearest);

    const otherNearby = findAnyNearbyUnits(trimmed, 3).filter((unit) => unit.id !== nearest?.id);
    setNearbyUnits(otherNearby);

    const urgencyList = findNearestUrgencyUnits(trimmed, 3);
    setUrgentUnits(urgencyList);
    setSearched(true);
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
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Qual é a sua localização?</h1>
          <p className="text-sm text-muted-foreground">
            Informe sua rua ou bairro em Maceió e sugeriremos a UBS/USF mais próxima.
          </p>
        </div>

        <form onSubmit={handleSearch} className="space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rua ou bairro (ex: Jaraguá, Tabuleiro do Martins)"
              className="w-full bg-card border border-border rounded-2xl py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Encontrar UBS/USF
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="bg-card rounded-3xl border border-border p-4 space-y-3">
          <h2 className="text-sm font-bold text-foreground">Como funciona</h2>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sem API externa, usamos o texto digitado para encontrar correspondências nos principais bairros e unidades de Maceió.
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            A prioridade é mostrar UBS/USF para cuidados de rotina. Se for caso de urgência, procure uma UPA ou hospital próximo.
          </p>
        </div>

        {searched && (
          <div className="space-y-3">
            {!query.trim() ? (
              <div className="rounded-3xl bg-destructive/10 border border-destructive p-4">
                <p className="text-sm font-semibold text-destructive">Digite sua rua ou bairro para localizar a UBS/USF mais próxima.</p>
              </div>
            ) : bestUbs ? (
              <div className="space-y-3">
                <div className="rounded-3xl bg-card border border-border p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>UBS/USF sugerida</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p className="text-base font-bold text-foreground">{bestUbs.name}</p>
                    <p className="text-sm text-muted-foreground">{bestUbs.address}</p>
                    <p className="text-sm text-muted-foreground">Bairro: {bestUbs.neighborhood}</p>
                    <p className="text-sm text-muted-foreground">Região: {bestUbs.region}</p>
                    {bestUbs.notes && <p className="text-xs text-muted-foreground">{bestUbs.notes}</p>}
                  </div>
                </div>
                {nearbyUnits.length > 0 && (
                  <div className="rounded-3xl bg-card border border-border p-4">
                    <p className="text-sm font-semibold text-foreground">Outras unidades próximas</p>
                    <div className="mt-3 space-y-3">
                      {nearbyUnits.map((unit) => (
                        <div key={unit.id} className="rounded-2xl bg-muted border border-border p-3">
                          <p className="text-sm font-semibold text-foreground">{unit.name}</p>
                          <p className="text-xs text-muted-foreground">{unit.type}</p>
                          <p className="text-xs text-muted-foreground">{unit.address}</p>
                          <p className="text-xs text-muted-foreground">Bairro: {unit.neighborhood}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {urgentUnits.length > 0 && (
                  <div className="rounded-3xl bg-card border border-border p-4">
                    <p className="text-sm font-semibold text-foreground">Para urgência / emergência leve</p>
                    <p className="text-xs text-muted-foreground mb-3">
                      Estas unidades são as UPAs ou hospitais mais próximas com base na sua referência.
                    </p>
                    <div className="space-y-3">
                      {urgentUnits.map((unit) => (
                        <div key={unit.id} className="rounded-2xl bg-muted border border-border p-3">
                          <p className="text-sm font-semibold text-foreground">{unit.name}</p>
                          <p className="text-xs text-muted-foreground">{unit.type}</p>
                          <p className="text-xs text-muted-foreground">{unit.address}</p>
                          <p className="text-xs text-muted-foreground">Bairro: {unit.neighborhood}</p>
                          {unit.notes && <p className="text-[10px] text-muted-foreground mt-1">{unit.notes}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-3xl bg-warning/10 border border-warning p-4">
                <p className="text-sm font-semibold text-warning-foreground">Não encontramos uma UBS/USF a partir da referência informada.</p>
                <p className="text-xs text-muted-foreground">Tente outro bairro ou ponto de referência de Maceió.</p>
              </div>
            )}
          </div>
        )}
      </main>

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
