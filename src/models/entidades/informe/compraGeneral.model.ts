import { format, startOfMonth } from "date-fns";
import { IMoneda } from "../../global";
export interface ICompraGeneral {
  monedaId: string;
  fechaInicio: string;
  fechaFin: string;
}

export const defaultCompraGeneral: ICompraGeneral = {
  monedaId: "S",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
};

export interface ICompraGeneralTablas {
  monedas: IMoneda[];
}

export const defaultCompraGeneralTablas: ICompraGeneralTablas = {
  monedas: [],
};
