import { ICombo, IMoneda } from "../../global";

export interface ICuentaBancaria {
  id: string;
  cuentaCorrienteId: string;
  empresaId: string;
  entidadBancariaNombre: string;
  entidadBancariaTipo: string;
  monedaId: string;
  numero: string;
  saldoFinal: number;
  tipoCuentaDescripcion: string;
}

export const defaultCuentaBancaria: ICuentaBancaria = {
  id: "",
  cuentaCorrienteId: "",
  empresaId: "",
  entidadBancariaNombre: "",
  entidadBancariaTipo: "",
  monedaId: "",
  numero: "",
  saldoFinal: 0,
  tipoCuentaDescripcion: "",
};

export interface ICuentaBancariaTablas {
  entidadesBancarias: ICombo[];
  tiposCuenta: ICombo[];
  monedas: IMoneda[];
}

export const defaultCuentaBancariaTablas: ICuentaBancariaTablas = {
  entidadesBancarias: [],
  tiposCuenta: [],
  monedas: [],
};

export interface ICuentaBancariaFilter {
  numero: string;
}

export const defaultCuentaBancariaFilter: ICuentaBancariaFilter = {
  numero: "",
};

export interface ICuentaBancariaTable {
  entidadBancariaNombre: string;
  id: number;
  monedaId: string;
  numero: string;
  tipoCuentaDescripcion: string;
}
