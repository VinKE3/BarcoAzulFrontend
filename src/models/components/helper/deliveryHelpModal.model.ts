import { IPedidoDelivery } from "../../entidades";

export interface IDeliveryHelpModal {
  dataDelivery: IPedidoDelivery;
}

export interface IDeliveryHelp {
  origen: string;
  data: IPedidoDelivery;
}
