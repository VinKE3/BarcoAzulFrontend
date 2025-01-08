import { IPersonal } from "../personal.model";

export interface IUsuario {
  id: string;
  nick: string;
  tipoUsuarioId: string;
  observacion: string | null;
  isActivo: boolean;
  habilitarAfectarStock: boolean;
  reaperturaCerrarCuadre: boolean;
  editarFechaPedidoVenta: boolean;
  habilitarTipoCambio:  boolean;
  clave: string;
  claveConfirmacion: string;
  personalId: string | null;
  bloquearPrecioEnVentas: boolean;
  bloquearCampoAlmacen: boolean;
  bloquearFechaEmision: boolean;
}

export const defaultUsuario: IUsuario = {
  id: "",
  nick: "",
  tipoUsuarioId: "NO", //Usuario no configurado
  observacion: null,
  isActivo: true,
  habilitarAfectarStock: false,
  reaperturaCerrarCuadre: false,
  editarFechaPedidoVenta: false,
  habilitarTipoCambio: false,
  clave: "",
  claveConfirmacion: "",
  personalId: "",
  bloquearCampoAlmacen: false,
  bloquearPrecioEnVentas: false,
  bloquearFechaEmision: false,
};

export interface IUsuarioTablas {
  personal: IPersonal[];
}

export const defaultUsuarioTablas: IUsuarioTablas = {
  personal: [],
};
export interface IUsuarioFilter {
  nick: string;
}

export const defaultUsuarioFilter: IUsuarioFilter = {
  nick: "",
};

export interface IUsuarioTable {
  id: string;
  isActivo: boolean;
  nick: string;
  tipoUsuarioDescripcion: string;
  fechaInicio: string;
  fechaModificacion: string;
}
