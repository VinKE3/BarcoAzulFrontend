export interface IConfiguracionLoteModalFilter {
  numero: string;
}

export const defaultConfiguracionLoteModalFilter: IConfiguracionLoteModalFilter = {
  numero: "",
};

export interface IConfiguracionLoteModalTable {
  articuloId: string;
  fechaVencimiento: string;
  habilitarParaVenta: boolean;
  id: string;
  loteId: string;
  numero: string;
  porDefecto: boolean;
  stockCajas: number;
  stockUnidades: number;
}
