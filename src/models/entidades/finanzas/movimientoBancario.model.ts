import { IDocumentoCompraCuentaCorriente } from "..";
import { ICombo, IDocumentoFilter, defaultDocumentoFilter } from "../..";
import { CrudType } from "../../types";
import { format } from "date-fns";
export interface IMovimientoBancario {
  id: string;
  empresaId: string;
  cuentaCorrienteId: string;
  fechaEmision: string;
  tipoCambio: number;
  tipoMovimientoId: string;
  tipoOperacionId: string;
  numeroOperacion: string;
  isCierreCaja: true;
  tipoBeneficiarioId: string;
  clienteProveedorId: string;
  clienteProveedorNombre: string;
  concepto: string;
  documentoReferencia: string;
  tieneDetraccion: true;
  porcentajeITF: number;
  montoITF: number;
  montoInteres: number;
  monto: number;
  total: number;
  tieneCuentaDestino: true;
  cuentaDestinoId: string;
  monedaId: string;
  detalles: IMovimientoBancarioDetalle[];
}

export const defaultMovimientoBancario: IMovimientoBancario = {
  id: "",
  empresaId: "",
  cuentaCorrienteId: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  tipoCambio: 0,
  tipoMovimientoId: "",
  tipoOperacionId: "",
  numeroOperacion: "",
  isCierreCaja: true,
  tipoBeneficiarioId: "",
  clienteProveedorId: "",
  clienteProveedorNombre: "",
  concepto: "",
  documentoReferencia: "",
  tieneDetraccion: true,
  porcentajeITF: 0,
  montoITF: 0,
  montoInteres: 0,
  monto: 0,
  total: 0,
  tieneCuentaDestino: true,
  cuentaDestinoId: "",
  monedaId: "",
  detalles: [],
};

export interface IMovimientoBancarioDetalle {
  tipo: CrudType;
  detalleId: number;
  documentoVentaCompraId: string;
  documentoVentaCompraFechaEmision: string;
  concepto: string;
  abono: number;
  saldo: number;
  documentoRelacionado: string;
}

export const defaultMovimientoBancarioDetalle: IMovimientoBancarioDetalle = {
  tipo: "registrar",
  detalleId: 0,
  documentoVentaCompraId: "",
  documentoVentaCompraFechaEmision: format(new Date(), "yyyy-MM-dd"),
  concepto: "",
  abono: 0,
  saldo: 0,
  documentoRelacionado: "",
};

export interface IMovimientoBancarioTablas {
  cuentasCorrientes: IDocumentoCompraCuentaCorriente[];
  tiposMovimiento: ICombo[];
  tiposOperacion: ICombo[];
}

export const defaultMovimientoBancarioTablas: IMovimientoBancarioTablas = {
  cuentasCorrientes: [],
  tiposMovimiento: [],
  tiposOperacion: [],
};

export interface IMovimientoBancarioFilter extends IDocumentoFilter {
  cuentaCorrienteId: string;
  concepto: string;
}

export const defaultMovimientoBancarioFilter: IMovimientoBancarioFilter = {
  ...defaultDocumentoFilter,
  cuentaCorrienteId: "",
  concepto: "",
};

export interface IMovimientoBancarioTable {
  id: string;
  cuentaBancaria: string;
  fechaEmision: string;
  tipoMovimientoId: string;
  tipoOperacionId: string;
  numeroOperacion: string;
  clienteProveedorNombre: string;
  concepto: string;
  monto: number;
  itf: number;
  total: number;
  isBloqueado: boolean;
}
