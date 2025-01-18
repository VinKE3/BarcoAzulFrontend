import { IDocumentoFilter, defaultDocumentoFilter } from "../../global";

export interface IDocumentoVentaFindModal {
  inputFocus: string;
}

export interface IDocumentoVentaFindFilter extends IDocumentoFilter {
  clienteNombre: string;
}

export const defaultDocumentoVentaFindFilter: IDocumentoVentaFindFilter = {
  ...defaultDocumentoFilter,
  clienteNombre: "",
};

export interface IDocumentoVentaFind extends IDocumentoVentaFindTable {
  origen: string;
}
export interface IDocumentoVentaFindTable {
  id: string;
  fechaEmision: string;
  numeroDocumento: string;
  clienteNombre: string;
  clienteNumero: string;
  guiaRemision: string;
  notaPedido: string;
  monedaId: string;
  total: number;
  isCancelado: boolean;
  afectarStock: boolean;
  isAnulado: boolean;
  isBloqueado: boolean;
  personal: string;
  estadoSUNAT: string;
}
