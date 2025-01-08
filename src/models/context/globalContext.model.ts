import { IExtra, defaultExtra } from "./extra";
import { IApi, defaultApi } from "./global/api.model";
import { IForm, defaultForm } from "./global/form.model";
import { IMensajes, defaultMensajes } from "./global/mensajes.model";
import { IModales, defaultModales } from "./global/modal";
import { IPermisos, defaultPermisos } from "./global/permiso/permisos.model";
import { ITable, defaultTable } from "./global/table.model";

export interface IGlobalContextProps {
  globalContext: IGlobalContext;
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>;
}

export interface IGlobalProvider {
  children: React.ReactNode;
}
export interface IGlobalContext {
  api: IApi;
  permisos: IPermisos;
  table: ITable;
  modal: IModales;
  form: IForm;
  mensajes: IMensajes[];

  extra: IExtra;
}

export const defaultGlobalContext: IGlobalContext = {
  api: defaultApi,
  permisos: defaultPermisos,
  table: defaultTable,
  modal: defaultModales,
  form: defaultForm,
  mensajes: [defaultMensajes],

  extra: defaultExtra,
};

export const defaultGlobalContextProps: IGlobalContextProps = {
  globalContext: defaultGlobalContext,
  setGlobalContext: () => {},
};
