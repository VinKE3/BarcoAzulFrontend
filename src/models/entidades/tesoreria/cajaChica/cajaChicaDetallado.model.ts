import { format } from "date-fns";
import { ICombo } from "../../../global";
import { defaultCajaChicaCompleto, ICajaChicaCompleto } from "./cajaChicaCompleto.model";

export interface ICajaChicaDetallado {
  cajaChica: ICajaChicaCompleto;
  detalles: ICajaChicaDetallado[];
  tiposPagoResumen: ITiposPagoResumen[];
}

export const defaultCajaChicaDetallado: ICajaChicaDetallado = {
  cajaChica: defaultCajaChicaCompleto,
  detalles: [],
  tiposPagoResumen: [],
};

export interface ICajaChicaDetalle {
  id: number;
  cajaChicaId: number;
  tipoMovimientoId: string;
  tipoDocumentoId: string;
  numeroDocumento: string;
  fechaEmision: string;
  clienteProveedorNombre: string;
  clienteProveedorNumero: string;
  monedaId: string;
  total: number;
  tipoPagoId: string;
  usuarioNombre: string;
}

export const defaultCajaChicaDetalle: ICajaChicaDetalle = {
  id: 0,
  cajaChicaId: 0,
  tipoMovimientoId: "",
  tipoDocumentoId: "",
  numeroDocumento: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  clienteProveedorNombre: "",
  clienteProveedorNumero: "",
  monedaId: "",
  total: 0,
  tipoPagoId: "",
  usuarioNombre: "",
};

export interface ITiposPagoResumen {
  tipoPagoId: string;
  tipoPagoDescripcion: string;
  totalPEN: number;
  totalUSD: number;
}

export const defaultPagoResumen: ITiposPagoResumen = {
  tipoPagoId: "",
  tipoPagoDescripcion: "",
  totalPEN: 0,
  totalUSD: 0,
};

export interface ICajaChicaDetalladoFilterTablas {
  cajasChicaConfiguracion: ICombo[];
}

export const defaultCajaChicaDetalladoFilterTablas: ICajaChicaDetalladoFilterTablas = {
  cajasChicaConfiguracion: [],
};

export interface ICajaChicaDetalladoTable {
  cajaChicaId: number;
  clienteProveedorNombre: string;
  clienteProveedorNumero: string;
  fechaEmision: string;
  id: number;
  monedaId: string;
  numeroDocumento: string;
  tipoDocumentoId: string;
  tipoMovimientoId: string;
  tipoPagoId: string;
  total: number;
  usuarioNombre: string;
}
