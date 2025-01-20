import { CrudType } from "../../../types";

export interface IGuiaRemisionVehiculo {
  tipo: CrudType; //Lo que retorna actionbar

  item: number;
  vehiculoId: string;
  numeroPlaca: string | null;
}

export const defaultGuiaRemisionVehiculo: IGuiaRemisionVehiculo = {
  tipo: "registrar",

  item: 0,
  vehiculoId: "000",
  numeroPlaca: null,
};
