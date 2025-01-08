import { format } from "date-fns";
import { ICombo } from "../../../global";
import { ITipoPago } from "../../mantenimiento";
import { ICajaChicaTotal } from "./cajaChicaTotal.model";

export interface ICajaChicaCierre {
  id: number;
  fechaCierre: string;
  turno: string;
  sumatoriaCuadrePEN: number;
  sumatoriaCuadreUSD: number;
  totales: ICajaChicaTotal[];
}

export const defaultCajaChicaCierre: ICajaChicaCierre = {
  id: 0,
  fechaCierre: format(new Date(), "yyyy-MM-dd"),
  turno: "",
  sumatoriaCuadrePEN: 0,
  sumatoriaCuadreUSD: 0,
  totales: [],
};

export interface ICajaChicaCierreTablas {
  tiposCobro: ITipoPago[];
  turnos: ICombo[];
}

export const defaultCajaChicaCierreTablas: ICajaChicaCierreTablas = {
  tiposCobro: [],
  turnos: [],
};

