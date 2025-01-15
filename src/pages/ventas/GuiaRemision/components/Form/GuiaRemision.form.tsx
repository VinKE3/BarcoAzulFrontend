import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { privateRoutes, ventasRoute } from "../../../../../common";
import {
  ArticuloFindModal,
  BasicKeyHandler,
  ButtonFooter,
  ClienteFindModal,
  Messages,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IClienteCompleto,
  IClienteContacto,
  IClienteDireccion,
  IClienteFind,
  IGuiaRemision,
  IGuiaRemisionAdicional,
  IGuiaRemisionDetalle,
  IGuiaRemisionTablas,
  defaultClienteCompleto,
  defaultGuiaRemision,
  defaultGuiaRemisionAdicional,
  defaultGuiaRemisionTablas,
} from "../../../../../models";
import {
  get,
  getId,
  handleBackPage,
  handleFocus,
  handleInputType,
  handleResetContext,
  handleSelectTipoPago,
  handleSetErrorMensaje,
  handleSetInputs,
  handleSetRetorno,
  handleTipoCambio,
  handleToast,
  handleUpdateTablas,
  roundNumber,
} from "../../../../../util";
import { GuiaRemisionCabecera, GuiaRemisionDetalle } from "./components";

const GuiaRemisionForm: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.VENTAS}/${ventasRoute.GUIASREMISION}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const {}: IGuiaRemisionTablas = form.tablas || defaultGuiaRemisionTablas;
  const { simplificado } = extra;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<IGuiaRemision>(
    form.data || defaultGuiaRemision
  );
  const [adicional, setAdicional] = useState<IGuiaRemisionAdicional>(
    defaultGuiaRemisionAdicional
  );
  const inputs = useFocus(
    "tipoDocumentoId",
    "clienteId",
    "tipoCambio",
    "guiaRemision",

    //Detalles
    "descripcion",
    "cantidad",
    "precioUnitario",
    "importe",
    //Detalles

    //Botones
    "buttonClienteFind",
    "buttonAnticipoHelp",
    "buttonArticuloFind"
    //Botones
  );
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleBackPage(globalContext, navigate, backPage);

    return () => {
      const resetContext = () => {
        handleResetContext(
          setGlobalContext,
          false,
          true,
          true,
          true,
          true,
          false
        );
      };
      resetContext();
    };
  }, []);

  useEffect(() => {
    !form.data && handleBackPage(globalContext, navigate, backPage);
  }, [form]);

  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    handleLoad();
  }, [primer.tipo]);

  // useEffect(() => {
  //   retorno && retorno.origen === "clienteFind" && handleCliente(retorno);
  // }, [retorno]);

  // useEffect(() => {
  //   data.detalles && handleTotales(data.detalles);
  // }, [data.detalles]);

  // useEffect(() => {
  //   data.detalles && handleTotales(data.detalles);
  // }, [
  //   data.incluyeIGV,
  //   data.porcentajeIGV,
  //   data.porcentajePercepcion,
  //   data.porcentajeRetencion,
  // ]);
  //#endregion
  //#region Funciones

  const handleLoad = async (): Promise<void> => {
    // handleGetClienteDireccion(data.clienteId);
  };

  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
        case "fechaEmision":
          handleToast(
            "info",
            "Si la fecha de emisión ha sido cambiada, no olvide consultar el tipo de cambio."
          );
          break;
        default:
          break;
      }
      return newData;
    });
  };

  const handleAdicional = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, type, value: rawValue } = target;
    const value =
      type === "checkbox" ? (target as HTMLInputElement).checked : rawValue;
    setAdicional((x) => ({ ...x, [name]: value }));

    const retorno = { origen: name, [name]: value };
    handleSetRetorno(setGlobalContext, retorno);
  };
  const handleNumero = (): void => {
    let num = data.numero;
    if (num.length < 10) {
      num = ("0000000000" + num).slice(-10);
    }
    setData((x) => ({
      ...x,
      numero: num,
    }));
    return;
  };
  const handleSerie = (): void => {
    let serie = data.serie;
    if (serie.length < 4) {
      serie = ("0000" + serie).slice(-4);
    }
    setData((x) => ({
      ...x,
      serie: serie,
    }));
    return;
  };

  return <div>GuiaRemisionForm</div>;
};

export default GuiaRemisionForm;
