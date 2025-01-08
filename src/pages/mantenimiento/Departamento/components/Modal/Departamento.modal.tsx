import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler, ButtonFooter, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { IDepartamento } from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const DepartamentoModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const [data, setData] = useState<IDepartamento>(form.data);
  const inputs = useFocus("id", "nombre");
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
    <BasicKeyHandler selector="departamento-modal">
      <ModalForm title={`${primer.tipo} departamento`} className="departamento-modal md:min-w-[50%]">
        <div className="modal-base-content">
          <div className="input-base-row">
            <div className="input-base-container-33">
              <label htmlFor="id" className="label-base">
                Código
              </label>
              <input
                ref={inputs["id"]}
                id="id"
                name="id"
                placeholder="Código"
                value={data.id}
                onChange={handleData}
                autoComplete="off"
                autoFocus
                maxLength={2}
                disabled={primer.tipo != "registrar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-100">
              <label htmlFor="nombre" className="label-base">
                Nombre
              </label>
              <input
                ref={inputs["nombre"]}
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                value={data.nombre}
                onChange={handleData}
                autoComplete="off"
                autoFocus={primer.tipo === "modificar"}
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>
        </div>

        <ButtonFooter data={data} inputFocus={primer.tipo === "registrar" ? "id" : "nombre"} />
      </ModalForm>
    </BasicKeyHandler>
  );
};

export default DepartamentoModal;
