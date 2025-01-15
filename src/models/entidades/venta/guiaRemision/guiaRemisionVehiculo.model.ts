import { CrudType } from "../../../types";

export interface IGuiaRemisionVehiculo {
  tipo: CrudType; //Lo que retorna actionbar

  item: number;
  vehiculoCodigo: string;
  placa: string | null;
}

export const defaultGuiaRemisionVehiculo: IGuiaRemisionVehiculo = {
  tipo: "registrar",

  item: 0,
  vehiculoCodigo: "000",
  placa: null,
};
