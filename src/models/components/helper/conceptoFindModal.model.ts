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
