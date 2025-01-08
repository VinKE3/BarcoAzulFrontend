export interface IArea {
  name: string;
  title: string;
}

export const defaultAreas: IArea[] = [
  { name: "articulo", title: "Artículos" },
  { name: "venta", title: "Ventas" },
  { name: "compra", title: "Compras" },
];

export interface IInforme {
  area: string;
  name: string;
  title: string;
  menu: string;
}

export const defaultInformes: IInforme[] = [
  { area: "articulo", name: "kardexArticulo", title: "Kardex Artículo", menu: "Informes/Articulos/KardexArticulo" },
  { area: "venta", name: "ventaGeneral", title: "Venta General", menu: "Informes/Ventas/VentaGeneral" },
  { area: "venta", name: "registroVenta", title: "Registro Venta", menu: "Informes/Ventas/RegistroVenta" },
  { area: "venta", name: "ventaMensual", title: "Venta Mensual", menu: "Informes/Ventas/VentaMensual" },
  { area: "venta", name: "ventaPorVendedor", title: "Venta por Vendedor", menu: "Informes/Ventas/VentaPorVendedor" },
  { area: "venta", name: "ventaPorCliente", title: "Venta por Cliente", menu: "Informes/Ventas/VentaPorCliente" },
  { area: "venta", name: "ventaPorArticulo", title: "Venta por Artículo", menu: "Informes/Ventas/VentaPorArticulo" },
  { area: "venta", name: "ventaAnulada", title: "Venta Anulada", menu: "Informes/Ventas/VentaAnulada" },
  { area: "compra", name: "compraGeneral", title: "Compra General", menu: "Informes/Compras/CompraGeneral" },
  { area: "compra", name: "compraMensual", title: "Compra Mensual", menu: "Informes/Compras/CompraMensual" },
  { area: "compra", name: "actaRecepcion", title: "Acta de Recepción", menu: "Informes/Compras/ActaRecepcion" },
];
