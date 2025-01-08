import { IDepartamento } from "./departamento.model";

export interface IDistrito {
  id: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  nombre: string;
}

export const defaultDistrito: IDistrito = {
  id: "",
  departamentoId: "",
  provinciaId: "",
  distritoId: "",
  nombre: "",
};

export interface IDistritoTablas {
  departamentos: IDepartamento[];
}

export const defaultDistritoTablas: IDistritoTablas = {
  departamentos: [],
};

export interface IDistritoFilter {
  nombre: string;
}

export const defaultDistritoFilter: IDistritoFilter = {
  nombre: "",
};

export interface IDistritoTable {
  departamentoId: string;
  departamentoNombre: string;
  distritoId: string;
  nombre: string;
  provinciaId: string;
  provinciaNombre: string;
}
