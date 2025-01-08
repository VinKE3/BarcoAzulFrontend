import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import { ILineaFilter, ILineaTable, defaultLineaFilter } from "../../../../../models";
import { getListar, handleInputType, handleSetErrorMensaje, resetPagination } from "../../../../../util";

const LineaFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<ILineaFilter>(defaultLineaFilter);
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
        descripcion: search.descripcion,
      });
      const { data, total }: { data: ILineaTable[]; total: number } = await getListar(globalContext, params);
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
        <label htmlFor="descripcionFilter" className="label-base">
          Descripción
        </label>
        <input
          id="descripcionFilter"
          name="descripcion"
          placeholder="Descripción"
          value={filter.descripcion}
          onChange={handleData}
          autoComplete="off"
          autoFocus
          className="input-base"
        />
      </div>
    </div>
  );
};
export default LineaFilter;
