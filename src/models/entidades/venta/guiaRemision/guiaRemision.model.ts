import { format } from "date-fns";
import {
  defaultDetalle,
  defaultDocumentoFilter,
  ICombo,
  IDetalle,
  IDocumentoFilter,
  IMoneda,
  ISerie,
} from "../../../global";
import { defaultPuntoVenta, IPuntoVenta } from "../../empresa";
import { IGuiaRemisionTransportista } from "./guiaRemisionTransportista.model";
import { IGuiaRemisionVehiculo } from "./guiaRemisionVehiculo.model";
import { IClienteDireccion, IPersonal } from "../../mantenimiento";

export interface IGuiaRemision {
  id: string;

  tipoDocumentoId: string;
  serie: string;
  numero: string;
  ordenPedido: string | null;
  documentoVenta: string | null;
  oficina: string | null;
  almacen: string | null;
  almacenOrigen: string | null;
  numeroFactura: string | null;
  ordenCompra: string | null;
  costoMinimo: number;

  fechaEmision: string;
  fechaTraslado: string;
  horaEmision: string | null;
  ingresoEgresoStock: string | null;
  tipoDocumentoReferencia: string | null;
  documentoReferenciaId: string | null;
  fechaDocumentoReferencia: string | null;

  clienteId: string;
  clienteNombre: string;
  clienteNumeroDocumentoIdentidad: string | null;
  clienteDireccionId: number;
  clienteDireccion: string | null;
  direccionPartida: string;
  llegadaUbigeo: string | null; //? min 6 max 6
  llegadaCodigoEstablecimiento: string | null;

  motivoTrasladoId: string;
  motivoSustento: string;
  modalidadTransporteId: string;
  motivoTrasladoDescripcion: string | null;

  trasladoVehiculoM1L: boolean;
  cantidadBultos: number;
  pesoBrutoTotal: number;
  observacion: string | null;

  tipoId: string | null;
  proveedorId: string | null;

  partidaDireccion: string;

  partidaUbigeo: string | null;
  partidaCodigoEstablecimiento: string | null;
  puntoVentaDestinoId: string | null;

  documentoReferencia: string | null;
  numeroDocumento: string | null;
  incluyeIGV: boolean;
  afectarStock: boolean;
  enviarSucursal: boolean;
  porcentajeIGV: number;
  transportistas: IGuiaRemisionTransportista[];
  vehiculos: IGuiaRemisionVehiculo[];
  detalles: IGuiaRemisionDetalle[];
}

export const defaultGuiaRemision: IGuiaRemision = {
  id: "",
  tipoDocumentoId: "09",
  serie: "",
  numero: "",
  ordenPedido: null,
  documentoVenta: null,
  oficina: null,
  almacen: null,
  almacenOrigen: null,
  numeroFactura: null,
  ordenCompra: null,
  costoMinimo: 0,

  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  fechaTraslado: format(new Date(), "yyyy-MM-dd"),
  horaEmision: format(new Date(), "HH:mm:ss"),

  tipoDocumentoReferencia: null,
  documentoReferenciaId: null,
  fechaDocumentoReferencia: null,
  ingresoEgresoStock: "-",
  clienteId: "",
  clienteNumeroDocumentoIdentidad: "",
  clienteNombre: "",

  direccionPartida:
    "GRUPO 13 MZA. C LOTE. 9 SEC. 3 (FRENTE MUNICIPALIDAD VILLA EL SALVADOR)",
  llegadaUbigeo: null,
  llegadaCodigoEstablecimiento: null,

  motivoTrasladoId: "01",
  motivoSustento: "",
  modalidadTransporteId: "02",
  motivoTrasladoDescripcion: null,

  trasladoVehiculoM1L: false,
  cantidadBultos: 0,
  pesoBrutoTotal: 0,
  observacion: null,

  tipoId: null,
  proveedorId: null,

  partidaDireccion: "",
  partidaUbigeo: "",
  partidaCodigoEstablecimiento: "",
  puntoVentaDestinoId: null,
  clienteDireccionId: 0,
  clienteDireccion: null,
  documentoReferencia: null,
  numeroDocumento: null,
  incluyeIGV: true,
  afectarStock: true,
  enviarSucursal: false,
  porcentajeIGV: 18,
  transportistas: [],
  vehiculos: [],
  detalles: [],
};

export interface IGuiaRemisionDetalle extends IDetalle {
  totalPeso: number;
}

export const defaultGuiaRemisionDetalle: IGuiaRemisionDetalle = {
  ...defaultDetalle,
  totalPeso: 0,
};

export interface IMotivosTraslado {
  id: string;
  descripcion: string;
  isActivo: boolean;
  tipo: string;
}

export interface ITiposSumaResta {
  texto: string;
  valor: string;
}

export interface IGuiaRemisionTablas {
  modalidadesTransporte: ICombo[];
  motivosTraslado: IMotivosTraslado[];
  puntoVenta: IPuntoVenta;
  puntosVentaDestino: IPuntoVenta[];
  series: ISerie[];
  monedas: IMoneda[];
  tiposDocumento: ICombo[];
  vendedores: IPersonal[];
  tipos: ITiposSumaResta[];
  tiposDocumentoReferencia: ICombo[];
  direcciones: IClienteDireccion[]; //Añadido
}

export const defaultGuiaRemisionTablas: IGuiaRemisionTablas = {
  modalidadesTransporte: [],
  motivosTraslado: [],
  puntoVenta: defaultPuntoVenta,
  puntosVentaDestino: [],
  series: [],
  monedas: [],
  vendedores: [],
  tipos: [],
  tiposDocumento: [],
  tiposDocumentoReferencia: [],
  direcciones: [],
};

export interface IGuiaRemisionFilter extends IDocumentoFilter {
  clienteNombre: string;
  serie: string;
  tipoGuia: string;
}

export const defaultGuiaRemisionFilter: IGuiaRemisionFilter = {
  ...defaultDocumentoFilter,
  clienteNombre: "",
  serie: "",
  tipoGuia: "",
};

export interface IGuiaRemisionTable {
  id: string;
  fechaEmision: string;
  numeroDocumento: string;
  clienteNombre: string;
  clienteNumero: string;
  placa: string;
  isAnulado: boolean;
  isBloqueado: boolean;
  afectarStock: boolean;
  estadoSUNAT: string;
}
