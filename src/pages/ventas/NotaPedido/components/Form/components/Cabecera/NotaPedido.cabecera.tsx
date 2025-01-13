/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState, useEffect } from "react";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useGlobalContext } from "../../../../../../../hooks";
import { CheckBox } from "../../../../../../../components";
import {
  ICombo,
  IMoneda,
  INotaPedido,
  INotaPedidoTablas,
  ITiposPago,
  defaultNotaPedidoTablas,
  IMotivosNota,
  IPorcentajes,
} from "../../../../../../../models";
import { handleHelpModal } from "../../../../../../../util";

const NotaPedidoCabecera = () => {
  return <div>NotaPedidoCabecera</div>;
};

export default NotaPedidoCabecera;
