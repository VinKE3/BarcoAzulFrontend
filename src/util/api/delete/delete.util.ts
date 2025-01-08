import { IGlobalContext, IMensajes, IResponse, ModalPropType } from "../../../models";
import { deleteService } from "../../../services";
import { getIsPermitido } from "../get";

/**
 * Realiza una solicitud HTTP para eliminar un elemento, verificando previamente los permisos necesarios.
 * @param global El contexto global de la aplicación.
 * @param modalProp La propiedad del modal a utilizar en el contexto (por defecto es "primer").
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param allData - Indica si se debe devolver toda la respuesta (`true`) o solo los mensajes (`false`).
 * @returns Una promesa que resuelve con la respuesta completa (`IResponse`) o solo los mensajes (`IMensajes[]`), según el valor de `allData`.
 */

export const delette = async (
  global: IGlobalContext,
  modalProp: ModalPropType = "primer",
  menu?: string,
  allData: boolean = false
): Promise<IResponse | IMensajes[]> => {
  const { api, modal } = global; // Desestructuración del contexto global
  const { callEndpoint } = api; // Obtener la función callEndpoint de la API
  const selectedModal = modal[modalProp]; // Obtener el modal seleccionado basado en modalProp
  const { isPermitido, id } = selectedModal; // Obtener isPermitido e id del modal seleccionado
  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado

  if (isPermitido) {
    // Si isPermitido es verdadero, verificar los permisos para la acción "eliminar"
    await getIsPermitido({ globalContext: global, accion: "eliminar", modalProp, menu: selectedMenu }); // Verificar si la acción está permitida
  }

  // Realizar la llamada al endpoint para eliminar el elemento
  const response: IResponse = await callEndpoint(deleteService(selectedMenu, id));
  return allData ? response : response.messages; // Devolver toda la respuesta o solo los mensajes, según allData
};
