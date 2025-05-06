export type Status = "pendente" | "concluido" | "cancelado" | "atrasado";

export interface Agendamento {
  id: string;
  motoristaNome: string;
  motoristaCpf: string;
  placaCaminhao: string;
  numeroContrato: string;
  dataHora: Date;
  status: Status;
};
