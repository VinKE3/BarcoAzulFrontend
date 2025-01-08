import { ICombo } from "../../global";

export interface IPrecioMayorista {
  id: string;
  descripcion: string | null;
  costoCompra: number;
  precioCompra: number;
  porcUtilidad: number;
  precioVenta: number;
  dsctoMaximo: number;
  precioSugPublico: number;
  porcDsctoCaja: number;
  porcDsctoUnidad: number;
  precioDsctoCaja: number;
  precioDsctoUnidad: number;
  lineaCodigoInterno: string | null;
  unidadesPorCaja: number;
}

export const defaultPrecioMayorista: IPrecioMayorista = {
  id: "",
  descripcion: null,
  costoCompra: 0,
  precioCompra: 0,
  porcUtilidad: 0,
  precioVenta: 0,
  dsctoMaximo: 0,
  precioSugPublico: 0,
  porcDsctoCaja: 0,
  porcDsctoUnidad: 0,
  precioDsctoCaja: 0,
  precioDsctoUnidad: 0,
  lineaCodigoInterno: null,
  unidadesPorCaja: 0,
};

export interface IPrecioMayoristaFilter {
  descripcion: string;
  lineaId: string;
}

export const defaultPrecioMayoristaFilter: IPrecioMayoristaFilter = {
  descripcion: "",
  lineaId: "",
};

export interface IPrecioMayoristaFilterTablas {
  lineas: ICombo[];
}

export const defaultPrecioMayoristaFilterTablas: IPrecioMayoristaFilterTablas = {
  lineas: [],
};

export interface IPrecioMayoristaTable {
  costoCompra: number;
  descripcion: string;
  dsctoMaximo: number;
  id: string;
  lineaCodigoInterno: string;
  porcDsctoCaja: number;
  porcDsctoUnidad: number;
  porcUtilidad: number;
  precioCompra: number;
  precioDsctoCaja: number;
  precioDsctoUnidad: number;
  precioSugPublico: number;
  precioVenta: number;
  unidadesPorCaja: number;
}
