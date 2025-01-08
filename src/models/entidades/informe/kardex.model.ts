import { ICombo } from "../../global";
import { defaultAlmacen, defaultArticulo, IAlmacen, IArticulo } from "../mantenimiento";

export interface IKardexFilter {
  articuloId: string;
  descripcion: string;
  almacenId: string;
}

export const defaultKardexFilter: IKardexFilter = {
  articuloId: "",
  descripcion: "",
  almacenId: "",
};

export interface IKardexFilterTablas {
  almacenes: ICombo[];
}

export const defaultKardexFilterTablas: IKardexFilterTablas = {
  almacenes: [],
};

export interface IKardexTable {
  artId: string;
  cantCaj: number;
  cantUni: number;
  cliProvNom: string;
  fecEmision: string;
  lotFecVen: string;
  lotNum: string;
  num: number;
  numDoc: string;
  provId: string;
  saldCaj: number;
  saldUni: number;
  tipDocId: string;
  tipOpeId: string;
  unidMed: string;
  vendId: string | null;
}

export interface IKardexResponse {
  almacen: IAlmacen;
  articulo: IArticulo;
  detalles: IKardexTable[];
}

export const defaultKardexResponse: IKardexResponse = {
  almacen: defaultAlmacen,
  articulo: defaultArticulo,
  detalles: [],
};
