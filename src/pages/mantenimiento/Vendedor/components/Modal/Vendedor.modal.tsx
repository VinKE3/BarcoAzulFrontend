import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler, ButtonFooter, ModalForm } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import { IVendedor } from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const VendedorModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const [data, setData] = useState<IVendedor>(form.data);
  const inputs = useFocus("nombre");
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
    <BasicKeyHandler selector="vendedor-modal">
      <ModalForm title={`${primer.tipo} vendedor`} className="vendedor-modal md:min-w-[40%]">
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
                disabled
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
                autoFocus
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="clave" className="label-base">
                Clave
              </label>
              <input
                id="clave"
                name="clave"
                placeholder="Clave"
                value={data.clave}
                onChange={handleData}
                maxLength={5}
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>
        </div>

        <ButtonFooter data={data} inputFocus={"nombre"} />
      </ModalForm>
    </BasicKeyHandler>
  );
};

export default VendedorModal;
