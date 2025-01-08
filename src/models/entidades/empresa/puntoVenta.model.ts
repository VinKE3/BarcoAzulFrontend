import { IDepartamento } from "../mantenimiento";

export interface IPuntoVenta {
  id: string;
  descripcion: string;
  direccion: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  ubigeo: string;
  codigoSunat: string | null;
}

export const defaultPuntoVenta: IPuntoVenta = {
  id: "",
  descripcion: "",
  direccion: "",
  departamentoId: "",
  provinciaId: "",
  distritoId: "",
  ubigeo: "",
  codigoSunat: null,
};

export interface IPuntoVentaTablas {
  departamentos: IDepartamento[];
}

export const defaultPuntoVentaTablas: IPuntoVentaTablas = {
  departamentos: [],
};

export interface IPuntoVentaFilter {
  descripcion: string;
}

export const defaultPuntoVentaFilter: IPuntoVentaFilter = {
  descripcion: "",
};

export interface IPuntoVentaTable {
  id: string;
  descripcion: string;
  codigoSunat: string | null;
  direccion: string | null;
  ubigeo: string;
}
