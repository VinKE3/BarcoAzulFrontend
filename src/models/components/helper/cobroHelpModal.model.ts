import { IDocumentoVenta, IDocumentoVentaTablas, ICuentaPorCobrar, INotaCredito, INotaCreditoTablas } from "../../entidades";

export interface ICobroHelpModal {
  dataCobro: IDocumentoVenta | INotaCredito | ICuentaPorCobrar;
  tablas: IDocumentoVentaTablas | INotaCreditoTablas;
  handleCobro?: (x: any) => Promise<void> | void;
  isApi?: boolean;
}

export interface ICobroHelpTable {
  afectarCaja: boolean;
  clienteId: string;
  cuentaBancariaDescripcion: string;
  cuentaBancariaId: number;
  fechaCobro: string;
  item: number;
  monedaId: string;
  montoPEN: number;
  montoUSD: number;
  numero: string;
  observacion: string | null;
  pedirCuentaBancaria: boolean;
  proveedorId: string;
  serie: string;
  tipoCambio: number;
  tipoCobroDescripcion: string;
  tipoCobroId: string;
  tipoDocumentoId: string;
  tipoId: string;
}
