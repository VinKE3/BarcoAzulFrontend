import { ICombo } from "../../global";

export interface ILote {
  id: string | null;
  articuloId: string;
  loteId: string;
  numero: string;
  fechaVencimiento: string | null;
}

export const defaultLote: ILote = {
  id: "",
  articuloId: "",
  loteId: "",
  numero: "",
  fechaVencimiento: null,
};

export interface ILoteFilter {
  descripcion: string;
  almacenId: string;
  almacenDescripcion: string;
  lineaId: string;
}

export const defaultLoteFilter: ILoteFilter = {
  descripcion: "",
  almacenId: "",
  almacenDescripcion: "",
  lineaId: "",
};

export interface ILoteFilterTablas {
  almacenes: ICombo[];
  lineas: ICombo[];
}

export const defaultLoteFilterTablas: ILoteFilterTablas = {
  almacenes: [],
  lineas: [],
};

export interface ILoteTable {
  articuloDescripcion: string;
  articuloId: string;
  farmacologiaNombre: string;
  lineaCodigoInterno: string;
  loteFechaVencimiento: string;
  loteNumero: string;
  precioVenta: number;
  stockCajas: number;
  stockUnidades: number;
  unidadesPorCaja: number;
}

export interface ILoteModalTable {
  articuloId: string;
  fechaVencimiento: string;
  habilitarParaVenta: boolean;
  id: string;
  loteId: string;
  numero: string;
  porDefecto: boolean;
  stockCajas: number;
  stockUnidades: number;
}
