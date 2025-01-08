import { IDocumentoVentaPedido, IPedido, IPedidoDetalle } from "../../entidades";

export interface IPedidosFindModal {
  pedidos: IDocumentoVentaPedido[];
  inputFocus: string;
}

export interface IPedidosFindRetorno {
  origen: string;
  pedido: IPedido;
  pedidos: IDocumentoVentaPedido[];
  detalles: IPedidoDetalle[];
}
