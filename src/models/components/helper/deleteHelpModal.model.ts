import { ModalPropType } from "../../types";

export interface IDeleteHelpModal {
  modalProp?: ModalPropType; // Propiedad opcional para el identificador del modal
  menu?: string; // Propiedad opcional para el menú
  origen?: "eliminar" | "anular" | "confirmar" | "cerrar"; // Propiedad opcional para el origen de la acción
  propText: string; // Propiedad obligatoria para el texto a mostrar
  origenMensaje?: string; // Propiedad opcional para el origen del mensaje
  clearForm?: boolean; // Propiedad opcional para limpiar el formulario

  replaceSend?: boolean; // Propiedad opcional para reemplazar la función de envío
  onSend?: () => Promise<void> | void; // Propiedad opcional para la función de envío personalizada
  replaceClose?: boolean; // Propiedad opcional para reemplazar la función de cierre
  onClose?: () => Promise<void> | void; // Propiedad opcional para la función de cierre personalizada
}
