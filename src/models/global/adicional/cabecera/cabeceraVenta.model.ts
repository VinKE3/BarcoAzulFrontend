import { format } from "date-fns";

export interface ICabeceraVenta {
  //Documento
  id: string;
  tipoDocumentoId: string;
  serie: string;
  numero: string | null;
  //Documento

  //Cabecera
  fechaEmision: string;
  fechaVencimiento: string;
  clienteId: string;
  clienteNumeroDocumentoIdentidad: string;
  clienteNombre: string;
  clienteDireccion: string | null;
  tipoVentaId: string;
  tipoPagoId: string;
  observacion: string | null;
  monedaId: string;
  tipoCambio: number;
  //Cabecera

  //Totales
  porcentajeIGV: number;
  totalOperacionesExoneradas: number;
  totalOperacionesInafectas: number;
  totalOperacionesGratuitas: number;
  totalOperacionesGravadas: number;
  montoIGV: number;
  montoIGVGratuitas: number;
  total: number;
  //Totales

  //Adicional
  tipoId: string | null;
  vendedorId: string | null;
  //Adicional
}

export const defaultCabeceraVenta: ICabeceraVenta = {
  //Documento
  id: "",
  tipoDocumentoId: "",
  serie: "",
  numero: null,
  //Documento

  //Cabecera
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaVencimiento: format(new Date(), "yyyy-MM-dd"),
  clienteId: "",
  clienteNumeroDocumentoIdentidad: "",
  clienteNombre: "",
  clienteDireccion: "",
  tipoVentaId: "",
  tipoPagoId: "",
  observacion: null,
  monedaId: "",
  tipoCambio: 0,
  //Cabecera

  //Totales
  porcentajeIGV: 0,
  totalOperacionesExoneradas: 0,
  totalOperacionesInafectas: 0,
  totalOperacionesGratuitas: 0,
  totalOperacionesGravadas: 0,
  montoIGV: 0,
  montoIGVGratuitas: 0,
  total: 0,
  //Totales

  //Adicionales
  tipoId: null,
  vendedorId: null,
  //Adicionales
};
