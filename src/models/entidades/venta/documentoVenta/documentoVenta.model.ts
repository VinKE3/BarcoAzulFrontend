import { format, startOfMonth } from "date-fns";
import {
  defaultCabeceraVenta,
  defaultDetalleVenta,
  defaultDocumentoFilter,
  ICabeceraVenta,
  ICombo,
  ICuentaCorrienteBancaria,
  IDetalleVenta,
  IDocumentoFilter,
  IMoneda,
  ISerie,
} from "../../../global";
import {
  defaultUsuarioConfiguracion,
  IClienteDireccion,
  ICuentaBancaria,
  IPersonal,
  ITipoPago,
  ITipoVenta,
  IUsuarioConfiguracion,
} from "../../mantenimiento";
import { IPorcentajesTable } from "../../empresa";
import { IMotivosNota, ITiposPago } from "../../compra";
import { IDocumentoVentaCuota } from "./documentoVentaCuota.model";

export interface IDocumentoVenta {
  id: string;
  empresaId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  fechaEmision: string;
  fechaVencimiento: string;
  fechaReferencia: string;
  cotizacion: string | null;
  cotizacionId: string | null;
  clienteId: string;
  clienteNombre: string;
  clienteTipoDocumentoIdentidadId: string | null;
  clienteNumeroDocumentoIdentidad: string | null;
  clienteDireccionId: number;
  clienteDireccion: string | null;
  personalId: string | null;
  letra: string | null;
  letraId: string | null;
  monedaId: string;
  tipoCambio: number; //maximum: 2147483647 minimum: 0.001
  tipoVentaId: string | null;
  tipoCobroId: string | null;
  numeroOperacion: string | null;
  cuentaCorrienteId: string | null;
  documentoReferenciaId: string | null;
  fechaDocumentoReferencia: string | null;
  abonar: boolean;
  motivoNotaId: string | null;
  motivoNotaDescripcion: string | null;
  motivoSustento: string | null;
  guiaRemision: string | null;
  numeroPedido: string | null;
  observacion: string | null;
  orden: string | null;
  isAnticipo: boolean;
  isOperacionGratuita: boolean;
  incluyeIGV: boolean;
  afectarStock: boolean;
  totalOperacionesInafectas: number;
  totalOperacionesGratuitas: number;
  subTotal: number;
  totalAnticipos: number;
  totalNeto: number;
  montoIGV: number;
  montoRetencion: number;
  montoDetraccion: number;
  montoImpuestoBolsa: number;
  total: number;
  abonado: number;
  saldo: number;
  porcentajeIGV: number;
  porcentajeRetencion: number;
  porcentajeDetraccion: number;
  factorImpuestoBolsa: number;
  detalles: IDocumentoVentaDetalle[];
  cuotas: IDocumentoVentaCuota[];
  numeroDocumento: string | null;
}

export const defaultDocumentoVenta: IDocumentoVenta = {
  id: "",
  empresaId: "",
  tipoDocumentoId: "FT",
  serie: "F001",
  numero: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaVencimiento: format(new Date(), "yyyy-MM-dd"),
  fechaReferencia: format(new Date(), "yyyy-MM-dd"),
  cotizacion: null,
  cotizacionId: null,
  clienteId: "",
  clienteNombre: "",
  clienteTipoDocumentoIdentidadId: null,
  clienteNumeroDocumentoIdentidad: null,
  clienteDireccionId: 0,
  clienteDireccion: null,
  personalId: null,
  letra: null,
  letraId: null,
  monedaId: "S",
  tipoCambio: 0,
  tipoVentaId: null,
  tipoCobroId: null,
  numeroOperacion: null,
  cuentaCorrienteId: null,
  documentoReferenciaId: null,
  fechaDocumentoReferencia: null,
  abonar: true,
  motivoNotaId: null,
  motivoNotaDescripcion: null,
  motivoSustento: null,
  guiaRemision: null,
  numeroPedido: null,
  observacion: null,
  orden: null,
  isAnticipo: false,
  isOperacionGratuita: false,
  incluyeIGV: true,
  afectarStock: false,
  totalOperacionesInafectas: 0,
  totalOperacionesGratuitas: 0,
  subTotal: 0,
  totalAnticipos: 0,
  totalNeto: 0,
  montoIGV: 0,
  montoDetraccion: 0,
  montoRetencion: 0,
  montoImpuestoBolsa: 0,
  total: 0,
  abonado: 0,
  saldo: 0,
  porcentajeIGV: 18,
  porcentajeRetencion: 0,
  porcentajeDetraccion: 0,
  factorImpuestoBolsa: 0,
  detalles: [],
  cuotas: [],
  numeroDocumento: null,
};

export interface IDocumentoVentaDetalle extends IDetalleVenta {
  unidadMedida: string;
}

export const defaultDocumentoVentaDetalle: IDocumentoVentaDetalle = {
  ...defaultDetalleVenta,
  unidadMedida: "",
};
export interface IDocumentoVentaPendiente {
  id: string;
  codigoPendiente: string;
  fechaContable: string;
  numeroDocumento: string;
  proveedorNombre: string;
  monedaId: string;
  total: number;
}

export interface IDocumentoVentaTablas {
  cuentasCorrientes: ICuentaCorrienteBancaria[];
  monedas: IMoneda[];
  porcentajesIGV: IPorcentajesTable[];
  series: ISerie[];
  tiposVenta: ICombo[];
  tiposCobro: ITiposPago[];
  vendedores: IPersonal[];
  tiposDocumento: ICombo[]; // Añadido
  direcciones: IClienteDireccion[]; //Añadido
  motivosNota: IMotivosNota[];
  documentosPendientes: IDocumentoVentaPendiente[];
}

export const defaultDocumentoVentaTablas: IDocumentoVentaTablas = {
  cuentasCorrientes: [],
  monedas: [],
  porcentajesIGV: [],
  series: [],
  tiposVenta: [],
  tiposCobro: [],
  vendedores: [],
  tiposDocumento: [],
  direcciones: [],
  motivosNota: [],
  documentosPendientes: [],
};

export interface IDocumentoVentaFilter extends IDocumentoFilter {
  clienteNombre: string;
}

export const defaultDocumentoVentaFilter: IDocumentoVentaFilter = {
  ...defaultDocumentoFilter,
  clienteNombre: "",
};

export interface IDocumentoVentaFilterTablas {
  vendedores: ICombo[];
}

export const defaultDocumentoVentaFilterTablas: IDocumentoVentaFilterTablas = {
  vendedores: [],
};

export interface IDocumentoVentaTable {
  id: string;
  fechaEmision: string;
  numeroDocumento: string;
  clienteNombre: string;
  clienteNumero: string;
  guiaRemision: string;
  notaPedido: string;
  monedaId: string;
  total: number;
  isCancelado: boolean;
  afectarStock: boolean;
  isAnulado: boolean;
  isBloqueado: boolean;
  personal: string;
  estadoSUNAT: string;
}
