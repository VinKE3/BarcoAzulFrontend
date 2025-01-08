import React, { ChangeEvent, useEffect, useState } from "react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import {
  BasicKeyHandler,
  ButtonFooter,
  ButtonGroup,
  DeleteModal,
  Messages,
  Table,
} from "../../../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../../../hooks";
import {
  defaultProveedorCuentaCorriente,
  defaultProveedorCuentaCorrienteTablas,
  ICombo,
  IMoneda,
  IProveedorCuentaCorriente,
  IProveedorCuentaCorrienteTab,
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
import useProveedorCuentaCorrienteColumn from "./proveedorCuentaCorriente.column";

interface IProp {
  dataCuenta: IProveedorCuentaCorrienteTab;
  handleListarCuentaCorriente: () => Promise<IProveedorCuentaCorriente[]>;
}

const ProveedorCuentaCorrienteTab: React.FC<IProp> = ({
  dataCuenta,
  handleListarCuentaCorriente,
}) => {
  //#region useState
  const menu: string = "Mantenimiento/ProveedorCuentaCorriente";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes } = globalContext;
  const { primer, segundo } = modal;
  const { retorno } = form;
  const { entidadesBancarias, monedas } =
    dataCuenta.tablas || defaultProveedorCuentaCorrienteTablas;
  const mensaje = mensajes.filter(
    (x) => x.tipo >= 0 && x.origen === "proveedorCuentaCorriente"
  );
  const mensajeSuccess = mensajes.filter(
    (x) => x.tipo === 0 && x.origen === "proveedorCuentaCorriente"
  );

  const [data, setData] = useState<IProveedorCuentaCorriente>(
    defaultProveedorCuentaCorriente
  );
  const [table, setTable] = useState<IProveedorCuentaCorriente[]>(
    dataCuenta.data || []
  );
  const [show, setShow] = useState<boolean>(false);
  const columns = useProveedorCuentaCorrienteColumn(entidadesBancarias);
  const inputs = useFocus("monedaId");
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    retorno && retorno.origen === "proveedorCuentaCorriente" && handleLoad(); //Para cargar data seleccionada de una fila de la tabla
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
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleLoad = async (): Promise<void> => {
    if (segundo.tipo === "registrar" || segundo.tipo === "eliminar") {
      return;
    }

    handleInitialData(
      globalContext,
      defaultProveedorCuentaCorriente,
      "segundo",
      menu
    )
      .then((response) => {
        setShow(true);
        setData(response.data as IProveedorCuentaCorriente);
      })
      .catch((error) => {
        handleSetErrorMensaje(
          setGlobalContext,
          error,
          "proveedorCuentaCorriente"
        );
      });
  };

  const handleListar = async (): Promise<void> => {
    setTable(await handleListarCuentaCorriente());
  };

  const handleNew = (): void => {
    setData((x) => ({ ...x, proveedorId: primer.id as string }));
    handleHelpModal(setGlobalContext, "", "segundo", true);
    setShow(true);
  };

  const handleClose = (): void => {
    setShow(false);
    setData(defaultProveedorCuentaCorriente);
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
            "Cualquier registro, modificación o eliminación de cuentas será guardado automáticamente en la base de datos, usar con precaución.",
          ])}
        />

        {!show && primer.tipo !== "consultar" && (
          <ButtonGroup showRegistrar={false} showAnular={false}>
            <button
              id="buttonAgregarCuenta"
              name="buttonAgregarCuenta"
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
              <span className="button-base-text">Agregar Cuenta</span>
            </button>
          </ButtonGroup>
        )}

        {show && (
          <BasicKeyHandler selector={"proveedor-cuenta-corriente-modal"}>
            <div className="filter-base proveedor-cuenta-corriente-modal">
              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="monedaId" className="label-base">
                    Moneda
                  </label>
                  <select
                    ref={inputs["monedaId"]}
                    id="monedaId"
                    name="monedaId"
                    value={data.monedaId ?? ""}
                    onChange={handleData}
                    autoFocus={segundo.tipo !== null}
                    disabled={segundo.tipo === "consultar"}
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
                <div className="input-base-container-33">
                  <label htmlFor="entidadBancariaId" className="label-base">
                    Cuenta
                  </label>
                  <select
                    id="entidadBancariaId"
                    name="entidadBancariaId"
                    value={data.entidadBancariaId ?? ""}
                    onChange={handleData}
                    disabled={segundo.tipo === "consultar"}
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
                  <label htmlFor="numero" className="label-base">
                    Número
                  </label>
                  <input
                    id="numero"
                    name="numero"
                    placeholder="Número"
                    value={data.numero}
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
                origenMensaje="proveedorCuentaCorriente"
                data={data}
                clearForm={false}
                onSend={handleClose}
                onClose={handleClose}
                inputFocus="monedaId"
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
          tableClassName="proveedor-cuenta-corriente-table"
        />
      </div>

      {segundo.tipo === "eliminar" && (
        <DeleteModal
          modalProp="segundo"
          menu={menu}
          origenMensaje="proveedorCuentaCorriente"
          propText={"numero"}
          clearForm={false}
          onSend={handleClose}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default ProveedorCuentaCorrienteTab;
