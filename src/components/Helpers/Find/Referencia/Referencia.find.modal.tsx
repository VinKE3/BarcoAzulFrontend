import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IReferenciaFind,
  IReferenciaFindFilter,
  IReferenciaFindModal,
  IReferenciaFindTable,
  defaultModal,
  defaultReferenciaFindFilter,
} from "../../../../models";
import { get, handleFocus, handleInputType, handleSetErrorMensaje } from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import useReferenciaFindModalColumn from "./referenciaFindModal.column";

const ReferenciaFindModal: React.FC<IReferenciaFindModal> = ({ tipoDocumentoId, menu, inputFocus, origen = "venta" }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IReferenciaFindFilter>({
    ...defaultReferenciaFindFilter,
    tipoDocumentoId: tipoDocumentoId,
  });
  const search = useDebounce(filter);
  const [data, setData] = useState<IReferenciaFindTable[]>([]);
  const columns = useReferenciaFindModalColumn(inputFocus, origen);
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
      const urlParams = new URLSearchParams({
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
        tipoDocumentoId: search.tipoDocumentoId,
        numeroDocumento: search.numeroDocumento,
      });
      const { data }: { data: IReferenciaFindTable[] } = await get({ globalContext, menu, urlParams });
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (find: IReferenciaFindTable): void => {
    const retorno: IReferenciaFind = { ...find, origen: "referenciaFind" };
    setGlobalContext((x) => ({
      ...x,
      form: { ...x.form, retorno },
      modal: { ...x.modal, segundo: defaultModal },
    }));
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="referencia-find-modal">
      <ModalHelp
        data={data}
        columns={columns}
        handleKeyDown={tableKeyDown}
        title="Consultar Documentos de referencia"
        inputFocus={inputFocus}
        classNameModal="referencia-find-modal md:min-w-[50%] md:w-[50%]"
        classNameTable="referencia-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="numeroDocumentoFilter" className="label-base">
              Documento
            </label>
            <input
              id="numeroDocumentoFilter"
              name="numeroDocumento"
              placeholder="Documento"
              value={filter.numeroDocumento}
              onChange={handleData}
              autoComplete="off"
              autoFocus
              className="input-base"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="fechaInicio" className="label-base">
              Desde
            </label>
            <input
              type="date"
              id="fechaInicio"
              name="fechaInicio"
              value={filter.fechaInicio}
              onChange={handleData}
              className="input-base"
            />
          </div>

          <div className="input-base-container-33">
            <label htmlFor="fechaFin" className="label-base">
              Hasta
            </label>
            <input type="date" id="fechaFin" name="fechaFin" value={filter.fechaFin} onChange={handleData} className="input-base" />
          </div>
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default ReferenciaFindModal;
