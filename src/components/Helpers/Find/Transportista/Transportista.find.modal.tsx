import { ChangeEvent, useEffect, useState } from "react";
import { useTransportistaFindmodalColumn } from ".";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  ITransportistaFind,
  ITransportistaFindFilter,
  ITransportistaFindModal,
  ITransportistaFindTable,
  defaultTransportistaFindFilter,
} from "../../../../models";
import {
  getListar,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetRetorno,
} from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";

//Componente que retorna los datos de una fila seleccionada
const TransportistaFindModal: React.FC<ITransportistaFindModal> = ({
  modalidad,
  inputFocus,
}) => {
  //#region useState
  const menu: string = "Mantenimiento/Conductor";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<ITransportistaFindFilter>(
    defaultTransportistaFindFilter
  );
  const search = useDebounce(filter);
  const [data, setData] = useState<ITransportistaFindTable[]>([]);
  const columns = useTransportistaFindmodalColumn();
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
        tipo: modalidad,
        numeroDocumentoIdentidad: search.numeroDocumentoIdentidad,
        nombre: search.nombre,
      });
      const { data }: { data: ITransportistaFindTable[] } = await getListar(
        globalContext,
        params,
        menu
      );
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  //Función que toma los datos de la fila cuando se presiona Enter
  const tableKeyDown = (row: ITransportistaFindTable): void => {
    const retorno: ITransportistaFind = { ...row, origen: "transportistaFind" };
    handleSetRetorno(setGlobalContext, retorno, "tercer");
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="transportista-find-modal">
      <ModalHelp
        modalProp="tercer"
        data={data}
        columns={columns}
        handleKeyDown={tableKeyDown}
        title={`Consultar ${
          modalidad === "01" ? "Transportistas" : "Conductores"
        }`}
        inputFocus={inputFocus}
        classNameModal="transportista-find-modal"
        classNameTable="transportista-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label
              htmlFor="numeroDocumentoIdentidadFilter"
              className="label-base"
            >
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

export default TransportistaFindModal;
