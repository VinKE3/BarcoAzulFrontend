import { IDepartamento } from "./departamento.model";
import { IDistrito } from "./distrito.model";

export interface IProvincia {
  id: string;
  departamentoId: string;
  provinciaId: string;
  nombre: string;
  distritos: IDistrito[];
}

export const defaultProvincia: IProvincia = {
  id: "",
  departamentoId: "",
  provinciaId: "",
  nombre: "",
  distritos: [],
};

export interface IProvinciaTablas {
  departamentos: IDepartamento[];
}

export const defaultProvinciaTablas: IProvinciaTablas = {
  departamentos: [],
};

export interface IProvinciaFilter {
  nombre: string;
}

export const defaultProvinciaFilter: IProvinciaFilter = {
  nombre: "",
};

export interface IProvinciaTable {
  departamentoId: string;
  departamentoNombre: string;
  nombre: string;
  provinciaId: string;
}
