import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { IResponseFull, IToken } from "../models/index.ts";
import { updateUser } from "../redux/states/user.state.ts";
import store from "../redux/store";
import { apiURL, handleError } from "../util";

/**
 * Este interceptor de Axios es esencial para aplicaciones que requieren autenticación basada en tokens y necesitan manejar errores de red de manera centralizada.
 */
export const axiosInterceptor = () => {
  //#region Funciones
  // Función para actualizar los encabezados de la solicitud con el token de usuario
  const updateHeader = (request: AxiosRequestConfig) => {
    // Accede al estado de Redux para obtener la información del usuario
    const usuario = store.getState().user;
    // Configura los encabezados de la solicitud con el token de autenticación y tipo de contenido
    request.headers = {
      Authorization: `Bearer ${usuario.token ?? ""}`, // Token de autenticación
      "Content-Type": "application/json", // Tipo de contenido JSON
    };
    return request;
  };
  //#endregion

  //#region Interceptors
  // Intercepta todas las solicitudes antes de ser enviadas
  axios.interceptors.request.use((request): any => {
    // Actualiza los encabezados de la solicitud con el token de usuario
    return updateHeader(request);
  });

  // Intercepta todas las respuestas antes de ser procesadas por la aplicación
  axios.interceptors.response.use(
    (response: AxiosResponse<any, any>) => {
      // Devuelve la respuesta original si no hay errores
      return response;
    },
    async (error) => {
      const { response }: { response: IResponseFull | undefined } = error;
      const messageError = await handleError(error);

      if (response) {
        const { status } = response;
        // Manejo de errores específicos por código de estado
        if (status === 401) {
          // Error 401: Token de autorización inválido
          const { token, refreshToken } = store.getState().user;
          if (token) {
            try {
              // Llamada para actualizar el token de sesión
              const result = await axios.post(`${apiURL}/Sesion/ActualizarToken`, { token, refreshToken });

              if (typeof result === "string") {
                // Redirige al usuario a la página de inicio de sesión si hay un error
                window.location.href = "/login";
              } else {
                const { data } = result;
                if (data) {
                  const { token, refreshToken } = data.data as IToken;
                  // Actualiza el token y refreshToken del usuario en el almacenamiento global (Redux)
                  store.dispatch(updateUser({ token, refreshToken }));
                  // Reintenta la solicitud original después de obtener el nuevo token
                  const request = error.config;
                  //Actualiza el beader
                  request.headers.Authorization = `Bearer ${token ?? ""}`;
                  return axios(request);
                }
              }
            } catch (err) {
              // Redirige al usuario a la página de inicio de sesión si hay un error al actualizar el token
              window.location.href = "/login";
            }
          }
        } else {
          // Resuelve la promesa para que la aplicación pueda manejar el error localmente
          Promise.resolve(error);
        }
      }

      // Lanza el error para que la aplicación lo maneje
      throw messageError;
    }
  );
  //#endregion
};
