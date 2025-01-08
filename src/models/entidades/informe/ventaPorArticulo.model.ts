import { format, startOfMonth } from "date-fns";
import { ICombo, IMoneda } from "../../global";

export interface IVentaPorArticulo {
  monedaId: string;
  fechaInicio: string;
  fechaFin: string;
  articuloId: string;
  articuloNombre: string;
  vendedorId: string;
  almacenId: string;
}

export const defaultVentaPorArticulo: IVentaPorArticulo = {
  monedaId: "S",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  articuloId: "",
  articuloNombre: "",
  vendedorId: "",
  almacenId: "",
};

export interface IVentaPorArticuloTablas {
  monedas: IMoneda[];
  vendedores: ICombo[];
  almacenes: ICombo[];
}

export const defaultVentaPorArticuloTablas: IVentaPorArticuloTablas = {
  monedas: [],
  vendedores: [],
  almacenes: [],
};
