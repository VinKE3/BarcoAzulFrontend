import { defaultClienteContactoTablas, IClienteContacto, IClienteContactoTablas } from "./clienteContacto.model";
import { defaultClienteDireccionTablas, IClienteDireccion, IClienteDireccionTablas } from "./clienteDireccion.model";
import { defaultClientePersonalTablas, IClientePersonal, IClientePersonalTablas } from "./clientePersonal.model";

export interface IClienteDireccionTab {
  tablas: IClienteDireccionTablas;
  data: IClienteDireccion[];
}

export interface IClienteContactoTab {
  tablas: IClienteContactoTablas;
  data: IClienteContacto[];
}

export interface IClientePersonalTab {
  tablas: IClientePersonalTablas;
  data: IClientePersonal[];
}

export interface IClienteModal {
  direccion: IClienteDireccionTab;
  contacto: IClienteContactoTab;
  personal: IClientePersonalTab;
}

export const defaultClienteModal: IClienteModal = {
  direccion: {
    tablas: defaultClienteDireccionTablas,
    data: [],
  },
  contacto: {
    tablas: defaultClienteContactoTablas,
    data: [],
  },
  personal: {
    tablas: defaultClientePersonalTablas,
    data: [],
  },
};

export interface IClienteTabTablas {
  direccionTablas: IClienteDireccionTablas;
  contactoTablas: IClienteContactoTablas;
  personalTablas: IClientePersonalTablas;
}
