import { ICombo } from "../combo";

export interface IDocumento {
  numeroDocumento: string;
}

export const defaultDocumento: IDocumento = {
  numeroDocumento: "",
};

export interface ITipoAfectacionIGVAdicional {
  isGratuito: boolean;
  tiposAfectacionIGV: ICombo[];
}

export const defaultTipoAfectacionIGVAdicional: ITipoAfectacionIGVAdicional = {
  isGratuito: false,
  tiposAfectacionIGV: [],
};

