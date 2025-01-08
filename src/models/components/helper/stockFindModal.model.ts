export interface IStockFindModal {
  title: string;
  data: IStockFindTable[];
}

export interface IStockFindTable {
  almacenId: string;
  almacenDescripcion: string;
  stockCajas: number;
  stockUnidades: number;
}
