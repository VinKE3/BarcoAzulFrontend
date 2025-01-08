import { format, startOfMonth } from "date-fns";
import { ICombo } from "../../global";

export interface IVentaAnulada {
  fechaInicio: string;
  fechaFin: string;
  vendedorId: string;
}

export const defaultVentaAnulada: IVentaAnulada = {
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  vendedorId: "",
};

export interface IVentaAnuladaTablas {
  vendedores: ICombo[];
}

export const defaultVentaAnuladaTablas: IVentaAnuladaTablas = {
  vendedores: [],
};
