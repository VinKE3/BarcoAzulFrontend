import { format } from "date-fns";

export interface ICabeceraCompra {
  id: string;

  fechaEmision: string;

  proveedorId: string;
  proveedorNumeroDocumentoIdentidad: string;
  proveedorNombre: string;

  tipoPagoId: string | null;
  monedaId: string;
  observacion: string | null;

  totalOperacionesExoneradas: number;
  totalOperacionesInafectas: number;
  totalOperacionesGravadas: number;
  porcentajeIGV: number;
  montoIGV: number;
  total: number;
}

export const defaultCabeceraCompra: ICabeceraCompra = {
  id: "",

  proveedorId: "",
  proveedorNumeroDocumentoIdentidad: "",
  proveedorNombre: "",
  fechaEmision: format(new Date(), "yyyy-MM-dd"),

  tipoPagoId: null,
  monedaId: "",
  observacion: null,

  porcentajeIGV: 0,
  montoIGV: 0,

  totalOperacionesExoneradas: 0,
  totalOperacionesInafectas: 0,
  totalOperacionesGravadas: 0,
  total: 0,
};
