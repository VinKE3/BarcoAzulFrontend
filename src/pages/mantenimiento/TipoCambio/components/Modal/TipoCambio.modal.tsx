import React, { ChangeEvent, useEffect, useState } from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { BasicKeyHandler, ButtonFooter, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { ITipoCambio } from "../../../../../models";
import {
  getConsultarTipoCambio,
  handleClearMensajes,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
} from "../../../../../util";

const TipoCambioModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form } = globalContext;
  const { primer } = modal;
  const [data, setData] = useState<ITipoCambio>(form.data);
  const inputs = useFocus("id", "precioCompra");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleGetTipoCambio = async (): Promise<void> => {
    try {
      await handleClearMensajes(setGlobalContext);
      const param = new URLSearchParams({ fecha: data.id });
      const { precioCompra, precioVenta } = await getConsultarTipoCambio(globalContext, param);

      setData((x) => ({ ...x, precioCompra, precioVenta }));
      handleFocus(inputs["precioCompra"]);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, api.origen);
      handleFocus(inputs["id"]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key === "Enter") {
      handleGetTipoCambio();
    }
  };
  //#endregion

  return (
    <BasicKeyHandler selector="tipo-cambio-modal">
      <ModalForm title={`${primer.tipo} tipo de cambio`} className="tipo-cambio-modal sm:min-w-[50%]">
        <div className="modal-base-content">
          <div className="input-base-row">
            <div className="input-base-container-100">
              <label htmlFor="id" className="label-base">
                Fecha
              </label>
              <div className="input-base-container-button">
                <input
                  type="date"
                  ref={inputs["id"]}
                  id="id"
                  name="id"
                  value={data.id}
                  onChange={handleData}
                  autoFocus
                  disabled={primer.tipo !== "registrar"}
                  className={primer.tipo === "registrar" && !api.loading ? "input-base-button" : "input-base"}
                />
                {primer.tipo === "registrar" && !api.loading && (
                  <button
                    id="buttonConsultarTipoCamibo"
                    name="buttonConsultarTipoCambio"
                    title="Presione [ALT + Z] para consultar a SUNAT."
                    accessKey="z"
                    onClick={handleGetTipoCambio}
                    onKeyDown={handleKeyDown}
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <FaMoneyBillTransfer strokeWidth={2} size="2rem" className="button-base-icon" />
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="input-base-row">
            <div className="input-base-container-50">
              <label htmlFor="precioCompra" className="label-base">
                Precio Compra
              </label>
              <input
                type="number"
                inputMode="numeric"
                ref={inputs["precioCompra"]}
                id="precioCompra"
                name="precioCompra"
                value={data.precioCompra}
                onChange={handleData}
                autoFocus={primer.tipo == "modificar"}
                disabled={primer.tipo == "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-50">
              <label htmlFor="precioVenta" className="label-base">
                Precio Venta
              </label>
              <input
                type="number"
                inputMode="numeric"
                id="precioVenta"
                name="precioVenta"
                value={data.precioVenta}
                disabled={primer.tipo == "consultar"}
                onChange={handleData}
                className="input-base"
              />
            </div>
          </div>
        </div>
        <ButtonFooter data={data} inputFocus="id" />
      </ModalForm>
    </BasicKeyHandler>
  );
};

export default TipoCambioModal;
