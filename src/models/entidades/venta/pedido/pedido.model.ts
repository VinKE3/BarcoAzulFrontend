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
import { defaultUsuarioConfiguracion, ITipoPago, ITipoVenta, IUsuarioConfiguracion } from "../../mantenimiento";
import { defaultPedidoDelivery, IPedidoDelivery } from "./pedidoDelivery.model";

//#region Cabecera
export interface IPedido extends Omit<ICabeceraVenta, "tipoPagoId"> {
  tipoDocumentoVentaId: string;
  tipoPedidoId: string;
  tipoPagoId: string | null; // Redefinimos tipoPagoId

  clienteTipoDocumentoIdentidadId: string | null;

  // No se usan
  numeroDocumento: string | null;
  usarCodigoBarras: boolean;
  // No se usan

  delivery: IPedidoDelivery;
  detalles: IPedidoDetalle[];
}
export const defaultPedido: IPedido = {
  ...defaultCabeceraVenta,
  tipoDocumentoVentaId: "",
  tipoPedidoId: "",
  clienteTipoDocumentoIdentidadId: null,
  
  //No se usan
  numeroDocumento: null,
  usarCodigoBarras: false,
  //No se usan
  delivery: defaultPedidoDelivery,
  detalles: [],
};
//#endregion

//#region Detalle
export interface IPedidoDetalle extends IDetalleVenta {
  unidadMedida: string;
}
export const defaultPedidoDetalle: IPedidoDetalle = {
  ...defaultDetalleVenta,
  unidadMedida: "",
};
//#endregion

//#region FormularioTablas
export interface IPedidoTablas {
  tiposDocumento: ICombo[];
  tiposDocumentoVenta: ICombo[];
  series: ISerie[];
  tiposVenta: ITipoVenta[];
  tiposPago: ITipoPago[];
  monedas: IMoneda[];
  usuarioConfiguracion: IUsuarioConfiguracion;
  tiposAfectacionIGV: ICombo[];
  vendedores: ICombo[];
}
export const defaultPedidoTablas: IPedidoTablas = {
  tiposDocumento: [],
  tiposDocumentoVenta: [],
  series: [],
  tiposVenta: [],
  tiposPago: [],
  monedas: [],
  usuarioConfiguracion: defaultUsuarioConfiguracion,
  tiposAfectacionIGV: [],
  vendedores: [],
};
//#endregion

//#region Filter
export interface IPedidoFilter extends IDocumentoFilter {
  vendedorId: string;
}
export const defaultPedidoFilter: IPedidoFilter = {
  ...defaultDocumentoFilter,
  vendedorId: "",
};

export interface IPedidoFilterTablas {
  vendedores: ICombo[];
}
export const defaultPedidoFilterTablas: IPedidoFilterTablas = {
  vendedores: [],
};
//#endregion

//#region Table
export interface IPedidoTable {
  id: string;
  numeroDocumento: string;
  numeroDocumentoVenta: string;

  tipoPedidoId: string;
  fechaEmision: string;
  horaEmision: string;

  clienteNombre: string;
  clienteNumeroDocumentoIdentidad: string;

  monedaId: string;
  total: number;
  isAnulado: boolean;
  isAprobado: boolean;
}
//#endregion
