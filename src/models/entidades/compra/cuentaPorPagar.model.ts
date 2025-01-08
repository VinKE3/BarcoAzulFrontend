import {
  ICombo,
  IDocumentoFilter,
  IMoneda,
  ITipoDocumentoIdentidad,
  defaultDocumentoFilter,
  defaultMoneda,
  defaultTipoDocumentoIdentidad,
} from "../..";
import { format } from "date-fns";

export interface ICuentaPorPagar {
  id: string;
  empresaId: string;
  proveedorId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  clienteId: string;
  fechaContable: string;
  monedaId: string;
  total: number;
  abonado: number;
  saldo: number;
  observacion: string;
  abonos: IAbonos[];
  tipoDocumento: ITipoDocumentoIdentidad;
  proveedor: ICuentaPorPagarProveedor;
  moneda: IMoneda;
}

export interface ICuentaPorPagarProveedor {
  id: string;
  tipoDocumentoIdentidadId: string | null;
  numeroDocumentoIdentidad: string;
  nombre: string;
  telefono: string | null;
  celular: string | null;
  correoElectronico: string | null;
  direccionPrincipal: string | null;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  condicion: string;
  estado: string;
  observacion: string | null;
}
export const defaultCuentaPorPagarProveedor: ICuentaPorPagarProveedor = {
  id: "",
  tipoDocumentoIdentidadId: null,
  numeroDocumentoIdentidad: "",
  nombre: "",
  telefono: null,
  celular: null,
  correoElectronico: null,
  direccionPrincipal: null,
  departamentoId: "",
  provinciaId: "",
  distritoId: "",
  condicion: "",
  estado: "",
  observacion: null,
};

export const defaultCuentaPorPagar: ICuentaPorPagar = {
  id: "",
  empresaId: "",
  proveedorId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  clienteId: "",
  fechaContable: format(new Date(), "yyyy-MM-dd"),
  monedaId: "",
  total: 0,
  abonado: 0,
  saldo: 0,
  observacion: "",
  abonos: [],
  moneda: defaultMoneda,
  tipoDocumento: defaultTipoDocumentoIdentidad,
  proveedor: defaultCuentaPorPagarProveedor,
};

export interface ICuentaPorPagarFilter extends IDocumentoFilter {
  proveedorNombre: string;
  isCancelado: string;
}

export const defaultCuentaPorPagarFilter: ICuentaPorPagarFilter = {
  ...defaultDocumentoFilter,
  proveedorNombre: "",
  isCancelado: "",
};

export interface ICuentaPorPagarTablas {
  tiposDocumento: ICombo[];
  monedas: IMoneda[];
}

export const defaultCuentaPorPagarTablas: ICuentaPorPagarTablas = {
  tiposDocumento: [],
  monedas: [],
};

export interface ICuentaPorPagarTable {
  id: string;
  proveedorNombre: string;
  numeroDocumento: string;
  fechaContable: string;
  monedaId: string;
  total: number;
  abonado: number;
  saldo: number;
  isCancelado: boolean;
}

export interface IAbonos {
  abonoId: number;
  fecha: string;
  concepto: string;
  monedaId: string;
  tipoCambio: number;
  monto: number;
  montoPEN: number;
  montoUSD: number;
  tipoPagoId: string;
  tipoPagoDescripcion: string;
}

export const defaultAbonos: IAbonos = {
  abonoId: 0,
  fecha: format(new Date(), "yyyy-MM-dd"),
  concepto: "",
  monedaId: "",
  tipoCambio: 0,
  monto: 0,
  montoPEN: 0,
  montoUSD: 0,
  tipoPagoId: "",
  tipoPagoDescripcion: "",
};
