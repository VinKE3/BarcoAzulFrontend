export interface IPassword {
    claveAnterior: string;
    claveNueva: string;
    claveNuevaConfirmacion: string;
  }
  
  export const defaultIPassword: IPassword = {
    claveAnterior: "",
    claveNueva: "",
    claveNuevaConfirmacion: "",
  };
  