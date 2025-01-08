import { defaultTipoAfectacionIGVAdicional, ICombo, ITipoAfectacionIGVAdicional } from "../../../global";

export interface IPedidoDetalleAdicional extends ITipoAfectacionIGVAdicional {
  isFaltante: boolean;
}
export const defaultPedidoDetalleAdicional: IPedidoDetalleAdicional = {
  ...defaultTipoAfectacionIGVAdicional,
  isFaltante: false,
};

export interface IPedidoTransferenciaTablas {
  puntosVenta: ICombo[];
}
export const defaultPedidoTransferenciaTablas: IPedidoTransferenciaTablas = {
  puntosVenta: [],
};
