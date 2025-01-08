import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../hooks";
import {
  IMedicoFind,
  IMedicoFindFilter,
  IMedicoFindModal,
  IMedicoFindTable,
  defaultMedicoFindFilter,
} from "../../../../models";
import { getListar, handleFocus, handleInputType, handleSetErrorMensaje, handleSetRetorno } from "../../../../util";
import { TableKeyHandler } from "../../../Keys";
import { ModalHelp } from "../../../Modal";
import useMedicoFindModalColumn from "./medicoFindModal.column";

const MedicoFindModal: React.FC<IMedicoFindModal> = ({ inputFocus }) => {
  //#region useState
  const menu: string = "Mantenimiento/Medico";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { inputs } = extra.element;

  const [filter, setFilter] = useState<IMedicoFindFilter>(defaultMedicoFindFilter);
  const search = useDebounce(filter);
  const [data, setData] = useState<IMedicoFindTable[]>([]);
  const columns = useMedicoFindModalColumn(inputFocus);
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
        cmp: search.cmp,
        nombres: search.nombres,
      });
      const { data }: { data: IMedicoFindTable[] } = await getListar(globalContext, params, menu);
      setData(data);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "help");
    }
  };

  const tableKeyDown = (row: IMedicoFindTable): void => {
    const retorno: IMedicoFind = { ...row, origen: "medicoFind" };
    handleSetRetorno(setGlobalContext, retorno);
    inputs[inputFocus] && handleFocus(inputs[inputFocus]);
  };
  //#endregion

  return (
    <TableKeyHandler selector="medico-find-modal">
      <ModalHelp
        data={data}
        columns={columns}
        showFooter={false}
        handleKeyDown={tableKeyDown}
        title="Consultar Médicos"
        inputFocus={inputFocus}
        classNameModal="medico-find-modal md:min-w-[50%]"
        classNameTable="medico-find-modal-table"
      >
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label htmlFor="cmpFilter" className="label-base">
              CMP
            </label>
            <input
              id="cmpFilter"
              name="cmp"
              placeholder="CMP"
              value={filter.cmp}
              onChange={handleData}
              autoComplete="off"
              autoFocus
              className="input-base"
            />
          </div>
          <div className="input-base-container-100">
            <label htmlFor="nombresFilter" className="label-base">
              Nombres
            </label>
            <input
              id="nombresFilter"
              name="nombres"
              placeholder="Nombres"
              value={filter.nombres}
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

export default MedicoFindModal;
