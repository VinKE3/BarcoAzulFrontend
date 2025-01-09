export interface ICotizacionAdicional {
  clienteVarios: boolean;
  articuloVarios: boolean;
  editarCargo: boolean;
}

export const defaultCotizacionAdicional: ICotizacionAdicional = {
  clienteVarios: false,
  articuloVarios: false,
  editarCargo: false,
};
