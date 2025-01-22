/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  defaultCuadreStockTablas,
  ICuadreStock,
  ICuadreStockTablas,
  IMoneda,
  IPersonal,
} from "../../../../../../../models";
import { handleSelectPersonal } from "../../../../../../../util";

interface IProps {
  data: ICuadreStock;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
}

const CuadreStockCabecera: React.FC<IProps> = ({
  data,
  handleData,
  handleGetTipoCambio,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, extra } = globalContext;
  const { primer } = modal;
  const {
    vendedores,

    monedas,
  }: ICuadreStockTablas = form.tablas || defaultCuadreStockTablas;
  const { element } = extra;
  const { inputs } = element;

  //#region Funciones
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;
    e.stopPropagation();
  };

  //#endregion
  return (
    <div className="form-base-container nota-pedido-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-20">
            <label htmlFor="tipoDocumentoId" className="label-base">
              Código de Registro
            </label>
            <input
              id="tipoDocumentoId"
              name="tipoDocumentoId"
              placeholder="Código de Registro"
              value={data.tipoDocumentoId ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="fechaRegistro" className="label-base">
              F. Emisión
            </label>
            <input
              type="date"
              id="fechaRegistro"
              name="fechaRegistro"
              value={data.fechaRegistro}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="monedaId" className="label-base">
              Moneda
            </label>
            <select
              id="monedaId"
              name="monedaId"
              value={data.monedaId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {monedas.map((x: IMoneda) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoCambio" className="label-base">
              Tipo de Cambio
            </label>
            <div className="input-base-container-button">
              <input
                type="number"
                inputMode="numeric"
                ref={inputs["tipoCambio"]}
                id="tipoCambio"
                name="tipoCambio"
                value={data.tipoCambio}
                disabled
                className={
                  primer.tipo !== "consultar" && !api.loading
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" && !api.loading && (
                <button
                  id="buttonConsultarTipoCambio"
                  name="buttonConsultarTipoCambio"
                  title="Presione [ALT + Z] para consultar a SUNAT."
                  accessKey="z"
                  onClick={() => handleGetTipoCambio(false)}
                  onKeyDown={handleKeyDown}
                  // disabled={data.detalles.length > 0}
                  className="button-base-anidado button-base-bg-primary"
                >
                  <FaMoneyBillTransfer
                    strokeWidth={2}
                    size="2rem"
                    className="button-base-icon"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="responsableId" className="label-base">
              Vendedor
            </label>
            <select
              id="responsableId"
              name="responsableId"
              value={data.responsableId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {vendedores.map((x: IPersonal) => (
                <option key={x.id} value={x.id}>
                  {handleSelectPersonal(x)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-base-container-100">
          <label htmlFor="observacion" className="label-base">
            Observación
          </label>
          <input
            id="observacion"
            name="observacion"
            value={data.observacion ?? ""}
            placeholder="Observación"
            onChange={handleData}
            autoFocus
            disabled={primer.tipo === "consultar"}
            className="input-base"
          />
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="totalSobra" className="label-base">
              Total Sobra
            </label>
            <input
              id="totalSobra"
              name="totalSobra"
              value={data.totalSobra}
              placeholder="Total Sobra"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="totalFalta" className="label-base">
              Total Falta
            </label>
            <input
              id="totalFalta"
              name="totalFalta"
              value={data.totalFalta}
              placeholder="Total Falta"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="saldoTotal" className="label-base">
              Saldo Total
            </label>
            <input
              id="saldoTotal"
              name="saldoTotal"
              value={data.saldoTotal}
              placeholder="Saldo Total"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuadreStockCabecera;
