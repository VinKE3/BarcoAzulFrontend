import { defaultFarmacologia, defaultGrupoFarmacologico, IFarmacologia, IGrupoFarmacologico } from "../../entidades";
import { IStockFindTable } from "./stockFindModal.model";

export interface IArticuloFindModal {
  inputFocus: string;
}

export interface IArticuloFindFilter {
  codigoBarras: string;
  descripcion: string;
  isActivo: boolean;
}

export const defaultArticuloFindFilter: IArticuloFindFilter = {
  codigoBarras: "",
  descripcion: "",
  isActivo: true,
};

export interface IArticuloFindTable {
  actualizarPrecio: boolean;
  codigoBarras: string;
  controlarStock: boolean;
  descripcion: string;
  id: string;
  isActivo: boolean;
  monedaId: string;
  precioCompra: number;
  precioVenta: number;
  stock: number;
  unidadMedidaAbreviatura: string;
}

export interface IArticuloFind extends IArticuloFindTable {
  origen: string;
}

export const defaultArticuloFind: IArticuloFind = {
  actualizarPrecio: false,
  codigoBarras: "",
  controlarStock: false,
  descripcion: "",
  id: "",
  isActivo: true,
  monedaId: "",
  precioCompra: 0,
  precioVenta: 0,
  stock: 0,
  unidadMedidaAbreviatura: "",
  origen: "articuloFind",
};

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
