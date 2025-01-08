import { CrudType } from "../../types";

export interface IDetalle {
  tipo: CrudType;
  detalleId: number;

  //Articulo
  articuloId: string;
  descripcion: string;
  //Articulo

  //Unidad Medida
  pastilla: string;
  //Unidad Medida

  //Lote
  loteId: string;
  loteNumero: string;
  loteFechaVencimiento: string;
  //Lote

  //Medico
  medicoId: number | null;
  medicoNombres: string | null;
  medicoCMP: string | null;
  //Medico

  //AfectacionIGV
  tipoAfectacionIGVId: string;
  porcentajeIGV: number;
  //AfectacionIGV

  //Calculados
  montoIGV: number;
  subTotal: number;
  //Calculados

  cantidad: number;
  precioUnitario: number;
  importe: number;
}
export const defaultDetalle: IDetalle = {
  tipo: "registrar",
  detalleId: 0,

  //Articulo
  articuloId: "",
  descripcion: "",
  //Articulo

  //Unidad Medida
  pastilla: "T",
  //Unidad Medida

  //Lote
  loteId: "",
  loteNumero: "",
  loteFechaVencimiento: "",
  //Lote

  //Medico
  medicoId: null,
  medicoNombres: null,
  medicoCMP: null,
  //Medico

  //AfectacionIGV
  tipoAfectacionIGVId: "10",
  porcentajeIGV: 0,
  //AfectacionIGV

  //Calculados
  montoIGV: 0,
  subTotal: 0,
  //Calculados

  cantidad: 1,
  precioUnitario: 0,
  importe: 0,
};

export interface IDetalleVenta extends IDetalle {
  precioCompra: number;
  precioOriginal: number;
}
export const defaultDetalleVenta: IDetalleVenta = {
  ...defaultDetalle,
  precioCompra: 0,
  precioOriginal: 0,
};

export interface IDetalleCompra extends Omit<IDetalle, "medicoId"> {}

export const defaultDetalleCompra: IDetalleCompra = {
  ...defaultDetalle,
};
