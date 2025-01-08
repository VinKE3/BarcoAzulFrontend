import { format } from "date-fns";

export interface IArticuloFaltante {
  id: number;
  puntoVentaId: string;
  articuloId: string;
  revisado: boolean;
  fechaCreacion: string | null;
  puntoVentaDescripcion: string;
  articuloDescripcion: string;
}

export const defaultArticuloFaltante: IArticuloFaltante = {
  id: 0,
  puntoVentaId: "",
  articuloId: "",
  revisado: false,
  fechaCreacion: format(new Date(), "yyyy-MM-dd"),
  puntoVentaDescripcion: "",
  articuloDescripcion: "",
};
