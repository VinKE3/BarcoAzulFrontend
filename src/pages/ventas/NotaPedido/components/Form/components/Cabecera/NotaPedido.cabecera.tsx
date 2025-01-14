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
  INotaPedido,
  INotaPedidoTablas,
  ITiposPago,
  IPorcentajes,
  IPersonal,
  ITipoVenta,
  defaultNotaPedidoTablas,
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
  data: INotaPedido;
  handleData: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleGetTipoCambio: (retorno: boolean) => Promise<number>;
  handleNumero: (x: any) => Promise<void> | void;
  handleSerie: (x: any) => Promise<void> | void;
}
const NotaPedidoCabecera: React.FC<IProps> = ({
  data,
  handleData,
  handleGetTipoCambio,
  handleNumero,
  handleSerie,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, extra } = globalContext;
  const { primer } = modal;
  const {
    tiposDocumento,
    vendedores,
    direcciones,
    tiposVenta,
    tiposCobro,
    cuentasCorrientes,
    monedas,
    porcentajesIGV,
    serie,
  }: INotaPedidoTablas = form.tablas || defaultNotaPedidoTablas;
  const { element } = extra;
  const { inputs } = element;

  //#region Funciones
  const handleOpenModal = async (origen: string): Promise<void> => {
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

  //#endregion

  return (
    <div className="form-base-container nota-pedido-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-20">
            <label htmlFor="id" className="label-base">
              Documento N°
            </label>
            <input
              id="id"
              name="id"
              placeholder="Documento N°"
              value={data.id ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="tipoDocumentoId" className="label-base">
              Tipo Documento
            </label>
            <select
              ref={inputs["tipoDocumentoId"]}
              id="tipoDocumentoId"
              name="tipoDocumentoId"
              value={data.tipoDocumentoId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposDocumento.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="serie" className="label-base">
              Serie
            </label>
            <input
              id="serie"
              name="serie"
              value={serie ?? ""}
              placeholder="Serie"
              onChange={handleData}
              onBlur={handleSerie}
              autoComplete="off"
              maxLength={4}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="numero" className="label-base">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              placeholder="Número"
              value={data.numero ?? ""}
              onChange={handleData}
              onBlur={handleNumero}
              autoComplete="off"
              maxLength={10}
              disabled={primer.tipo !== "registrar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="fechaEmision" className="label-base">
              F. Emisión
            </label>
            <input
              type="date"
              id="fechaEmision"
              name="fechaEmision"
              value={data.fechaEmision}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="fechaVencimiento" className="label-base">
              F. Vencimiento
            </label>
            <input
              type="date"
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={data.fechaVencimiento}
              onChange={handleData}
              autoFocus
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label
              htmlFor="clienteNumeroDocumentoIdentidad"
              className="label-base"
            >
              Documento Identidad
            </label>
            <div className="input-base-container-button">
              <input
                ref={inputs["clienteNumeroDocumentoIdentidad"]}
                id="clienteNumeroDocumentoIdentidad"
                name="clienteNumeroDocumentoIdentidad"
                placeholder="Documento Identidad"
                value={data.clienteNumeroDocumentoIdentidad ?? ""}
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
                  onClick={() => handleOpenModal("buttonClienteFind")}
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
            <label htmlFor="clienteNombre" className="label-base">
              Nombre
            </label>
            <input
              ref={inputs["clienteNombre"]}
              id="clienteNombre"
              name="clienteNombre"
              placeholder="Nombre"
              value={data.clienteNombre ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="clienteTelefono" className="label-base">
              Teléfono
            </label>
            <input
              id="clienteTelefono"
              name="clienteTelefono"
              placeholder="Teléfono"
              value={data.clienteTelefono ?? ""}
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-100">
            <label htmlFor="clienteDireccionId" className="label-base">
              Dirección
            </label>
            <select
              id="clienteDireccionId"
              name="clienteDireccionId"
              value={data.clienteDireccionId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {direcciones?.map((x: IClienteDireccion) => (
                <option key={x.id} value={x.id}>
                  {x.direccion}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="personalId" className="label-base">
              Vendedor
            </label>
            <select
              id="personalId"
              name="personalId"
              value={data.personalId ?? ""}
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
          <div className="input-base-container-33">
            <label htmlFor="tipoVentaId" className="label-base">
              Tipo Venta
            </label>
            <select
              id="tipoVentaId"
              name="tipoVentaId"
              value={data.tipoVentaId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposVenta.map((x: ITipoVenta) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="tipoCobroId" className="label-base">
              Tipo Cobro
            </label>
            <select
              ref={inputs["tipoCobroId"]}
              id="tipoCobroId"
              name="tipoCobroId"
              value={data.tipoCobroId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposCobro
                .filter(
                  (x: ITiposPago) => x.tipoVentaCompraId === data.tipoVentaId
                )
                .map((x: ITiposPago) => (
                  <option key={x.id} value={x.id}>
                    {x.descripcion}
                  </option>
                ))}
            </select>
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
        </div>
        <div className="input-base-row">
          {(data.tipoCobroId === "CH" || data.tipoCobroId === "DE") && (
            <>
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
                  autoFocus
                  disabled={
                    primer.tipo === "consultar" || data.detalles.length > 0
                  }
                  className="input-base"
                />
              </div>
              <div className="input-base-container-50">
                <label htmlFor="cuentaCorrienteId" className="label-base">
                  Cta Cte
                </label>
                <select
                  id="cuentaCorrienteId"
                  name="cuentaCorrienteId"
                  value={data.cuentaCorrienteDescripcion ?? ""}
                  onChange={handleData}
                  disabled={primer.tipo === "consultar"}
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {cuentasCorrientes.map((x: ICuentaCorrienteBancaria) => (
                    <option
                      key={x.cuentaCorrienteId}
                      value={x.cuentaCorrienteId}
                    >
                      {handleSelectCuentaBancaria(x)}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
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
            <label htmlFor="subTotal" className="label-base">
              SubTotal
            </label>
            <input
              id="subTotal"
              name="subTotal"
              value={data.subTotal}
              placeholder="Dirección"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="porcentajeIGV" className="label-base">
              IGV
            </label>
            <select
              ref={inputs["porcentajeIGV"]}
              id="porcentajeIGV"
              name="porcentajeIGV"
              value={data.porcentajeIGV ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {porcentajesIGV.map((x: IPorcentajes) => (
                <option key={x.porcentaje} value={x.porcentaje}>
                  {x.porcentaje}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="montoIGV" className="label-base">
              Monto IGV
            </label>
            <input
              id="montoIGV"
              name="montoIGV"
              value={data.montoIGV}
              placeholder="Monto IGV"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-25">
            <label htmlFor="total" className="label-base">
              Total
            </label>
            <input
              id="total"
              name="total"
              value={data.total}
              placeholder="Dirección"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="totalNeto" className="label-base">
              Total Neto
            </label>
            <input
              id="totalNeto"
              name="totalNeto"
              value={data.totalNeto}
              placeholder="Total Neto"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="incluyeIGV"
              value={data.incluyeIGV}
              handleData={handleData}
              disabled
              label="IGV"
            />
          </div>
        </div>
        <div className="input-base-row">
          <div className="input-base-container-25">
            <label htmlFor="abonado" className="label-base">
              Abonado
            </label>
            <input
              id="abonado"
              name="abonado"
              value={data.abonado}
              placeholder="Dirección"
              onChange={handleData}
              autoFocus
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="saldo" className="label-base">
              Saldo
            </label>
            <input
              id="saldo"
              name="saldo"
              value={data.saldo}
              placeholder="Saldo"
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

export default NotaPedidoCabecera;
