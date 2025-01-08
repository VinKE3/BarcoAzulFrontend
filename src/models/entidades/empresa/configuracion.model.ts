import { format } from "date-fns";
import { IDepartamento } from "../mantenimiento";
import { ModalCrudType } from "../../";

export interface IConfiguracion {
  id: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  direccion: string;
  departamentoId: string;
  provinciaId: string;
  distritoId: string;
  telefono: string | null;
  celular: string | null;
  correoElectronico: string | null;
  observacion: string | null;
  concarEmpresaId: string | null;
  concarEmpresaNombre: string | null;
  concarUsuarioVenta: string | null;
  concarUsuarioCompra: string | null;
  concarUsuarioPago: string | null;
  concarUsuarioCobro: string | null;
  filtroFechaInicio: string;
  filtroFechaFin: string;
  filtroFechaActual: string;
  anioHabilitado1: number;
  anioHabilitado2: number;
  mesesHabilitados: string;
  porcentajesIGV: IConfiguracionDetalle[];
  porcentajesRetencion: IConfiguracionDetalle[];
  porcentajesDetraccion: IConfiguracionDetalle[];
  porcentajesPercepcion: IConfiguracionDetalle[];
}

export const defaultConfiguracion: IConfiguracion = {
  id: "",
  numeroDocumentoIdentidad: "",
  nombre: "",
  direccion: "",
  departamentoId: "",
  provinciaId: "",
  distritoId: "",
  telefono: null,
  celular: null,
  correoElectronico: null,
  observacion: null,
  concarEmpresaId: null,
  concarEmpresaNombre: null,
  concarUsuarioVenta: null,
  concarUsuarioCompra: null,
  concarUsuarioPago: null,
  concarUsuarioCobro: null,
  filtroFechaInicio: format(new Date(), "yyyy-MM-dd"),
  filtroFechaFin: format(new Date(), "yyyy-MM-dd"),
  filtroFechaActual: format(new Date(), "yyyy-MM-dd"),
  anioHabilitado1: 0,
  anioHabilitado2: 0,
  mesesHabilitados: "",
  porcentajesIGV: [],
  porcentajesRetencion: [],
  porcentajesDetraccion: [],
  porcentajesPercepcion: [],
};

export interface IConfiguracionDetalle {
  tipo: ModalCrudType; //Para validar crud de detalles

  detalleId: number;
  tipoPercepcion: string;
  porcentaje: number;
  default: boolean;
}

export const defaultConfiguracionDetalle: IConfiguracionDetalle = {
  tipo: "registrar",
  tipoPercepcion: "",
  detalleId: 0,
  porcentaje: 0,
  default: false,
};

export interface IConfiguracionTablas {
  departamentos: IDepartamento[];
}

export const defaultConfiguracionTablas: IConfiguracionTablas = {
  departamentos: [],
};

export interface IPorcentajesTable {
  detalleId: number;
  porcentaje: number;
  default: boolean;
  tipoPercepcion: string;
}
