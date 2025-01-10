import { format } from "date-fns";
import {
  defaultDetalle,
  defaultDocumentoFilter,
  IDetalle,
  IDocumentoFilter,
  IMoneda,
} from "../../global";

export interface IEntradaArticulos {
  empresaId: string;
  proveedorId: string | null;
  tipoDocumentoId: string | null;
  serie: string;
  numero: string;
  clienteId: string | null;
  proveedorNumeroDocumentoIdentidad: string | null;
  proveedorNombre: string | null;
  proveedorDireccion: string | null;
  personalId: string | null;
  fechaEmision: string;
  monedaId: string;
  tipoCambio: number;
  numeroOP: string | null;
  observacion: string | null;
  motivoId: string | null;
  total: number;
  detalles: IEntradaArticulosDetalle[];
}

export const defaultEntradaArticulos: IEntradaArticulos = {
  empresaId: "",
  proveedorId: null,
  tipoDocumentoId: null,
  serie: "",
  numero: "",
  clienteId: null,
  proveedorNumeroDocumentoIdentidad: null,
  proveedorNombre: null,
  proveedorDireccion: null,
  personalId: null,
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  monedaId: "S",
  tipoCambio: 0,
  numeroOP: null,
  observacion: null,
  motivoId: null,
  total: 0,
  detalles: [],
};

export interface IEntradaArticulosDetalle extends IDetalle {}

export const defaultEntradaArticulosDetalle: IEntradaArticulosDetalle = {
  ...defaultDetalle,
};

export interface IArticulosPersonal {
  id: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  numeroDocumentoIdentidad: string;
  cargoDescripcion: string;
  isActivo: boolean;
}

export const defaultArticulosPersonal: IArticulosPersonal = {
  id: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombres: "",
  numeroDocumentoIdentidad: "",
  cargoDescripcion: "",
  isActivo: false,
};

export interface IMotivoArticulos {
  id: string;
  descripcion: string;
  isActivo: boolean;
  tipo: string;
}

export const defaultMotivo: IMotivoArticulos = {
  id: "",
  descripcion: "",
  isActivo: false,
  tipo: "",
};

export interface IEntradaArticulosTablas {
  personal: IArticulosPersonal[];
  motivos: IMotivoArticulos[];
  monedas: IMoneda[];
  serie: string;
}

export const defaultEntradaArticulosTablas: IEntradaArticulosTablas = {
  personal: [],
  monedas: [],
  serie: "",
  motivos: [],
};

export interface IEntradaArticulosFilter extends IDocumentoFilter {
  observacion: string;
}

export const defaultEntradaArticulosFilter: IEntradaArticulosFilter = {
  ...defaultDocumentoFilter,
  observacion: "",
};

export interface IEntradaArticulosTable {
  id: string;
  numeroDocumento: string;
  personal: string;
  concepto: string;
  observacion: string;
  monedaId: string;
  total: number;
  isCancelado: boolean;
  isBloqueado: boolean;
  isAnulado: boolean;
}

export interface IEntradaArticulosVarios {
  articuloVarios: boolean;
}

export const defaultEntradaArticulosVarios: IEntradaArticulosVarios = {
  articuloVarios: false,
};
