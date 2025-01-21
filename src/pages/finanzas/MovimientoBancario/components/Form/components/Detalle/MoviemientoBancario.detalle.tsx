import { ChangeEvent, useEffect, useState } from "react";
import { BsFillCartPlusFill, BsFillEraserFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa6";
import { IoMdPricetags } from "react-icons/io";
import {
  CheckBox,
  Messages,
  PrecioFindModal,
  Table,
} from "../../../../../../../components";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  IConceptoCompleto,
  IMovimientoBancario,
  IMovimientoBancarioDetalle,
  defaultConceptoCompleto,
  defaultMovimientoBancarioDetalle,
} from "../../../../../../../models";
import {
  getId,
  handleClearMensajes,
  handleConvertPrecios,
  handleCrudDetalles,
  handleFocus,
  handleHelpModal,
  handleInputType,
  handleNumber,
  handleSetTextos,
  handleToast,
  handleValCantidad,
  handleValPrecio,
  roundNumber,
} from "../../../../../../../util";
import { useMovimientoBancarioDetalleColumn } from "../../../Column";
interface IProps {
  dataGeneral: IMovimientoBancario;
  setDataGeneral: React.Dispatch<React.SetStateAction<IMovimientoBancario>>;
  handleDataGeneral: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
}

const MovimientoBancarioDetalle: React.FC<IProps> = ({
  dataGeneral,
  setDataGeneral,
  handleDataGeneral,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra, api } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { simplificado, element } = extra;
  const { inputs } = element;
  const mensaje = mensajes.filter((x) => x.origen === "detalle" && x.tipo >= 0);

  const [data, setData] = useState<IMovimientoBancarioDetalle>(
    defaultMovimientoBancarioDetalle
  );

  const columns = useMovimientoBancarioDetalleColumn(primer.tipo);

  const footerItems = [
    { text: "TOTAL", value: Number(dataGeneral.total), show: true },
  ];
  //#endregion

  //#region useEffect
  // useEffect(() => {
  //   retorno &&
  //     retorno.origen === "conceptoFind" &&
  //     handleConceptoCompleto(retorno.id as string);
  //   retorno &&
  //     retorno.origen === "detalle" &&
  //     handleActionBar(retorno as IMovimientoBancarioDetalle);
  // }, [retorno]);

  // useEffect(() => {
  //   data.tipo !== "registrar" && handleConceptoCompleto(data.conceptoId);
  // }, [data.tipo]);

  // useEffect(() => {
  //   conceptoCompleto.id !== "" &&
  //     data.tipo === "registrar" &&
  //     handleFillDetalle();
  // }, [conceptoCompleto]);
  //#endregion

  const handleData = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
        case "cantidad":
          newData.abono;
          break;

        default:
          break;
      }
      return newData;
    });
  };

  return <div>MovimientoBancarioDetalle</div>;
};

export default MovimientoBancarioDetalle;
