import { format } from "date-fns";
import { defaultFechaFilter, IFechaFilter } from "../../../global";
import { ICajaChicaPendiente } from "./cajaChicaCompleto.model";
import { ICajaChicaTotal } from "./cajaChicaTotal.model";

export interface ICajaGeneral {
  id: number;
  fechaCierre: string;
  totalGeneralPEN: number;
  totalGeneralUSD: number;

  usuarioNick: string | null;

  detalles: ICajaChicaPendiente[];
  totales: ICajaChicaTotal[];
}

export const defaultCajaGeneral: ICajaGeneral = {
  id: 0,
  fechaCierre: format(new Date(), "yyyy-MM-dd"),
  totalGeneralPEN: 0,
  totalGeneralUSD: 0,
  usuarioNick: null,
  detalles: [],
  totales: [],
};

export interface ICajaGeneralFilter extends IFechaFilter {}

export const defaultCajaGeneralFilter: ICajaGeneralFilter = {
  ...defaultFechaFilter,
};

export interface ICajaGeneralTable {
  id: number;
  fechaCierre: string;
  totalGeneralPEN: number;
  totalGeneralUSD: number;
  usuarioNick: string;
}
