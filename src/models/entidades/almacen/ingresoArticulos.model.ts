import { format } from "date-fns";
import { defaultDocumentoFilter, ICombo, IDocumentoFilter, ISerie } from "../../global";
import { CrudType } from "../../types";

export interface IIngresoArticulos {
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

  motivoIngresoId: string;
  observacion: string | null;

  numeroDocumento: string | null;

  detalles: IIngresoArticulosDetalle[];
}

export const defaultIngresoArticulos: IIngresoArticulos = {
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

  motivoIngresoId: "",
  observacion: null,

  numeroDocumento: null,

  detalles: [],
};

export interface IIngresoArticulosDetalle {
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

export const defaultIngresoArticulosDetalle: IIngresoArticulosDetalle = {
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

export interface IIngresoArticulosTablas {
  series: ISerie[];
  motivosIngreso: ICombo[];
}

export const defaultIngresoArticulosTablas: IIngresoArticulosTablas = {
  series: [],
  motivosIngreso: [],
};

export interface IIngresoArticulosFilter extends IDocumentoFilter {}

export const defaultIngresoArticulosFilter: IIngresoArticulosFilter = {
  ...defaultDocumentoFilter,
};

export interface IIngresoArticulosTable {
  id: string;
  numeroDocumento: string;

  fechaEmision: string;
  fechaIngreso: string;
  horaEmision: string;
  
  motivoIngresoDescripcion: string;
  isAnulado: boolean;
}
