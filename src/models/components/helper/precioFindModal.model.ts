import { IArticuloCompleto } from "../../entidades";

export interface IPrecios {
  precioVenta1: number;
  precioVenta2: number;
  precioVenta3: number;
  precioVenta4: number;
  precioCompra: number;
  precioCompraDescuento: number;
}

export const defaultPrecios: IPrecios = {
  precioVenta1: 0,
  precioVenta2: 0,
  precioVenta3: 0,
  precioVenta4: 0,
  precioCompra: 0,
  precioCompraDescuento: 0,
};

export interface IPrecioFindModal {
  articulo: IArticuloCompleto;
  inputFocus: string;
}

export interface IPrecioFind extends IPrecioFindTable {
  origen: string;
}

export interface IPrecioFindTable {
  id: string;
  precio: number;
}
