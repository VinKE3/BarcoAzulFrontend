import { ICombo } from "../../../global";

export interface ICajaChicaConfiguracionUsuario {
    id: number;
    cajaChicaConfiguracionId: number;
    usuarioId: string;
    usuarioNombre: string | null;
  }
  
  export const defaultCajaChicaConfiguracionUsuario: ICajaChicaConfiguracionUsuario = {
    id: 0,
    cajaChicaConfiguracionId: 0,
    usuarioId: "",
    usuarioNombre: "",
  };
  
  export interface ICajaChicaConfiguracionUsuarioTablas {
    usuarios: ICombo[];
  }
  
  export const defaultCajaChicaConfiguracionUsuarioTablas: ICajaChicaConfiguracionUsuarioTablas = {
    usuarios: [],
  };

  export interface ICajaChicaConfiguracionUsuarioTable {
    cajaChicaConfiguracionId: number;
    id: number;
    usuarioId: string;
    usuarioNombre: string;
  }
  