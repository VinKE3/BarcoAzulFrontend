import { format } from "date-fns";

export interface ITipoCambio {
  id: string;
  precioCompra: number;
  precioVenta: number;
}

export const defaultTipoCambio: ITipoCambio = {
  id: format(new Date(), "yyyy-MM-dd"),
  precioCompra: 0,
  precioVenta: 0,
};

export interface ITipoCambioFilter {
  anio: string;
  mes: string;
}

export const defaultTipoCambioFilter: ITipoCambioFilter = {
  anio: format(new Date(), "yyyy"),
  mes: "",
};

export interface ITipoCambioTable {
  id: string;
  precioCompra: number;
  precioVenta: number;
}
