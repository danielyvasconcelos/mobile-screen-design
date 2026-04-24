import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Stethoscope,
  ShieldCheck,
  Bell,
  UserCircle,
  AlertOctagon,
  Search,
  Activity,
  Clock,
  CheckCircle2,
  HeartPulse,
  HeartCrack,
  Wind,
  Thermometer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type RiskLevel = "emergencia" | "muito-urgente" | "pouco-urgente";

interface Patient {
  id: number;
  name: string;
  age: number;
  gender: "Homem" | "Mulher";
  risk: RiskLevel;
  symptom: string;
  symptomIcon: typeof HeartCrack;
  arrival: string;
  arrivalNote?: string;
  avatar: string;
}

const riskConfig: Record<RiskLevel, { label: string; dotClass: string; textClass: string }> = {
  emergencia: {
    label: "EMERGÊNCIA",
    dotClass: "bg-destructive",
    textClass: "text-destructive",
  },
  "muito-urgente": {
    label: "MUITO URGENTE",
    dotClass: "bg-amber-500",
    textClass: "text-amber-600",
  },
  "pouco-urgente": {
    label: "POUCO URGENTE",
    dotClass: "bg-primary",
    textClass: "text-primary",
  },
};

const patients: Patient[] = [
  {
    id: 1,
    name: "José",
    age: 74,
    gender: "Homem",
    risk: "emergencia",
    symptom: "Dor forte no peito",
    symptomIcon: HeartCrack,
    arrival: "4 mins",
    arrivalNote: "AMBULANCE 04",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jose&backgroundColor=b6e3f4",
  },
  {
    id: 2,
    name: "Maria",
    age: 82,
    gender: "Mulher",
    risk: "muito-urgente",
    symptom: "Falta de ar",
    symptomIcon: Wind,
    arrival: "12 mins",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria&backgroundColor=ffd5dc",
  },
  {
    id: 3,
    name: "João",
    age: 58,
    gender: "Homem",
    risk: "pouco-urgente",
    symptom: "Febre persistente",
    symptomIcon: Thermometer,
    arrival: "Arrived",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao&backgroundColor=c0aede",
  },
];

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "pacientes", label: "Pacientes", icon: Users },
  { id: "metricas", label: "Métricas", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState<string>("dashboard");
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar */}
      <aside className="w-60 bg-card border-r border-border flex flex-col justify-between py-6">
        <div>
          <div className="px-6 mb-8 flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-primary" />
            </div>
            <span className="text-base font-bold text-primary">Portal do Gestor</span>
          </div>

          <nav className="px-3 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile */}
        <div className="px-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Daniely&backgroundColor=d1d4f9"
              alt="Daniely"
              className="w-9 h-9 rounded-full bg-card"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-foreground truncate">Daniely</p>
              <p className="text-xs text-muted-foreground truncate">Recepcionista</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-primary" />
            </div>
            <span className="text-base font-bold text-foreground">SUSy - ChatBot de Triagem</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-success/10 text-success text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              AMBIENTE SEGURO
            </div>
            <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
              <Bell className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground">
              <UserCircle className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Critical Alert Banner */}
        <div className="bg-destructive text-destructive-foreground px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <AlertOctagon className="w-4 h-4" />
            1 Paciente de risco vermelho detectado em um raio de 5km.
          </div>
          <button className="text-xs font-bold underline underline-offset-2 hover:no-underline">
            INITIALIZE ER RESPONSE
          </button>
        </div>

        {/* Content Area */}
        <main className="flex-1 px-8 py-6 space-y-6 overflow-auto">
          {/* Page Title */}
          <div className="flex items-end justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Monitoramento em tempo real</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-success/30 text-success text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              HIPAA - PORTAL
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total de Triagens */}
            <div className="bg-card rounded-xl border border-border p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold text-success">+12% vs last hr</span>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-wide uppercase">
                  Total de Triagens
                </p>
                <p className="text-3xl font-bold text-primary mt-1">42</p>
              </div>
            </div>

            {/* Tempo Médio de Espera */}
            <div className="bg-card rounded-xl border border-border p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <span className="text-xs font-semibold text-destructive">+2m spike</span>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-wide uppercase">
                  Tempo Médio de Espera
                </p>
                <p className="text-3xl font-bold text-amber-600 mt-1">
                  14<span className="text-xl">min</span>
                </p>
              </div>
            </div>

            {/* Capacidade da Equipe */}
            <div className="bg-card rounded-xl border border-border p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-success" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-wide uppercase">
                  Capacidade da Equipe
                </p>
                <p className="text-3xl font-bold text-foreground mt-1">
                  88<span className="text-xl">%</span>
                </p>
              </div>
            </div>

            {/* Contagem de Alto Risco */}
            <div className="bg-card rounded-xl border border-border p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <HeartPulse className="w-5 h-5 text-destructive" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted-foreground tracking-wide uppercase">
                  Contagem de Alto Risco
                </p>
                <p className="text-3xl font-bold text-destructive mt-1">03</p>
              </div>
            </div>
          </div>

          {/* Patients Table */}
          <div className="bg-card rounded-xl border border-border">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h2 className="text-base font-bold text-foreground tracking-wide">
                PACIENTES A CAMINHO
              </h2>
              <div className="relative w-64">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <Input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="buscar ..."
                  className="pl-8 h-9 bg-muted/50 border-0 text-sm"
                />
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                    Nome/Idade
                  </TableHead>
                  <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                    Risco
                  </TableHead>
                  <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                    Sintoma Principal
                  </TableHead>
                  <TableHead className="text-[10px] font-bold tracking-wider uppercase">
                    Previsão de Chegada
                  </TableHead>
                  <TableHead className="text-[10px] font-bold tracking-wider uppercase text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.map((patient) => {
                  const SymptomIcon = patient.symptomIcon;
                  const risk = riskConfig[patient.risk];
                  return (
                    <TableRow key={patient.id} className="border-border">
                      <TableCell className="py-5">
                        <div className="flex items-center gap-3">
                          <img
                            src={patient.avatar}
                            alt={patient.name}
                            className="w-10 h-10 rounded-full bg-muted"
                          />
                          <div>
                            <p className="text-sm font-bold text-foreground">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {patient.age} anos • {patient.gender}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${risk.dotClass}`} />
                          <span className={`text-xs font-bold ${risk.textClass}`}>
                            {risk.label}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <SymptomIcon className="w-4 h-4 text-muted-foreground" />
                          {patient.symptom}
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-semibold text-foreground">{patient.arrival}</p>
                        {patient.arrivalNote && (
                          <p className="text-[10px] text-muted-foreground tracking-wider">
                            {patient.arrivalNote}
                          </p>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className="h-9 px-4 text-xs font-bold">
                          Resumo da
                          <br />
                          Anamnese
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-border">
              <button className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center text-muted-foreground">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 rounded-full border border-border hover:bg-muted flex items-center justify-center text-muted-foreground">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
