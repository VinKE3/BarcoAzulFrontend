import { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  ModalForm,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { ILinea } from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const LineaModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const [data, setData] = useState<ILinea>(form.data);
  const inputs = useFocus("descripcion");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };
  //#endregion

  return (
    <BasicKeyHandler selector="linea-modal">
      <ModalForm
        title={`${primer.tipo} línea`}
        className="linea-modal md:min-w-[50%]"
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
                autoFocus
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>
        </div>

        <ButtonFooter  data={data} inputFocus="descripcion" />
      </ModalForm>
    </BasicKeyHandler>
  );
};

export default LineaModal;
