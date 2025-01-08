import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IProveedorFind,
  IProveedorFindFilter,
  IProveedorFindModal,
  IProveedorFindTable,
  defaultProveedorFindFilter,
} from "../../../../models";
import { getListar, handleFocus, handleInputType, handleSetErrorMensaje, handleSetRetorno } from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import useProveedorFindModalColumn from "./proveedorFindModal.column";

const ProveedorFindModal: React.FC<IProveedorFindModal> = ({ inputFocus }) => {
  //#region useState
  const menu: string = "Mantenimiento/Proveedor";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IProveedorFindFilter>(defaultProveedorFindFilter);
  const search = useDebounce(filter);
  const [data, setData] = useState<IProveedorFindTable[]>([]);
  const columns = useProveedorFindModalColumn(inputFocus);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search]);

  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        numeroDocumentoIdentidad: search.numeroDocumentoIdentidad,
        nombre: search.nombre,
      });
      const { data }: { data: IProveedorFindTable[] } = await getListar(globalContext, params, menu);
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: IProveedorFindTable): void => {
    const retorno: IProveedorFind = { ...row, origen: "proveedorFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="proveedor-find-modal">
      <ModalHelp
        data={data}
        columns={columns}
        handleKeyDown={tableKeyDown}
        title="Consultar Proveedores"
        inputFocus={inputFocus}
        classNameModal="proveedor-find-modal min-w-[50%]"
        classNameTable="proveedor-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label htmlFor="numeroDocumentoIdentidadFilter" className="label-base">
              Documento
            </label>
            <input
              id="numeroDocumentoIdentidadFilter"
              name="numeroDocumentoIdentidad"
              placeholder="Documento"
              value={filter.numeroDocumentoIdentidad}
              onChange={handleData}
              autoComplete="off"
              autoFocus
              className="input-base"
            />
          </div>
          <div className="input-base-container-100">
            <label htmlFor="nombreFilter" className="label-base">
              Nombre
            </label>
            <input
              id="nombreFilter"
              name="nombre"
              placeholder="Nombre"
              value={filter.nombre}
              onChange={handleData}
              autoComplete="off"
              className="input-base"
            />
          </div>
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default ProveedorFindModal;
