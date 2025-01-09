import { defaultLinea, ILinea } from "./linea.model";
import { defaultMarca, IMarca } from "./marca.model";
import { defaultSubLinea, ISubLinea } from "./subLinea.model";
import { defaultUnidadMedida, IUnidadMedida } from "./unidadMedida.model";
import { ICombo, IMoneda, defaultMoneda } from "../../global";

export interface IArticulo {
  id: string;
  lineaId: string;
  subLineaId: string;
  articuloId: string;
  tipoExistenciaId: string;
  unidadMedidaId: string;
  unidadMedidaDescripcion: string;
  marcaId: number;
  descripcion: string;
  observacion: string;
  codigoBarras: string;
  peso: number;
  monedaId: string;

  precioCompra: number;
  precioCompraDescuento: number;
  precioVenta1: number;
  precioVenta2: number;
  precioVenta3: number;
  precioVenta4: number;
  porcentajeUtilidad1: number;
  porcentajeUtilidad2: number;
  porcentajeUtilidad3: number;
  porcentajeUtilidad4: number;
  stock: number;
  stockMax: number;
  stockMinimo: number;

  [key: `precioVenta${number}`]: number; // Firma de índice
  [key: `porcentajeUtilidad${number}`]: number;

  precioIncluyeIGV: boolean;
  percepcionCompra: boolean;
  activarCostoDescuento: boolean;
  isActivo: boolean;
  controlarStock: boolean;
  actualizarPrecioCompra: boolean;
  detraccion: boolean;
}

export const defaultArticulo: IArticulo = {
  id: "",
  codigoBarras: "",
  lineaId: "",
  subLineaId: "",
  articuloId: "",
  tipoExistenciaId: "",
  unidadMedidaId: "",
  unidadMedidaDescripcion: "",
  marcaId: 0,
  descripcion: "",
  observacion: "",
  peso: 0,
  monedaId: "",
  precioCompra: 0,
  precioCompraDescuento: 0,
  precioVenta1: 0,
  precioVenta2: 0,
  precioVenta3: 0,
  precioVenta4: 0,
  porcentajeUtilidad1: 0,
  porcentajeUtilidad2: 0,
  porcentajeUtilidad3: 0,
  porcentajeUtilidad4: 0,
  stock: 0,
  stockMinimo: 0,
  stockMax: 0,
  precioIncluyeIGV: true,
  activarCostoDescuento: true,
  percepcionCompra: false,
  isActivo: true,
  controlarStock: true,
  actualizarPrecioCompra: false,
  detraccion: false,
};
export interface ISubLineaArt {
  id: string;
  subLineaId: string;
  lineaId: string;
  descripcion: string;
}

export interface IArticuloTablas {
  tiposExistencia: ICombo[];
  lineas: ICombo[];
  subLineas: ISubLineaArt[];
  monedas: IMoneda[];
  marcas: ICombo[];
  unidadesMedida: ICombo[];
}

export const defaultArticuloTablas: IArticuloTablas = {
  tiposExistencia: [],
  lineas: [],
  subLineas: [],
  marcas: [],
  monedas: [],
  unidadesMedida: [],
};

export interface IArticuloFilter {
  id: string;
  descripcion: string;
}

export const defaultArticuloFilter: IArticuloFilter = {
  id: "",
  descripcion: "",
};

export interface IArticuloTable {
  id: string;
  estadoStock: string;
  codigoBarras: string;
  descripcion: string;
  monedaId: string;
  stock: number;
  precioCompra: number;
  precioVenta: number;
  unidadMedidaAbreviatura: string;
  isActivo: boolean;
  controlarStock: boolean;
  actualizaPrecio: boolean;
  detraccion: boolean;
}
export interface IArticuloCompleto extends IArticulo {
  linea: ILinea;
  marca: IMarca;
  moneda: IMoneda;
  subLinea: ISubLinea;
  unidadMedida: IUnidadMedida;
}

export const defaultArticuloCompleto: IArticuloCompleto = {
  ...defaultArticulo,
  linea: defaultLinea,
  marca: defaultMarca,
  moneda: defaultMoneda,
  subLinea: defaultSubLinea,
  unidadMedida: defaultUnidadMedida,
};
