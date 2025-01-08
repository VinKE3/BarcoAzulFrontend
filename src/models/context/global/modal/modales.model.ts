import { defaultModal, IModal } from "./modal.model";

export interface IModales {
  primer: IModal;
  segundo: IModal;
  tercer: IModal;
}

export const defaultModales: IModales = {
  primer: defaultModal,
  segundo: defaultModal,
  tercer: defaultModal,
};
