export interface IPedidoDelivery {
  clienteNumeroDocumentoIdentidad: string;
  clienteNombre: string;
  telefono: string | null;
  celular1: string | null;
  celular2: string | null;
  direccionDespacho: string;
  referencia: string | null;
}

export const defaultPedidoDelivery: IPedidoDelivery = {
  clienteNumeroDocumentoIdentidad: "",
  clienteNombre: "",
  telefono: null,
  celular1: null,
  celular2: null,
  direccionDespacho: "",
  referencia: null,
};