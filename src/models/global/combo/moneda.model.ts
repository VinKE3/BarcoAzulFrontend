export interface IMoneda {
  id: string;
  abreviatura: string;
  descripcion: string;
}

export const defaultMoneda: IMoneda = {
  id: "",
  abreviatura: "",
  descripcion: "",
};
