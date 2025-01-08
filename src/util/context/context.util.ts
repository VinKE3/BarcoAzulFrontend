import {
  defaultForm,
  defaultMensajes,
  defaultModales,
  defaultPermisos,
  defaultTable,
  IGlobalContext,
} from "../../models";

/**
 * Función para restablecer el contexto global
 *
 * @param {React.Dispatch<React.SetStateAction<IGlobalContext>>} setGlobalContext - Función para actualizar el estado del contexto global.
 * @param {boolean} clearApi - Indica si se debe restablecer la API (por defecto es true).
 * @param {boolean} clearPermisos - Indica si se deben restablecer los permisos (por defecto es true).
 * @param {boolean} clearModales - Indica si se deben restablecer los modales (por defecto es true).
 * @param {boolean} clearForm - Indica si se deben restablecer los formularios (por defecto es true).
 * @param {boolean} clearTable - Indica si se deben restablecer las tablas (por defecto es true).
 * @param {boolean} clearMensajes - Indica si se deben restablecer los mensajes (por defecto es true).
 */
export const handleResetContext = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  clearApi: boolean = true,
  clearPermisos: boolean = true,
  clearModales: boolean = true,
  clearForm: boolean = true,
  clearTable: boolean = true,
  clearMensajes: boolean = true
): void => {
  setGlobalContext((x) => ({
    ...x,
    api: clearApi ? { ...x.api, origen: "global", menu: "" } : x.api, // Restablecer la API si clearApi es true
    permisos: clearPermisos ? defaultPermisos : x.permisos, // Restablecer los permisos si clearPermisos es true
    modal: clearModales ? defaultModales : x.modal, // Restablecer los modales si clearModales es true
    form: clearForm ? defaultForm : x.form, // Restablecer los formularios si clearForm es true
    table: clearTable ? defaultTable : x.table, // Restablecer las tablas si clearTable es true
    mensajes: clearMensajes ? [defaultMensajes] : x.mensajes, // Restablecer los mensajes si clearMensajes es true
  }));
};
