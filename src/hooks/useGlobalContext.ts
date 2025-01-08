import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { privateRoutes } from "../common";
import { GlobalContext } from "../context";
import { defaultGlobalContextProps, IGlobalContextProps } from "../models";
import { handleToast } from "../util";

/**
 * Hook personalizado que se utiliza para acceder al contexto global de manera segura en una aplicación React.
 * Este hook garantiza que cualquier componente que intente acceder al contexto global lo haga de manera segura.
 * Si el contexto no está disponible (por ejemplo, si el componente que usa el hook no está dentro de un `GlobalProvider`),
 * el hook redirige a la página de inicio y muestra un mensaje de error.
 *
 * @returns El contexto global (`IGlobalContextProps`) si está disponible, de lo contrario,
 * redirige a la página de inicio y muestra un mensaje de error.
 *
 * @example
 * const context = useGlobalContext();
 * // Luego puedes acceder a las propiedades del contexto, como `context.api`, `context.globalContext`, etc.
 */
export const useGlobalContext = (): IGlobalContextProps => {
  const context = useContext(GlobalContext); // Obtener el contexto global usando useContext
  const navigate = useNavigate(); // Obtener la función de navegación para redirigir a rutas

  if (context === undefined) {
    // Si el contexto no está definido, redirigir a la ruta de inicio y mostrar un mensaje de error
    navigate(`/${privateRoutes.HOME}`, { replace: true });
    handleToast("error", "GlobalContext debe estar dentro de GlobalProvider, Refresque la página");
    window.location.reload(); // Forzar el refresco de la página después de redirigir
    return defaultGlobalContextProps; // Devolver los props predeterminados del contexto global
  }

  return context; // Devolver el contexto global si está definido
};
