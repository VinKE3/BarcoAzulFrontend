export interface IUsuarioConfiguracion {
    bloquearCampoAlmacen: boolean;
    bloquearFechaEmision: boolean;
    bloquearPrecioEnVentas: boolean;
  }
  
  export const defaultUsuarioConfiguracion: IUsuarioConfiguracion = {
    bloquearCampoAlmacen: false,
    bloquearFechaEmision: false,
    bloquearPrecioEnVentas: false,
  };