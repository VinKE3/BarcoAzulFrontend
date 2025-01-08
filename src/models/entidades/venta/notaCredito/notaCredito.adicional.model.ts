import { defaultTipoAfectacionIGVAdicional, ITipoAfectacionIGVAdicional } from "../../../global";

//#region Adicional
export interface INotaCreditoDetalleAdicional extends ITipoAfectacionIGVAdicional {}
export const defaultNotaCreditoDetalleAdicional: INotaCreditoDetalleAdicional = {
  ...defaultTipoAfectacionIGVAdicional,
};
//#endregion
