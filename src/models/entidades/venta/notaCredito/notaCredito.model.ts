import {
  defaultCabeceraVenta,
  defaultDetalleVenta,
  defaultDocumentoFilter,
  ICabeceraVenta,
  ICombo,
  IDetalleVenta,
  IDocumentoFilter,
  IMoneda,
  ISerie,
} from "../../../global";
import { ICuentaBancaria, ITipoPago, ITipoVenta } from "../../mantenimiento";

//#region Cabecera
export interface INotaCredito extends ICabeceraVenta {
  pedidoId: string | null;
  pedidoNumero: string | null;
  proveedorId: string | null;
  usarCodigoBarras: boolean;
  numeroDocumento: string | null;

  documentoReferenciaId: string | null;
  tipoDocumentoReferenciaId: string | null;
  documentoReferencia: string | null;
  fechaDocumentoReferencia: string | null;
  motivoNotaId: string | null;
  motivoSustento: string | null;

  detalles: INotaCreditoDetalle[];
}
export const defaultNotaCredito: INotaCredito = {
  ...defaultCabeceraVenta,
  tipoDocumentoId: "07",

  pedidoId: null,
  pedidoNumero: null,

  proveedorId: null,
  usarCodigoBarras: false,
  numeroDocumento: null,
  documentoReferenciaId: null,
  tipoDocumentoReferenciaId: null,
  documentoReferencia: null,
  fechaDocumentoReferencia: null,
  motivoNotaId: null,
  motivoSustento: null,

  detalles: [],
};
//#endregion

//#region Detalle
export interface INotaCreditoDetalle extends IDetalleVenta {}
export const defaultNotaCreditoDetalle: INotaCreditoDetalle = {
  ...defaultDetalleVenta,
};
//#endregion

//#region FormularioTablas
export interface INotaCreditoTablas {
  tiposDocumento: ICombo[];
  series: ISerie[];
  tiposDocumentoReferencia: ICombo[];
  motivosNotaCredito: ICombo[];
  tiposPago: ITipoPago[];
  tiposVenta: ITipoVenta[];
  tiposAfectacionIGV: ICombo[];
  cuentasBancarias: ICuentaBancaria[];
  monedas: IMoneda[];
}
export const defaultNotaCreditoTablas: INotaCreditoTablas = {
  tiposDocumento: [],
  series: [],
  tiposDocumentoReferencia: [],
  motivosNotaCredito: [],
  tiposPago: [],
  tiposVenta: [],
  tiposAfectacionIGV: [],
  cuentasBancarias: [],
  monedas: [],
};
//#endregion

//#region Filtro
export interface INotaCreditoFilter extends IDocumentoFilter {
  vendedorId: string;
}
export const defaultNotaCreditoFilter: INotaCreditoFilter = {
  ...defaultDocumentoFilter,
  vendedorId: "",
};

export interface INotaCreditoFilterTablas {
  vendedores: ICombo[];
}
export const defaultNotaCreditoFilterTablas: INotaCreditoFilterTablas = {
  vendedores: [],
};
//#endregion

//#region Table
export interface INotaCreditoTable {
  clienteNombre: string;
  documentoReferencia: string;
  fechaEmision: string;
  horaEmision: string;
  id: string;
  isActualizado: boolean;
  isAnulado: boolean;
  montoIGV: number;
  numeroDocumento: string;
  numeroPedido: string;
  ruc: string;
  tipoDocumentoDescripcion: string;
  total: number;
  totalBruto: number;
  totalInafecto: number;
}
//#endregion
