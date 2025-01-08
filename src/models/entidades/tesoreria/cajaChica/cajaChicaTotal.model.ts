export interface ICajaChicaTotal {
  id: number;
  tipoCobroId: string;
  tipoCobroDescripcion: string;

  totalSistemaPEN: number;
  totalCuadrePEN: number;
  diferenciaPEN: number;

  totalSistemaUSD: number;
  totalCuadreUSD: number;
  diferenciaUSD: number;
}

export const defaultCajaChicaTotal: ICajaChicaTotal = {
  id: 0,
  tipoCobroId: "",
  tipoCobroDescripcion: "",

  totalSistemaPEN: 0,
  totalCuadrePEN: 0,
  diferenciaPEN: 0,

  totalSistemaUSD: 0,
  totalCuadreUSD: 0,
  diferenciaUSD: 0,
};

export interface ICajaChicaTotalTable {
  tipoPagoDescripcion: string;
  tipoPagoId: string;
  totalPEN: number;
  totalUSD: number;
}

export interface ICajaChicaTotalFind {
  origen: string;
  totales: ICajaChicaTotal[];
}
