/* eslint-disable @typescript-eslint/no-empty-object-type */
import { format } from "date-fns";
import {
  defaultDocumentoFilter,
  ICombo,
  IDocumentoFilter,
  ISerie,
  IDetalle,
  defaultDetalle,
  IMoneda,
} from "../../global";
import { CrudType } from "../../types";
import { IArticulosPersonal, IMotivoArticulos } from "./entradaArticulos.model";

export interface ISalidaArticulos {
  empresaId: string;
  proveedorId: string | null;
  tipoDocumentoId: string | null;
  serie: string;
  numero: string;
  clienteId: string | null;
  proveedorNumeroDocumentoIdentidad: string | null;
  proveedorNombre: string | null;
  proveedorDireccion: string | null;
  personalId: string | null;
  fechaEmision: string;
  monedaId: string;
  tipoCambio: number;
  numeroOP: string | null;
  observacion: string | null;
  motivoId: string | null;

  detalles: ISalidaArticulosDetalle[];
}

export const defaultSalidaArticulos: ISalidaArticulos = {
  empresaId: "",
  proveedorId: null,
  tipoDocumentoId: null,
  serie: "",
  numero: "",
  clienteId: null,
  proveedorNumeroDocumentoIdentidad: null,
  proveedorNombre: null,
  proveedorDireccion: null,
  personalId: null,
  fechaEmision: format(new Date(), "yyyy-MM-dd"),
  monedaId: "S",
  tipoCambio: 0,
  numeroOP: null,
  observacion: null,
  motivoId: null,
  detalles: [],
};

export interface ISalidaArticulosDetalle extends IDetalle {}

export const defaultSalidaArticulosDetalle: ISalidaArticulosDetalle = {
  ...defaultDetalle,
};

export interface ISalidaArticulosTablas {
  personal: IArticulosPersonal[];
  motivos: IMotivoArticulos[];
  monedas: IMoneda[];
  serie: string;
}

export const defaultSalidaArticulosTablas: ISalidaArticulosTablas = {
  personal: [],
  monedas: [],
  serie: "",
  motivos: [],
};

export interface ISalidaArticulosFilter extends IDocumentoFilter {
  observacion: string;
}

export const defaultSalidaArticulosFilter: ISalidaArticulosFilter = {
  ...defaultDocumentoFilter,
  observacion: "",
};

export interface ISalidaArticulosTable {
  id: string;
  numeroDocumento: string;
  personalNombre: string;
  concepto: string;
  observacion: string;
  monedaId: string;
  total: number;
  isCancelado: boolean;
  isBloqueado: boolean;
  isAnulado: boolean;
}
