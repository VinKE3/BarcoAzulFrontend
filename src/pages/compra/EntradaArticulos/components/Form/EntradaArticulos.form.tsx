/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  almacenRoutes,
  comprasRoutes,
  privateRoutes,
} from "../../../../../common";
import {
  ArticuloFindModal,
  BasicKeyHandler,
  ButtonFooter,
  Messages,
  ProveedorFindModal,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IEntradaArticulos,
  IEntradaArticulosVarios,
  defaultEntradaArticulosVarios,
  IProveedorFind,
  defaultEntradaArticulos,
} from "../../../../../models";
import {
  handleBackPage,
  handleInputType,
  handleResetContext,
  handleSetInputs,
  handleSetRetorno,
  handleTipoCambio,
} from "../../../../../util";
import {
  EntradaArticulosCabecera,
  EntradaArticulosDetalle,
} from "./components";

const EntradaArticulosForm: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.COMPRAS}/${comprasRoutes.ENTRADAARTICULOS}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { primer, segundo } = modal;
  const { simplificado } = extra;
  const { retorno } = form;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<IEntradaArticulos>(
    form.data || defaultEntradaArticulos
  );
  console.log(data, "data");
  const [adicional, setAdicional] = useState<IEntradaArticulosVarios>(
    defaultEntradaArticulosVarios
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
    primer.tipo === "registrar" && handleLoad();
  }, [primer.tipo]);

  useEffect(() => {
    retorno && retorno.origen === "proveedorFind" && handleProveedor(retorno);
  }, [retorno]);
  //#endregion

  //#region Funciones

  const handleLoad = async (): Promise<void> => {
    if (primer.tipo === "registrar") {
      const tipoCambio: number = await handleGetTipoCambio(true, false);
      setData((x) => ({ ...x, tipoCambio }));
    }
  };

  const handleProveedor = (proveedor: IProveedorFind): void => {
    const { id, numeroDocumentoIdentidad, nombre, direccion } = proveedor;

    setData((x) => ({
      ...x,
      proveedorId: id,
      proveedorNumeroDocumentoIdentidad: numeroDocumentoIdentidad,
      proveedorNombre: nombre,
      proveedorDireccion: direccion,
    }));
  };

  const handleGetTipoCambio = async (
    retorno: boolean = false,
    showError: boolean = true
  ): Promise<number> => {
    const { precioVenta } = await handleTipoCambio(
      globalContext,
      setGlobalContext,
      data.fechaEmision,
      inputs,
      false,
      "form",
      showError
    );

    if (!retorno) {
      setData((x) => ({ ...x, tipoCambio: precioVenta }));
      return 0;
    }

    if (precioVenta === 0) return 0;
    return precioVenta;
  };
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };

      switch (name) {
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
  //#endregion
  return (
    <>
      <div className="main-base">
        <div className="main-header">
          <h4 className="main-header-sub-title">{`${modal.primer.tipo} ingreso de artículos`}</h4>
        </div>

        {mensaje.length > 0 && <Messages />}

        <BasicKeyHandler selector={"guia-remision-form"}>
          <div className="form-base">
            <EntradaArticulosCabecera
              data={data}
              handleData={handleData}
              handleGetTipoCambio={handleGetTipoCambio}
            />
            <EntradaArticulosDetalle
              dataGeneral={data}
              setDataGeneral={setData}
              adicional={adicional}
              handleAdicional={handleAdicional}
            />
          </div>

          <ButtonFooter
            data={data}
            backPage={backPage}
            inputFocus="motivoIngresoId"
          />
        </BasicKeyHandler>
      </div>
      {segundo.origen === "proveedorFind" && (
        <ProveedorFindModal inputFocus="tipoPagoId" />
      )}
      {segundo.origen === "articuloFind" && (
        <ArticuloFindModal inputFocus="cantidad" />
      )}
    </>
  );
};

export default EntradaArticulosForm;
