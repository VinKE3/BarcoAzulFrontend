import { defaultDocumentoFilter, ICombo, IDocumentoFilter } from "../../global";

export interface IBloquearCompra {
  id: string;
  isBloqueado: boolean;
}

export const defaultBloquearCompra: IBloquearCompra = {
  id: "",
  isBloqueado: false,
};

export interface IBloquearCompras {
  isBloqueado: boolean;
  ids: string[];
}

export interface IBloquearCompraTablas {
  tiposDocumentos: ICombo[];
}

export const defaultBloquearCompraTablas: IBloquearCompraTablas = {
  tiposDocumentos: [],
};
export interface IBloquearCompraFilter extends IDocumentoFilter {
  tipoDocumentoId: string;
}

export const defaultBloquearCompraFilter: IBloquearCompraFilter = {
  ...defaultDocumentoFilter,
  tipoDocumentoId: "",
};

export interface IBloquearCompraTable {
  id: string;
  isBloqueado: boolean;
}

export interface IBloquearCompraTable {
  id: string;
  numeroDocumento: string;
  fechaContable: string;
  proveedorNombre: string;
  proveedorNumero: string;
  monedaId: string;
  total: number;
  isBloqueado: boolean;
}
