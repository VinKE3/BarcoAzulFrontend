/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IUsuarioFilter,
  IUsuarioTable,
  defaultUsuarioFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  handleSetRefrescar,
  resetPagination,
} from "../../../../../util";

const UsuarioFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IUsuarioFilter>(defaultUsuarioFilter);
  const search = useDebounce(filter);
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleListar();
  }, [search, pagina]);

  useEffect(() => {
    primer.id === null && mensaje.length > 0 && handleListar();
  }, [modal, mensajes]);

  useEffect(() => {
    api.refrescar && handleListar();
  }, [api.refrescar]);
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
        nick: search.nick,
      });
      const { data, total }: { data: IUsuarioTable[]; total: number } =
        await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
      handleSetRefrescar(setGlobalContext, false);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <div className="input-base-row">
        <div className="input-base-container-100">
          <label htmlFor="nickFilter" className="label-base">
            Nick
          </label>
          <input
            id="nickFilter"
            name="nick"
            placeholder="Nick"
            value={filter.nick}
            onChange={handleData}
            autoComplete="off"
            autoFocus
            className="input-base"
          />
        </div>
      </div>
    </div>
  );
};
export default UsuarioFilter;
