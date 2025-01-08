import { IGlobalContext, IMensajes, defaultForm, defaultMensajes, defaultModales } from "../../models";

/**
 * Función para limpiar mensajes en el contexto global.
 *
 * @param {React.Dispatch<React.SetStateAction<IGlobalContext>>} setGlobalContext - Función para actualizar el estado del contexto global.
 * @param {number} [index=0] - El índice del mensaje que se desea eliminar. Si no se proporciona, se eliminará el primer mensaje.
 * @param {boolean} [clearAll=true] - Si es `true`, se restablecerán todos los mensajes a su valor predeterminado. Si es `false`, se eliminará solo el mensaje en el índice proporcionado.
 * @returns {Promise<void>} - Esta función es asíncrona, pero no devuelve un valor, solo actualiza el estado del contexto.
 */
export const handleClearMensajes = async (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  index: number = 0,
  clearAll: boolean = true
): Promise<void> => {
  setGlobalContext((x) => {
    // Si clearAll es true, restablece los mensajes al valor por defecto.
    if (clearAll) {
      return { ...x, mensajes: [defaultMensajes] };
    }

    // Crear una copia de los mensajes actuales.
    let newMensajes = [...x.mensajes];
    // Eliminar el mensaje en el índice proporcionado.
    newMensajes.splice(index, 1);

    // Si no quedan mensajes, añadir el mensaje por defecto.
    if (newMensajes.length === 0) {
      newMensajes = [defaultMensajes];
    }

    // Actualizar el contexto con los nuevos mensajes.
    return { ...x, mensajes: newMensajes };
  });
};

/**
 * Función para establecer mensajes en el contexto global.
 * @param setGlobalContext Función para actualizar el contexto global.
 * @param messages Array de mensajes a establecer.
 * @param origen Origen común para todos los mensajes (opcional).
 */
export const handleSetMensajes = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  messages: IMensajes[],
  origen: string = "global"
): void => {
  // Mapear los mensajes para establecer el origen si es necesario.
  const mensajes: IMensajes[] = messages.map((msg) => ({
    ...msg,
    origen: origen ?? msg.origen, // Usar el origen proporcionado o mantener el original.
  }));

  // Actualizar el contexto global con los nuevos mensajes.
  setGlobalContext((x) => ({ ...x, mensajes }));
};

/**
 * Función que retorna un arreglo de tipo IMensaje.
 * @param tipo Tipo del mensaje
 * @param textos Array de textos que se mostrarán en el mensaje
 * @param origen Origen del mensaje
 */
export const handleSetMensajeCustom = (tipo: number = 1, textos: string[], origen: string = ""): IMensajes[] => {
  return [
    {
      tipo,
      textos,
      origen,
    },
  ];
};

/**
 * Función para establecer textos como mensajes en el contexto global.
 * @param setGlobalContext Función para actualizar el contexto global.
 * @param origen Origen del mensaje (opcional, por defecto 'global').
 * @param textos Array de textos a establecer como mensajes.
 * @param tipo Tipo de mensaje (opcional, por defecto 1).
 */
export const handleSetTextos = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  origen: string = "global",
  textos: string[],
  tipo: number = 1
): void => {
  // Crear el mensaje a partir de los textos proporcionados.
  const mensajes: IMensajes[] = [{ origen, tipo, textos }];

  // Actualizar el contexto global con el nuevo mensaje.
  setGlobalContext((x) => ({ ...x, mensajes }));
};

/**
 * Función para establecer mensajes de error en el contexto global.
 * @param setGlobalContext Función para actualizar el contexto global.
 * @param error Error o lista de errores a establecer como mensajes.
 * @param origen Origen del mensaje (opcional, por defecto 'global').
 */
export const handleSetErrorMensaje = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  error: any,
  origen: string = "global"
): void => {
  // Crear los mensajes a partir del error proporcionado.
  const mensajes: IMensajes[] = Array.isArray(error)
    ? error.map((err: IMensajes) => ({
        origen,
        tipo: err.tipo,
        textos: err.textos,
      }))
    : error.tipo !== undefined
    ? [{ origen, tipo: error.tipo, textos: error.textos }]
    : [{ origen, tipo: 1, textos: [String(error)] }];

  // Actualizar el contexto global con los nuevos mensajes de error.
  setGlobalContext((x) => ({ ...x, mensajes }));
};

/**
 * Función para resetear partes del contexto global y establecer mensajes de error.
 * @param setGlobalContext Función para actualizar el contexto global.
 * @param clearModales Indica si los modales deben ser reseteados (por defecto true).
 * @param clearForm Indica si el formulario debe ser reseteado (por defecto true).
 * @param error Lista de errores a establecer como mensajes.
 * @param origen Origen del mensaje (opcional, por defecto 'global').
 */
export const handleResetMensajeError = (
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>,
  clearModales: boolean = true,
  clearForm: boolean = true,
  error: IMensajes[],
  origen: string = "global"
): void => {
  // Crear los mensajes a partir del error proporcionado.
  const mensajes: IMensajes[] = error.map((err: IMensajes) => ({
    origen,
    tipo: err.tipo,
    textos: err.textos,
  }));

  // Actualizar el contexto global con los nuevos mensajes y posiblemente resetear modales y formulario.
  setGlobalContext((x) => ({
    ...x,
    modal: clearModales ? defaultModales : x.modal,
    form: clearForm ? defaultForm : x.form,
    mensajes,
  }));
};
