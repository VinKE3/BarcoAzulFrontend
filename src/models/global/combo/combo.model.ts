export interface ICombo {
  id: string;
  descripcion: string;

  isActivo?: boolean;
  isDefault?: boolean;
  numero?: number;
  nombre?: string;
  nick?: string;
}

export const defaultCombo: ICombo = {
  id: "",
  descripcion: "",

  isActivo: true,
  isDefault: false,
  numero: 0,
  nombre: "",
  nick: "",
};

export interface IComboNumeric {
  id: number;
  descripcion: string;

  default?: boolean;
  numero?: number;
  nombre?: string;
  nick?: string;
}

export const defaultComboNumeric: IComboNumeric = {
  id: 0,
  descripcion: "",

  default: false,
  numero: 0,
  nombre: "",
  nick: "",
};

export interface ITipoDocumentoIdentidad {
  id: string;
  descripcion: string;
  abreviatura: string;
}

export interface ITipoDocumento {
  id: string;
  numeroDocumento: string;
  fechaEmision: string;
}

export const defaultTipoDocumentoIdentidad: ITipoDocumentoIdentidad = {
  id: "",
  descripcion: "",
  abreviatura: "",
};

export interface ICuentaCorrienteBancaria {
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
