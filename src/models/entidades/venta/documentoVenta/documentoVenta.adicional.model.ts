import { defaultTipoAfectacionIGVAdicional, ITipoAfectacionIGVAdicional } from "../../../global";

export interface IDocumentoVentaDetalleAdicional extends ITipoAfectacionIGVAdicional {}

export const defaultDocumentoVentaDetalleAdicional: IDocumentoVentaDetalleAdicional = {
  ...defaultTipoAfectacionIGVAdicional,
};
