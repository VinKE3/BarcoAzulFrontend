export interface IMensajes {
  origen: string;
  tipo: number;
  textos: string[];
}
export const defaultMensajes: IMensajes = {
  origen: "global",
  tipo: -1,
  textos: [],
};
