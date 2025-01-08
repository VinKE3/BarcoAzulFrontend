import React, { ChangeEvent, useEffect, useState } from "react";
import { useFocus, useGlobalContext } from "../../../../hooks";
import { IMensajes, IPassword, defaultForm, defaultIPassword, defaultModales } from "../../../../models";
import { handleClearMensajes, handleInputType, handleSetInputs, put } from "../../../../util";
import { ButtonFooter } from "../../../Footer";
import { BasicKeyHandler } from "../../../Keys";
import { ModalForm } from "../../../Modal";

const PasswordHelpModal: React.FC = () => {
  //#region useState
  const menu = "Mantenimiento/Usuario/Cambiarclave";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal } = globalContext;
  const { primer } = modal;
  const [data, setData] = useState<IPassword>(defaultIPassword);
  const inputs = useFocus("claveAnterior");
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

  const handleClick = async (): Promise<void> => {
    await handleClearMensajes(setGlobalContext);
    const messages: IMensajes[] = await put({ globalContext, data, menu });
    const mensajes: IMensajes[] = messages.map((mensaje) => {
      return { ...mensaje, origen: "global" };
    });
    setGlobalContext((x) => ({
      ...x,
      api: { ...x.api, origen: "global" },
      modal: defaultModales,
      form: defaultForm,
      mensajes,
    }));
  };
  //#endregion

  return (
    <BasicKeyHandler selector="password-help-modal">
      <ModalForm title={`cambiar contraseña`} origenMensajes="clave" className="password-help-modal md:min-w-[50%]">
        <div className="modal-base-content">
          <div className="input-base-row">
            <div className="input-base-container-33">
              <label htmlFor="claveAnterior" className="label-base">
                Clave Anterior
              </label>
              <input
                type="password"
                ref={inputs["claveAnterior"]}
                id="claveAnterior"
                name="claveAnterior"
                placeholder="Clave Anterior"
                value={data.claveAnterior}
                onChange={handleData}
                autoComplete="new-password"
                autoFocus
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="claveNueva" className="label-base">
                Clave Nueva
              </label>
              <input
                type="password"
                id="claveNueva"
                name="claveNueva"
                placeholder="Clave Nueva"
                value={data.claveNueva}
                onChange={handleData}
                autoComplete="new-password"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-33">
              <label htmlFor="claveNuevaConfirmacion" className="label-base">
                Clave Confirmación
              </label>
              <input
                type="password"
                id="claveNuevaConfirmacion"
                name="claveNuevaConfirmacion"
                placeholder="Clave Confirmación"
                value={data.claveNuevaConfirmacion}
                onChange={handleData}
                autoComplete="new-password"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>
        </div>

        <ButtonFooter
          modalProp="tercer"
          data={data}
          replaceSend={true}
          onSend={handleClick}
          origenMensaje="clave"
          inputFocus="claveAnterior"
        />
      </ModalForm>
    </BasicKeyHandler>
  );
};

export default PasswordHelpModal;
