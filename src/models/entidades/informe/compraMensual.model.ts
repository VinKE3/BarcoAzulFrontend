import { format, getMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";
export interface ICompraMensual {
  monedaId: string;
  tipoDocumentoId: string;
  anio: string;
  mes: number;
}

export const defaultCompraMensual: ICompraMensual = {
  monedaId: "S",
  tipoDocumentoId: "",
  anio: format(new Date(), "yyyy"),
  mes: getMonth(new Date()) + 1, // getMonth() devuelve un índice basado en 0, así que sumamos 1
};

export interface ICompraMensualTablas {
  monedas: IMoneda[];
  meses: ICombo[];
  tiposDocumento: ICombo[];
}

export const defaultCompraMensualTablas: ICompraMensualTablas = {
  monedas: [],
  meses: [],
  tiposDocumento: [],
};
