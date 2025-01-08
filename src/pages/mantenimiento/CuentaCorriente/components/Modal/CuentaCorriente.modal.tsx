import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICombo,
  ICuentaCorriente,
  ICuentaCorrienteTablas,
  IMoneda,
  defaultCuentaCorrienteTablas,
} from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const CuentaCorrienteModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const {
    entidadesBancarias,
    monedas,
    tiposCuentaBancaria,
  }: ICuentaCorrienteTablas = form.tablas || defaultCuentaCorrienteTablas;
  const [data, setData] = useState<ICuentaCorriente>(form.data);
  const inputs = useFocus("entidadBancariaId");

  //#endregion

  //#region useEffect
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
    setData((x) => ({ ...x, [name]: value }));
  };
  //#endregion

  return (
    <>
      {monedas.length > 0 && (
        <BasicKeyHandler selector="cuenta-corriente-modal">
          <ModalForm
            title={`${primer.tipo} cuenta corriente`}
            className="cuenta-corriente-modal md:min-w-[50%]"
          >
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-20">
                  <label htmlFor="id" className="label-base">
                    Código
                  </label>
                  <input
                    id="id"
                    name="id"
                    placeholder="Código"
                    value={data.id}
                    disabled
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="entidadBancariaId" className="label-base">
                    Entidad Bancaria
                  </label>
                  <select
                    ref={inputs["entidadBancariaId"]}
                    id="entidadBancariaId"
                    name="entidadBancariaId"
                    value={data.entidadBancariaId}
                    onChange={handleData}
                    autoFocus
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {entidadesBancarias.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.nombre}
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
                    value={data.monedaId}
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
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="numero" className="label-base">
                    Número Cuenta
                  </label>
                  <input
                    id="numero"
                    name="numero"
                    placeholder="Número Cuenta"
                    value={data.numero}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="tipoCuentaDescripcion" className="label-base">
                    Tipo de Cuenta
                  </label>
                  <select
                    id="tipoCuentaDescripcion"
                    name="tipoCuentaDescripcion"
                    value={data.tipoCuentaDescripcion}
                    onChange={handleData}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {tiposCuentaBancaria.map((x: ICombo) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="observacion" className="label-base">
                    Observación
                  </label>
                  <input
                    id="observacion"
                    name="observacion"
                    placeholder="Observación"
                    value={data.observacion ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
            </div>
            <ButtonFooter data={data} inputFocus="entidadBancariaId" />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default CuentaCorrienteModal;
