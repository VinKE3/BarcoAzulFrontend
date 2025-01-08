import { ChangeEvent, useEffect, useState } from "react";
import { useFocus, useGlobalContext } from "../../../../hooks";
import { IDeliveryHelp, IDeliveryHelpModal, IPedidoDelivery } from "../../../../models";
import { handleClearModalProp, handleInputType, handleSetInputs, handleSetRetorno } from "../../../../util";
import { ButtonFooter } from "../../../Footer";
import { BasicKeyHandler } from "../../../Keys";
import { ModalForm } from "../../../Modal";

const DeliveryHelpModal: React.FC<IDeliveryHelpModal> = ({ dataDelivery }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal } = globalContext;
  const { primer } = modal;
  const [data, setData] = useState<IPedidoDelivery>(dataDelivery);
  const inputs = useFocus("direccionDespacho");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((x) => {
      const newData = { ...x, [name]: value };
      return newData;
    });
  };

  const handleClose = (): void => {
    handleClearModalProp(setGlobalContext, "segundo");
  };

  const handleSave = async (): Promise<void> => {
    const retorno: IDeliveryHelp = {
      origen: "deliveryHelp",
      data: data,
    };
    handleSetRetorno(setGlobalContext, retorno);
  };
  //#endregion

  return (
    <ModalForm
      title="Registrar Delivery"
      origenMensajes="adicional"
      replaceClose={true}
      onClose={handleClose}
      className="delivery-modal md:min-w-[60%]"
    >
      <BasicKeyHandler selector="delivery-modal">
        <div className="modal-base-content delivery-modal">
          <div className="input-base-row">
            <div className="input-base-container-33">
              <label htmlFor="clienteNumeroDocumentoIdentidadHelp" className="label-base">
                RUC / DNI
              </label>
              <input
                id="clienteNumeroDocumentoIdentidadHelp"
                name="clienteNumeroDocumentoIdentidad"
                value={data.clienteNumeroDocumentoIdentidad ?? ""}
                onChange={handleData}
                autoFocus
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-100">
              <label htmlFor="clienteNombreHelp" className="label-base">
                Cliente Nombre
              </label>
              <input
                id="clienteNombreHelp"
                name="clienteNombre"
                value={data.clienteNombre ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>

          <div className="input-base-row">
            <div className="input-base-container-100">
              <label htmlFor="direccionDespacho" className="label-base">
                Dirección Despacho
              </label>
              <input
                ref={inputs["direccionDespacho"]}
                id="direccionDespacho"
                name="direccionDespacho"
                placeholder="Dirección Despacho"
                value={data.direccionDespacho ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>

          <div className="input-base-row">
            <div className="input-base-container-25">
              <label htmlFor="referencia" className="label-base">
                Referencia
              </label>
              <input
                id="referencia"
                name="referencia"
                placeholder="Referencia"
                value={data.referencia ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-25">
              <label htmlFor="telefono" className="label-base">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                placeholder="Teléfono"
                value={data.telefono ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-25">
              <label htmlFor="celular1" className="label-base">
                Celular 1
              </label>
              <input
                id="celular1"
                name="celular1"
                placeholder="Celular 1"
                value={data.celular1 ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
            <div className="input-base-container-25">
              <label htmlFor="celular2" className="label-base">
                Celular 2
              </label>
              <input
                id="celular2"
                name="celular2"
                placeholder="Celular 2"
                value={data.celular2 ?? ""}
                onChange={handleData}
                autoComplete="off"
                disabled={primer.tipo === "consultar"}
                className="input-base"
              />
            </div>
          </div>

          <ButtonFooter
            modalProp="segundo"
            origenMensaje="adicional"
            data={data}
            showSend={primer.tipo !== "consultar"}
            replaceSend={true}
            onSend={handleSave}
            replaceClose={true}
            onClose={handleClose}
            inputFocus="direccionDespacho"
          />
        </div>
      </BasicKeyHandler>
    </ModalForm>
  );
};

export default DeliveryHelpModal;
