import { format } from "date-fns";
import {
  defaultDetalle,
  defaultDocumentoFilter,
  ICombo,
  IDetalle,
  IDocumentoFilter,
  ISerie,
} from "../../../global";
import { CrudType } from "../../../types";
import { defaultPuntoVenta, IPuntoVenta } from "../../empresa";
import { IGuiaRemisionTransportista } from "./guiaRemisionTransportista.model";
import { IGuiaRemisionVehiculo } from "./guiaRemisionVehiculo.model";

export interface IGuiaRemision {
  id: string;

  tipoDocumentoId: string;
  serie: string;
  numero: string;

  fechaEmision: string;
  horaEmision: string | null;

  tipoDocumentoReferencia: string | null;
  documentoReferenciaId: string | null;
  fechaDocumentoReferencia: string | null;

  clienteId: string;
  clienteNumeroDocumentoIdentidad: string;
  clienteNombre: string;

  llegadaDireccion: string;
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

  transportistas: IGuiaRemisionTransportista[];
  vehiculos: IGuiaRemisionVehiculo[];
  detalles: IGuiaRemisionDetalle[];
}

export const defaultGuiaRemision: IGuiaRemision = {
  id: "",
  tipoDocumentoId: "09",
  serie: "",
  numero: "",

  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  horaEmision: format(new Date(), "HH:mm:ss"),

  tipoDocumentoReferencia: null,
  documentoReferenciaId: null,
  fechaDocumentoReferencia: null,

  clienteId: "",
  clienteNumeroDocumentoIdentidad: "",
  clienteNombre: "",

  llegadaDireccion: "",
  llegadaUbigeo: null,
  llegadaCodigoEstablecimiento: null,

  motivoTrasladoId: "",
  motivoSustento: "",
  modalidadTransporteId: "",
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

  documentoReferencia: null,
  numeroDocumento: null,

  transportistas: [],
  vehiculos: [],
  detalles: [],
};

export interface IGuiaRemisionDetalle extends IDetalle {
  totalPeso: string;
}

export const defaultGuiaRemisionDetalle: IGuiaRemisionDetalle = {
  ...defaultDetalle,
  totalPeso: "",
};

export interface IGuiaRemisionTablas {
  modalidadesTransporte: ICombo[];
  motivosTraslado: ICombo[];
  puntoVenta: IPuntoVenta;
  puntosVentaDestino: IPuntoVenta[];
  series: ISerie[];
  tiposDocumento: ICombo[];
  tiposDocumentoReferencia: ICombo[];
}

export const defaultGuiaRemisionTablas: IGuiaRemisionTablas = {
  modalidadesTransporte: [],
  motivosTraslado: [],
  puntoVenta: defaultPuntoVenta,
  puntosVentaDestino: [],
  series: [],
  tiposDocumento: [],
  tiposDocumentoReferencia: [],
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
