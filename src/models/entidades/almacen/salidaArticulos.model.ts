import { format } from "date-fns";
import { defaultDocumentoFilter, ICombo, IDocumentoFilter, ISerie } from "../../global";
import { CrudType } from "../../types";

export interface ISalidaArticulos {
  id: string;
  tipoId: string | null;

  tipoDocumentoId: string | null;
  serie: string;
  numero: string;

  proveedorId: string | null;
  clienteId: string | null;

  fechaEmision: string;
  horaEmision: string | null;
  fechaSalida: string;

  motivoSalidaId: string;
  observacion: string | null;

  numeroDocumento: string | null;

  detalles: ISalidaArticulosDetalle[];
}

export const defaultSalidaArticulos: ISalidaArticulos = {
  id: "",
  tipoId: null,
  tipoDocumentoId: null,
  serie: "",
  numero: "",

  proveedorId: null,
  clienteId: null,

  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  horaEmision: format(new Date(), "HH:mm:ss"),
  fechaSalida: format(new Date(), "yyyy-MM-dd"),

  motivoSalidaId: "",
  observacion: null,

  numeroDocumento: null,

  detalles: [],
};

export interface ISalidaArticulosDetalle {
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

export const defaultSalidaArticulosDetalle: ISalidaArticulosDetalle = {
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

export interface ISalidaArticulosTablas {
  series: ISerie[];
  motivosSalida: ICombo[];
}

export const defaultSalidaArticulosTablas: ISalidaArticulosTablas = {
  series: [],
  motivosSalida: [],
};

export interface ISalidaArticulosFilter extends IDocumentoFilter {}

export const defaultSalidaArticulosFilter: ISalidaArticulosFilter = {
  ...defaultDocumentoFilter,
};

export interface ISalidaArticulosTable {
  id: string;
  numeroDocumento: string;

  fechaEmision: string;
  fechaSalida: string;
  horaEmision: string;
  
  motivoSalidaDescripcion: string;
  isAnulado: boolean;
}
