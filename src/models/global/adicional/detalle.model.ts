import { CrudType } from "../../types";

export interface IDetalle {
  tipo: CrudType;
  detalleId: number;
  id: string;
  lineaId: string | null;
  subLineaId: string | null;
  articuloId: string;
  unidadMedidaId: string | null;
  marcaId: number | null;
  descripcion: string;
  codigoBarras: string | null;
  cantidad: number;
  precioUnitario: number;
  subTotal: number;
  montoIGV: number;
  importe: number;
  presentacion: string | null;
  unidadMedidaDescripcion: string | null;
  precioCompra: number;
}
export const defaultDetalle: IDetalle = {
  tipo: "registrar",
  detalleId: 0,
  id: "",
  lineaId: null,
  subLineaId: null,
  articuloId: "",
  unidadMedidaId: null,
  marcaId: null,
  descripcion: "",
  codigoBarras: null,
  cantidad: 1,
  precioUnitario: 0,
  subTotal: 0,
  montoIGV: 0,
  importe: 0,
  presentacion: null,
  unidadMedidaDescripcion: "",
  precioCompra: 0,
};

export interface IDetalleVenta extends IDetalle {}
export const defaultDetalleVenta: IDetalleVenta = {
  ...defaultDetalle,
};

export interface IDetalleCompra extends IDetalle {}

export const defaultDetalleCompra: IDetalleCompra = {
  ...defaultDetalle,
};
