export type HealthUnitType = "UPA" | "Hospital" | "UBS/USF";

export interface HealthUnit {
  id: string;
  type: HealthUnitType;
  name: string;
  address: string;
  neighborhood: string;
  region: string;
  notes?: string;
  keywords: string[];
}

const normalize = (value: string) => value.trim().toLowerCase();

const tokenize = (value: string) =>
  normalize(value)
    .split(/[^a-z0-9çãõáéíóúâêîôûàèìòù-]+/gi)
    .filter(Boolean);

export const healthUnits: HealthUnit[] = [
  {
    id: "upa-galba",
    type: "UPA",
    name: "UPA Galba Novais de Castro",
    address: "Av. Durval de Góes Monteiro, s/n",
    neighborhood: "Tabuleiro do Martins",
    region: "Tabuleiro do Martins",
    keywords: ["durval", "goes", "monteiro", "tabuleiro", "martins"],
  },
  {
    id: "upa-claudio-costa",
    type: "UPA",
    name: "UPA Dr. Cláudio Costa",
    address: "Rua do Campo, s/n",
    neighborhood: "Chã da Jaqueira",
    region: "Chã da Jaqueira",
    keywords: ["campo", "chã", "jaqueira"],
  },
  {
    id: "upa-ismar-gatto",
    type: "UPA",
    name: "UPA Dr. Ismar Gatto",
    address: "Rua Feição, s/n",
    neighborhood: "Jacintinho",
    region: "Jacintinho",
    keywords: ["feição", "jacintinho"],
  },
  {
    id: "upa-cidade-universitaria",
    type: "UPA",
    name: "UPA Cidade Universitária",
    address: "Conjunto Santa Maria (próximo ao Conjunto Eustáquio Gomes)",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["santa", "maria", "eustáquio", "gomes", "cidade", "universitaria"],
  },
  {
    id: "upa-jaragua",
    type: "UPA",
    name: "UPA Jaraguá",
    address: "Av. Walter Ananias, s/n",
    neighborhood: "Jaraguá",
    region: "Jaraguá",
    keywords: ["walter", "ananias", "jaraguá"],
  },
  {
    id: "upa-cha-da-jaqueira",
    type: "UPA",
    name: "UPA Chã da Jaqueira",
    address: "Rua do Campo, s/n",
    neighborhood: "Chã da Jaqueira",
    region: "Chã da Jaqueira",
    keywords: ["campo", "chã", "jaqueira"],
  },
  {
    id: "hospital-hge",
    type: "Hospital",
    name: "Hospital Geral do Estado (HGE)",
    address: "Av. Siqueira Campos, 2095",
    neighborhood: "Trapiche da Barra",
    region: "Trapiche da Barra",
    notes: "Maior referência em urgência e emergência de Alagoas",
    keywords: ["siqueira", "campos", "trapiche", "barra"],
  },
  {
    id: "hospital-hma",
    type: "Hospital",
    name: "Hospital Metropolitano de Alagoas (HMA)",
    address: "Av. Menino Marcelo, s/n",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["menino", "marcelo", "cidade", "universitaria"],
  },
  {
    id: "hospital-mulher",
    type: "Hospital",
    name: "Hospital da Mulher Dra. Nise da Silveira",
    address: "Av. Comendador Leão, 1213",
    neighborhood: "Poço",
    region: "Poço",
    keywords: ["comendador", "leão", "poço", "mulher"],
  },
  {
    id: "hospital-heha",
    type: "Hospital",
    name: "Hospital Escola Dr. Hélvio Auto (HEHA)",
    address: "Rua Cônego Fernando Lyra, s/n",
    neighborhood: "Trapiche da Barra",
    region: "Trapiche da Barra",
    notes: "Referência em doenças infectocontagiosas",
    keywords: ["cônego", "fernando", "lyra", "trapiche", "barra"],
  },
  {
    id: "hospital-hepr",
    type: "Hospital",
    name: "Hospital Escola Portugal Ramalho (HEPR)",
    address: "Rua Oldemburgo da Silva Paranhos, s/n",
    neighborhood: "Farol",
    region: "Farol",
    notes: "Referência em saúde mental",
    keywords: ["oldemburgo", "silva", "paranhos", "farol"],
  },
  {
    id: "hospital-hupaa",
    type: "Hospital",
    name: "Hospital Universitário Professor Alberto Antunes (HUPAA/UFAL)",
    address: "Av. Lourival Melo Mota, s/n",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["lourival", "melo", "mota", "cidade", "universitaria"],
  },
  {
    id: "hospital-santa-casa",
    type: "Hospital",
    name: "Santa Casa de Misericórdia de Maceió",
    address: "Rua Praça Visconde de Sinimbu, 209",
    neighborhood: "Centro",
    region: "Centro",
    keywords: ["praça", "visconde", "sinimbu", "centro"],
  },
  {
    id: "hospital-memorial",
    type: "Hospital",
    name: "Hospital Memorial Arthur Ramos",
    address: "Rua Alagoas, 481",
    neighborhood: "Farol",
    region: "Farol",
    keywords: ["alagoas", "farol", "memorial"],
  },
  {
    id: "hospital-sanatorio",
    type: "Hospital",
    name: "Hospital Sanatório",
    address: "Rua Professor José da Silveira Camerino, 1065",
    neighborhood: "Pinheiro",
    region: "Pinheiro",
    keywords: ["professor", "josé", "silveira", "camerino", "pinheiro"],
  },
  {
    id: "ubs-osvaldo-brandao",
    type: "UBS/USF",
    name: "UBS Osvaldo Brandão Vilela",
    address: "Rua Lafaiete Pacheco, s/n",
    neighborhood: "Ponta da Terra",
    region: "Centro / Litoral",
    keywords: ["lafaiete", "pacheco", "ponta", "terra"],
  },
  {
    id: "usf-reginaldo",
    type: "UBS/USF",
    name: "USF Reginaldo",
    address: "Rua Dr. Carlos Miranda, 96",
    neighborhood: "Poço",
    region: "Centro / Litoral",
    keywords: ["carlos", "miranda", "poço", "reginaldo"],
  },
  {
    id: "ubs-sao-vicente",
    type: "UBS/USF",
    name: "UBS São Vicente de Paula",
    address: "Rua José Maria Corrêa das Neves, 146",
    neighborhood: "Farol",
    region: "Centro / Litoral",
    keywords: ["josé", "maria", "corrêa", "neves", "farol"],
  },
  {
    id: "usf-paulo-oliveira",
    type: "UBS/USF",
    name: "USF Paulo Oliveira Costa (UDA CESMAC)",
    address: "Rua Radialista Odete Pacheco, s/n",
    neighborhood: "Farol",
    region: "Centro / Litoral",
    keywords: ["radialista", "odete", "pacheco", "farol"],
  },
  {
    id: "pitanguinha",
    type: "UBS/USF",
    name: "Unidade de Referência Pitanguinha",
    address: "Rua Antônio Nogueira, s/n",
    neighborhood: "Pitanguinha",
    region: "Centro / Litoral",
    keywords: ["antônio", "nogueira", "pitanguinha"],
  },
  {
    id: "pam-salgadinho",
    type: "UBS/USF",
    name: "PAM Salgadinho",
    address: "Av. Walter Ananias, s/n",
    neighborhood: "Poço",
    region: "Centro / Litoral",
    notes: "Centro de especialidades médicas",
    keywords: ["walter", "ananias", "poço", "salgadinho"],
  },
  {
    id: "usf-jose-araujo",
    type: "UBS/USF",
    name: "USF José Araújo Silva",
    address: "Rua Pastor Eurico Calheiros, 56 (COHAB)",
    neighborhood: "Jacintinho",
    region: "Jacintinho, Feitosa, Serraria e São Jorge",
    keywords: ["pastor", "eurico", "calheiros", "cohab", "jacintinho"],
  },
  {
    id: "ubs-paulo-waldomiro",
    type: "UBS/USF",
    name: "UBS Paulo Waldomiro Alencar",
    address: "Rua Júlio Auto, 431",
    neighborhood: "Jacintinho",
    region: "Jacintinho, Feitosa, Serraria e São Jorge",
    keywords: ["júlio", "auto", "jacintinho"],
  },
  {
    id: "usf-paulo-leal",
    type: "UBS/USF",
    name: "USF Paulo Leal",
    address: "Rua Acre, s/n",
    neighborhood: "Feitosa",
    region: "Jacintinho, Feitosa, Serraria e São Jorge",
    keywords: ["acre", "feitosa"],
  },
  {
    id: "ubs-jose-tenorio",
    type: "UBS/USF",
    name: "UBS José Tenório",
    address: "Conjunto José Tenório",
    neighborhood: "Serraria",
    region: "Jacintinho, Feitosa, Serraria e São Jorge",
    keywords: ["jose", "tenório", "serraria"],
  },
  {
    id: "usf-jose-maria",
    type: "UBS/USF",
    name: "USF José Maria de Vasconcelos Neto",
    address: "Av. Cel. Salustiano Sarmento, 303",
    neighborhood: "São Jorge",
    region: "Jacintinho, Feitosa, Serraria e São Jorge",
    keywords: ["salustiano", "sarmento", "são", "jorge"],
  },
  {
    id: "usf-novo-mundo",
    type: "UBS/USF",
    name: "USF Novo Mundo",
    address: "Travessa Boa Esperança",
    neighborhood: "Novo Mundo",
    region: "Jacintinho, Feitosa, Serraria e São Jorge",
    keywords: ["boa", "esperança", "novo", "mundo"],
  },
  {
    id: "usf-joao-sampaio",
    type: "UBS/USF",
    name: "USF João Sampaio",
    address: "Rua João Sampaio I, Quadra 01 A",
    neighborhood: "Tabuleiro do Martins",
    region: "Tabuleiro do Martins, Clima Bom e Santa Amélia",
    keywords: ["joão", "sampaio", "tabuleiro", "martins"],
  },
  {
    id: "usf-galba-novais",
    type: "UBS/USF",
    name: "USF Galba Novais",
    address: "Av. Betel, s/n",
    neighborhood: "Tabuleiro do Martins",
    region: "Tabuleiro do Martins, Clima Bom e Santa Amélia",
    keywords: ["betel", "tabuleiro", "martins"],
  },
  {
    id: "usf-sergio-quintella",
    type: "UBS/USF",
    name: "USF Vereador Sérgio Quintella",
    address: "Rua Manoel Omena de Farias, 23",
    neighborhood: "Santa Lúcia / Tabuleiro",
    region: "Tabuleiro do Martins, Clima Bom e Santa Amélia",
    keywords: ["manoel", "omena", "farias", "santa", "lucia", "tabuleiro"],
  },
  {
    id: "ubs-djalma-loureiro",
    type: "UBS/USF",
    name: "UBS Dr. Djalma Loureiro",
    address: "Rua Muniz Falcão, s/n",
    neighborhood: "Clima Bom",
    region: "Tabuleiro do Martins, Clima Bom e Santa Amélia",
    keywords: ["muniz", "falcão", "clima", "bom"],
  },
  {
    id: "usf-rosane-collor",
    type: "UBS/USF",
    name: "USF Rosane Collor",
    address: "Av. Waldemar Pedro da Silva, 28",
    neighborhood: "Clima Bom",
    region: "Tabuleiro do Martins, Clima Bom e Santa Amélia",
    keywords: ["waldemar", "pedro", "silva", "clima", "bom"],
  },
  {
    id: "ubs-jose-guedes",
    type: "UBS/USF",
    name: "UBS José Guedes de Farias (Zezito)",
    address: "Conjunto Medeiros Neto I, 03",
    neighborhood: "Santa Amélia",
    region: "Tabuleiro do Martins, Clima Bom e Santa Amélia",
    keywords: ["medeiros", "neto", "santa", "amelia"],
  },
  {
    id: "ubs-tereza-barbosa",
    type: "UBS/USF",
    name: "UBS Tereza Barbosa",
    address: "Rua L, 30 (Conj. Eustáquio Gomes)",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["eustáquio", "gomes", "cidade", "universitaria", "tereza", "barbosa"],
  },
  {
    id: "usf-graciliano-ramos",
    type: "UBS/USF",
    name: "USF Graciliano Ramos",
    address: "Rua 49, s/n (Conj. Graciliano Ramos)",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["graciliano", "ramos", "cidade", "universitaria"],
  },
  {
    id: "ubs-jorge-duarte",
    type: "UBS/USF",
    name: "UBS Jorge Duarte Quintela Cavalcante",
    address: "Rua 61, 308-354 (Conj. Graciliano Ramos)",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["jorge", "duarte", "quintela", "cavalcante", "graciliano", "ramos"],
  },
  {
    id: "clinica-village-ii",
    type: "UBS/USF",
    name: "Clínica da Família Village Campestre II",
    address: "Av. Francisco de Holanda, s/n",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["francisco", "holanda", "cidade", "universitaria"],
  },
  {
    id: "usf-village-campestre-i",
    type: "UBS/USF",
    name: "USF Village Campestre I",
    address: "Rua Celina Sacramento Silva, s/n",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["celina", "sacramento", "silva", "cidade", "universitaria"],
  },
  {
    id: "usf-denisson-menezes",
    type: "UBS/USF",
    name: "USF Denisson Menezes",
    address: "Conjunto Denisson Menezes, Quadra A, 25",
    neighborhood: "Cidade Universitária",
    region: "Cidade Universitária",
    keywords: ["denisson", "menezes", "cidade", "universitaria"],
  },
  {
    id: "ubs-bebedouro",
    type: "UBS/USF",
    name: "UBS Bebedouro",
    address: "Rua Dr. Osvaldo Cruz, 470",
    neighborhood: "Chã de Bebedouro",
    region: "Bebedouro, Fernão Velho, Bom Parto",
    keywords: ["osvaldo", "cruz", "bebedouro"],
  },
  {
    id: "usf-edvaldo-silva",
    type: "UBS/USF",
    name: "USF Edvaldo Silva",
    address: "Rua Cel. Othon Bezerra de Melo, 01",
    neighborhood: "Fernão Velho",
    region: "Bebedouro, Fernão Velho, Bom Parto",
    keywords: ["othon", "bezerra", "melo", "fernão", "velho"],
  },
  {
    id: "usf-claudio-medeiros",
    type: "UBS/USF",
    name: "USF Cláudio Medeiros",
    address: "Rua Vereador Hermínio Cardoso, 191",
    neighborhood: "Rio Novo",
    region: "Bebedouro, Fernão Velho, Bom Parto",
    keywords: ["hermínio", "cardoso", "rio", "novo"],
  },
  {
    id: "ubs-geraldo-melo",
    type: "UBS/USF",
    name: "UBS Geraldo Melo",
    address: "Rua do Campo, s/n",
    neighborhood: "Bom Parto",
    region: "Bebedouro, Fernão Velho, Bom Parto",
    keywords: ["campo", "bom", "parto"],
  },
];

const scoreUnit = (query: string, unit: HealthUnit, preferredType?: HealthUnitType) => {
  const tokens = tokenize(query);
  if (tokens.length === 0) return 0;

  const haystack = normalize(
    [unit.name, unit.address, unit.neighborhood, unit.region, unit.notes, ...unit.keywords].filter(Boolean).join(" ")
  );

  const matchCount = tokens.reduce((sum, token) => (haystack.includes(token) ? sum + 1 : sum), 0);
  if (matchCount === 0) return 0;

  return matchCount + (preferredType && unit.type === preferredType ? 2 : 0);
};

export const findNearestUnits = (query: string, preferredType?: HealthUnitType) => {
  const units = healthUnits
    .map((unit) => ({ unit, score: scoreUnit(query, unit, preferredType) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.unit.name.localeCompare(b.unit.name));

  return units.map((item) => item.unit);
};

export const findNearestUbs = (query: string) => findNearestUnits(query, "UBS/USF");

export const findNearestUrgencyUnits = (query: string, limit = 3) =>
  findNearestUnits(query).filter((unit) => unit.type === "UPA" || unit.type === "Hospital").slice(0, limit);

export const findAnyNearbyUnits = (query: string, limit = 3) => findNearestUnits(query).slice(0, limit);
