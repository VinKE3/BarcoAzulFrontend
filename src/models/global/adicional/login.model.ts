export interface ILogin {
  usuario: string;
  clave: string;
}

export const defaultLogin: ILogin = {
  usuario: "",
  clave: "",
};
