import { format } from "date-fns";
import { defaultDocumentoFilter, IDocumentoFilter } from "../../global";
import { CrudType } from "../../types";

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
  monedaId: string | null;
  tipoCambio: number;
  numeroOP: string | null;
  observacion: string | null;
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
  monedaId: null,
  tipoCambio: 0,
  numeroOP: null,
  observacion: null,
  detalles: [],
};

export interface IEntradaArticulosDetalle {
  tipo: CrudType;
  detalleId: number;
  lineaId: string | null;
  subLineaId: string | null;
  articuloId: string;
  unidadMedidaId: string | null;
  marcaId: number;
  descripcion: string;
  codigoBarras: string | null;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
  montoIGV: number;
  importe: number;
  presentacion: string | null;
  unidadMedidaDescripcion: string | null;
}

export const defaultEntradaArticulosDetalle: IEntradaArticulosDetalle = {
  tipo: "registrar",
  detalleId: 0,
  lineaId: null,
  subLineaId: null,
  articuloId: "",
  unidadMedidaId: null,
  marcaId: 0,
  descripcion: "",
  codigoBarras: null,
  cantidad: 0,
  precioUnitario: 0,
  subTotal: 0,
  montoIGV: 0,
  importe: 0,
  presentacion: null,
  unidadMedidaDescripcion: null,
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

export interface IEntradaArticulosTablas {
  personal: IArticulosPersonal[];
  serie: string;
}

export const defaultEntradaArticulosTablas: IEntradaArticulosTablas = {
  personal: [],
  serie: "",
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
