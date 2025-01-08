import { ICombo } from "../../global";

export interface IPuntoVentaAlmacen {
  id: number;
  puntoVentaId: string;
  almacenId: string;
  isDefault: boolean;
  puntoVentaDescripcion: string;
  almacenDescripcion: string;
}

export const defaultPuntoVentaAlmacen: IPuntoVentaAlmacen = {
  id: 0,
  puntoVentaId: "",
  almacenId: "",
  isDefault: false,
  puntoVentaDescripcion: "",
  almacenDescripcion: "",
};

export interface IPuntoVentaAlmacenTablas {
  almacenes: ICombo[];
}

export const defaultPuntoVentaAlmacenTablas: IPuntoVentaAlmacenTablas = {
  almacenes: [],
};
