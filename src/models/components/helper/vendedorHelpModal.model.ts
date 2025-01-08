import { IDocumentoVenta, IPedido } from "../../entidades";

export interface IVendedorHelpModal {
  dataGeneral: IDocumentoVenta | IPedido;
  backPage: string;
}
