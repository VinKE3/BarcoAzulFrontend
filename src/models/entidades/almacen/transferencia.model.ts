import { format, startOfMonth } from "date-fns";
import { ICombo, ISerie } from "../../global";
import { CrudType } from "../../types";

export interface ITransferencia {
  id: string;

  tipoId: string | null;
  tipoDocumentoId: string | null;
  serie: string;
  numero: string | null;

  fechaEmision: string;

  almacenOrigenId: string;
  almacenDestinoId: string;

  vendedorId: string;
  horaEmision: string | null;
  estado: string | null;

  detalles: ITransferenciaDetalle[];
  numeroDocumento: string | null;
}

export const defaultTransferencia: ITransferencia = {
  id: "",
  tipoId: null,
  tipoDocumentoId: null,
  serie: "",
  numero: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  almacenOrigenId: "",
  almacenDestinoId: "",
  vendedorId: "",
  horaEmision: null,
  estado: null,
  detalles: [],
  numeroDocumento: null,
};

export interface ITransferenciaDetalle {
  tipo: CrudType;

  detalleId: number;

  articuloId: string;
  descripcion: string;

  cantidad: number;
  precioUnitario: number;
  importe: number;

  pastilla: string;

  loteId: string;
  loteNumero: string;
  loteFechaVencimiento: string;
}

export const defaultTransferenciaDetalle: ITransferenciaDetalle = {
  tipo: "registrar",

  detalleId: 0,
  articuloId: "",
  descripcion: "",

  cantidad: 1,
  precioUnitario: 0,
  importe: 0,

  pastilla: "",
  loteId: "",
  loteNumero: "",
  loteFechaVencimiento: "",
};

export interface ITransferenciaTablas {
  almacenes: ICombo[];
  almacenesPermitidos: ICombo[];
  vendedores: ICombo[];
  series: ISerie[];
}

export const defaultTransferenciaTablas: ITransferenciaTablas = {
  almacenes: [],
  almacenesPermitidos: [],
  vendedores: [],
  series: [],
};

export interface ITransferenciaFilter {
  almacenOrigenId: string;
  numeroDocumento: string;
  fechaInicio: string;
  fechaFin: string;
}

export const defaultTransferenciaFilter: ITransferenciaFilter = {
  almacenOrigenId: "",
  numeroDocumento: "",
  fechaInicio: format(startOfMonth(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
};

export interface ITransferenciaFilterTablas {
  almacenes: ICombo[];
}

export const defaultTransferenciaFilterTablas: ITransferenciaFilterTablas = {
  almacenes: [],
};

export interface ITransferenciaTable {
  almacenDestinoDescripcion: string;
  almacenOrigenDescripcion: string;
  estado: string;
  fechaEmision: string;
  id: string;
  numeroDocumento: string;
}
