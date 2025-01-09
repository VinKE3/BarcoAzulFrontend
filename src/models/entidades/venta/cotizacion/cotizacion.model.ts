import { format, startOfMonth } from "date-fns";
import { defaultDetalle, ICombo, IDetalle, IMoneda } from "../../../global";
import { IPorcentajesTable } from "../../empresa";
import { IClienteContacto, IClienteDireccion, IPersonal } from "../../mantenimiento";

export interface ICotizacion {
  id: string;
  empresaId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  fechaEmision: string;
  fechaVencimiento: string;
  clienteId: string;
  clienteNombre: string;
  clienteTipoDocumentoIdentidadId: string | null;
  clienteNumeroDocumentoIdentidad: string | null;
  clienteDireccionId: number;
  clienteDireccion: string | null;
  clienteTelefono: string | null;
  departamentoId: string | null;
  provinciaId: string | null;
  distritoId: string | null;
  contactoId: string | null;
  contactoNombre: string | null;
  contactoTelefono: string | null;
  contactoCorreoElectronico: string | null;
  contactoCargoId: number | null;
  contactoCargoDescripcion: string | null;
  contactoCelular: string | null;
  personalId: string | null;
  monedaId: string;
  tipoCambio: number;
  tipoVentaId: string | null;
  tipoCobroId: string | null;
  numeroOperacion: string | null;
  cuentaCorrienteDescripcion: string | null;
  validez: string | null;
  observacion: string | null;
  subTotal: number;
  montoIGV: number;
  totalNeto: number;
  montoRetencion: number;
  montoPercepcion: number;
  total: number;
  porcentajeIGV: number;
  porcentajeRetencion: number;
  porcentajePercepcion: number;
  incluyeIGV: boolean;
  detalles: ICotizacionDetalle[];
  numeroDocumento: string | null;
}

export const defaultCotizacion: ICotizacion = {
  id: "",
  empresaId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaVencimiento: format(new Date(), "yyyy-MM-dd"),
  clienteId: "",
  clienteNombre: "",
  clienteTipoDocumentoIdentidadId: null,
  clienteNumeroDocumentoIdentidad: null,
  clienteDireccionId: 0,
  clienteDireccion: null,
  clienteTelefono: null,
  departamentoId: null,
  provinciaId: null,
  distritoId: null,
  contactoId: null,
  contactoNombre: null,
  contactoTelefono: null,
  contactoCorreoElectronico: null,
  contactoCargoId: null,
  contactoCargoDescripcion: null,
  contactoCelular: null,
  personalId: null,
  monedaId: "",
  tipoCambio: 0,
  tipoVentaId: null,
  tipoCobroId: null,
  numeroDocumento: null,
  cuentaCorrienteDescripcion: null,
  validez: null,
  observacion: null,
  subTotal: 0,
  montoIGV: 0,
  totalNeto: 0,
  montoRetencion: 0,
  montoPercepcion: 0,
  total: 0,
  porcentajeIGV: 0,
  porcentajeRetencion: 0,
  porcentajePercepcion: 0,
  incluyeIGV: true,
  detalles: [],
  numeroOperacion: null,
};

export interface ICotizacionDetalle extends IDetalle {}

export const defaultCotizacionDetalle: ICotizacionDetalle = {
  ...defaultDetalle,
};

export interface ICotizacionTablas {
  monedas: IMoneda[];
  porcentajesIGV: IPorcentajesTable[];
  porcentajesPercepcion: IPorcentajesTable[];
  porcentajesRetencion: IPorcentajesTable[];
  serie: string;
  tiposVenta: ICombo[];
  vendedores: IPersonal[];
  tiposDocumento: ICombo[]; // Añadido
  direcciones: IClienteDireccion[]; //Añadido
  contactos: IClienteContacto[]; //Añadido
}

export const defaultCotizacionTablas: ICotizacionTablas = {
  monedas: [],
  porcentajesIGV: [],
  porcentajesRetencion: [],
  porcentajesPercepcion: [],
  serie: "",
  tiposVenta: [],
  vendedores: [],
  tiposDocumento: [],
  direcciones: [],
  contactos: [],
};

export interface ICotizacionFilter {
  fechaInicio: string;
  fechaFin: string;
  clienteNombre: string;
}

export const defaultCotizacionFilter: ICotizacionFilter = {
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
  clienteNombre: "",
};

export interface ICotizacionTable {
  clienteNombre: string;
  clienteNumero: string;
  documentoReferencia: string;
  fechaEmision: string;
  id: string;
  isAnulado: boolean;
  isBloqueado: boolean;
  isFacturado: boolean;
  monedaId: string;
  numeroDocumento: string;
  personalNombre: string;
  total: number;
}
