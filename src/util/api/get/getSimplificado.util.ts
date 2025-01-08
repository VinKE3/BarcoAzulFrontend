import { IGlobalContext, ISimplificado } from "../../../models";
import { get } from "./get.util";

/**
 * Realiza una solicitud GET para obtener datos por defecto necesarios para distintos módulos.
 * @param global El contexto global de la aplicación.
 * @returns Una promesa que resuelve con la respuesta de la solicitud HTTP.
 */
export const getSimplificado = async (
  globalContext: IGlobalContext
): Promise<ISimplificado> => {
  return await get({
    globalContext,
    menu: "Empresa/Configuracion/GetSimplificado",
  }); // Llamada al servicio para consultar el almacenRelacionado
};
