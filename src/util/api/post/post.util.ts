import { IGlobalContext, IResponse } from "../../../models";
import { postService } from "../../../services";

/**
 * Realiza una solicitud HTTP POST a un endpoint específico utilizando la configuración proporcionada en el contexto global.
 * @param global El contexto global de la aplicación.
 * @param data - Datos a enviar en el cuerpo de la solicitud POST.
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param allData - Indica si se debe devolver toda la respuesta (`true`) o solo los mensajes (`false`).
 * @returns Una promesa que resuelve con la respuesta completa (`IResponse`) o solo los mensajes (`IMensajes[]`), según el valor de `allData`.
 */
export const post = async (global: IGlobalContext, data: any, menu?: string, allData?: boolean): Promise<any> => {
  const { api } = global; // Obtener la API del contexto
  const { callEndpoint } = api; // Obtener la función callEndpoint de la API
  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado

  // Realizar la llamada al endpoint utilizando postService
  const response: IResponse = await callEndpoint(postService(selectedMenu, data, false, allData));
  return allData ? response : response.messages; // Devolver toda la respuesta o solo los mensajes, según allData
};
