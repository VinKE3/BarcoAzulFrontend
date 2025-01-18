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
  empresaId: string;
  proveedorId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  clienteId: string;
  fechaContable: string;
  monedaId: string;
  total: number;
  abonado: number;
  saldo: number;
  observacion: string;
}

export const defaultConceptoCompleto: IConceptoCompleto = {
  id: "",
  empresaId: "",
  proveedorId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  clienteId: "",
  fechaContable: "",
  monedaId: "",
  total: 0,
  abonado: 0,
  saldo: 0,
  observacion: "",
};
