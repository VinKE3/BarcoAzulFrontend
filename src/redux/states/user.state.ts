import { createSlice } from "@reduxjs/toolkit";
import { IUser, defaultUser } from "../../models";
import { clearLocalStorage, saveInLocalStorage } from "../../util";

// Se define la clave que se usará para almacenar y recuperar información del usuario en el almacenamiento local.
type IUserKeyProp = "user";

export const userKey: IUserKeyProp = "user";

/**
 * Este slice de Redux maneja el estado relacionado con el usuario. Utiliza `createSlice` para definir un conjunto de acciones
 * que permiten crear, actualizar y restablecer el estado del usuario. El estado inicial se carga desde el `localStorage` si está disponible.
 *
 * - **createUser**: Crea un nuevo usuario y guarda los datos en `localStorage`.
 * - **updateUser**: Actualiza el estado del usuario con nuevos datos y los guarda en `localStorage`.
 * - **resetUser**: Reinicia el estado del usuario a su valor por defecto y elimina los datos almacenados en `localStorage`.
 *
 * @param {string} name - El nombre del slice, que es `"user"` en este caso.
 * @param {object} initialState - El estado inicial del usuario. Se carga desde `localStorage` si los datos existen, o se establece a `defaultUser` si no.
 * @param {object} reducers - Un objeto que contiene las acciones disponibles en este slice:
 *  - `createUser`: Crea un nuevo usuario y lo guarda en el `localStorage`.
 *  - `updateUser`: Actualiza los datos del usuario en el estado y los guarda en el `localStorage`.
 *  - `resetUser`: Restablece los datos del usuario a su valor por defecto y elimina los datos de `localStorage`.
 */
export const userSlice = createSlice({
  name: "user", // Nombre del slice.
  initialState: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : defaultUser, // Estado inicial, cargado desde localStorage si existe.
  reducers: {
    /**
     * Crea un nuevo usuario y guarda sus datos en el `localStorage`.
     *
     * @param {object} state - El estado actual.
     * @param {object} action - La acción que contiene el payload con los datos del nuevo usuario.
     * @returns El nuevo estado con los datos del usuario creados.
     */
    createUser: (state, action) => {
      state; // El estado no se modifica directamente, ya que se retorna el payload
      saveInLocalStorage<IUser>(userKey, action.payload); // Guardamos el nuevo usuario en localStorage.
      return action.payload; // Devolvemos los datos del usuario.
    },

    /**
     * Actualiza el estado del usuario con nuevos datos y los guarda en `localStorage`.
     *
     * @param {object} state - El estado actual.
     * @param {object} action - La acción que contiene el payload con los datos a actualizar.
     * @returns El nuevo estado con los datos actualizados del usuario.
     */
    updateUser: (state, action) => {
      const data = { ...state, ...action.payload }; // Fusionamos el estado actual con los nuevos datos.
      saveInLocalStorage<IUser>(userKey, data); // Guardamos los datos actualizados en localStorage.
      return data; // Devolvemos el estado actualizado.
    },

    /**
     * Restablece el estado del usuario a su valor por defecto y elimina los datos de `localStorage`.
     *
     * @returns El estado por defecto del usuario.
     */
    resetUser: () => {
      clearLocalStorage(userKey); // Limpiamos los datos de localStorage.
      return defaultUser; // Devolvemos el estado por defecto.
    },
  },
});

// Se exportan las acciones generadas automáticamente por createSlice para su uso en otros lugares de la aplicación.
export const { createUser, updateUser, resetUser } = userSlice.actions;

// Se exporta el reducer del "slice" para ser utilizado en la configuración del store de Redux.
export default userSlice.reducer;
