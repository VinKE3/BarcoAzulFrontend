import {
  IDocumentoVentaDetalle,
  IGuiaRemisionDetalle,
  INotaCreditoDetalle,
  IOrdenCompraDetalle,
  IPedidoDetalle,
  ITransferenciaDetalle,
} from "../../entidades";

export interface ILoteFindModal {
  almacenId: string;
  detalle:
    | IDocumentoVentaDetalle
    | IPedidoDetalle
    | INotaCreditoDetalle
    | IGuiaRemisionDetalle
    | IOrdenCompraDetalle
    | ITransferenciaDetalle;
  venta?: boolean;
  inputFocus: string;
}

export interface ILoteFindFilter {
  numero: string;
}

export const defaultLoteFindFilter: ILoteFindFilter = {
  numero: "",
};

export interface ILoteFind extends ILoteFindTable {
  origen: string;
}

export const defaultLoteFind: ILoteFind = {
  origen: "",
  articuloId: "",
  fechaVencimiento: "",
  habilitarParaVenta: true,
  id: "",
  loteId: "",
  numero: "",
  porDefecto: false,
  stockCajas: 0,
  stockUnidades: 0,
};

export interface ILoteFindTable {
  articuloId: string;
  fechaVencimiento: string;
  habilitarParaVenta: boolean;
  id: string;
  loteId: string;
  numero: string;
  porDefecto: boolean;
  stockCajas: number;
  stockUnidades: number;
}
