import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IConceptoFind,
  IConceptoFindFilter,
  IConceptoFindModal,
  IConceptoFindTable,
  defaultConceptoFindFilter,
} from "../../../../models";
import {
  get,
  getListar,
  handleFocus,
  handleInputType,
  handleSetErrorMensaje,
  handleSetRetorno,
} from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import useConceptoFindModalColumn from "./conceptoFindModal.column";

const ConceptoFindModal: React.FC<IConceptoFindModal> = ({
  inputFocus,
  modo = "IN",
}) => {
  //#region useState
  const modoConsulta = modo === "EG" ? "CuentaPorPagar" : "CuentaPorCobrar";
  const menu: string = `Finanzas/${modoConsulta}/ListarPendientes`;
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IConceptoFindFilter>(
    defaultConceptoFindFilter
  );
  const search = useDebounce(filter);
  const [data, setData] = useState<IConceptoFindTable[]>([]);
  const columns = useConceptoFindModalColumn(inputFocus);

  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search]);

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    const params = new URLSearchParams({
      numeroDocumento: search.numeroDocumento,
    });

    try {
      const { data }: { data: IConceptoFindTable[] } = await get({
        globalContext,
        urlParams: params,
        menu,
      });
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: IConceptoFindTable): void => {
    const retorno: IConceptoFind = { ...row, origen: "conceptoFind" };
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
        title={`Consultar ${
          modo === "EG" ? "Cuenta Por Pagar" : "Cuenta Por Cobrar"
        }`}
        inputFocus={inputFocus}
        classNameModal="proveedor-find-modal min-w-[50%]"
        classNameTable="proveedor-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-100">
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
        </div>
      </ModalHelp>
    </TableKeyHandler>
  );
};

export default ConceptoFindModal;
