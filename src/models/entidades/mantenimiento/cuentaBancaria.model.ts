import { ICombo, IMoneda } from "../../global";

export interface ICuentaBancaria {
  id: number;
  entidadBancariaId: string;
  entidadBancariaNombre: string;
  numero: string;
  tipoCuentaDescripcion: string;
  monedaId: string;
  observacion: string | null;
}

export const defaultCuentaBancaria: ICuentaBancaria = {
  id: 0,
  entidadBancariaId: "",
  entidadBancariaNombre: "",
  numero: "",
  tipoCuentaDescripcion: "",
  monedaId: "",
  observacion: null,
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
