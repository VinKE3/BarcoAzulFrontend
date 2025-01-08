import { format, getMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";

export interface IVentaMensual {
  monedaId: string;
  tipoDocumentoId: string;
  anio: string;
  mes: number;
  vendedorId: string;
}

export const defaultVentaMensual: IVentaMensual = {
  monedaId: "S",
  tipoDocumentoId: "",
  anio: format(new Date(), "yyyy"),
  mes: getMonth(new Date()) + 1, // getMonth() devuelve un índice basado en 0, así que sumamos 1
  vendedorId: "",
};

export interface IVentaMensualTablas {
  monedas: IMoneda[];
  tiposDocumento: ICombo[];
  meses: ICombo[];
  vendedores: ICombo[];
}

export const defaultVentaMensualTablas: IVentaMensualTablas = {
  monedas: [],
  tiposDocumento: [],
  meses: [],
  vendedores: [],
};
