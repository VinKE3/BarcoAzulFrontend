export interface ISubMenuElement {
  text: string;
  path: string;
  icon?: any;
}

export interface IMenuElement {
  id: string;
  icon: any;
  text: string;
  subMenus: ISubMenuElement[];
}

// export interface IElement extends HTMLElement {
//   disabled?: boolean; // Propiedad opcional para indicar si el elemento está deshabilitado
//   hasAttribute(name: string): boolean; // Método para verificar si el elemento tiene un atributo específico
// }

export type InputsType = {
  [key: string]: React.RefObject<any>;
};
