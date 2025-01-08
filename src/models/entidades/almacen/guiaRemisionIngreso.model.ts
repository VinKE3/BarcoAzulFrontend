import { format } from "date-fns";
import { defaultDocumentoFilter, ICombo, IDocumentoFilter } from "../../global";
import { CrudType } from "../../types";
import { IPuntoVenta } from "../empresa";

export interface IGuiaRemisionIngreso {
  id: string;
  tipoId: string | null;

  tipoDocumentoId: string | null;
  serie: string;
  numero: string;

  proveedorId: string | null;
  clienteId: string | null;

  fechaEmision: string;
  horaEmision: string | null;

  fechaIngreso: string;
  tipoIngresoId: string;
  puntoVentaOrigenId: string;
  observacion: string | null;

  numeroDocumento: string | null;

  detalles: IGuiaRemisionIngresoDetalle[];
}

export const defaultGuiaRemisionIngreso: IGuiaRemisionIngreso = {
  id: "",
  tipoId: null,
  tipoDocumentoId: null,
  serie: "",
  numero: "",

  proveedorId: null,
  clienteId: null,

  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  horaEmision: format(new Date(), "HH:mm:ss"),
  fechaIngreso: format(new Date(), "yyyy-MM-dd"),

  tipoIngresoId: "",
  puntoVentaOrigenId: "",

  observacion: null,
  numeroDocumento: null,

  detalles: [],
};

export interface IGuiaRemisionIngresoDetalle {
  tipo: CrudType;

  detalleId: number;

  articuloId: string;
  descripcion: string;

  cantidad: number;
  pastilla: string;

  loteId: string;
  loteNumero: string;
  loteFechaVencimiento: string;
}

export const defaultGuiaRemisionIngresoDetalle: IGuiaRemisionIngresoDetalle = {
  tipo: "registrar",

  detalleId: 0,

  articuloId: "",
  descripcion: "",

  cantidad: 0,
  pastilla: "",

  loteId: "",
  loteNumero: "",
  loteFechaVencimiento: "",
};

export interface IGuiaRemisionIngresoTablas {
  tiposIngreso: ICombo[];
  puntosVentaOrigen: IPuntoVenta[];
}

export const defaultGuiaRemisionIngresoTablas: IGuiaRemisionIngresoTablas = {
  tiposIngreso: [],
  puntosVentaOrigen: [],
};

export interface IGuiaRemisionIngresoFilter extends IDocumentoFilter {}

export const defaultGuiaRemisionIngresoFilter: IGuiaRemisionIngresoFilter = {
  ...defaultDocumentoFilter,
};

export interface IGuiaRemisionIngresoTable {
  fechaEmision: string;
  fechaIngreso: string;
  horaEmision: string;
  id: string;
  isAnulado: boolean;
  pvOrigenDescripcion: string;
  tipoIngresoDescripcion: string;
  numeroDocumento: string;
}
