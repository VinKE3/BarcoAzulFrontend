import React, { ChangeEvent, useEffect, useState } from "react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import {
  BasicKeyHandler,
  ButtonFooter,
  ButtonGroup,
  CheckBox,
  DeleteModal,
  Messages,
  Table,
} from "../../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../../hooks";
import {
  defaultClientePersonal,
  defaultClientePersonalTablas,
  IClientePersonal,
  IClientePersonalTab,
  IPersonal,
} from "../../../../../../../models";
import {
  handleClearModalProp,
  handleHelpModal,
  handleInitialData,
  handleInputType,
  handleSelectPersonal,
  handleSetErrorMensaje,
  handleSetInputs,
  handleSetMensajeCustom,
} from "../../../../../../../util";
import useClientePersonalColumn from "./clientePersonal.column";

interface IProp {
  dataPersonal: IClientePersonalTab;
  handleListarPersonal: () => Promise<IClientePersonal[]>;
}

const ClientePersonalTab: React.FC<IProp> = ({
  dataPersonal,
  handleListarPersonal,
}) => {
  //#region useState
  const menu: string = "Mantenimiento/ClientePersonal";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { element } = extra;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { personal } = dataPersonal.tablas || defaultClientePersonalTablas;
  const mensaje = mensajes.filter(
    (x) => x.tipo >= 0 && x.origen === "clientePersonal"
  );
  const mensajeSuccess = mensajes.filter(
    (x) => x.tipo === 0 && x.origen === "clientePersonal"
  );

  const [data, setData] = useState<IClientePersonal>(defaultClientePersonal);
  const [table, setTable] = useState<IClientePersonal[]>(
    dataPersonal.data || []
  );
  const [show, setShow] = useState<boolean>(false);
  const columns = useClientePersonalColumn();
  const inputs = useFocus("personalId");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    retorno && retorno.origen === "clientePersonal" && handleLoad(); //Para cargar data seleccionada de una fila de la tabla
  }, [segundo]);

  useEffect(() => {
    segundo.id === null && mensajeSuccess.length > 0 && handleListar();
  }, [segundo, mensajes]);

  useEffect(() => {
    return () => {
      handleClearModalProp(setGlobalContext, "segundo", false, true);
    };
  }, []);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleLoad = async (): Promise<void> => {
    if (segundo.tipo === "registrar" || segundo.tipo === "eliminar") {
      return;
    }

    handleInitialData(globalContext, defaultClientePersonal, "segundo", menu)
      .then((response) => {
        setShow(true);
        setData(response.data as IClientePersonal);
      })
      .catch((error) => {
        handleSetErrorMensaje(setGlobalContext, error, "clientePersonal");
      });
  };

  const handleListar = async (): Promise<void> => {
    setTable(await handleListarPersonal());
  };

  const handleNew = (): void => {
    setData((x) => ({ ...x, clienteId: primer.id as string }));
    handleHelpModal(setGlobalContext, "", "segundo", true);
    setShow(true);
  };

  const handleClose = (): void => {
    setShow(false);
    setData(defaultClientePersonal);
    handleClearModalProp(setGlobalContext, "segundo", false, true);
  };
  //#endregion

  return (
    <>
      <div className="main-modal-secondary">
        {mensaje.length > 0 && <Messages mensajes={mensaje} />}

        <Messages
          showClose={false}
          mensajes={handleSetMensajeCustom(5, [
            "Cualquier registro o eliminación de personal será guardado automáticamente en la base de datos, usar con precaución.",
          ])}
        />

        {!show && primer.tipo !== "consultar" && (
          <ButtonGroup showRegistrar={false} showAnular={false}>
            <button
              id="buttonAgregarPersonal"
              name="buttonAgregarPersonal"
              title="Presione [ALT + A] para agregar registro."
              accessKey="a"
              autoFocus={segundo.tipo === null}
              onClick={handleNew}
              className="button-base button-base-bg-secondary"
            >
              <BsFileEarmarkPlusFill
                size={"1.5rem"}
                className="button-base-icon"
              />
              <span className="button-base-text">Agregar Personal</span>
            </button>
          </ButtonGroup>
        )}

        {show && (
          <BasicKeyHandler selector={"cliente-contacto-modal"}>
            <div className="main-filter cliente-contacto-modal">
              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="personalId" className="label-base">
                    Personal
                  </label>
                  <select
                    ref={inputs["personalId"]}
                    id="personalId"
                    name="personalId"
                    value={data.personalId}
                    onChange={handleData}
                    autoFocus={segundo.tipo !== null}
                    disabled={segundo.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {personal.map((x: IPersonal) => (
                      <option key={x.id} value={x.id}>
                        {handleSelectPersonal(x)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-base-container-auto">
                  {element.responsive === "full" && (
                    <span className="input-base-checkbox">-</span>
                  )}
                  <CheckBox
                    id="default"
                    value={data.default}
                    handleData={handleData}
                    disabled={segundo.tipo === "consultar"}
                    label="Por Defecto"
                  />
                </div>
              </div>

              <ButtonFooter
                modalProp="segundo"
                menu={menu}
                origenMensaje="clientePersonal"
                data={data}
                clearForm={false}
                onSend={handleClose}
                onClose={handleClose}
                inputFocus="personalId"
              />
            </div>
          </BasicKeyHandler>
        )}

        <Table
          data={table}
          columns={columns}
          doubleClick={false}
          pagination={false}
          selectable={false}
          tableClassName="cliente-personal-table"
        />
      </div>

      {segundo.tipo === "eliminar" && (
        <DeleteModal
          modalProp="segundo"
          menu={menu}
          origenMensaje="clientePersonal"
          propText={"nombreCompleto"}
          clearForm={false}
          onSend={handleClose}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default ClientePersonalTab;
