import { ChangeEvent, useEffect, useState } from "react";
import { MdFileOpen } from "react-icons/md";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IClienteFind,
  IClienteFindFilter,
  IClienteFindModal,
  IClienteFindTable,
  defaultClienteFindFilter,
} from "../../../../models";
import { getListar, handleFocus, handleInputType, handleSetErrorMensaje, handleSetRetorno } from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import useClienteFindModalColumn from "./clienteFindModal.column";

const ClienteFindModal: React.FC<IClienteFindModal> = ({ inputFocus }) => {
  //#region useState
  const menu: string = "Mantenimiento/Cliente";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IClienteFindFilter>(defaultClienteFindFilter);
  const search = useDebounce(filter);
  const [data, setData] = useState<IClienteFindTable[]>([]);
  const columns = useClienteFindModalColumn(inputFocus);
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
      const { data }: { data: IClienteFindTable[] } = await getListar(globalContext, params, menu);
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const handleOpen = (): void => {
    const menu = `${window.location.origin}/Mantenimiento/Cliente`;
    window.open(menu, "_blank");
  };

  const tableKeyDown = (row: IClienteFindTable): void => {
    const retorno: IClienteFind = { ...row, origen: "clienteFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="cliente-find-modal">
      <ModalHelp
        data={data}
        columns={columns}
        handleKeyDown={tableKeyDown}
        title="Consultar Clientes"
        inputFocus={inputFocus}
        classNameModal="cliente-find-modal md:min-w-[50%]"
        classNameTable="cliente-find-modal-table"
        buttonFooter={
          <button
            id="buttonOpen"
            name="buttonOpen"
            title="Presione [ALT + A] para abrir módulo de clientes."
            accessKey="a"
            onClick={handleOpen}
            className="button-base-bg-border-primary"
          >
            <MdFileOpen size={"2rem"} className="button-base-icon" />
            <span className="button-base-text-hidden-info">[ ALT + A ]</span>
            <span className="button-base-text-hidden">Nuevo</span>
          </button>
        }
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

export default ClienteFindModal;
