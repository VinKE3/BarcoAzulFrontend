import { format } from "date-fns";
import {
  IMoneda,
  IDocumentoFilter,
  defaultDocumentoFilter,
} from "../../global";
import { CrudType } from "../../types";
import { IPersonal } from "./personal.model";

export interface ICuadreStock {
  id: string;
  empresaId: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  fechaRegistro: string;
  monedaId: string;
  tipoCambio: number;
  responsableId: string;
  observacion: string;
  totalSobra: number;
  totalFalta: number;
  saldoTotal: number;
  detalles: ICuadreStockDetalle[];
}

export interface ICuadreStockDetalle {
  tipo: CrudType;
  detalleId: number;
  lineaId: string;
  subLineaId: string;
  articuloId: string;
  marcaId: number;
  unidadMedidaId: string;
  descripcion: string;
  codigoBarras: string;
  unidadMedidaDescripcion: string;
  stockFinal: number;
  precioUnitario: number;
  inventario: number;
  cantidadFalta: number;
  totalFalta: number;
  cantidadSobra: number;
  totalSobra: number;
  cantidadSaldo: number;
  totalSaldo: number;
  marcaNombre: string;
  lineaDescripcion: string;
  subLineaDescripcion: string;
  tipoExistenciaId: string;
}

export const defaultCuadreStockDetalle: ICuadreStockDetalle = {
  tipo: "registrar",
  detalleId: 0,
  lineaId: "",
  subLineaId: "",
  articuloId: "",
  marcaId: 0,
  unidadMedidaId: "",
  descripcion: "",
  codigoBarras: "",
  unidadMedidaDescripcion: "",
  stockFinal: 0,
  precioUnitario: 0,
  inventario: 0,
  cantidadFalta: 0,
  totalFalta: 0,
  cantidadSobra: 0,
  totalSobra: 0,
  cantidadSaldo: 0,
  totalSaldo: 0,
  marcaNombre: "",
  lineaDescripcion: "",
  subLineaDescripcion: "",
  tipoExistenciaId: "",
};

export const defaultCuadreStock: ICuadreStock = {
  id: "",
  empresaId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  fechaRegistro: format(new Date(), "yyyy-MM-dd"),
  monedaId: "S",
  tipoCambio: 0,
  responsableId: "",
  observacion: "",
  totalSobra: 0,
  totalFalta: 0,
  saldoTotal: 0,
  detalles: [],
};

export interface IVendedores {
  id: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  numeroDocumentoIdentidad: string;
  cargoDescripcion: string;
  isActivo: boolean;
}
export interface ICuadreStockTablas {
  monedas: IMoneda[];
  vendedores: IPersonal[];
}

export const defaultCuadreStockTablas: ICuadreStockTablas = {
  monedas: [],
  vendedores: [],
};

export interface ICuadreStockFilter extends IDocumentoFilter {}

export const defaultCuadreStockFilter: ICuadreStockFilter = {
  ...defaultDocumentoFilter,
};

export interface ICuadreStockTable {
  id: string;
  estado: boolean;
  pendiente: boolean;
  fechaRegistro: string;
  numero: string;
  responsableNombreCompleto: string;
  monedaId: string;
  totalSobra: number;
  totalFalta: number;
  saldoTotal: number;
}

export interface ICuadreStockDetalleTable {
  codigoBarras: string;
  subLineaDescripcion: string;
  descripcion: string;
  unidadMedidaDescripcion: string;
  stockFinal: number;
  inventario: number;
  precioUnitario: number;
  monedaId: string;
}

export interface ICuadreStockDetalleFilter {
  codigoBarras: string;
  subLineaDescripcion: string;
  descripcion: string;
  unidadMedidaDescripcion: string;
  stockFinal: number;
  inventario: number;
  precioUnitario: number;
  monedaId: string;
}

export const defaultCuadreStockDetalleFilter: ICuadreStockDetalleFilter = {
  codigoBarras: "",
  subLineaDescripcion: "",
  descripcion: "",
  unidadMedidaDescripcion: "",
  stockFinal: 0,
  inventario: 0,
  precioUnitario: 0,
  monedaId: "",
};

export interface IArticuloCuadreStock {
  lineaId: string;
  subLineaId: string;
  articuloId: string;
  stock: number;
}

export interface IResultCuadreStock {
  success: boolean;
  data: {
    data: {
      fecha: string;
      articulos: IArticuloCuadreStock[];
    };
  };
}
