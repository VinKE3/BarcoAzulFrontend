export interface IActaRecepcion {
  ordenCompraId: string;
  documentoRelacionado: string;
  proveedorNombre: string;
  fechaEmision: string;
  total: number;
}

export const defaultActaRecepcion: IActaRecepcion = {
  ordenCompraId: "",
  documentoRelacionado: "",
  proveedorNombre: "",
  fechaEmision: "",
  total: 0,
};
