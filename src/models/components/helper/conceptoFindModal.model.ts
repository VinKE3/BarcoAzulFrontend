import { format } from "date-fns";

export interface IConceptoFindModal {
  inputFocus: string;
  modo: string;
}

export interface IConceptoFindFilter {
  numeroDocumento: string;
  proveedorId: string;
  clienteId: string;
}

export const defaultConceptoFindFilter: IConceptoFindFilter = {
  numeroDocumento: "",
  proveedorId: "",
  clienteId: "",
};

export interface IConceptoFind extends IConceptoFindTable {
  origen: string;
}

export interface IConceptoFindTable {
  id: string;
  fechaEmision: string;
  numeroDocumento: string;
  descripcion: string;
  monedaId: string;
  saldo: number;
}

export interface IConceptoCompleto {
  id: string;
  fechaEmision: string;
  fechaVencimiento: string;
  clienteNumero: string | null;
  clienteNombre: string | null;
  monedaId: string | null;
  saldo: number;
  descripcion: string | null;
  numeroDocumento: string | null;
}

export const defaultConceptoCompleto: IConceptoCompleto = {
  id: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaVencimiento: format(new Date(), "yyyy-MM-dd"),
  clienteNumero: null,
  clienteNombre: null,
  monedaId: null,
  saldo: 0,
  descripcion: null,
  numeroDocumento: null,
};
