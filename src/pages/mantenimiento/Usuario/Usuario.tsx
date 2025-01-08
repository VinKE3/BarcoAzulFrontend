/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from "react";
import { FaCogs } from "react-icons/fa";
import {
  UsuarioConfiguracionModal,
  UsuarioFilter,
  UsuarioModal,
  useUsuarioColumn,
} from ".";
import {
  ButtonGroup,
  DeleteModal,
  Loading,
  Messages,
  NotFound,
  Table,
} from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import {
  IUsuario,
  IUsuarioTablas,
  IUsuarioTable,
  defaultUsuario,
} from "../../../models";
import {
  handleInitialData,
  handlePrimaryModal,
  handleResetContext,
  handleResetMensajeError,
  handleRow,
  handleSecondaryModal,
  handleSetPermisoYMenu,
  handleToast,
} from "../../../util";

const Usuario: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/Usuario";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, modal, form, table, mensajes } = globalContext;
  const { primer } = modal;
  const { data, row } = table as { data: IUsuarioTable[]; row: number };
  const [ready, setReady] = useState(false);
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const { visible, permisos } = usePermisos("Usuario");
  const columns = useUsuarioColumn();
  //#endregion

  //#region useEffect
  useEffect(() => {
    const resetContext = async () => {
      handleResetContext(setGlobalContext);
    };
    resetContext();
  }, []);

  useEffect(() => {
    if (permisos.menuId !== "") {
      handleSetPermisoYMenu(setGlobalContext, permisos, menu);
      setReady(true);
    }
  }, [permisos]);

  useEffect(() => {
    primer.tipo && !form.data && handleModal();
  }, [primer.tipo]);
  //#endregion

  //#region funciones
  const handleModal = async (): Promise<void> => {
    if (primer.tipo === "eliminar" || primer.tipo === "anular") {
      return;
    }

    handleInitialData(globalContext, defaultUsuario)
      .then((response) => {
        const { data, tablas }: { data: IUsuario; tablas: IUsuarioTablas } =
          response;
        handlePrimaryModal(setGlobalContext, data, tablas);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };

  const handleConfiguracion = async () => {
    if (!handleRow(row)) return;

    if (data[row].nick === "AD") {
      handleToast("warning", "Usuario ADMINISTRADOR, no modificable.");
      return;
    }

    handleSecondaryModal({
      globalContext,
      setGlobalContext,
      origen: "configuracion",
      dataForm: data[row],
    });
  };
  //#endregion

  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Usuarios</h4>

        {ready && visible && (
          <ButtonGroup isTablas={true}>
            {(permisos.registrar || permisos.modificar) && (
              <button
                id="buttonConfiguracion"
                name="buttonConfiguracion"
                title="Presione [ALT + C ] para abrir la configuración del usuario."
                accessKey="c"
                onClick={handleConfiguracion}
                className="button-base button-base-bg-secondary"
              >
                <FaCogs size={"2rem"} className="button-base-icon" />
                <span className="button-base-text-hidden-info">
                  [ ALT + C ]
                </span>
                <span className="button-base-text-hidden">Configuración</span>
              </button>
            )}
          </ButtonGroup>
        )}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <UsuarioFilter />}
            {visible && (
              <Table
                data={table.data}
                columns={columns}
                isTablas={true}
                tableClassName="usuario-table"
              />
            )}

            {primer.tipo === "eliminar" && <DeleteModal propText={"nick"} />}
            {primer.origen === "configuracion" && <UsuarioConfiguracionModal />}
            {form.data && primer.tipo && api.menu === menu && <UsuarioModal />}
          </>
        )}
      </div>
    </div>
  );
};
export default Usuario;
