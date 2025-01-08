import { defaultDocumento, IDocumento } from "../../../global";
import { CrudType } from "../../../types";

export interface IDocumentoVentaPedido extends IDocumento {
  tipo: CrudType;
  id: string;
}

export const defaultDocumentoVentaPedido: IDocumentoVentaPedido = {
  ...defaultDocumento,
  tipo: "registrar",
  id: "",
};

export interface IDocumentoVentaPedidoFind extends IDocumentoVentaPedido {
  origen: string;
}
