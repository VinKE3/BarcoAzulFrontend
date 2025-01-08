import { defaultDocumentoFilter, IDocumentoFilter } from "../../global";

export interface IOrdenCompraFindModal {
  inputFocus: string;
}

export interface IOrdenCompraFindFilter extends IDocumentoFilter {}

export const defaultOrdenCompraFindFilter: IOrdenCompraFindFilter = {
  ...defaultDocumentoFilter,
};

export interface IOrdenCompraFind extends IOrdenCompraFindTable {
  origen: string;
}

export interface IOrdenCompraFindTable {
  almacenDescripcion: string;
  documentoRelacionado: string;
  estado: string;
  fechaEmision: string;
  id: string;
  monedaId: string;
  numeroDocumento: string;
  proveedorId: string;
  proveedorNombre: string;
  total: number;
}
