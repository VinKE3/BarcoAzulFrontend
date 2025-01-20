/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */

import React, { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IGuiaRemisionFilter,
  IGuiaRemisionTablas,
  IGuiaRemisionTable,
  defaultGuiaRemisionFilter,
  defaultGuiaRemisionTablas,
} from "../../../../../models";
import {
  getListar,
  getTablas,
  handleInputType,
  handleSetErrorMensaje,
  handleSetRefrescar,
  resetPagination,
} from "../../../../../util";

const GuiaRemisionFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { api, table, modal, mensajes, extra } = globalContext;
  const [tablas, setTablas] = useState<IGuiaRemisionTablas>(
    defaultGuiaRemisionTablas
  );
  const { simplificado } = extra;
  const { fechaFin, fechaInicio } = simplificado;
  const { series } = tablas;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IGuiaRemisionFilter>({
    ...defaultGuiaRemisionFilter,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
    serie: "T001",
  });
  const search = useDebounce(filter);
  //#endregion

  //#region useEffect

  useEffect(() => {
    const handleTablas = async (): Promise<void> => {
      const result: IGuiaRemisionTablas = await getTablas(
        globalContext,
        api.menu,
        false
      );
      setTablas(result);
    };

    handleTablas();
  }, []);
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
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        clienteNombre: search.clienteNombre,
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
        tipoGuia: search.tipoGuia,
        serie: search.serie,
      });
      const { data, total }: { data: IGuiaRemisionTable[]; total: number } =
        await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
      handleSetRefrescar(setGlobalContext, false);
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return (
    <BasicKeyHandler selector={"entrada-articulos-filter"}>
      <div className="filter-base entrada-articulos-filter">
        <span className="filter-base-text">Filtrar por</span>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="serie" className="label-base">
              Serie
            </label>
            <select
              id="serie"
              name="serie"
              value={filter.serie}
              onChange={handleData}
              className="input-base"
            >
              {series.map((x) => (
                <option key={x.serie} value={x.serie}>
                  {x.serie}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="clienteNombreFilter" className="label-base">
              Cliente
            </label>
            <input
              id="clienteNombreFilter"
              name="clienteNombre"
              placeholder="Cliente"
              value={filter.clienteNombre}
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
            <input
              type="date"
              id="fechaFin"
              name="fechaFin"
              value={filter.fechaFin}
              onChange={handleData}
              className="input-base"
            />
          </div>
        </div>
      </div>
    </BasicKeyHandler>
  );
};

export default GuiaRemisionFilter;
