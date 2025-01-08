export interface IMedico {
  id: number;
  cmp: string;
  nombres: string;
  isActivo: boolean;
}

export const defaultMedico: IMedico = {
  id: 0,
  cmp: "",
  nombres: "",
  isActivo: true,
};

export interface IMedicoFilter {
  cmp: string;
  nombres: string;
}

export const defaultMedicoFilter: IMedicoFilter = {
  cmp: "",
  nombres: "",
};

export interface IMedicoTable {
  id: number;
  cmp: string;
  nombres: string;
  isActivo: boolean;
}
