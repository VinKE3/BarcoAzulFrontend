import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useFetchAndLoad from "../hooks/useFetchandLoad";
import {
  IGlobalContext,
  IGlobalContextProps,
  IGlobalProvider,
  ResponsiveType,
  defaultApi,
  defaultGlobalContext,
} from "../models";
import { IAppStore } from "../redux/store";
import {
  decodeUserToken,
  getSimplificado,
  handleSetErrorMensaje,
} from "../util";

//#region Creación del contexto global
export const GlobalContext = createContext<IGlobalContextProps | undefined>(
  undefined
);
//#endregion

/**
 * Proveedor del contexto global que envuelve a la aplicación
 */
export const GlobalProvider: React.FC<IGlobalProvider> = ({ children }) => {
  //#region useState
  const { callEndpoint, loading } = useFetchAndLoad();
  const [globalContext, setGlobalContext] = useState<IGlobalContext>({
    ...defaultGlobalContext,
    api: { ...defaultApi, callEndpoint, loading },
  });
  const { token, refreshToken } = useSelector((x: IAppStore) => x.user);
  const {} = decodeUserToken(token, refreshToken);
  //#endregion

  //#region useEffect
  // Añade un event listener para manejar el cambio de tamaño de la ventana
  useEffect(() => {
    handleGetSimplificado();
    handleResponsive();
    window.addEventListener("resize", handleResponsive);
  }, []);

  useEffect(() => {
    setGlobalContext((x) => ({ ...x, api: { ...x.api, loading: loading } }));
  }, [loading]);
  //#endregion

  //#region Funciones
  /**
   * Función que maneja la respuesta al redimensionar la ventana
   */
  const handleResponsive = (): void => {
    try {
      const responsive: ResponsiveType =
        window.innerWidth <= 700 ? "mobile" : "full";
      setGlobalContext((x) => ({
        ...x,
        extra: { ...x.extra, element: { ...x.extra.element, responsive } },
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "global");
    }
  };

  const handleGetSimplificado = async (): Promise<void> => {
    try {
      const simplificado = await getSimplificado(globalContext);
      setGlobalContext((x) => ({
        ...x,
        extra: {
          ...x.extra,
          simplificado: {
            ...simplificado,
          },
        },
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  // Provee el contexto global a los componentes hijos
  return (
    <GlobalContext.Provider value={{ globalContext, setGlobalContext }}>
      {children}
    </GlobalContext.Provider>
  );
};
