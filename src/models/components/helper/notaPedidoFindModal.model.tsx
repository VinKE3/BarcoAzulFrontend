import { format, startOfMonth } from "date-fns";
import { IDocumentoFilter, defaultDocumentoFilter } from "../../global";

export interface INotaPedidoFindModal {
  inputFocus: string;
}

export interface INotaPedidoFindFilter extends IDocumentoFilter {
  clienteNombre: string;
}

export const defaultNotaPedidoFindFilter: INotaPedidoFindFilter = {
  ...defaultDocumentoFilter,
  clienteNombre: "",
};

export interface INotaPedidoFind extends INotaPedidoFindTable {
  origen: string;
}

export interface INotaPedidoFindTable {
  clienteNombre: string;
  clienteNumero: string;
  documentoReferencia: string;
  fechaEmision: string;
  id: string;
  isAnulado: boolean;
  isBloqueado: boolean;
  isFacturado: boolean;
  monedaId: string;
  numeroDocumento: string;
  personalNombre: string;
  total: number;
}
