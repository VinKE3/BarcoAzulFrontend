/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IClienteFilter,
  IClienteTable,
  defaultClienteFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  resetPagination,
} from "../../../../../util";

const ClienteFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes } = globalContext;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IClienteFilter>(defaultClienteFilter);
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
        numeroDocumentoIdentidad: search.numeroDocumentoIdentidad,
        nombre: search.nombre,
      });
      const { data, total }: { data: IClienteTable[]; total: number } =
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
      <BasicKeyHandler selector="cliente-filter">
        <div className="input-base-row cliente-filter">
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
      </BasicKeyHandler>
    </div>
  );
};
export default ClienteFilter;
