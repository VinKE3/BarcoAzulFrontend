import React, { KeyboardEvent, useEffect, useState } from "react";
import { useTable } from "react-table";
import { Pagination } from "..";
import { useGlobalContext } from "../../hooks";
import { ITableComponent, defaultMensajes } from "../../models";

/**
 * El componente Table gestiona la visualización de datos tabulares, permitiendo interacciones como selección de filas, doble clic para detalles adicionales, y navegación por teclado. Utiliza el contexto global para mantener el estado de la tabla y ofrece opciones de paginación si están habilitadas.
 */
const Table: React.FC<ITableComponent> = ({
  data,
  columns,
  tableClassName,
  modalProp = "primer",
  modalTipo = "consultar",
  identifier = "id",
  isTablas = false,
  isPermitido = false,
  pagination = true,
  selectable = true,
  alwaysSelected = false,
  doubleClick = true,
  onKeyDown,
  border = false,
}) => {
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { permisos } = globalContext;
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  //#region useEffect
  // Este useEffect se ejecuta cuando cambia `rows` o `alwaysSelected`.
  // Si `alwaysSelected` es verdadero, establece la primera fila (índice 0) como seleccionada
  // y actualiza el estado global con esta selección.
  useEffect(() => {
    if (alwaysSelected) {
      setSelectedRow(0); // Selecciona la primera fila (índice 0)

      // Actualiza el estado global para reflejar la fila
      setGlobalContext((x) => ({ ...x, table: { ...x.table, row: 0 } }));
    }
  }, [rows, alwaysSelected]);

  // Este useEffect se ejecuta cuando cambia `globalContext.table.row`.
  // Si `alwaysSelected` es verdadero y el índice de la fila en el estado global es 0,
  // establece la primera fila como seleccionada.
  useEffect(() => {
    if (alwaysSelected && globalContext.table.row === 0) {
      setSelectedRow(0); // Asegura que la primera fila (índice 0) esté seleccionada
    }
  }, [globalContext.table.row]);
  //#endregion

  //#region Funciones
  const handleRowClick = (index: number): void => {
    // Si la tabla no es seleccionable, no hace nada
    if (!selectable) return;
    // Si la fila ya está seleccionada, no hace nada
    if (index === selectedRow) return;

    // Obtiene el elemento de la tabla utilizando su clase CSS
    const tableElement = document.getElementById(`${tableClassName}`);

    if (tableElement) {
      // Actualiza el estado de la fila seleccionada
      setSelectedRow((prevRow) => {
        // Si hay una fila previamente seleccionada y es diferente de la nueva fila seleccionada
        if (prevRow !== null && prevRow !== index) {
          // Busca y remueve la clase "table-selected-row" de la fila previamente seleccionada
          const previouslySelectedRow = tableElement.querySelector(".table-selected-row");
          //Remueve la clase
          if (previouslySelectedRow) {
            previouslySelectedRow.classList.remove("table-selected-row");
          }
        }

        return index;
      });

      // Actualiza el contexto global para reflejar la nueva fila seleccionada
      setGlobalContext((x) => ({ ...x, table: { ...x.table, row: index } }));
    }
  };

  const handleRowDoubleClick = (index: number): void => {
    // Si la funcionalidad de doble clic no está habilitada, no hace nada
    if (!doubleClick) return;
    // Si no se tienen permisos para consultar, no hace nada
    if (!permisos.consultar) return;

    // Obtiene los datos de la fila seleccionada
    const selectedRow = data[index];

    // Actualiza el contexto global para mostrar un modal con los datos de la fila seleccionada
    setGlobalContext((x) => ({
      ...x,
      mensajes: [defaultMensajes],
      modal: { ...x.modal, [modalProp]: { tipo: modalTipo, id: selectedRow[identifier], isTablas, isPermitido } },
      form: { ...x.form, retorno: { ...selectedRow } },
    }));
  };

  const handleKeyDown = (e: KeyboardEvent): void => {
    // Si no hay una fila seleccionada, salir de la función.
    if (selectedRow === null) return;

    // Maneja la tecla "Enter"
    if (e.key === "Enter") {
      // Evita que el evento se propague.
      e.stopPropagation();
      // Obtiene los datos de la fila seleccionada.
      const selectedRowData = rows[selectedRow].original;
      // Llama a la función `onKeyDown` pasando los datos de la fila seleccionada, si `onKeyDown` está definida.
      onKeyDown && onKeyDown(selectedRowData);
      return;
    }

    // Actualiza la fila seleccionada en función de las teclas "ArrowUp" y "ArrowDown".
    setSelectedRow((prevRow) => {
      if (e.key === "ArrowUp" && prevRow !== null) {
        // Si la tecla presionada es "ArrowUp" y hay una fila previamente seleccionada,
        // selecciona la fila anterior, a menos que ya esté en la primera fila.
        const prev = prevRow > 0 ? prevRow - 1 : prevRow;
        return prev;
      } else if (e.key === "ArrowDown" && prevRow !== null) {
        // Si la tecla presionada es "ArrowDown" y hay una fila previamente seleccionada,
        // selecciona la siguiente fila, a menos que ya esté en la última fila.
        const nextRow = prevRow < rows.length - 1 ? prevRow + 1 : prevRow;
        // Desplaza la vista para centrar la fila siguiente.
        handleScrollRow(nextRow);
        return nextRow;
      }

      // Retorna la fila previamente seleccionada si no se cumple ninguna de las condiciones anteriores.
      return prevRow;
    });

    // Actualiza el contexto global con el índice de la nueva fila seleccionada.
    if (e.key === "ArrowUp") {
      setGlobalContext((x) => ({
        ...x,
        table: { ...x.table, row: selectedRow > 0 ? selectedRow - 1 : selectedRow },
      }));
    } else if (e.key === "ArrowDown") {
      setGlobalContext((x) => ({
        ...x,
        table: { ...x.table, row: selectedRow < rows.length - 1 ? selectedRow + 1 : selectedRow },
      }));
    }
  };

  const handleScrollRow = (row: number): void => {
    // Obtiene el elemento de la tabla por su id.
    const tableElement = document.getElementById(`${tableClassName}`);
    if (tableElement) {
      // Selecciona el elemento de la fila correspondiente al índice proporcionado.
      const nextRowElement = tableElement.querySelector(`[data-row-index="${row}"]`);
      if (nextRowElement) {
        // Desplaza la vista para centrar la fila en la vista.
        nextRowElement.scrollIntoView({ behavior: "auto", block: "center" });
      }
    }
  };
  //#endregion

  return (
    <div>
      <div className="relative overflow-x-auto min-h-fit">
        <div className="table">
          <table
            {...getTableProps()} // Propiedades de la tabla proporcionadas por react-table
            id={tableClassName} // ID de la tabla, que es la clase CSS pasada como prop
            tabIndex={0} // Hace que la tabla sea focusable
            onKeyDown={handleKeyDown} // Controlador de eventos de teclado para la tabla
            className={`table-container ${tableClassName}`} // Clases CSS para estilizar la tabla
          >
            <thead>
              {headerGroups.map((headerGroup) => {
                const { key, ...restHeaderGroupProps } = headerGroup.getHeaderGroupProps();
                return (
                  <tr key={key} {...restHeaderGroupProps} className="table-header-tr">
                    {headerGroup.headers.map((column) => {
                      const { key, ...restColumnProps } = column.getHeaderProps();
                      return (
                        <th key={key} {...restColumnProps} className="table-header-td">
                          {column.render("Header")}
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>

            <tbody {...getTableBodyProps()}>
              {rows.map((row, index) => {
                prepareRow(row); // Prepara la fila para su renderizado
                const { key, ...restRowProps } = row.getRowProps();
                const isRowSelected = selectedRow === index; // Verifica si la fila está seleccionada

                return (
                  <tr
                    key={key}
                    {...restRowProps}
                    data-row-index={index} // Índice de la fila, usado para el scroll
                    className={`table-body-tr ${isRowSelected ? "table-selected-row" : "table-hover-row"}`} // Aplica clases CSS condicionales
                    onClick={() => handleRowClick(index)} // Controlador de clic en la fila
                    onDoubleClick={() => handleRowDoubleClick(index)} // Controlador de doble clic en la fila
                  >
                    {row.cells.map((cell) => {
                      const { getCellProps, column } = cell;
                      const { key, ...restCellProps } = getCellProps();
                      const { Header } = column;
                      return (
                        <td
                          key={key}
                          data-label={Header}
                          {...restCellProps}
                          className={`table-body-td ${border ? "border dark:border-gray-700" : ""}`}
                        >
                          {/* Renderiza el contenido de la celda */}
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Renderiza la paginación si está habilitada */}
          {pagination && <Pagination />}
        </div>
      </div>
    </div>
  );
};

export default Table;
