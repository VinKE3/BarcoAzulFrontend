import { ITipoVenta } from "./tipoVenta.model";

export interface ITipoCobroPago {
  id: string;
  tipoVentaCompraId: string;
  descripcion: string;
  abreviatura: string;
  plazo: number;
}

export const defaultTipoCobroPago: ITipoCobroPago = {
  id: "",
  tipoVentaCompraId: "",
  descripcion: "",
  abreviatura: "",
  plazo: 0,
};

export interface ITipoCobroPagoTablas {
  tiposVentaCompra: ITipoVenta[];
}

export const defaultTipoCobroPagoTablas: ITipoCobroPagoTablas = {
  tiposVentaCompra: [],
};

export interface ITipoCobroPagoFilter {
  descripcion: string;
}

export const defaultTipoCobroPagoFilter: ITipoCobroPagoFilter = {
  descripcion: "",
};

export interface ITipoCobroPagoTable {
  abreviatura: string;
  descripcion: string;
  id: string;
  plazo: number;
  tipoVentaCompraId: string;
}
