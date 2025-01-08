import { defaultFarmacologia, defaultGrupoFarmacologico, IFarmacologia, IGrupoFarmacologico } from "../../entidades";
import { IStockFindTable } from "./stockFindModal.model";

export interface IArticuloFindModal {
  inputFocus: string;
  almacenId: string;
}

export interface IArticuloFindFilter {
  descripcion: string;
}

export const defaultArticuloFindFilter: IArticuloFindFilter = {
  descripcion: "",
};
export interface IArticuloFind extends IArticuloFindTable {
  origen: string;
}

export const defaultArticuloFind: IArticuloFind = {
  origen: "",
  id: "",
  descripcion: "",
  farmacologiaId: "",
  farmacologiaNombre: "",
  grupoFarmacologicoDescripcion: "",
  grupoFarmacologicoId: "",
  lineaCodigoInterno: "",
  lineaDescripcion: "",
  lineaId: "",
  loteId: "",
  loteNumero: "",
  loteFechaVencimiento: "",
  monedaId: "",
  precioCaja: 0,
  precioUnitario: 0,
  stockCajas: 0,
  stockUnidades: 0,
  unidadMedidaId: "",
  unidadMedidaAlternaId: "",
};

export interface IArticuloFindTable {
  id: string;
  descripcion: string;
  farmacologiaId: string;
  farmacologiaNombre: string;
  grupoFarmacologicoDescripcion: string;
  grupoFarmacologicoId: string;
  lineaCodigoInterno: string;
  lineaDescripcion: string; //Laboratorio
  lineaId: string;
  loteId: string;
  loteNumero: string;
  loteFechaVencimiento: string;
  monedaId: string;
  precioCaja: number;
  precioUnitario: number;
  stockCajas: number;
  stockUnidades: number;
  unidadMedidaId: string;
  unidadMedidaAlternaId: string;
}

export interface IArticuloFindAdicional {
  stock: IStockFindTable[];
  articulo: IArticuloFind;
  grupoFarmacologico: IGrupoFarmacologico;
  farmacologia: IFarmacologia;
}

export const defaultArticuloFindAdicional: IArticuloFindAdicional = {
  stock: [],
  articulo: defaultArticuloFind,
  grupoFarmacologico: defaultGrupoFarmacologico,
  farmacologia: defaultFarmacologia,
};
