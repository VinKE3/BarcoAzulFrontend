/* eslint-disable @typescript-eslint/no-unused-expressions */

import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { comprasRoutes, privateRoutes } from "../../../../../common";
import {
  BasicKeyHandler,
  ButtonFooter,
  Messages,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICuentaPorCobrar,
  defaultCuentaPorCobrar,
} from "../../../../../models";
import {
  handleBackPage,
  handleInputType,
  handleResetContext,
  handleSetInputs,
} from "../../../../../util";
import { CuentaPorCobrarCabecera, CuentaPorCobrarDetalle } from "./components";

const CuentaPorCobrarForm: React.FC = () => {
  //#region useState
  const navigate = useNavigate();
  const backPage: string = `/${privateRoutes.COMPRAS}/${comprasRoutes.CUENTASPORPAGAR}`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes } = globalContext;
  const mensaje = mensajes.filter((x) => x.origen === "form" && x.tipo >= 0);
  const [data, setData] = useState<ICuentaPorCobrar>(
    form.data || defaultCuentaPorCobrar
  );
  const inputs = useFocus(
    "motivoIngresoId",

    //Detalles
    "pastilla",
    "cantidad",
    //Detalles

    //Botones
    "buttonArticuloFind",
    "buttonLoteFind"
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
  //#endregion

  //#region Funciones
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
  //#endregion
  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-sub-title">{`${modal.primer.tipo} Cuenta Por Cobrar`}</h4>
      </div>

      {mensaje.length > 0 && <Messages />}

      <BasicKeyHandler selector={"guia-remision-form"}>
        <div className="form-base">
          <CuentaPorCobrarCabecera data={data} handleData={handleData} />
          <CuentaPorCobrarDetalle dataGeneral={data} setDataGeneral={setData} />
        </div>

        <ButtonFooter
          data={data}
          backPage={backPage}
          inputFocus="motivoIngresoId"
        />
      </BasicKeyHandler>
    </div>
  );
};

export default CuentaPorCobrarForm;
