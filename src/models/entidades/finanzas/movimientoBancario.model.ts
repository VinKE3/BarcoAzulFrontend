import { IDocumentoCompraCuentaCorriente } from "..";
import {
  ICombo,
  ICuentaCorrienteBancaria,
  IDocumentoFilter,
  defaultDocumentoFilter,
} from "../..";
import { CrudType } from "../../types";
import { format } from "date-fns";
export interface IMovimientoBancario {
  id: string;
  empresaId: string;
  cuentaCorrienteId: string;
  fechaEmision: string;
  tipoCambio: number;
  tipoMovimientoId: string | null;
  tipoOperacionId: string | null;
  numeroOperacion: string | null;
  isCierreCaja: true;
  tipoBeneficiarioId: string | null;
  clienteProveedorId: string | null;
  clienteProveedorNombre: string | null;
  concepto: string | null;
  documentoReferencia: string | null;
  tieneDetraccion: true;
  porcentajeITF: number;
  montoITF: number;
  montoInteres: number;
  monto: number;
  total: number;
  tieneCuentaDestino: true;
  cuentaDestinoId: string | null;
  monedaId: string | null;
  detalles: IMovimientoBancarioDetalle[];
}

export const defaultMovimientoBancario: IMovimientoBancario = {
  id: "",
  empresaId: "",
  cuentaCorrienteId: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  tipoCambio: 0,
  tipoMovimientoId: null,
  tipoOperacionId: null,
  numeroOperacion: null,
  isCierreCaja: true,
  tipoBeneficiarioId: null,
  clienteProveedorId: null,
  clienteProveedorNombre: null,
  concepto: null,
  documentoReferencia: null,
  tieneDetraccion: true,
  porcentajeITF: 0,
  montoITF: 0,
  montoInteres: 0,
  monto: 0,
  total: 0,
  tieneCuentaDestino: true,
  cuentaDestinoId: null,
  monedaId: null,
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
  cuentasCorrientes: ICuentaCorrienteBancaria[];
  tiposMovimiento: ICombo[];
  tiposOperacion: ICombo[];
  tiposRazonSocial: ICombo[];
}

export const defaultMovimientoBancarioTablas: IMovimientoBancarioTablas = {
  cuentasCorrientes: [],
  tiposMovimiento: [],
  tiposOperacion: [],
  tiposRazonSocial: [],
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
