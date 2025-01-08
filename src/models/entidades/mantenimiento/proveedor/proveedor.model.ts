import { ICombo } from "../../../global";
import { IDepartamento } from "../departamento.model";
import {
  defaultProveedorContactoTablas,
  IProveedorContacto,
  IProveedorContactoTablas,
} from "./proveedorContacto.model";
import {
  defaultProveedorCuentaCorrienteTablas,
  IProveedorCuentaCorriente,
  IProveedorCuentaCorrienteTablas,
} from "./proveedorCuentaCorriente.model";

export interface IProveedor {
  celular: string | null;
  condicion: string | null;
  correoElectronico: string | null;
  departamentoId: string;
  direccionPrincipal: string | null;
  distritoId: string;
  estado: string | null;
  id: string;
  nombre: string;
  numeroDocumentoIdentidad: string;
  observacion: string | null;
  provinciaId: string;
  telefono: string | null;
  tipoDocumentoIdentidadId: string | null;
}

export const defaultProveedor: IProveedor = {
  celular: null,
  condicion: null,
  correoElectronico: null,
  departamentoId: "",
  direccionPrincipal: null,
  distritoId: "",
  estado: null,
  id: "",
  nombre: "",
  numeroDocumentoIdentidad: "",
  observacion: null,
  provinciaId: "",
  telefono: null,
  tipoDocumentoIdentidadId: null,
};

export interface IProveedorTablas {
  departamentos: IDepartamento[];
  tiposDocumentoIdentidad: ICombo[];
}

export const defaultProveedorTablas: IProveedorTablas = {
  departamentos: [],
  tiposDocumentoIdentidad: [],
};

export interface IProveedorFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultProveedorFilter: IProveedorFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface IProveedorTable {
  celular: string | null;
  entidadBancariaNombre: string | null;
  id: string;
  monedaId: string;
  nombre: string;
  numeroCuentaBancaria: string;
  numeroDocumentoIdentidad: string;
  telefono: string ;
  vendedorCelular: string | null;
  vendedorNombreCompleto: string | null;
}

export interface IProveedorCuentaCorrienteTab {
  tablas: IProveedorCuentaCorrienteTablas;
  data: IProveedorCuentaCorriente[];
}

export interface IProveedorContactoTab {
  tablas: IProveedorContactoTablas;
  data: IProveedorContacto[];
}

export interface IProveedorModal {
  cuentaCorriente: IProveedorCuentaCorrienteTab;
  contacto: IProveedorContactoTab;
}

export const defaultProveedorModal: IProveedorModal = {
  cuentaCorriente: {
    tablas: defaultProveedorCuentaCorrienteTablas,
    data: [],
  },
  contacto: {
    tablas: defaultProveedorContactoTablas,
    data: [],
  },
};

export interface IProveedorTabTablas {
  cuentaCorrienteTablas: IProveedorCuentaCorrienteTablas;
  contactoTablas: IProveedorContactoTablas;
}
