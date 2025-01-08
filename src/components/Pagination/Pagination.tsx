import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import React from "react";
import ReactPaginate from "react-paginate";
import { useGlobalContext } from "../../hooks";

/**
 * Este componente se utiliza junto con un componente Table para proporcionar paginación a una tabla. Funciona actualizando el estado global de la tabla cuando se cambia de página, permitiendo la navegación a través de los diferentes registros.
 */
const Pagination: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table } = globalContext;
  const { total, pagina } = table; // Extrae el total de registros y la página actual del estado de la tabla
  const numeroPaginas = Math.ceil(total / 50); // Calcula el número total de páginas basado en el total de registros (asumiendo 50 registros por página)
  //#endregion

  //#region Funciones
  // Función para manejar el clic en la paginación
  const handlePageClick = (pagina: number): void => {
    // Actualiza la página actual en el contexto global
    setGlobalContext((x) => ({ ...x, table: { ...x.table, pagina } }));
  };

  //#endregion

  return (
    <div className="pagination">
      <div className="pagination-total-container">
        <div className="pagination-total-container-text">
          <p className="pagination-total-text">Total de registros:</p>
          <p className="pagination-total-cantidad">{table.total}</p> {/* Muestra el total de registros */}
        </div>
        <div className="pagination-total-container-text">
          <p className="pagination-total-text">Página:</p>
          <p className="pagination-total-cantidad">{pagina + 1}</p>
          {/* Muestra la página actual (se suma 1 ya que `pagina` es cero-indexada) */}
          <p className="pagination-total-text">de</p>
          <p className="pagination-total-cantidad"> {numeroPaginas}</p> {/* Muestra el número total de páginas */}
        </div>
      </div>

      <ReactPaginate
        pageCount={numeroPaginas === 0 ? 1 : numeroPaginas} // Configura el número total de páginas (mínimo 1)
        forcePage={pagina} // Fuerza la selección de la página actual
        pageRangeDisplayed={2} // Muestra el rango de páginas alrededor de la página seleccionada
        renderOnZeroPageCount={null} // No hace nada cuando el conteo de páginas es cero
        breakLabel="..." // Etiqueta para las elipses ("...")
        nextLabel={<ArrowRightIcon strokeWidth={2} className="pagination-button-icon" />} // Icono para el botón de siguiente página
        previousLabel={<ArrowLeftIcon strokeWidth={2} className="pagination-button-icon" />} // Icono para el botón de página anterior
        containerClassName="pagination-button-container" // Clase para el contenedor de los botones de paginación
        previousLinkClassName="pagination-button-prev" // Clase para el botón de página anterior
        nextLinkClassName="pagination-button-next !border-l-0" // Clase para el botón de siguiente página
        breakLinkClassName="pagination-button !border-l-0" // Clase para el botón de elipses
        pageLinkClassName="pagination-button !border-l-0" // Clase para los botones de las páginas
        activeLinkClassName="pagination-button-active" // Clase para el botón de la página activa
        onPageChange={(e) => handlePageClick(e.selected)} // Manejador de evento para el cambio de página
      />
    </div>
  );
};

export default Pagination;
