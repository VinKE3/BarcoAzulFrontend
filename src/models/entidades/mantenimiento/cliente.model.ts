import { ICombo } from "../../global";
import { IDepartamento } from "./departamento.model";
import { ITipoPago } from "./tipoPago.model";
import { ITipoVenta } from "./tipoVenta.model";

export interface ICliente {
  id: string;
  tipoDocumentoIdentidadId: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  direccion: string | null;
  departamentoId: string | null;
  provinciaId: string | null;
  distritoId: string | null;
  telefono: string | null;
  celular1: string | null;
  celular2: string | null;
  correoElectronico: string | null;
  vendedorId: string | null;
  tipoVentaId: string | null;
  tipoPagoId: string | null;
  tienePermisoActivo: boolean;
  permitirCredito: boolean;
}

export const defaultCliente: ICliente = {
  id: "",
  tipoDocumentoIdentidadId: "",
  numeroDocumentoIdentidad: "",
  nombre: "",
  direccion: null,
  departamentoId: null,
  provinciaId: null,
  distritoId: null,
  telefono: null,
  celular1: null,
  celular2: null,
  correoElectronico: null,
  vendedorId: null,
  tipoVentaId: null,
  tipoPagoId: null,
  tienePermisoActivo: true,
  permitirCredito: false,
};

export interface IClienteTablas {
  tiposDocumentoIdentidad: ICombo[];
  departamentos: IDepartamento[];
  vendedores: ICombo[];
  tiposVenta: ITipoVenta[];
  tiposPago: ITipoPago[];
}

export const defaultClienteTablas: IClienteTablas = {
  tiposDocumentoIdentidad: [],
  departamentos: [],
  vendedores: [],
  tiposVenta: [],
  tiposPago: [],
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
}
