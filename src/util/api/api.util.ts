import { ModalCrudType } from "../../models";

export const apiURL: string = import.meta.env.VITE_URL_API;

/**
 * Retorna un valor representativo para cada tipo de operación CRUD según el tipo de acción.
 * Esta función facilita la conversión de tipos de acción (como "registrar", "modificar", etc.)
 * en valores de control específicos para verificaciones de permisos o acciones.
 * @param tipo - Tipo de acción CRUD (crear, modificar, eliminar, etc.).
 * @returns Un string representando el valor de la acción para permisos o un valor vacío si no coincide.
 */
export const handleIsPermitido = (tipo: ModalCrudType): string => {
  switch (tipo) {
    case "registrar":
      return "0";
    case "modificar":
      return "1";
    case "eliminar":
      return "2";
    case "consultar":
      return "3";
    case "anular":
      return "4";
    case "imprimir":
      return "5";
    default:
      return "";
  }
};
