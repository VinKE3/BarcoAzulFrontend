import { ICombo } from "../../global";
export interface ISubLinea {
  id: string;
  lineaId: string;
  descripcion: string;
}

export const defaultSubLinea: ISubLinea = {
  id: "",
  lineaId: "",
  descripcion: "",
};

export interface ISubLineaTablas {
  lineas: ICombo[];
}

export const defaultSubLineaTablas: ISubLineaTablas = {
  lineas: [],
};

export interface ISubLineaFilter {
  descripcion: string;
}

export const defaultSubLineaFilter: ISubLineaFilter = {
  descripcion: "",
};

export interface ISubLineaTable {
  id: string;
  descripcion: string;
  lineaDescripcion: string;
}
