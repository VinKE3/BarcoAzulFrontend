import { ICombo } from "../../../global";

export interface IConfiguracionLote {
  id: string;
  articuloId: string;
  fechaVencimiento: string;
  habilitarParaVenta: boolean;
  loteId: string;
  numero: string;
  porDefecto: boolean;
  stockCajas: number;
  stockUnidades: number;
}

export const defaultConfiguracionLote: IConfiguracionLote = {
  id: "",
  articuloId: "",
  fechaVencimiento: "",
  habilitarParaVenta: false,
  loteId: "",
  numero: "",
  porDefecto: false,
  stockCajas: 0,
  stockUnidades: 0,
};

export interface IConfiguracionLoteFilter {
  descripcion: string;
  almacenId: string;
  almacenDescripcion: string;
  lineaId: string;
}

export const defaultConfiguracionLoteFilter: IConfiguracionLoteFilter = {
  descripcion: "",
  almacenId: "",
  almacenDescripcion: "",
  lineaId: "",
};

export interface IConfiguracionLoteFilterTablas {
  almacenes: ICombo[];
  lineas: ICombo[];
}

export const defaultConfiguracionLoteFilterTablas: IConfiguracionLoteFilterTablas = {
  almacenes: [],
  lineas: [],
};

export interface IConfiguracionLoteTable {
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
