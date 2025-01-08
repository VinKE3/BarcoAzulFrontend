import { ModalCrudType } from "../../../types/modal.types";
import { defaultPersonal, IPersonal } from "../personal.model";

export interface IClientePersonal {
  tipo: ModalCrudType; //Para valpersonalIdar crud de detalles

  id: string;
  clienteId: string;
  personalId: string;
  default: boolean;
  personal: IPersonal;
  nombreCompleto: string;
}

export const defaultClientePersonal: IClientePersonal = {
  tipo: "registrar",
  id: "",
  clienteId: "",
  default: true,
  personalId: "",
  personal: defaultPersonal,
  nombreCompleto: "",
};

export interface IClientePersonalTablas {
  personal: IPersonal[];
}

export const defaultClientePersonalTablas: IClientePersonalTablas = {
  personal: [],
};
