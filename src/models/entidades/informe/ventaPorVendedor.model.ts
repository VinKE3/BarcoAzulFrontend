import { format, startOfMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";

export interface IVentaPorVendedor {
  monedaId: string;
  fechaInicio: string;
  fechaFin: string;
  vendedorId: string;
}

export const defaultVentaPorVendedor: IVentaPorVendedor = {
  monedaId: "S",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  vendedorId: "",
};

export interface IVentaPorVendedorTablas {
  monedas: IMoneda[];
  vendedores: ICombo[];
}

export const defaultVentaPorVendedorTablas: IVentaPorVendedorTablas = {
  monedas: [],
  vendedores: [],
};
