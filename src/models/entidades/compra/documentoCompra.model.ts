import {
  ICombo,
  IDocumentoFilter,
  defaultDocumentoFilter,
  IMoneda,
} from "../../global";
import { format } from "date-fns";

export interface IDocumentoCompra {
  id: string;
  empresaId: string;
  proveedorId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  clienteId: string;
  fechaEmision: string;
  fechaContable: string;
  fechaVencimiento: string;
  proveedorNombre: string;
  proveedorNumeroDocumentoIdentidad: string;
  proveedorDireccion: string;
  tipoCompraId: string;
  monedaId: string;
  tipoCambio: number;
  tipoPagoId: string;
  numeroOperacion: string;
  cuentaCorrienteId: string;
  documentoReferenciaId: string;
  abonar: boolean;
  motivoNotaId: string;
  motivoSustento: string;
  guiaRemision: string;
  observacion: string;
  subTotal: number;
  porcentajeIGV: number;
  montoIGV: number;
  totalNeto: number;
  total: number;
  incluyeIGV: boolean;
  afectarStock: boolean;
  afectarPrecio: boolean;
  detalles: IDocumentoCompraDetalle[];
}

export interface IDocumentoCompraDetalle {
  detalleId: number;
  lineaId: string;
  subLineaId: string;
  articuloId: string;
  unidadMedidaId: string;
  marcaId: number;
  descripcion: string;
  codigoBarras: string;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
  montoIGV: number;
  importe: number;
  presentacion: string;
  unidadMedidaDescripcion: string;
  cantidadPendiente: number;
}

export const defaultDocumentoCompra: IDocumentoCompra = {
  id: "",
  empresaId: "",
  proveedorId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  clienteId: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaContable: format(new Date(), "yyyy-MM-dd"),
  fechaVencimiento: format(new Date(), "yyyy-MM-dd"),
  proveedorNombre: "",
  proveedorNumeroDocumentoIdentidad: "",
  proveedorDireccion: "",
  tipoCompraId: "",
  monedaId: "",
  tipoCambio: 0,
  tipoPagoId: "",
  numeroOperacion: "",
  cuentaCorrienteId: "",
  documentoReferenciaId: "",
  abonar: false,
  motivoNotaId: "",
  motivoSustento: "",
  guiaRemision: "",
  observacion: "",
  subTotal: 0,
  porcentajeIGV: 0,
  montoIGV: 0,
  totalNeto: 0,
  total: 0,
  incluyeIGV: false,
  afectarStock: false,
  afectarPrecio: false,
  detalles: [],
};

export interface IDocumentoCompraFilter extends IDocumentoFilter {
  proveedor: string;
}

export const defaultDocumentoCompraFilter: IDocumentoCompraFilter = {
  ...defaultDocumentoFilter,
  proveedor: "",
};

export interface ITiposPago {
  id: string;
  tipoVentaCompraId: string;
  descripcion: string;
  abreviatura: string;
  plazo: number;
}

export interface IDocumentoCompraPorcentajes {
  porcentaje: number;
  default: boolean;
}

export interface IMotivosNota {
  id: string;
  tipoDocumentoId: string;
  descripcion: string;
}

export interface IDocumentoCompraCuentaCorriente {
  id: string;
  empresaId: string;
  cuentaCorrienteId: string;
  numero: string;
  entidadBancariaNombre: string;
  entidadBancariaTipo: string;
  tipoCuentaDescripcion: string;
  monedaId: string;
  saldoFinal: number;
}

export interface IDocumentoCompraPendiente {
  id: string;
  fechaContable: string;
  numeroDocumento: string;
  proveedorNombre: string;
  monedaId: string;
  total: number;
}
export interface IDocumentoCompraTablas {
  tiposDocumento: ICombo[];
  tiposCompra: ICombo[];
  tiposPago: ITiposPago[];
  monedas: IMoneda[];
  porcentajesIGV: IDocumentoCompraPorcentajes[];
  porcentajesPercepcion: IDocumentoCompraPorcentajes[];
  motivosNota: IMotivosNota[];
  cuentasCorrientes: IDocumentoCompraCuentaCorriente[];
}

export const defaultDocumentoCompraTablas: IDocumentoCompraTablas = {
  tiposDocumento: [],
  tiposCompra: [],
  tiposPago: [],
  monedas: [],
  porcentajesIGV: [],
  porcentajesPercepcion: [],
  motivosNota: [],
  cuentasCorrientes: [],
};

export interface IDocumentoCompraTable {
  id: string;
  fechaContable: string;
  fechaEmision: string;
  numeroDocumento: string;
  proveedorNombre: string;
  proveedorNumero: string;
  monedaId: string;
  total: number;
  isCancelado: boolean;
  isBloqueado: boolean;
  afectarStock: boolean;
}
