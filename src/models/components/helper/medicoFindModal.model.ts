export interface IMedicoFindModal {
  inputFocus: string;
}

export interface IMedicoFindFilter {
  cmp: string;
  nombres: string;
}

export const defaultMedicoFindFilter: IMedicoFindFilter = {
  cmp: "",
  nombres: "",
};

export interface IMedicoFind extends IMedicoFindTable {
  origen: string;
}

export interface IMedicoFindTable {
  id: number;
  cmp: string;
  nombres: string;
}
