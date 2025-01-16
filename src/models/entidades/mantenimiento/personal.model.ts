import { ICombo, IMoneda } from "../../global";
import { IDepartamento } from "./departamento.model";

export interface IPersonal {
  id: string;
  numeroDocumentoIdentidad: string | null;
  apellidoPaterno: string;
  apellidoMaterno: string | null;
  nombres: string;
  departamentoId: string | null;
  provinciaId: string | null;
  distritoId: string | null;
  direccion: string | null;
  telefono: string | null;
  celular: string | null;
  fechaNacimiento: string | null;
  sexoId: string | null;
  estadoCivilId: string | null;
  correoElectronico: string | null;
  cargoId: number | null;
  cargoDescripcion: string | null;
  observacion: string | null;
  entidadBancariaId: number | null;
  tipoCuentaBancariaId: string | null;
  monedaId: string | null;
  cuentaCorriente: string | null;
  isActivo: boolean;
}

export const defaultPersonal: IPersonal = {
  id: "",
  numeroDocumentoIdentidad: null,
  apellidoPaterno: "",
  apellidoMaterno: "",
  nombres: "",
  departamentoId: null,
  provinciaId: null,
  distritoId: null,
  direccion: null,
  telefono: null,
  celular: null,
  fechaNacimiento: null,
  sexoId: null,
  estadoCivilId: null,
  correoElectronico: null,
  cargoId: null,
  cargoDescripcion: null,
  observacion: null,
  entidadBancariaId: null,
  tipoCuentaBancariaId: null,
  monedaId: null,
  cuentaCorriente: null,
  isActivo: true,
};

export interface IPersonalTablas {
  cargos: ICombo[];
  departamentos: IDepartamento[];
  entidadesBancaria: ICombo[];
  estadosCivil: ICombo[];
  monedas: IMoneda[];
  sexos: ICombo[];
  tiposCuentaBancaria: ICombo[];
}

export const defaultPersonalTablas: IPersonalTablas = {
  cargos: [],
  departamentos: [],
  entidadesBancaria: [],
  estadosCivil: [],
  monedas: [],
  sexos: [],
  tiposCuentaBancaria: [],
};

export interface IPersonalFilter {
  nombreCompleto: string;
}

export const defaultPersonalFilter: IPersonalFilter = {
  nombreCompleto: "",
};

export interface IPersonalTable {
  id: string;
  numeroDocumentoIdentidad: string;
  apellidoMaterno: string;
  apellidoPaterno: string;
  nombres: string;
  nombreCompleto: string;
  cargoDescripcion: string;
  isActivo: boolean;
}
