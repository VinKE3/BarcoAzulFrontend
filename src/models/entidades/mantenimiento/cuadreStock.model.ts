import {  IMoneda } from "../../global";

export interface ICuadreStock {
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
  detalles: IDetalleCuadreStock[];
}

export interface IDetalleCuadreStock {
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

export const defaultCuadreStock: ICuadreStock = {
  empresaId: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  fechaRegistro: "",
  monedaId: "",
  tipoCambio: 0,
  responsableId: "",
  observacion: "",
  totalSobra: 0,
  totalFalta: 0,
  saldoTotal: 0,
  detalles: [
    {
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
    },
  ],
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
  vendedores: IVendedores[];
}

export const defaultCuadreStockTablas: ICuadreStockTablas = {
  monedas: [],
  vendedores: [],
};

export interface ICuadreStockFilter {
  numero: string;
}

export const defaultCuadreStockFilter: ICuadreStockFilter = {
  numero: "",
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
