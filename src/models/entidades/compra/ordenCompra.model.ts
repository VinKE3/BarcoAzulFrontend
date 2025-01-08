import {
  defaultCabeceraCompra,
  defaultDetalleCompra,
  defaultDocumentoFilter,
  defaultTipoAfectacionIGVAdicional,
  ICabeceraCompra,
  ICombo,
  IDetalleCompra,
  IDocumentoFilter,
  IMoneda,
  ITipoAfectacionIGVAdicional,
} from "../../global";
import { defaultUsuarioConfiguracion, ITipoPago, IUsuarioConfiguracion } from "../mantenimiento";

export interface IOrdenCompra extends ICabeceraCompra {
  diasCredito: number;
  detalles: IOrdenCompraDetalle[];
}

export const defaultOrdenCompra: IOrdenCompra = {
  ...defaultCabeceraCompra,
  diasCredito: 0,
  detalles: [],
};

export interface IOrdenCompraDetalle extends IDetalleCompra {}

export const defaultOrdenCompraDetalle: IOrdenCompraDetalle = {
  ...defaultDetalleCompra,
};
export interface IOrdenCompraTablas {
  tiposPago: ITipoPago[];
  monedas: IMoneda[];
  usuarioConfiguracion: IUsuarioConfiguracion;
  tiposAfectacionIGV: ICombo[];
}

export const defaultOrdenCompraTablas: IOrdenCompraTablas = {
  tiposPago: [],
  monedas: [],
  usuarioConfiguracion: defaultUsuarioConfiguracion,
  tiposAfectacionIGV: [],
};

export interface IOrdenCompraConfirmar {
  ordenCompraId: string;
  ordenCompraNumero: string;
  proveedorId: string;
  proveedorNombre: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string;
  referencia: string;
  fechaEmision: string;
  fechaIngreso: string;
}

export const defaultOrdenCompraConfirmar: IOrdenCompraConfirmar = {
  ordenCompraId: "",
  ordenCompraNumero: "",
  proveedorId: "",
  proveedorNombre: "",
  tipoDocumentoId: "",
  serie: "",
  numero: "",
  referencia: "",
  fechaEmision: "",
  fechaIngreso: "",
};

export interface IOrdenCompraConfirmarTablas {
  tiposDocumento: ICombo[];
}

export const defaultOrdenCompraConfirmarTablas: IOrdenCompraConfirmarTablas = {
  tiposDocumento: [],
};

export interface IOrdenCompraFilter extends IDocumentoFilter {}

export const defaultOrdenCompraFilter: IOrdenCompraFilter = {
  ...defaultDocumentoFilter,
};

export interface IOrdenCompraTable {
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

export interface IOrdenCompraDetalleAdicional extends ITipoAfectacionIGVAdicional {}

export const defaultOrdenCompraDetalleAdicional: IOrdenCompraDetalleAdicional = {
  ...defaultTipoAfectacionIGVAdicional,
};
