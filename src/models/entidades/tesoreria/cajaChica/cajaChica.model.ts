import { format } from "date-fns";
import { defaultFechaFilter, ICombo, IFechaFilter } from "../../../global";
import { ICajaChicaCompleto } from "./cajaChicaCompleto.model";

export interface ICajaChica {
  id: number;
  fecha: string;

  saldoInicialPEN: number;
  saldoInicialUSD: number;

  observacion: string | null;
}

export const defaultCajaChica: ICajaChica = {
  id: 0,
  fecha: format(new Date(), "yyyy-MM-dd"),

  saldoInicialPEN: 0,
  saldoInicialUSD: 0,

  observacion: null,
};

export interface ICajaChicaFilter extends IFechaFilter {
  cajaChicaConfiguracionId: string;
}

export const defaultCajaChicaFilter: ICajaChicaFilter = {
  ...defaultFechaFilter,
  cajaChicaConfiguracionId: "",
};

export interface ICajaChicaFilterTablas {
  cajasChicaConfiguracion: ICombo[];
}

export const defaultCajaChicaFilterTablas: ICajaChicaFilterTablas = {
  cajasChicaConfiguracion: [],
};

export interface ICajaChicaTable extends ICajaChicaCompleto {}

