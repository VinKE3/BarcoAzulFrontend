import { ITipoVenta } from "./tipoVenta.model";

export interface ITipoPago {
  id: string;
  tipoVentaId: string;
  descripcion: string;
  plazo: number | null;
  pedirCuentaBancaria: boolean;
}

export const defaultTipoPago: ITipoPago = {
  id: "",
  tipoVentaId: "",
  descripcion: "",
  plazo: null,
  pedirCuentaBancaria: false,
};

export interface ITipoPagoTablas {
  tiposVenta: ITipoVenta[];
}

export const defaultTiposPagoTablas: ITipoPagoTablas = {
  tiposVenta: [],
};

export interface ITipoPagoFilter {
  descripcion: string;
}

export const defaultTipoPagoFilter: ITipoPagoFilter = {
  descripcion: "",
};

export interface ITipoPagoTable {
  descripcion: string;
  id: string;
  pedirCuentaBancaria: boolean;
  plazo: number | null;
  tipoVentaId: string;
}
