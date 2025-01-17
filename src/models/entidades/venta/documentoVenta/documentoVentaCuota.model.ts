import { formatDate } from "date-fns";

export interface IDocumentoVentaCuota {
  cuotaId: number;
  fechaPago: string;
  monto: number;
}

export const defaultDocumentoVentaCuota: IDocumentoVentaCuota = {
  cuotaId: 0,
  fechaPago: formatDate(new Date(), "yyyy-MM-dd"),
  monto: 0,
};
