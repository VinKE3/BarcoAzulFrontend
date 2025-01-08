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
import {
  defaultUsuarioConfiguracion,
  ICuentaBancaria,
  ITipoPago,
  ITipoVenta,
  IUsuarioConfiguracion,
} from "../../mantenimiento";
import { IDocumentoVentaPedido } from "./documentoVentaPedido.model";

export interface IDocumentoVenta extends Omit<ICabeceraVenta, "tipoPagoId"> {
  clienteTipoDocumentoIdentidadId: string;

  tipoPagoId: string | null; // Redefinimos tipoPagoId
  //No se usan
  proveedorId: string | null;
  motivoNotaId: string | null;
  motivoSustento: string | null;
  documentoReferenciaId: string | null;
  fechaDocumentoReferencia: string | null;
  numeroDocumento: string | null;
  //No se usan

  //Adjunto
  pedidos: IDocumentoVentaPedido[];
  //Adjunto
  detalles: IDocumentoVentaDetalle[];
}

export const defaultDocumentoVenta: IDocumentoVenta = {
  ...defaultCabeceraVenta,
  clienteTipoDocumentoIdentidadId: "",

  //No se usan
  proveedorId: null,
  numeroDocumento: null,
  motivoNotaId: null,
  documentoReferenciaId: null,
  motivoSustento: null,
  fechaDocumentoReferencia: null,
  //No se usan

  //Adjunto
  pedidos: [],
  //Adjunto
  detalles: [],
};

export interface IDocumentoVentaDetalle extends IDetalleVenta {
  unidadMedida: string;
}

export const defaultDocumentoVentaDetalle: IDocumentoVentaDetalle = {
  ...defaultDetalleVenta,
  unidadMedida: "",
};

export interface IDocumentoVentaTablas {
  tiposDocumento: ICombo[];
  series: ISerie[];
  tiposVenta: ITipoVenta[];
  tiposPago: ITipoPago[];
  monedas: IMoneda[];
  cuentasBancarias: ICuentaBancaria[];
  usuarioConfiguracion: IUsuarioConfiguracion;
  tiposAfectacionIGV: ICombo[];
}

export const defaultDocumentoVentaTablas: IDocumentoVentaTablas = {
  tiposDocumento: [],
  series: [],
  tiposPago: [],
  tiposVenta: [],
  cuentasBancarias: [],
  monedas: [],
  usuarioConfiguracion: defaultUsuarioConfiguracion,
  tiposAfectacionIGV: [],
};

export interface IDocumentoVentaFilter extends IDocumentoFilter {
  vendedorId: string;
}

export const defaultDocumentoVentaFilter: IDocumentoVentaFilter = {
  ...defaultDocumentoFilter,
  vendedorId: "",
};

export interface IDocumentoVentaFilterTablas {
  vendedores: ICombo[];
}

export const defaultDocumentoVentaFilterTablas: IDocumentoVentaFilterTablas = {
  vendedores: [],
};

export interface IDocumentoVentaTable {
  id: string;
  tipoDocumentoDescripcion: string;
  numeroDocumento: string;
  numerosPedido: string;
  clienteNombre: string;
  clienteNumeroDocumentoIdentidad: string;
  documentoReferencia: string;
  fechaEmision: string;
  horaEmision: string;
  isActualizado: boolean;
  isAnulado: boolean;
  total: number;
}
