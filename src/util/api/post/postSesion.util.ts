import { jwtDecode } from "jwt-decode";
import { AxiosCall, IDecodeToken, ILogin, IResponse, IToken, IUserCompleto } from "../../../models";
import { postService } from "../../../services";

/**
 * Realiza una solicitud HTTP POST para iniciar sesión y obtener un token.
 * @param callEndpoint - Función que realiza la llamada HTTP con configuración de Axios.
 * @param data - Datos de inicio de sesión que incluyen el usuario y la clave.
 * @returns Una promesa que resuelve con los datos del token (`IToken`).
 */
export const postSesion = async (
  callEndpoint: (axiosCall: AxiosCall<any>) => Promise<any>,
  data: ILogin
): Promise<IToken> => {
  const params = { usuario: data.usuario, clave: data.clave }; // Configuración de los parámetros
  const response: IResponse = await callEndpoint(postService("Sesion/Iniciar", params)); // Realiza la solicitud POST de inicio de sesión
  return response.data; // Devuelve el token obtenido
};

/**
 * Decodifica un token JWT para obtener información del usuario.
 * Esta función toma un token JWT y un refreshToken, extrae información de usuario y los devuelve en un objeto.
 * @param token - Token JWT que contiene la información del usuario.
 * @param refreshToken - Token de actualización (refresh token) para prolongar la sesión del usuario.
 * @returns Un objeto `IUserCompleto` con los datos del usuario extraídos del token.
 */
export const decodeUserToken = (token: string, refreshToken: string): IUserCompleto => {
  // Decodifica el token JWT para obtener información del usuario
  const decodeToken = jwtDecode(token);

  // Extrae información del token decodificado
  const id: string = (decodeToken as IDecodeToken)[
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
  ];
  const nickname: string = (decodeToken as IDecodeToken)["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const tipoUsuario: string = (decodeToken as IDecodeToken)[
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  ];
  const expirationToken: number = (decodeToken as IDecodeToken)["exp"];

  // Devolver un objeto con la información del usuario
  return {
    id,
    nickname,
    tipoUsuario,
    token,
    refreshToken,
    expirationToken,
  };
};
