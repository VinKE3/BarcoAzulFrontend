import { format } from "date-fns";
import { ICajaChicaTotal } from "./cajaChicaTotal.model";

export interface ICajaChicaCompleto {
  id: number;
  fecha: string;

  saldoInicialPEN: number;
  saldoInicialUSD: number;

  ingresoPEN: number;
  ingresoUSD: number;

  egresoPEN: number;
  egresoUSD: number;

  saldoFinalPEN: number;
  saldoFinalUSD: number;

  sumatoriaCuadrePEN: number;
  sumatoriaCuadreUSD: number;

  fechaCierre: string;
  turno: string;

  estado: boolean;
  observacion: string | null;
}

export const defaultCajaChicaCompleto: ICajaChicaCompleto = {
  id: 0,
  fecha: format(new Date(), "yyyy-MM-dd"),

  saldoInicialPEN: 0,
  saldoInicialUSD: 0,

  ingresoPEN: 0,
  ingresoUSD: 0,

  egresoPEN: 0,
  egresoUSD: 0,

  saldoFinalPEN: 0,
  saldoFinalUSD: 0,

  sumatoriaCuadrePEN: 0,
  sumatoriaCuadreUSD: 0,

  fechaCierre: format(new Date(), "yyyy-MM-dd"),
  turno: "",

  estado: false,
  observacion: null,
};

export interface ICajaChicaPendiente extends ICajaChicaCompleto {
  totales: ICajaChicaTotal[];
}

export const defaultCajaChicaPendiente: ICajaChicaPendiente = {
  ...defaultCajaChicaCompleto,
  totales: [],
};
