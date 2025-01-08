import React from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from ".";
import { privateRoutes } from "../../common";
import { INotFound } from "../../models";

/**
 * Este componente es útil para mostrar una página de error personalizada cuando un usuario intenta acceder a una página que no existe (404) o a una página para la cual no tiene permisos (403). Además, incluye un botón para redirigir al usuario de vuelta a la página de inicio.
 */
const NotFound: React.FC<INotFound> = ({ full = true, notFound = true }) => {
  //#region useState
  const navigate = useNavigate();
  //#endregion

  //#region Funciones
  const handleClick = (): void => {
    navigate(`/${privateRoutes.HOME}`, { replace: true }); // Navega a la página de inicio reemplazando la ruta actual
  };
  //#endregion

  return (
    <div className={`${full ? "global" : ""} not-found`}>
      <div className="not-found-text-container">
        <span className="not-found-title">{notFound ? 404 : 403}</span>
        <span className="not-found-sub-title">{notFound ? "NOT FOUND" : "SIN PERMISOS"}</span>
        <span className="not-found-text">
          {notFound
            ? "Lo sentimos, no se pudo encontrar la página que estás buscando."
            : "Lo sentimos, no cuenta con los permisos necesarios para acceder a este módulo."}
        </span>

        <button id="buttonGoHome" name="buttonGoHome" onClick={handleClick} className="not-found-button">
          Volver al Inicio
        </button>
      </div>

      <div className="not-found-logo-container">
        <Logo notFound={notFound} />
      </div>
    </div>
  );
};

export default NotFound;
