import { IProvincia } from "./provincia.model";

export interface IDepartamento {
  id: string;
  nombre: string;
  provincias: IProvincia[];
}

export const defaultDepartamento: IDepartamento = {
  id: "",
  nombre: "",
  provincias: [],
};

export interface IDepartamentoFilter {
  nombre: string;
}

export const defaultDepartamentoFilter: IDepartamentoFilter = {
  nombre: "",
};

export interface IDepartamentoTable {
  id: string;
  nombre: string;
}
