import { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  ICombo,
  ISubLinea,
  ISubLineaTablas,
  defaultSubLineaTablas,
} from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const SubLineaModal = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const { lineas }: ISubLineaTablas = form.tablas || defaultSubLineaTablas;
  const [data, setData] = useState<ISubLinea>(form.data);
  const inputs = useFocus("subLineaId");
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
      {lineas.length > 0 && (
        <BasicKeyHandler selector="subLinea-modal">
          <ModalForm
            title={`${primer.tipo} sublínea`}
            className="subLinea-modal md:min-w-[50%]"
          >
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-50">
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
              <div className="input-base-container-33">
                <label htmlFor="lineaId" className="label-base">
                  linea
                </label>
                <select
                  id="lineaId"
                  name="lineaId"
                  value={data.lineaId}
                  onChange={handleData}
                  autoFocus
                  disabled={
                    primer.tipo === "consultar" || primer.tipo === "modificar"
                  }
                  className="input-base"
                >
                  <option key="default" value="">
                    SELECCIONAR
                  </option>
                  {lineas.map((x: ICombo) => (
                    <option key={x.id} value={x.id}>
                      {x.descripcion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="descripcion" className="label-base">
                    Descripción
                  </label>
                  <input
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción"
                    value={data.descripcion}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
            </div>

            <ButtonFooter data={data} inputFocus="codigoInterno" />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default SubLineaModal;
