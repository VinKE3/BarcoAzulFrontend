import { format, startOfMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";

export interface IVentaGeneral {
  monedaId: string;
  fechaInicio: string;
  fechaFin: string;
  vendedorId: string;
}

export const defaultVentaGeneral: IVentaGeneral = {
  monedaId: "S",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  vendedorId: "",
};

export interface IVentaGeneralTablas {
  monedas: IMoneda[];
  vendedores: ICombo[];
}

export const defaultVentaGeneralTablas: IVentaGeneralTablas = {
  monedas: [],
  vendedores: [],
};
