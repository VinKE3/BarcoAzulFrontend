import { defaultDocumentoFilter, IDocumentoFilter } from "../../global";

export interface IReferenciaFindModal {
  menu: string;
  tipoDocumentoId: string;
  inputFocus: string;
  origen?: "venta" | "compra";
}

export interface IReferenciaFindFilter extends IDocumentoFilter {
  tipoDocumentoId: string;
}

export const defaultReferenciaFindFilter: IReferenciaFindFilter = {
  ...defaultDocumentoFilter,
  tipoDocumentoId: "",
};

export interface IReferenciaFind extends IReferenciaFindTable {
  origen: string;
}

export interface IReferenciaFindTable {
  id: string;
  numeroDocumento: string;
  ruc: string;
  fechaEmision: string;
  clienteNombre: string;
  proveedorNombre: string;
  total: number;
}
