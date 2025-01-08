/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGlobalContext, ModalIdType } from "../../../models";
import { get } from "./get.util";

/**
 * Realiza una solicitud GET para obtener datos en base al id.
 * @param global El contexto global de la aplicación.
 * @param id - Identificador del recurso (de tipo `string` o `null`).
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @returns Una promesa que resuelve con la respuesta de la solicitud HTTP.
 */
export const getId = async (
  globalContext: IGlobalContext,
  id: ModalIdType,
  menu?: string
): Promise<any> => {
  const { api } = globalContext;
  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado
  const url: string = `${selectedMenu}/${id}`;
  return await get({ globalContext, menu: url }); // Llamada al servicio para obtener la data
};
