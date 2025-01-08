import { ICombo } from "../../global";

export interface IEntidadBancaria {
  id: number;
  ruc: string | null;
  nombre: string;
  tipo: string;
}

export const defaultEntidadBancaria: IEntidadBancaria = {
  id: 0,
  ruc: null,
  nombre: "",
  tipo: "",
};

export interface IEntidadBancariaTablas {
  tiposEntidadesBancarias: ICombo[];
}

export const defaultEntidadBancariaTablas: IEntidadBancariaTablas = {
  tiposEntidadesBancarias: [],
};

export interface IEntidadBancariaFilter {
  nombre: string;
}

export const defaultEntidadBancariaFilter: IEntidadBancariaFilter = {
  nombre: "",
};

export interface IEntidadBancariaTable {
  id: string;
  nombre: string;
  ruc: string | null;
  tipo: string;
}
