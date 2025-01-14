import {
  defaultCombo,
  defaultTipoDocumentoIdentidad,
  ICombo,
  IMoneda,
  ITipoDocumentoIdentidad,
} from "../../../global";
import { defaultDepartamento, IDepartamento } from "../departamento.model";
import { defaultDistrito, IDistrito } from "../distrito.model";
import { defaultProvincia, IProvincia } from "../provincia.model";
import { defaultTipoCobroPago, ITipoCobroPago } from "../tipoCobroPago.model";
import { defaultTipoVenta, ITipoVenta } from "../tipoVenta.model";
import { IClienteContacto } from "./clienteContacto.model";
import { IClienteDireccion } from "./clienteDireccion.model";
import { IClientePersonal } from "./clientePersonal.model";

export interface ICliente {
  id: string;
  tipoDocumentoIdentidadId: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  telefono: string | null;
  celular: string | null;
  correoElectronico: string | null;
  direccionPrincipal: string;
  departamentoId: string | null;
  provinciaId: string | null;
  distritoId: string | null;
  codigoEstablecimiento: string | null;
  isAgenteRetencion: boolean;
  zonaId: string | null;
  tipoVentaId: string | null;
  tipoCobroId: string | null;
  maximoCreditoUSD: number;
  maximoCreditoPEN: number;
  creditoUSD: number;
  creditoPEN: number;
  observacion: string | null;
}

export const defaultCliente: ICliente = {
  id: "",
  tipoDocumentoIdentidadId: "",
  numeroDocumentoIdentidad: "",
  nombre: "",
  telefono: null,
  celular: null,
  correoElectronico: null,
  direccionPrincipal: "",
  departamentoId: null,
  provinciaId: null,
  distritoId: null,
  codigoEstablecimiento: null,
  isAgenteRetencion: false,
  zonaId: null,
  tipoVentaId: null,
  tipoCobroId: null,
  maximoCreditoUSD: 0,
  maximoCreditoPEN: 0,
  creditoUSD: 0,
  creditoPEN: 0,
  observacion: null,
};

export interface IClienteTablas {
  tiposDocumentoIdentidad: IMoneda[];
  departamentos: IDepartamento[];
  zonas: ICombo[];
  tiposVenta: ICombo[];
  tiposCobro: ITipoCobroPago[];
}

export const defaultClienteTablas: IClienteTablas = {
  tiposDocumentoIdentidad: [],
  departamentos: [],
  zonas: [],
  tiposVenta: [],
  tiposCobro: [],
};

export interface IClienteFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultClienteFilter: IClienteFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface IClienteTable {
  id: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  direccionPrincipal: string;
  distrito: string;
  personalNombreCompleto: string | null;
}

export interface IClienteCompleto extends ICliente {
  direccionPrincipalId: number;
  direcciones: IClienteDireccion[];
  contactos: IClienteContacto[];
  personal: IClientePersonal[];
  departamento: IDepartamento;
  distrito: IDistrito;
  provincia: IProvincia;
  tipoCobro: ITipoCobroPago;
  tipoDocumentoIdentidad: ITipoDocumentoIdentidad;
  tipoVenta: ITipoVenta;
  zona: ICombo;
}

export const defaultClienteCompleto: IClienteCompleto = {
  ...defaultCliente,
  direccionPrincipalId: 0,
  direcciones: [],
  contactos: [],
  personal: [],
  departamento: defaultDepartamento,
  distrito: defaultDistrito,
  provincia: defaultProvincia,
  tipoCobro: defaultTipoCobroPago,
  tipoDocumentoIdentidad: defaultTipoDocumentoIdentidad,
  tipoVenta: defaultTipoVenta,
  zona: defaultCombo,
};
