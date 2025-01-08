import { defaultPermisoCrud, IPermisoCrud } from "./permisoCrud.model";

export interface IPermisos extends IPermisoCrud {
  menuId: string;
  usuarioId: string;
}
export const defaultPermisos: IPermisos = {
  ...defaultPermisoCrud,
  menuId: "",
  usuarioId: "",
};

export const adminPermisos: IPermisos = {
  menuId: "",
  usuarioId: "",
  registrar: true,
  modificar: true,
  eliminar: true,
  consultar: true,
  anular: false,
};
