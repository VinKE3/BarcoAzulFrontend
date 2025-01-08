import { IMensajes, IPutAnularParams, IResponse } from "../../../models";
import { getIsPermitido } from "../get";
import { put } from "./put.util";

//La función putAnular se utiliza para enviar una solicitud PUT y anular algún registro.

/**
 * Realiza una solicitud HTTP PUT a un endpoint específico para anular algún registro.
 * @param global El contexto global de la aplicación.
 * @param modalProp La propiedad del modal a utilizar en el contexto (por defecto es "primer").
 * @param menu - Identificador opcional del menú, para especificar el endpoint al que se realiza la solicitud.
 * @param isPermitido Indicador opcional para verificar permisos.
 * @param allData - (Opcional) Indicador para devolver toda la respuesta (`true`) o solo los mensajes (`false`).
 * @returns Una promesa que resuelve con la respuesta completa o solo los mensajes, dependiendo del valor de `allData`.
 */
export const putAnular = async ({
  globalContext,
  modalProp = "primer",
  menu,
  isPermitido = false,
  allData = false,
}: IPutAnularParams): Promise<IResponse | IMensajes[]> => {
  const { api, modal } = globalContext; // Desestructuración del contexto global
  const selectedModal = modal[modalProp];
  const { id } = selectedModal;

  const selectedMenu: string = menu ?? api.menu; // Determinar el menú seleccionado
  const url: string = `${selectedMenu}/Anular`; // Construir la URL
  const selectedPermitido = isPermitido ?? selectedModal.isPermitido;

  if (selectedPermitido) {
    await getIsPermitido({
      globalContext,
      accion: "anular",
      modalProp,
      menu: selectedMenu,
    }); // Verificar si la acción está permitida
  }

  return await put({ globalContext, id, data: null, menu: url, allData });
};
