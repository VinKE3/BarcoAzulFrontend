import { CrudType } from "../../../types";

export interface IGuiaRemisionVehiculo {
  tipo: CrudType; //Lo que retorna actionbar

  item: number;
  numeroPlaca: string | null;
  marca: string | null;
}

export const defaultGuiaRemisionVehiculo: IGuiaRemisionVehiculo = {
  tipo: "registrar",

  item: 0,
  numeroPlaca: null,
  marca: null,
};