import { ICombo } from "../../global";
import { IDepartamento } from "./departamento.model";

export interface ITransportista {
  id: string;
  empresaId: string;
  tipoConductor: string;
  tipoDocumentoIdentidadId: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  apellidos: string | null;
  correoElectronico: string | null;
  direccion: string | null;
  departamentoId: string | null;
  provinciaId: string | null;
  distritoId: string | null;
  licenciaConducir: string | null;
  telefono: string | null;
  numeroRegistro: string | null;
}

export const defaultTransportista: ITransportista = {
  id: "",
  empresaId: "",
  tipoConductor: "",
  tipoDocumentoIdentidadId: "",
  numeroDocumentoIdentidad: "",
  nombre: "",
  apellidos: null,
  correoElectronico: null,
  direccion: null,
  departamentoId: null,
  provinciaId: null,
  distritoId: null,
  licenciaConducir: null,
  telefono: null,
  numeroRegistro: null,
};

export interface ITiposDocumentoIdentidad {
  id: string;
  abreviatura: string;
}

export interface ITransportistaTablas {
  departamentos: IDepartamento[];
  vendedores: ICombo[];
  tiposTransportista: ICombo[];
  tiposDocumentoIdentidad: ITiposDocumentoIdentidad[];
}

export const defaultTransportistaTablas: ITransportistaTablas = {
  departamentos: [],
  vendedores: [],
  tiposTransportista: [],
  tiposDocumentoIdentidad: [],
};

export interface ITransportistaFilter {
  numeroDocumentoIdentidad: string;
  nombre: string;
}

export const defaultTransportistaFilter: ITransportistaFilter = {
  numeroDocumentoIdentidad: "",
  nombre: "",
};

export interface ITransportistaTable {
  id: string;
  tipoConductor: string;
  numeroDocumentoIdentidad: string;
  nombre: string;
  licenciaConducir: string;
}
