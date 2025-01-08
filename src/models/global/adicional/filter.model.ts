import { format, startOfYear } from "date-fns";

export interface IFechaFilter {
  fechaInicio: string;
  fechaFin: string;
}

export const defaultFechaFilter: IFechaFilter = {
  fechaInicio: format(startOfYear(new Date()), "yyyy-MM-dd"),
  fechaFin: format(new Date(), "yyyy-MM-dd"),
};

export interface IDocumentoFilter extends IFechaFilter {
  numeroDocumento: string;
}

export const defaultDocumentoFilter: IDocumentoFilter = {
  ...defaultFechaFilter,
  numeroDocumento: "",
};
