import { ModalCrudType } from "../../../types/modal.types";
import { ICombo, IMoneda } from "../../../global";

export interface IProveedorCuentaCorriente {
  tipo: ModalCrudType; //Para validar crud de detalles

  cuentaCorrienteId: number;
  entidadBancariaId: number;
  id: string;
  monedaId: string;
  numero: string;
  proveedorId: string;
}

export const defaultProveedorCuentaCorriente: IProveedorCuentaCorriente = {
  tipo: "registrar",

  cuentaCorrienteId: 0,
  entidadBancariaId: 0,
  id: "",
  monedaId: "",
  numero: "",
  proveedorId: "",
};

export interface IProveedorCuentaCorrienteTablas {
  entidadesBancarias: ICombo[];
  monedas: IMoneda[];
}

export const defaultProveedorCuentaCorrienteTablas: IProveedorCuentaCorrienteTablas =
  {
    entidadesBancarias: [],
    monedas: [],
  };
