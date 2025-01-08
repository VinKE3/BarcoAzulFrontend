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

export interface ICuentaPorCobrar {
  id: string;
  empresaId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  fechaEmision: string;
  fechaVencimiento: string;
  monedaId: string;
  clienteId: string;
  clienteNombre: string;
  montoDetraccion: number;
  total: number;
  abonado: number;
  saldo: number;
  observacion: string;
  abonos: IAbonos2[];
  tipoDocumento: ITipoDocumentoIdentidad;
  cliente: ICuentaPorPagarCliente;
  moneda: IMoneda;
}

export interface ICuentaPorPagarCliente {
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
  observacion: string | null;
  codigoEstablecimiento: string | null;
  isAgenteRetencion: false;
  direccionPrincipalId: string | null;
}

export const defaultCuentaPorPagarCliente: ICuentaPorPagarCliente = {
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
  observacion: null,
  codigoEstablecimiento: null,
  isAgenteRetencion: false,
  direccionPrincipalId: null,
};

export const defaultCuentaPorCobrar: ICuentaPorCobrar = {
  id: "",
  empresaId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaVencimiento: format(new Date(), "yyyy-MM-dd"),
  monedaId: "",
  clienteId: "",
  clienteNombre: "",
  montoDetraccion: 0,
  total: 0,
  abonado: 0,
  saldo: 0,
  observacion: "",
  abonos: [],
  tipoDocumento: defaultTipoDocumentoIdentidad,
  cliente: defaultCuentaPorPagarCliente,
  moneda: defaultMoneda,
};

export interface ICuentaPorCobrarFilter extends IDocumentoFilter {
  clienteNombre: string;
  isCancelado: string;
}

export const defaultCuentaPorCobrarFilter: ICuentaPorCobrarFilter = {
  ...defaultDocumentoFilter,
  clienteNombre: "",
  isCancelado: "",
};

export interface ICuentaPorCobrarTablas {
  tiposDocumento: ICombo[];
  monedas: IMoneda[];
}

export const defaultCuentaPorCobrarTablas: ICuentaPorCobrarTablas = {
  tiposDocumento: [],
  monedas: [],
};

export interface ICuentaPorCobrarTable {
  id: string;
  clienteNombre: string;
  numeroDocumento: string;
  fechaEmision: string;
  monedaId: string;
  montoDetraccion: number;
  total: number;
  abonado: number;
  saldo: number;
  isCancelado: boolean;
}

export interface IAbonos2 {
  abonoId: number;
  fecha: string;
  concepto: string;
  monedaId: string;
  tipoCambio: number;
  monto: number;
  tipoCobroId: string;
  tipoCobroDescripcion: string;
}
