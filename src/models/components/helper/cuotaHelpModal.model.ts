import { IDocumentoVenta, IDocumentoVentaCuota, IDocumentoVentaTablas } from "../../entidades";

export interface ICuotaHelpModal {
  dataGeneral: IDocumentoVenta;
  tablas: IDocumentoVentaTablas;
  handleCuota: (x: IDocumentoVentaCuota[]) => void;
}

export interface ICuotaHelp {
  numeroCuota: number;
  numeroDias: number;
}

export const defaultCuotaHelp: ICuotaHelp = {
  numeroCuota: 0,
  numeroDias: 0,
};
