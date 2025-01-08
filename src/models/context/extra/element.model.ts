export type ResponsiveType = "full" | "mobile";

export interface IElement {
  responsive: ResponsiveType; //Determina el estado actual de la página modo mobile o escritorio
  darkMode: boolean; //Determina los estilos darkmode
  showSidebar: boolean; //Determina el ancho del sidebar en modo escritorio, y su visivilidad en modo mobile
  sidebarColor: string; //Futura implementación de colores para el sidebar

  inputs: any; //Array de referencias de inputs que se utilizarán para enviar el foco o validaciones
}
export const defaultElement: IElement = {
  responsive: "full",
  darkMode: false,
  showSidebar: true,
  sidebarColor: "",

  inputs: [],
};
