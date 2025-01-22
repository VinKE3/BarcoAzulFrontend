/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useEffect, useState } from "react";
import { FaMoneyBillTransfer, FaPaste } from "react-icons/fa6";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { CheckBox } from "../../../../../../../components";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  defaultMovimientoBancarioTablas,
  ICombo,
  IMovimientoBancario,
  IDocumentoCompraCuentaCorriente,
  IMovimientoBancarioTablas,
  IMoneda,
  IMotivosNota,
  IPorcentajes,
  ITiposPago,
  ICuentaCorrienteBancaria,
} from "../../../../../../../models";

import {
  handleHelpModal,
  helpModalMap,
  handleSelectCuentaBancaria,
  handleSelectPersonal,
  handleClearMensajes,
  handleFocus,
  handleToast,
  handleOpenModal,
} from "../../../../../../../util";
import { BsFillCalculatorFill, BsFillEraserFill } from "react-icons/bs";
import { PiFileDoc } from "react-icons/pi";
interface IProps {
  data: IMovimientoBancario;
  setData: React.Dispatch<React.SetStateAction<IMovimientoBancario>>;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
}
const MovimientoBancarioCabecera = ({
  data,
  setData,
  handleData,
  handleGetTipoCambio,
}: IProps) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, extra } = globalContext;
  const { primer } = modal;
  const {
    tiposMovimiento,
    tiposOperacion,
    tiposRazonSocial,
    cuentasCorrientes,
  }: IMovimientoBancarioTablas = form.tablas || defaultMovimientoBancarioTablas;
  const { element } = extra;
  const { inputs } = element;
  const [filterMotivosVenta, setFilterMotivosVenta] = useState<IMotivosNota[]>(
    []
  );

  //#region Funciones

  //#region Funciones
  const handleOpenModal2 = async (origen: string): Promise<void> => {
    if (origen in helpModalMap) {
      await handleClearMensajes(setGlobalContext);
      handleHelpModal(setGlobalContext, helpModalMap[origen]);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleHelpModal(setGlobalContext, "proveedorFind");
  };

  console.log(data, "dataCabecera");

  //#endregion
  return (
    <div className="form-base-container nota-pedido-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="cuentaCorrienteId" className="label-base">
              Cta Cte
            </label>
            <select
              id="cuentaCorrienteId"
              name="cuentaCorrienteId"
              value={data.cuentaCorrienteId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {cuentasCorrientes.map((x: ICuentaCorrienteBancaria) => (
                <option key={x.cuentaCorrienteId} value={x.cuentaCorrienteId}>
                  {handleSelectCuentaBancaria(x)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="fechaEmision" className="label-base">
              Fecha
            </label>
            <input
              type="date"
              id="fechaEmision"
              name="fechaEmision"
              value={data.fechaEmision}
              onChange={handleData}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
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
                  disabled={data.detalles.length > 0}
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
          <div className="input-base-container-33">
            <label htmlFor="tipoMovimientoId" className="label-base">
              Movimiento
            </label>
            <select
              id="tipoMovimientoId"
              name="tipoMovimientoId"
              value={data.tipoMovimientoId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposMovimiento.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoOperacionId" className="label-base">
              Operación
            </label>
            <select
              id="tipoOperacionId"
              name="tipoOperacionId"
              value={data.tipoOperacionId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposOperacion.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label htmlFor="numeroOperacion" className="label-base">
              Número
            </label>
            <input
              id="numeroOperacion"
              name="numeroOperacion"
              value={data.numeroOperacion ?? ""}
              placeholder="Número"
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
              maxLength={10}
            />
          </div>
          {data.tipoMovimientoId === "EG" && data.tipoOperacionId === "TR" && (
            <>
              <div className="input-base-container-auto">
                {element.responsive === "full" && (
                  <span className="label-base-checkbox">-</span>
                )}
                <CheckBox
                  id="tieneCuentaDestino"
                  value={data.tieneCuentaDestino}
                  handleData={handleData}
                  disabled={primer.tipo === "consultar"}
                  label="Destino"
                />
              </div>
            </>
          )}
          {data.tieneCuentaDestino && (
            <div className="input-base-container-100">
              <label htmlFor="cuentaDestinoId" className="label-base">
                Cta Cte
              </label>
              <select
                id="cuentaDestinoId"
                name="cuentaDestinoId"
                value={data.cuentaDestinoId ?? ""}
                onChange={handleData}
                disabled={primer.tipo === "consultar"}
                className="input-base"
              >
                <option key="default" value="">
                  SELECCIONAR
                </option>
                {cuentasCorrientes.map((x: ICuentaCorrienteBancaria) => (
                  <option key={x.cuentaCorrienteId} value={x.cuentaCorrienteId}>
                    {handleSelectCuentaBancaria(x)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="tipoBeneficiarioId" className="label-base">
              Tipo Beneficiario
            </label>
            <select
              id="tipoBeneficiarioId"
              name="tipoBeneficiarioId"
              value={data.tipoBeneficiarioId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposRazonSocial.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          {data.tipoBeneficiarioId === "O" && (
            <>
              <div className="input-base-container-100">
                <label htmlFor="clienteProveedorNombre" className="label-base">
                  Nombre
                </label>
                <input
                  id="clienteProveedorNombre"
                  name="clienteProveedorNombre"
                  value={data.clienteProveedorNombre ?? ""}
                  placeholder="Nombre"
                  onChange={handleData}
                  autoFocus
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
            </>
          )}
          {data.tipoBeneficiarioId === "P" && (
            <>
              <div className="input-base-container-100">
                <label htmlFor="clienteProveedorNombre" className="label-base">
                  Proveedor
                </label>
                <div className="input-base-container-button">
                  <input
                    id="clienteProveedorNombre"
                    name="clienteProveedorNombre"
                    placeholder="Proveedor"
                    value={data.clienteProveedorNombre ?? ""}
                    disabled
                    className={
                      primer.tipo !== "registrar"
                        ? "input-base"
                        : "input-base-button"
                    }
                  />
                  {primer.tipo === "registrar" && (
                    <button
                      ref={inputs["buttonProveedorFind"]}
                      id="buttonProveedorFind"
                      name="buttonProveedorFind"
                      title="Presione [ALT + C] para adjuntar proveedor."
                      accessKey="c"
                      onClick={() =>
                        handleHelpModal(setGlobalContext, "proveedorFind")
                      }
                      onKeyDown={handleKeyDown}
                      className="button-base-anidado button-base-bg-primary"
                    >
                      <TbDeviceIpadSearch
                        strokeWidth={2}
                        size="2rem"
                        className="button-base-icon"
                      />
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
          {data.tipoBeneficiarioId === "C" && (
            <>
              <div className="input-base-container-33">
                <label htmlFor="clienteProveedorId" className="label-base">
                  Documento Identidad
                </label>
                <div className="input-base-container-button">
                  <input
                    ref={inputs["clienteProveedorId"]}
                    id="clienteProveedorId"
                    name="clienteProveedorId"
                    placeholder="Documento Identidad"
                    value={data.clienteProveedorId ?? ""}
                    disabled
                    className={
                      primer.tipo === "consultar"
                        ? "input-base"
                        : "input-base-button"
                    }
                  />
                  {primer.tipo !== "consultar" && (
                    <button
                      ref={inputs["buttonClienteFind"]}
                      id="buttonClienteFind"
                      name="buttonClienteFind"
                      title="Presione [ALT + C] para adjuntar cliente."
                      accessKey="c"
                      onClick={() => handleOpenModal2("buttonClienteFind")}
                      onKeyDown={handleKeyDown}
                      className="button-base-anidado button-base-bg-primary"
                    >
                      <TbDeviceIpadSearch
                        strokeWidth={2}
                        size="2rem"
                        className="button-base-icon"
                      />
                    </button>
                  )}
                </div>
              </div>
              <div className="input-base-container-100">
                <label htmlFor="clienteProveedorNombre" className="label-base">
                  Nombre
                </label>
                <input
                  ref={inputs["clienteProveedorNombre"]}
                  id="clienteProveedorNombre"
                  name="clienteProveedorNombre"
                  placeholder="Nombre"
                  value={data.clienteProveedorNombre ?? ""}
                  onChange={handleData}
                  autoComplete="off"
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                />
              </div>
            </>
          )}
        </div>

        <div className="input-base-container-100">
          <label htmlFor="concepto" className="label-base">
            Concepto
          </label>
          <input
            id="concepto"
            name="concepto"
            value={data.concepto ?? ""}
            placeholder="Concepto"
            onChange={handleData}
            disabled={primer.tipo === "consultar"}
            className="input-base"
          />
        </div>
        <div className="input-base-row">
          <div className="input-base-container-25">
            <label htmlFor="porcentajeITF" className="label-base">
              Porcentaje ITF
            </label>
            <input
              ref={inputs["porcentajeITF"]}
              type="number"
              inputMode="numeric"
              id="porcentajeITF"
              name="porcentajeITF"
              placeholder="porcentajeITF"
              value={data.porcentajeITF ?? 0}
              onChange={handleData}
              autoComplete="off"
              min={0}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="montoITF" className="label-base">
              Monto ITF
            </label>
            <input
              ref={inputs["montoITF"]}
              type="number"
              inputMode="numeric"
              id="montoITF"
              name="montoITF"
              placeholder="montoITF"
              value={data.montoITF ?? 0}
              onChange={handleData}
              autoComplete="off"
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="monto" className="label-base">
              Monto Aplicado
            </label>
            <input
              ref={inputs["monto"]}
              type="number"
              inputMode="numeric"
              id="monto"
              name="monto"
              placeholder="monto"
              value={data.monto ?? 0}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={0.1}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="total" className="label-base">
              Monto Total
            </label>
            <input
              ref={inputs["total"]}
              type="number"
              inputMode="numeric"
              id="total"
              name="total"
              placeholder="total"
              value={data.total ?? 0}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={0.1}
              disabled
              className="input-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovimientoBancarioCabecera;
