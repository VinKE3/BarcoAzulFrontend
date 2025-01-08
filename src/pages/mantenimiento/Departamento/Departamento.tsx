import { useEffect, useState } from "react";
import { DepartamentoFilter, DepartamentoModal, useDepartamentoColumn } from ".";
import { ButtonGroup, DeleteModal, Loading, Messages, NotFound, Table } from "../../../components";
import { useGlobalContext, usePermisos } from "../../../hooks";
import { IDepartamento, defaultDepartamento } from "../../../models";
import { handleInitialData, handlePrimaryModal, handleResetContext, handleResetMensajeError, handleSetPermisoYMenu } from "../../../util";

const Departamento: React.FC = () => {
  //#region useState
  const menu: string = "Mantenimiento/Departamento";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, mensajes, table, modal, form } = globalContext;
  const { primer } = modal;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo >= 0);
  const [ready, setReady] = useState(false);
  const { visible, permisos } = usePermisos("Departamento");
  const columns = useDepartamentoColumn();
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

    handleInitialData(globalContext, defaultDepartamento)
      .then((response) => {
        const { data }: { data: IDepartamento } = response;
        handlePrimaryModal(setGlobalContext, data);
      })
      .catch((error) => {
        handleResetMensajeError(setGlobalContext, true, true, error);
      });
  };
  //#endregion

  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Departamentos</h4>
        {ready && visible && <ButtonGroup />}
      </div>

      <div className="main-body">
        {!ready && <Loading />}
        {ready && !visible && <NotFound full={false} notFound={false} />}

        {ready && visible && (
          <>
            {mensaje.length > 0 && <Messages mensajes={mensajes} />}
            {visible && <DepartamentoFilter />}
            {visible && <Table data={table.data} columns={columns} tableClassName="departamento-table" />}

            {primer.tipo === "eliminar" && <DeleteModal propText={"nombre"} />}
            {form.data && primer.tipo && api.menu === menu && <DepartamentoModal />}
          </>
        )}
      </div>
    </div>
  );
};
export default Departamento;
