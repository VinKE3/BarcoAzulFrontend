import { IoMdClose } from "react-icons/io";
import { useSnackbarRef } from "./Snack.util";

/**
 * Objeto gestor de notificaciones.
 * Proporciona funciones para mostrar notificaciones con diferentes variantes (éxito, error, información, advertencia).
 */

/**
 * Muestra una notificación con el mensaje y opciones especificadas.
 * @param msg El mensaje de la notificación.
 * @param options Opciones adicionales para la notificación.
 */
export const toastManager = {
  toast(msg: string, options?: any) {
    const key = useSnackbarRef.enqueueSnackbar(msg, {
      ...options,
      action: (key: React.ReactText) => (
        <IoMdClose
          size="1.5rem"
          aria-label="close"
          color="inherit"
          onClick={() => useSnackbarRef.closeSnackbar(key)}
          className="cursor-pointer"
        />
      ),
    });
    return key;
  },

  /**
   * Muestra una notificación de éxito.
   * @param msg El mensaje de la notificación.
   * @param options Opciones adicionales para la notificación.
   */
  success(msg: string, options?: any) {
    toastManager.toast(msg, {
      variant: "success",
      style: { backgroundColor: "#4CAF50" },
      ...options,
    });
  },

  /**
   * Muestra una notificación de error.
   * @param msg El mensaje de la notificación.
   * @param options Opciones adicionales para la notificación.
   */
  error(msg: string, options?: any) {
    toastManager.toast(msg, {
      variant: "error",
      style: { backgroundColor: "#D32F2F" },
      ...options,
    });
  },

  /**
   * Muestra una notificación de información.
   * @param msg El mensaje de la notificación.
   * @param options Opciones adicionales para la notificación.
   */
  info(msg: string, options?: any) {
    toastManager.toast(msg, {
      variant: "info",
      style: { backgroundColor: "#0284C7" },
      ...options,
    });
  },

  /**
   * Muestra una notificación de advertencia.
   * @param msg El mensaje de la notificación.
   * @param options Opciones adicionales para la notificación.
   */
  warning(msg: string, options?: any) {
    toastManager.toast(msg, {
      variant: "warning",
      style: { backgroundColor: "#374151" },
      ...options,
    });
  },
};

/**
 * Muestra una notificación usando el toastManager con la propiedad especificada.
 * @param prop La propiedad del toastManager a utilizar (success, error, info, warning).
 * @param texto El mensaje de la notificación.
 * @param vertical La posición vertical de la notificación.
 * @param horizontal La posición horizontal de la notificación.
 */
export const handleToast = (
  prop: keyof typeof toastManager = "info",
  texto: string,
  vertical: "top" | "bottom" = "top",
  horizontal: "left" | "center" | "right" = "center",
  persist: boolean = false
): void => {
  toastManager[prop](texto, {
    persist,
    anchorOrigin: {
      vertical,
      horizontal,
    },
  });
};
