import { format, startOfMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";
import { ITipoPago } from "../mantenimiento";

export interface IRecibo {
  id: number;
  tipoId: string;
  numero: string;
  fechaEmision: string;
  horaEmision: string | null;
  tipoPagoId: string;
  monedaId: string;
  tipoCambio: number;
  importe: number;
  concepto: string;
  observacion: string;
}

export const defaultRecibo: IRecibo = {
  id: 0,
  tipoId: "",
  numero: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  horaEmision: "",
  tipoPagoId: "",
  monedaId: "",
  tipoCambio: 0,
  importe: 0,
  concepto: "",
  observacion: "",
};

export interface IReciboTablas {
  tipos: ICombo[];
  tiposPago: ITipoPago[];
  monedas: IMoneda[];
}

export const defaultReciboTablas: IReciboTablas = {
  tipos: [],
  tiposPago: [],
  monedas: [],
};

export interface IReciboFilter {
  fechaInicio: string;
  fechaFin: string;
  tipoId: string;
  numero: string;
  concepto: string;
}

export const defaultReciboFilter: IReciboFilter = {
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  tipoId: "",
  numero: "",
  concepto: "",
};

export interface IReciboFilterTablas {
  tipos: ICombo[];
}

export const defaultReciboFilterTablas: IReciboFilterTablas = {
  tipos: [],
};

export interface IReciboTable {
  concepto: string;
  fechaEmision: string;
  id: number;
  importe: number;
  monedaId: string;
  numero: string;
  tipoId: string;
}
