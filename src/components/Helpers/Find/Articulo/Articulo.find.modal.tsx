import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IArticuloFind,
  IArticuloFindAdicional,
  IArticuloFindFilter,
  IArticuloFindModal,
  IArticuloFindTable,
  IStockFindTable,
  defaultArticuloFindAdicional,
  defaultArticuloFindFilter,
} from "../../../../models";
import {
  get,
  handleFocus,
  handleInitialData,
  handleInputType,
  handleResetMensajeError,
  handleSetErrorMensaje,
  handleSetRetorno,
} from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import { Table } from "../../../Table";
import useArticuloFindColumn from "./articuloFindModal.column";

const ArticuloFindModal: React.FC<IArticuloFindModal> = ({ inputFocus }) => {
  //#region useState
  const menu: string = "Mantenimiento/Articulo/Listar";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { retorno } = form;
  const { row } = globalContext.table;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IArticuloFindFilter>(
    defaultArticuloFindFilter
  );
  const [data, setData] = useState<IArticuloFindTable[]>([]);
  const search = useDebounce(filter);
  const columns = useArticuloFindColumn(inputFocus);
  //#endregion

  //#region useEffect
  // useEffect(() => {
  //   retorno &&
  //     retorno.origen === "articuloAlternativoFind" &&
  //     tableKeyDown(retorno);
  // }, [retorno]);

  useEffect(() => {
    handleListarDataVenta();
  }, [search]);

  useEffect(() => {
    data.length > 0;
  }, [data, row]);
  //#endregion

  //#region Funciones
  const handleDataVenta = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListarDataVenta = async (): Promise<void> => {
    try {
      const urlParams = new URLSearchParams({
        codigoBarras: search.codigoBarras,
        descripcion: search.descripcion,
        isActivo: "true",
      });
      const { data }: { data: IArticuloFindTable[] } = await get({
        globalContext,
        menu,
        urlParams,
      });
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: IArticuloFindTable): void => {
    const retorno: IArticuloFind = { ...row, origen: "articuloFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="articulo-find-modal">
      <ModalHelp
        showTable={false}
        handleKeyDown={tableKeyDown}
        title="Consultar Artículos"
        inputFocus={inputFocus}
        classNameModal="articulo-find-modal  md:min-w-[90%]"
      >
        <div className="card-base">
          <div className="card-base-container-full">
            <div className="input-base-row">
              <div className="input-base-container-50">
                <label htmlFor="codigoBarrasFilter" className="label-base">
                  Código
                </label>
                <input
                  id="codigoBarrasFilter"
                  name="codigoBarras"
                  placeholder="Código"
                  value={filter.codigoBarras}
                  onChange={handleDataVenta}
                  autoComplete="off"
                  autoFocus
                  className="input-base"
                />
              </div>
              <div className="input-base-container-50">
                <label htmlFor="descripcionFilter" className="label-base">
                  Descripción
                </label>
                <input
                  id="descripcionFilter"
                  name="descripcion"
                  placeholder="Descripción"
                  value={filter.descripcion}
                  onChange={handleDataVenta}
                  autoComplete="off"
                  autoFocus
                  className="input-base"
                />
              </div>
            </div>
            <Table
              data={data}
              columns={columns}
              doubleClick={false}
              pagination={false}
              alwaysSelected={true}
              onKeyDown={tableKeyDown}
              tableClassName="articulo-find"
            />
          </div>
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default ArticuloFindModal;
