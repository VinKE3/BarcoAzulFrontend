import { IPermisos, defaultPermisos } from "../../../context";
import { ICombo } from "../../../global";

export interface IUsuarioPermisos {
  usuarioId: string;
  tipoUsuarioId: string;
  menuId: string;
  menuNombre: string;
  permisos: IPermisos[];
}

export const defaultUsuarioPermisos: IUsuarioPermisos = {
  usuarioId: "",
  tipoUsuarioId: "",
  menuId: "",
  menuNombre: "",
  permisos: [defaultPermisos],
};

export interface IUsuarioPermisoTablas {
  tiposUsuario: ICombo[];
}

export const defaultUsuarioPermisoTablas: IUsuarioPermisoTablas = {
  tiposUsuario: [],
};

export interface IUsuarioMenu {
  id: string;
  nombre: string;
  isActivo: boolean;
  sistemaAreaId: number;
  sistemaAreaNombre: string;
}

export interface IMenuList {
  nombre: string;
  items: IUsuarioMenu[];
}
