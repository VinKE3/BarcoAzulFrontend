import { format, startOfMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";

export interface IRegistroVenta {
  monedaId: string;
  fechaInicio: string;
  fechaFin: string;
  tipoDocumentoId: string;
  vendedorId: string;
}

export const defaultRegistroVenta: IRegistroVenta = {
  monedaId: "S",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  tipoDocumentoId: "",
  vendedorId: "",
};

export interface IRegistroVentaTablas {
  monedas: IMoneda[];
  tiposDocumento: ICombo[];
  vendedores: ICombo[];
}

export const defaultRegistroVentaTablas: IRegistroVentaTablas = {
  monedas: [],
  tiposDocumento: [],
  vendedores: [],
};
