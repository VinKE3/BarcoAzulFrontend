import { defaultDocumentoFilter, ICombo, IDocumentoFilter } from "../../global";

export interface IBloquearMovimientoBancario {
  id: string;
  isBloqueado: boolean;
}

export const defaultBloquearMovimientoBancario: IBloquearMovimientoBancario = {
  id: "",
  isBloqueado: false,
};

export interface IBloquearMovimientoBancarios {
  isBloqueado: boolean;
  ids: string[];
}

export interface IBloquearMovimientoBancarioTablas {
  tiposDocumentos: ICombo[];
}

export const defaultBloquearMovimientoBancarioTablas: IBloquearMovimientoBancarioTablas =
  {
    tiposDocumentos: [],
  };
export interface IBloquearMovimientoBancarioFilter extends IDocumentoFilter {}

export const defaultBloquearMovimientoBancarioFilter: IBloquearMovimientoBancarioFilter =
  {
    ...defaultDocumentoFilter,
  };

export interface IBloquearMovimientoBancarioTable {
  id: string;
  isBloqueado: boolean;
}

export interface IBloquearMovimientoBancarioTable {
  id: string;
  fechaContable: string;
  numeroOperacion: string;
  concepto: string;
  monedaId: string;
  monto: number;
  isBloqueado: boolean;
}
