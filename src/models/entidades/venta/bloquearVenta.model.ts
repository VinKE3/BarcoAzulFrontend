import { defaultDocumentoFilter, ICombo, IDocumentoFilter } from "../../global";

export interface IBloquearVenta {
  id: string;
  isBloqueado: boolean;
}

export const defaultBloquearVenta: IBloquearVenta = {
  id: "",
  isBloqueado: false,
};

export interface IBloquearVentas {
  isBloqueado: boolean;
  ids: string[];
}

export interface IBloquearVentaTablas {
  tiposDocumentos: ICombo[];
}

export const defaultBloquearVentaTablas: IBloquearVentaTablas = {
  tiposDocumentos: [],
};
export interface IBloquearVentaFilter extends IDocumentoFilter {
  tipoDocumentoId: string;
}

export const defaultBloquearVentaFilter: IBloquearVentaFilter = {
  ...defaultDocumentoFilter,
  tipoDocumentoId: "",
};

export interface IBloquearVentaTable {
  id: string;
  isBloqueado: boolean;
}

export interface IBloquearVentaTable {
  id: string;
  numeroDocumento: string;
  fechaEmision: string;
  clienteNombre: string;
  clienteNumero: string;
  monedaId: string;
  total: number;
  isBloqueado: boolean;
}
