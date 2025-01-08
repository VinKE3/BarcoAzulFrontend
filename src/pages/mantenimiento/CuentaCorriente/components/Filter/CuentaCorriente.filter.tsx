import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  ICuentaCorrienteFilter,
  ICuentaCorrienteTable,
  defaultCuentaCorrienteFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  resetPagination,
} from "../../../../../util";

const CuentaCorrienteFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<ICuentaCorrienteFilter>(
    defaultCuentaCorrienteFilter
  );
  const search = useDebounce(filter);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search, pagina]);

  useEffect(() => {
    primer.id === null && mensaje.length > 0 && handleListar();
  }, [modal, mensajes]);
  //#endregion

  //#region Funciones
  const handleData = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        numero: search.numero,
      });
      const { data, total }: { data: ICuentaCorrienteTable[]; total: number } =
        await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <div className="input-base-container-100">
        <label htmlFor="numeroFilter" className="label-base">
          Número
        </label>
        <input
          id="numeroFilter"
          name="numero"
          placeholder="Número"
          value={filter.numero}
          onChange={handleData}
          autoComplete="off"
          autoFocus
          className="input-base"
        />
      </div>
    </div>
  );
};

export default CuentaCorrienteFilter;
