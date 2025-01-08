import { IGlobalContext } from "../../models";

/**
 * Maneja la visibilidad del sidebar (barra lateral) basado en el tamaño de la pantalla.
 * Si la pantalla es de tamaño "mobile", alterna el estado de visibilidad del sidebar.
 * @param global El contexto global de la aplicación.
 * @param setGlobalContext La función para actualizar el contexto global.
 */
export const handleSidebar = (
  global: IGlobalContext,
  setGlobalContext: React.Dispatch<React.SetStateAction<IGlobalContext>>
): void => {
  // Desestructurar elementos del contexto global
  const { extra } = global;
  const { element } = extra;
  // Obtener showSidebar y responsive de element
  const { showSidebar, responsive } = element;

  // Si el tamaño de la pantalla es "mobile"
  if (responsive === "mobile") {
    // Alternar el estado de visibilidad del sidebar
    setGlobalContext((x) => ({
      ...x,
      extra: { ...x.extra, element: { ...x.extra.element, showSidebar: !showSidebar } },
    }));
  }
};
