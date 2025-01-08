import { ProviderContext, useSnackbar } from "notistack";
import React from "react";

// Declaración de una variable que almacenará las propiedades del snackbar (referenciadas mediante ProviderContext)
let useSnackbarRef: ProviderContext;

/**
 * Componente configurador de Snackbar.
 * Utiliza el hook useSnackbar para obtener las propiedades del snackbar y las asigna a la variable useSnackbarRef.
 * Este componente no renderiza nada (return null;) y parece destinado a configurar las utilidades del snackbar.
 */
export const SnackbarConfigurator: React.FC = (): null => {
  useSnackbarRef = useSnackbar();
  return null;
};

export { useSnackbarRef };
