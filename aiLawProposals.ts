
export const AI_LAW_PROPOSALS = [
  { 
    name: "Incentivos Fiscais para Tecnologia", 
    description: "Reduz impostos para empresas de tecnologia para estimular a inovação no país.", 
    budget: () => Math.floor(Math.random() * 20) + 10 
  },
  { 
    name: "Subsídios Agrícolas", 
    description: "Aumenta o apoio financeiro para pequenos e médios agricultores.", 
    budget: () => Math.floor(Math.random() * 30) + 15 
  },
  {
    name: "Programa Nacional de Reciclagem",
    description: "Cria um programa de incentivo à reciclagem em todo o território nacional.",
    budget: () => Math.floor(Math.random() * 15) + 5
  },
  {
    name: "Expansão da Malha Ferroviária",
    description: "Investimento na construção de novas ferrovias para transporte de carga.",
    budget: () => Math.floor(Math.random() * 40) + 20
  },
  {
    name: "Digitalização de Serviços Públicos",
    description: "Moderniza e digitaliza serviços governamentais para reduzir a burocracia.",
    budget: () => Math.floor(Math.random() * 25) + 10
  },
  {
    name: "Fundo de Cultura Nacional",
    description: "Cria um fundo para financiar projetos artísticos e culturais locais.",
    budget: () => Math.floor(Math.random() * 10) + 5
  },
  {
    name: "Reforma do Ensino Médio",
    description: "Atualiza o currículo do ensino médio com foco em habilidades técnicas.",
    budget: () => Math.floor(Math.random() * 35) + 15
  }
];
