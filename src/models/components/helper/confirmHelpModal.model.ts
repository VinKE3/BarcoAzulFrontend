import { ModalPropType } from "../..";

export interface IConfirmHelpModal {
  modalProp?: ModalPropType; // Identificador del modal, por defecto será "segundo"
  origen: string;
  title: string; // Título o texto principal del modal
  onConfirm?: () => Promise<void> | void; // Función personalizada para confirmar la acción
  replaceClose?: boolean; // Indica si se sobrescribe el comportamiento por defecto del cierre
  onClose?: () => Promise<void> | void; // Función personalizada para cerrar el modal
}
