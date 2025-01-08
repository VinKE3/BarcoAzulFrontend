import React, { useEffect, useRef } from "react";
import { IBasicKeyHandler, IElementNode } from "../../../models";

/**
 * El componente BasicKeyHandler permite manejar la navegación de foco entre elementos dentro de un formulario o contenedor específico al presionar la tecla "Enter"
 */
const BasicKeyHandler: React.FC<IBasicKeyHandler> = ({ children, selector }) => {
  const keyElements = useRef<IElementNode[]>([]); // Ref para almacenar los elementos interactivos

  useEffect(() => {
    const container = document.querySelectorAll(`.${selector}`); // Selecciona todos los elementos con la clase especificada
    const filtered: IElementNode[] = [];

    // Recorrer todos los elementos dentro del selector
    container.forEach((x) => {
      // Obtener los elementos interactivos dentro de cada elemento encontrado
      const elementos = x.querySelectorAll("input, select, textarea, button");
      // Convertir la colección de nodos a un array de elementos interactivos tipados
      elementos.forEach((x) => {
        filtered.push(x as IElementNode);
      });
    });

    // Actualizar el ref de elementos interactivos con la lista filtrada
    keyElements.current = filtered;
  }, [children, selector]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return; // Solo manejar el evento si la tecla presionada es "Enter"

      // Encuentra el elemento activo actual
      const activeElement = document.activeElement as IElementNode;
      const currentIndex = keyElements.current.findIndex((x) => x === activeElement);

      if (currentIndex === -1) return; // Salir si el elemento activo no se encuentra en la lista

      // Encuentra el próximo elemento interactivo válido
      let nextIndex = (currentIndex + 1) % keyElements.current.length;

      // Cicla a través de los elementos para encontrar uno que no esté deshabilitado, oculto o tenga la clase "no"
      while (
        keyElements.current[nextIndex].disabled ||
        keyElements.current[nextIndex].hasAttribute("hidden") ||
        keyElements.current[nextIndex].classList.contains("no")
      ) {
        nextIndex = (nextIndex + 1) % keyElements.current.length;
      }

      // Enfoca el próximo elemento interactivo válido
      e.preventDefault();
      keyElements.current[nextIndex].focus();
    };

    // Agrega el listener para el evento de tecla "Enter"
    document.addEventListener("keydown", handleKeyDown);

    // Limpia el listener al desmontar el componente
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return <>{children}</>;
};

export default BasicKeyHandler;
