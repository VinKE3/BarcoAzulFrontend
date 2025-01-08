import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
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
  defaultClienteDireccion,
  defaultClienteDireccionTablas,
  IClienteDireccion,
  IClienteDireccionTab,
  IDepartamento,
  IDistrito,
  IProvincia,
} from "../../../../../../../models";
import {
  handleClearModalProp,
  handleHelpModal,
  handleInitialData,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
  handleSetMensajeCustom,
} from "../../../../../../../util";

import useClienteDireccionColumn from "./clienteDireccion.column";

interface IProp {
  dataDireccion: IClienteDireccionTab;
  handleListarDireccion: () => Promise<IClienteDireccion[]>;
}

const ClienteDireccionTab: React.FC<IProp> = ({
  dataDireccion,
  handleListarDireccion,
}) => {
  //#region useState
  const menu: string = "Mantenimiento/ClienteDireccion";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra } = globalContext;
  const { element } = extra;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { departamentos } =
    dataDireccion.tablas || defaultClienteDireccionTablas;
  const mensaje = mensajes.filter(
    (x) => x.tipo >= 0 && x.origen === "clienteDireccion"
  );
  const mensajeSuccess = mensajes.filter(
    (x) => x.tipo === 0 && x.origen === "clienteDireccion"
  );

  const [data, setData] = useState<IClienteDireccion>(defaultClienteDireccion);
  const [table, setTable] = useState<IClienteDireccion[]>(
    dataDireccion.data || []
  );
  const [show, setShow] = useState<boolean>(false);
  const columns = useClienteDireccionColumn();
  const inputs = useFocus("direccion");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    retorno && retorno.origen === "clienteDireccion" && handleLoad(); //Para cargar data seleccionada de una fila de la tabla
  }, [segundo]);

  useEffect(() => {
    mensajeSuccess.length > 0 && handleListar();
  }, [mensajes]);

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

    setData((x) => {
      const newData = { ...x, [name]: value };

      if (name === "departamentoId") {
        newData.provinciaId = "";
        newData.distritoId = "";
      } else if (name === "provinciaId") {
        newData.distritoId = "";
      }
      return newData;
    });
  };

  const handleLoad = async (): Promise<void> => {
    if (segundo.tipo === "registrar" || segundo.tipo === "eliminar") {
      return;
    }

    handleInitialData(globalContext, defaultClienteDireccion, "segundo", menu)
      .then((response) => {
        setShow(true);
        setData(response.data as IClienteDireccion);
      })
      .catch((error) => {
        handleSetErrorMensaje(setGlobalContext, error, "clienteDireccion");
      });
  };

  const handleListar = async (): Promise<void> => {
    setTable(await handleListarDireccion());
  };

  const handleNew = (): void => {
    setData((x) => ({ ...x, clienteId: primer.id as string }));
    handleHelpModal(setGlobalContext, "", "segundo", true);
    setShow(true);
  };

  const handleClose = (): void => {
    setShow(false);
    setData(defaultClienteDireccion);
    handleClearModalProp(setGlobalContext, "segundo", false, true);
  };

  const provincias = useMemo(() => {
    const departamento = departamentos.find(
      (x) => x.id === data.departamentoId
    );
    return departamento?.provincias ?? [];
  }, [data.departamentoId, departamentos]);

  const distritos = useMemo(() => {
    const provincia = provincias.find((x) => x.id === data.provinciaId);
    return provincia?.distritos ?? [];
  }, [data.provinciaId, provincias]);
  //#endregion

  return (
    <>
      <div className="main-modal-secondary">
        {mensaje.length > 0 && <Messages mensajes={mensaje} />}

        <Messages
          showClose={false}
          mensajes={handleSetMensajeCustom(5, [
            "Cualquier registro, modificación o eliminación de direcciones será guardado automáticamente en la base de datos, usar con precaución.",
          ])}
        />

        {!show && primer.tipo !== "consultar" && (
          <ButtonGroup showRegistrar={false} showAnular={false}>
            <button
              id="buttonAgregarDireccion"
              name="buttonAgregarDireccion"
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
              <span className="button-base-text">Agregar Dirección</span>
            </button>
          </ButtonGroup>
        )}

        {show && (
          <BasicKeyHandler selector={"cliente-direccion-modal"}>
            <div className="main-filter cliente-direccion-modal">
              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="direccion" className="label-base">
                    Dirección
                  </label>
                  <input
                    ref={inputs["direccion"]}
                    id="direccion"
                    name="direccion"
                    placeholder="Dirección"
                    value={data.direccion}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus={segundo.tipo !== null}
                    disabled={segundo.tipo === "consultar"}
                    className="input-base"
                  />
                </div>

                <div className="input-base-container-auto">
                  {element.responsive === "full" && (
                    <span className="label-base-checkbox">-</span>
                  )}
                  <CheckBox
                    id="isActivo"
                    value={data.isActivo}
                    handleData={handleData}
                    disabled={segundo.tipo === "consultar"}
                    label="Activo"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="departamentoId" className="label-base">
                    Departamento
                  </label>
                  <select
                    id="departamentoId"
                    name="departamentoId"
                    value={data.departamentoId ?? ""}
                    onChange={handleData}
                    disabled={segundo.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {departamentos.map((departamento: IDepartamento) => (
                      <option key={departamento.id} value={departamento.id}>
                        {departamento.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-base-container-33">
                  <label htmlFor="provinciaId" className="label-base">
                    Provincia
                  </label>
                  <select
                    id="provinciaId"
                    name="provinciaId"
                    value={data.provinciaId ?? ""}
                    onChange={handleData}
                    disabled={segundo.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {provincias.map((provincia: IProvincia) => (
                      <option key={provincia.id} value={provincia.id}>
                        {provincia.nombre}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-base-container-33">
                  <label htmlFor="distritoId" className="label-base">
                    Distrito
                  </label>
                  <select
                    id="distritoId"
                    name="distritoId"
                    value={data.distritoId ?? ""}
                    onChange={handleData}
                    disabled={segundo.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {distritos.map((distrito: IDistrito) => (
                      <option key={distrito.id} value={distrito.id}>
                        {distrito.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="comentario" className="label-base">
                    Comentario
                  </label>
                  <input
                    id="comentario"
                    name="comentario"
                    placeholder="Comentario"
                    value={data.comentario}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={segundo.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <ButtonFooter
                modalProp="segundo"
                menu={menu}
                origenMensaje="clienteDireccion"
                data={data}
                clearForm={false}
                onSend={handleClose}
                onClose={handleClose}
                inputFocus="direccion"
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
          tableClassName="cliente-direccion-table"
        />
      </div>

      {segundo.tipo === "eliminar" && (
        <DeleteModal
          modalProp="segundo"
          menu={menu}
          origenMensaje="clienteDireccion"
          propText={"direccion"}
          clearForm={false}
          onSend={handleClose}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default ClienteDireccionTab;
