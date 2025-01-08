import { ICombo } from "../../global";

export interface ICorrelativo {
  tipoDocumentoId: string;
  tipoDocumentoDescripcion: string;
  serie: string;
  numero: number;
}

export const defaultCorrelativo: ICorrelativo = {
  tipoDocumentoId: "",
  tipoDocumentoDescripcion: "",
  serie: "",
  numero: 0,
};

export interface ICorrelativoTablas {
  tiposDocumento: ICombo[];
}

export const defaultCorrelativoTablas: ICorrelativoTablas = {
  tiposDocumento: [],
};

export interface ICorrelativoFilter {}

export interface ICorrelativoTable {
  numero: number;
  serie: string;
  tipoDocumentoDescripcion: string;
  tipoDocumentoId: string;
}
