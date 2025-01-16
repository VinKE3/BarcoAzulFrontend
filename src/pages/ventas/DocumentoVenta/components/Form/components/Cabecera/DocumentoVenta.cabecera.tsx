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
  IClienteDireccion,
  IDocumentoVenta,
  IDocumentoVentaTablas,
  ITiposPago,
  IPorcentajes,
  IPersonal,
  ITipoVenta,
  defaultDocumentoVentaTablas,
  ICuentaCorrienteBancaria,
} from "../../../../../../../models";
import {
  handleHelpModal,
  helpModalMap,
  handleSelectCuentaBancaria,
  handleSelectPersonal,
  handleClearMensajes,
} from "../../../../../../../util";
interface IProps {
  data: IDocumentoVenta;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
  handleNumero: (x: any) => Promise<void> | void;
  handleSerie: (x: any) => Promise<void> | void;
}
const DocumentoVentaCabecera: React.FC<IProps> = ({
  data,
  handleData,
  handleGetTipoCambio,
  handleNumero,
  handleSerie,
}) => {
  return <div>DocumentoVentaCabecera</div>;
};

export default DocumentoVentaCabecera;
