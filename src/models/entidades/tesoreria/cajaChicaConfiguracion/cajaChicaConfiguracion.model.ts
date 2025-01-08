import { IPuntoVenta } from "../../empresa";

export interface ICajaChicaConfiguracion {
  id: number;
  descripcion: string;
  puntoVentaId: string;
  isActivo: boolean;
}

export const defaultCajaChicaConfiguracion: ICajaChicaConfiguracion = {
  id: 0,
  descripcion: "",
  puntoVentaId: "",
  isActivo: true,
};

export interface ICajaChicaConfiguracionTablas {
  puntosVenta: IPuntoVenta[];
}

export const defaultCajaChicaConfiguracionTablas: ICajaChicaConfiguracionTablas = {
  puntosVenta: [],
};

export interface ICajaChicaConfiguracionFilter {
  descripcion: string;
}

export const defaultCajaChicaConfiguracionFilter: ICajaChicaConfiguracionFilter = {
  descripcion: "",
};

export interface ICajaChicaConfiguracionTable {
  descripcion: string;
  id: number;
  isActivo: boolean;
}
