/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef } from "react";
import { useGlobalContext } from "../../../hooks";
import { IElementNode, ITableKeyHandler } from "../../../models";

/**
 * El componente TableKeyHandler mejora la navegación de foco en formularios y tablas al permitir que el usuario navegue entre elementos usando la tecla "Enter".
 */
const TableKeyHandler: React.FC<ITableKeyHandler> = ({ children, selector, readButton = false }) => {
  const { setGlobalContext } = useGlobalContext();
  const keyElements = useRef<IElementNode[]>([]);

  //#region useEffect
  useEffect(() => {
    const container = document.querySelectorAll(`.${selector}`);
    const filtered: IElementNode[] = []; // Ref para almacenar los elementos interactivos

    // Recorrer todos los elementos dentro del selector
    container.forEach((element) => {
      // Si readButton es true, incluye botones en la selección de elementos interactivos
      const elementos = element.querySelectorAll(readButton ? "input, select, button" : "input, select, table");
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

      // Obtiene el siguiente elemento interactivo válido
      const nextElement = keyElements.current[nextIndex];
      // Si el siguiente elemento no es una tabla, previene el comportamiento predeterminado (submit del formulario)
      nextElement.tagName !== "TABLE" && e.preventDefault();
      // Enfoca el siguiente elemento interactivo válido
      nextElement.focus();

      // Si el siguiente elemento es una tabla, selecciona la primera fila
      if (nextElement.tagName === "TABLE") {
        const firstRow = nextElement.querySelector("tbody tr:first-child");

        if (firstRow) {
          // Elimina la clase 'table-selected-row' de todas las filas de la tabla
          document.querySelectorAll("tbody tr").forEach((row) => {
            row.classList.remove("table-selected-row");
          });
          // Añade la clase 'table-selected-row' a la primera fila de la tabla
          firstRow.classList.add("table-selected-row");

          // Actualiza el contexto global para reflejar la fila seleccionada
          setGlobalContext((x) => ({ ...x, table: { ...x.table, row: 0 } }));
        }
      }
    };

    // Agregar el listener para el evento de tecla "Enter"
    document.addEventListener("keydown", handleKeyDown);

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  //#endregion

  return <>{children}</>;
};

export default TableKeyHandler;
