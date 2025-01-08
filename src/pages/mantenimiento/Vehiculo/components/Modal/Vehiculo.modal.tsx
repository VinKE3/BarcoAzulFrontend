import React, { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IVehiculo,
  IVehiculoTablas,
  IEmpresaTransporte,
  defaultVehiculoTablas,
} from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const VehiculoModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const { empresasTransporte }: IVehiculoTablas =
    form.tablas || defaultVehiculoTablas;
  const [data, setData] = useState<IVehiculo>(form.data);
  const inputs = useFocus("empresaTransporteId");
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
      {empresasTransporte.length > 0 && (
        <BasicKeyHandler selector="vehiculo-modal">
          <ModalForm
            title={`${primer.tipo} vehículo`}
            className="vehiculo-modal md:min-w-[50%]"
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
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="empresaTransporteId" className="label-base">
                    Empresa de transporte
                  </label>
                  <select
                    id="empresaTransporteId"
                    name="empresaTransporteId"
                    value={data.empresaTransporteId}
                    onChange={handleData}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {empresasTransporte.map((x: IEmpresaTransporte) => (
                      <option
                        key={x.empresaTransporteId}
                        value={x.empresaTransporteId}
                      >
                        {x.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="numeroPlaca" className="label-base">
                    Número de placa
                  </label>
                  <input
                    id="numeroPlaca"
                    name="numeroPlaca"
                    placeholder="Número de placa"
                    value={data.numeroPlaca}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="marca" className="label-base">
                    Marca
                  </label>
                  <input
                    id="marca"
                    name="marca"
                    placeholder="Marca"
                    value={data.marca}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="modelo" className="label-base">
                    Modelo
                  </label>
                  <input
                    id="modelo"
                    name="modelo"
                    placeholder="Modelo"
                    value={data.modelo}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label
                    htmlFor="certificadoInscripcion"
                    className="label-base"
                  >
                    Inscripción
                  </label>
                  <input
                    id="certificadoInscripcion"
                    name="certificadoInscripcion"
                    placeholder="Inscripción"
                    value={data.certificadoInscripcion ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
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
            <ButtonFooter data={data} inputFocus="empresaTransporteId" />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default VehiculoModal;
