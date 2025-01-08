import { ICombo, IMoneda } from "../../global";

export interface ICuentaCorriente {
  id: string;
  empresaId: string;
  cuentaCorrienteId: string;
  entidadBancariaId: string;
  entidadBancariaNombre: string;
  numero: string;
  tipoCuentaDescripcion: string;
  monedaId: string;
  observacion: string | null;
}

export const defaultCuentaCorriente: ICuentaCorriente = {
  id: "",
  empresaId: "",
  cuentaCorrienteId: "",
  entidadBancariaId: "",
  entidadBancariaNombre: "",
  numero: "",
  tipoCuentaDescripcion: "",
  monedaId: "",
  observacion: null,
};

export interface ICuentaCorrienteTablas {
  entidadesBancarias: ICombo[];
  tiposCuentaBancaria: ICombo[];
  monedas: IMoneda[];
}

export const defaultCuentaCorrienteTablas: ICuentaCorrienteTablas = {
  entidadesBancarias: [],
  tiposCuentaBancaria: [],
  monedas: [],
};

export interface ICuentaCorrienteFilter {
  numero: string;
}

export const defaultCuentaCorrienteFilter: ICuentaCorrienteFilter = {
  numero: "",
};

export interface ICuentaCorrienteTable {
  id: string;
  numero: string;
  tipoCuentaDescripcion: string;
  entidadBancariaNombre: string;
  monedaId: string;
  saldoFinal: number;
}
