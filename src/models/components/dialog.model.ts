import { IGlobalContext } from "../context";
import { ModalPropType } from "../types";

export interface IDialog {
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>; //Función para actualizar el estado del contexto global.
  modalProp?: ModalPropType; // El nivel en el que se abrirá el modal (primer | segundo | tercer)
  title?: string; // El título del diálogo.
  text: string; // El texto del diálogo.
  showClose?: boolean;
  onSuccess: () => Promise<void> | void; //La función que se ejecutará cuando se cierre el diálogo.
  onClose?: () => Promise<void> | void; //La función que se ejecutará cuando se cierre el diálogo.
}
