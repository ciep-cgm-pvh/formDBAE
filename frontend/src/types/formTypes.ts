// Representa os dados da seção I - Dados Pessoais
export interface PersonalData {
  nome: string;
  nascimento: string;
  cpf: string;
  formacaoProfissional: string;
  cargo: string;
  cargoEfetivo: string;
  orgao: string;
  dataNomeacao: string;
  cargoPublico: { boolean: string; qual: string };
  orgaoOrigem: string;
  conselho: { boolean: string; qual: string };
  enderecoTrabalho: string;
  cepTrabalho: string;
  telTrabalho: string;
  enderecoResidencial: string;
  cepResidencial: string;
  telResidencial: string;
  email: string;
  celular: string;
  enderecoCorrespondencia: string;
  estadoCivil: { boolean: string; qual: string };
  conjuge: string;
  atividadeConjuge: string;
}

// Representa uma atividade profissional
export interface Atividade {
  atividade: string;
  orgao: string;
  remuneracao: string;
}

// Status de atividades anteriores
export interface AtividadeData {
  naoExerceuProfissao: boolean;
  statusProfissao: { boolean: string; qual: string };
}

// Representa a seção II - Atividades anteriores
export interface PreviousActivitiesData {
  atividades: Atividade[];
  statusProfissonal: AtividadeData;
}

// Representa um bem
export interface Bem {
  tipo: string;
  administrador: string;
  valorBem: string;
}

// Representa os checkboxes de bens e direitos
export interface BensDireitosData {
  naoPossuiBem: boolean;
  naoPossuiBemAlemDoRFB: boolean;
  familiarProprietario: { boolean: string; qual: string };
  participacao5perc: { boolean: string; qual: string };
}

// Representa a seção III - Bens e Direitos
export interface BensDireitosForm {
  bens: Bem[];
  checkboxBens: BensDireitosData;
}

// Representa a seção IV - Conflito de Interesses
export interface ConflictData {
  atividadeAdjacente: { boolean: string; qual: string };
  rendaExtra: { boolean: string; qual: string };
  potencialConflito: { boolean: string; descricao: string };
  valorBem: string;
}

// Representa a seção V - Anexos Opcionais
export interface OptionalAttachmentsData {
  isentoIRPF: boolean;     // Checkbox de isenção do IRPF
  anexos?: string[];       // Lista dos nomes dos arquivos enviados
}

// Representa o formulário completo
export interface FormValues {
  personalData: PersonalData;
  previousActivities: PreviousActivitiesData;
  bensEDireitos: BensDireitosForm;
  conflitoDeInteresse: ConflictData;
  optionalAttachments: OptionalAttachmentsData;
  dataGeracao?: string;
}
