
export interface IElementNode extends HTMLElement {
  disabled?: boolean; // Propiedad opcional para indicar si el elemento está deshabilitado
  hasAttribute(name: string): boolean; // Método para verificar si el elemento tiene un atributo específico
}


export interface IBasicKeyHandler {
  children: React.ReactNode; // Los elementos hijos que serán envueltos por el componente
  selector: string; // El selector de clase que identifica el contenedor de los elementos interactivos
}

export interface ITableKeyHandler {
  children: React.ReactNode; // Los elementos hijos que serán envueltos por el componente
  selector: string; // El selector de clase que identifica el contenedor de los elementos interactivos
  readButton?: boolean; // Propiedad opcional para incluir botones en la navegación
}
