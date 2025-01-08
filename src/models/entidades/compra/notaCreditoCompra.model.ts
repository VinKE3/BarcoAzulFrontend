import {
  defaultCabeceraCompra,
  defaultDetalleVenta,
  defaultDocumentoFilter,
  ICabeceraCompra,
  ICombo,
  IDetalleVenta,
  IDocumentoFilter,
} from "../../global";
import { ITipoPago, ITipoVenta } from "../mantenimiento";

export interface INotaCreditoCompra extends Omit<ICabeceraCompra, "tipoPagoId"> {
  tipoDocumentoId: string;
  serie: string;
  numero: string;

  fechaEmision: string;

  tipoDocumentoReferencia: string | null;
  documentoReferenciaId: string;
  fechaDocumentoReferencia: string | null;

  tipoVentaId: string;
  tipoPagoId: string;
  observacion: string | null;

  motivoNotaId: string;
  motivoSustento: string | null;
  tipoId: string | null;
  clienteId: string | null;
  horaEmision: string | null;
  ruc: string | null;

  numeroDocumento: string | null;
  documentoReferencia: string | null;

  detalles: INotaCreditoCompraDetalle[];
}

export const defaultNotaCreditoCompra: INotaCreditoCompra = {
  ...defaultCabeceraCompra,
  tipoDocumentoId: "07",
  serie: "",
  numero: "",

  tipoDocumentoReferencia: null,
  documentoReferenciaId: "",
  fechaDocumentoReferencia: null,

  tipoVentaId: "",
  tipoPagoId: "",

  motivoNotaId: "",
  motivoSustento: null,
  tipoId: null,
  clienteId: null,
  horaEmision: null,
  ruc: null,

  numeroDocumento: null,
  documentoReferencia: null,

  detalles: [],
};

export interface INotaCreditoCompraDetalle extends Omit<IDetalleVenta, "medicoId"> {}

export const defaultNotaCreditoCompraDetalle: INotaCreditoCompraDetalle = {
  ...defaultDetalleVenta,
};

export interface INotaCreditoCompraTablas {
  tiposDocumento: ICombo[];
  tiposDocumentoReferencia: ICombo[];
  motivosNotaCredito: ICombo[];
  tiposPago: ITipoPago[];
  tiposVenta: ITipoVenta[];
}

export const defaultNotaCreditoCompraTablas: INotaCreditoCompraTablas = {
  tiposDocumento: [],
  tiposDocumentoReferencia: [],
  motivosNotaCredito: [],
  tiposPago: [],
  tiposVenta: [],
};

export interface INotaCreditoCompraFilter extends IDocumentoFilter {}

export const defaultNotaCreditoCompraFilter: INotaCreditoCompraFilter = {
  ...defaultDocumentoFilter,
};

export interface INotaCreditoCompraTable {
  clienteNombre: string;
  documentoReferencia: string;
  fechaEmision: string;
  horaEmision: string;
  id: string;
  isActualizado: boolean;
  isAnulado: boolean;
  numeroDocumento: string;
  ruc: string;
  total: number;
  totalBruto: number;
}
