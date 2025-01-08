import { handleToast } from "..";
import { defaultMensajes, IMensajes, IResponse, TypeWithKey } from "../../models";

/**
 * Este objeto asocia códigos de error específicos con mensajes de error correspondientes.
 */
const codeList: TypeWithKey<string> = {
  202: "Exito",
  400: "Error 400 Bad Request",
  401: "Error 401 Unauthorized",
  402: "Error 401 Payment Required",
  403: "Error, no cuenta con los permisos necesarios para realizar esta acción.",
  404: "Error 404 Not Found",
  405: "Error 405 Method Not Allowed",
  500: "Error 500 Internal Server Error",
  501: "Error 501 Not Implemented",
  502: "Error 502 Bad Gateway",
};

/**
 * Crea y devuelve una nueva instancia de `AbortController`.
 * `AbortController` es una interfaz que permite la cancelación de operaciones asíncronas,
 * como solicitudes `fetch`, mediante la señalización de una cancelación.
 *
 * La función `loadAbort` es útil para manejar el ciclo de vida de las solicitudes asíncronas
 * al proporcionar un controlador que puede ser utilizado para abortar la solicitud si es necesario.
 * Esto es particularmente útil en componentes React, donde se pueden cancelar operaciones asíncronas
 * al desmontar el componente o al iniciar una nueva solicitud antes de que la anterior se complete.
 *
 * @returns Una instancia de `AbortController` para controlar y cancelar operaciones asíncronas.
 */
export const loadAbort = (): AbortController => {
  const controller = new AbortController();
  return controller;
};

/**
 * Maneja y retorna los mensajes de éxito desde una respuesta de solicitud HTTP.
 *
 * La función `handleSuccess` examina la respuesta y, si contiene una propiedad `messages`,
 * la devuelve como un array de mensajes de tipo `IMensajes`. Si no existen mensajes en la respuesta,
 * devuelve un mensaje genérico de éxito.
 *
 * @param response - La respuesta de una solicitud HTTP que contiene mensajes de éxito.
 * @returns Un array de mensajes de tipo `IMensajes`.
 */
export const handleSuccess = (response: any): IMensajes[] => {
  if (response && response.messages) {
    const { messages } = response;
    return messages;
  }
  return [{ tipo: 0, textos: ["Se completó exitosamente"], origen: "" }];
};

/**
 * Maneja errores y devuelve mensajes apropiados basados en la respuesta del error.
 * @param error El error capturado.
 * @returns Una promesa que resuelve a un array de mensajes.
 */
export const handleError = async (error: any): Promise<IMensajes[]> => {
  // Si el error es una cancelación de solicitud, retorna un mensaje por defecto.
  if (error.code === "ERR_CANCELED") {
    return [defaultMensajes];
  }

  // Si el error tiene una respuesta del servidor.
  if (error.response) {
    const { data, status }: { data: IResponse; status: number } = error.response;

    if (data) {
      // Si la respuesta contiene mensajes, retorna esos mensajes.
      if (data.messages) {
        const { messages } = data;
        return messages;
        // Si la respuesta es un Blob, conviértelo a texto y parsea como JSON para extraer los mensajes.
      } else if (data instanceof Blob) {
        const text: string = await data.text(); // Espera a que el blob sea convertido a texto
        const { messages } = JSON.parse(text) as IResponse; // Parsear el texto como JSON
        return messages;
      }
    } else {
      // Si el estado está en la lista de códigos de error conocidos, muestra el mensaje de error y retorna un mensaje por defecto.
      if (Object.prototype.hasOwnProperty.call(codeList, status)) {
        handleToast("error", codeList[status]);
        return [defaultMensajes];
      }
    }
  }

  // Si no se cumple ninguna de las condiciones anteriores, muestra un mensaje de error genérico y retorna un mensaje por defecto.
  const errorMessage: string = error.message || "Error desconocido, refresque la página";
  handleToast("error", errorMessage);
  return [defaultMensajes];
};
