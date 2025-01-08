export interface IConsultaRUC {
  apellidos: string;
  direccion: string;
  direccionCompleta: string;
  nombre: string;
  nombres: string;
  numeroDocumentoIdentidad: string;
  ubigeo: any[];
}

export interface IConsultaTipoCambio {
  fecha: string,
  moneda: string;
  precioVenta: number;
  precioCompra: number;
}
