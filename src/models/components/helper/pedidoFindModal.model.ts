import { defaultDocumentoFilter, IDocumentoFilter } from "../../global";

export interface IPedidoFindModal {
  inputFocus: string;
}

export interface IPedidoFindFilter extends IDocumentoFilter {}

export const defaultPedidoFindFilter: IPedidoFindFilter = {
  ...defaultDocumentoFilter,
};

export interface IPedidoFind extends IPedidoFindTable {
  origen: string;
}

export interface IPedidoFindTable {
  clienteNombre: string;
  fechaEmision: string;
  horaEmision: string;
  id: string;
  isAnulado: boolean;
  montoIGV: number;
  numeroDocumento: string;
  numeroDocumentoVenta: string;
  ruc: string;
  total: number;
  totalBruto: number;
  totalInafecto: number;
}
