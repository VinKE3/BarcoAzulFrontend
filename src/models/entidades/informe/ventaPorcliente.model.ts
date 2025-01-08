import { format, startOfMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";

export interface IVentaPorCliente {
  monedaId: string;
  fechaInicio: string;
  fechaFin: string;
  clienteId: string;
  clienteNombre: string;
  tipoReporte: string;
  vendedorId: string;
}

export const defaultVentaPorCliente: IVentaPorCliente = {
  monedaId: "S",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  clienteId: "",
  clienteNombre: "",
  tipoReporte: "S",
  vendedorId: "",
};

export interface IVentaPorClienteTablas {
  monedas: IMoneda[];
  tiposReporte: ICombo[];
  vendedores: ICombo[];
}

export const defaultVentaPorClienteTablas: IVentaPorClienteTablas = {
  monedas: [],
  tiposReporte: [],
  vendedores: [],
};
