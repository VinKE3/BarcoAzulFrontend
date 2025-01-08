import { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import { IArticuloFilter, IArticuloTable, defaultArticuloFilter } from "../../../../../models";
import { getListar, handleInputType, handleSetErrorMensaje, resetPagination } from "../../../../../util";

const ArticuloFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IArticuloFilter>(defaultArticuloFilter);
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
        id: search.id,
        descripcion: search.descripcion,
      });
      const { data, total }: { data: IArticuloTable[]; total: number } = await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="articulo-filter">
        <div className="input-base-row articulo-filter">
          <div className="input-base-container-33">
            <label htmlFor="idFilter" className="label-base">
              Código
            </label>
            <input
              id="idFilter"
              name="id"
              placeholder="Código"
              value={filter.id}
              onChange={handleData}
              autoComplete="off"
              autoFocus
              className="input-base"
            />
          </div>
          <div className="input-base-container-75">
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
              className="input-base"
            />
          </div>
        </div>
      </BasicKeyHandler>
    </div>
  );
};
export default ArticuloFilter;
