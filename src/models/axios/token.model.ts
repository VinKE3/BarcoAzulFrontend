import { JwtPayload } from "jwt-decode";

export interface IToken {
  token: string;
  refreshToken: string;
  expiration: string;
}

export interface IDecodeToken extends JwtPayload {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": string; // ID del usuario
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string; // Nombre de usuario
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string; // Tipo de usuario
  exp: number; // Fecha de expiración del token
  refreshToken: string; // Token de actualización
}
