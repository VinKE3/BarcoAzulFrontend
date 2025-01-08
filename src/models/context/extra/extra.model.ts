import { defaultElement, IElement } from "./element.model";
import {
  defaultSimplificado,
  ISimplificado,
} from "../../entidades/empresa/simplificado.model";

export interface IExtra {
  simplificado: ISimplificado;
  element: IElement;
  soloCaja: boolean;
}

export const defaultExtra: IExtra = {
  simplificado: defaultSimplificado,
  element: defaultElement,
  soloCaja: false,
};
