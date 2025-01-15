/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ChangeEvent, useEffect, useState } from "react";
import { BasicKeyHandler, Radio } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  ICuentaPorPagarFilter,
  ICuentaPorPagarTable,
  defaultCuentaPorPagarFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  resetPagination,
} from "../../../../../util";

const CuentaPorPagarFilter: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes, extra } = globalContext;
  const { element, simplificado } = extra;
  const { fechaFin, fechaInicio } = simplificado;
  const { primer } = modal;
  const { pagina } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<ICuentaPorPagarFilter>({
    ...defaultCuentaPorPagarFilter,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
  });
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
  const handleData = ({
    target,
  }: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >): void => {
    const { name } = target;
    const value = handleInputType(target);
    resetPagination(setGlobalContext);
    setFilter((x) => ({ ...x, [name]: value }));
  };

  const handleListar = async (): Promise<void> => {
    try {
      const params = new URLSearchParams({
        isCancelado: search.isCancelado,
        proveedorNombre: search.proveedorNombre,
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
      });
      const { data, total }: { data: ICuentaPorPagarTable[]; total: number } =
        await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion
  return (
    <BasicKeyHandler selector={"cuenta-por-pagar-filter"}>
      <div className="filter-base cuenta-por-pagar-filter">
        <span className="filter-base-text">Filtrar por</span>
        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="proveedorNombreFilter" className="label-base">
              Proveedor Nombre
            </label>
            <input
              id="proveedorNombreFilter"
              name="proveedorNombre"
              placeholder="Proveedor Nombre"
              value={filter.proveedorNombre}
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
        <div className="input-base-row !flex-row">
          <div className="input-base-container-20">
            {element.responsive === "full" && (
              <label htmlFor="isCanceladoTodos" className="label-base">
                Estado
              </label>
            )}
            <Radio
              id="isCanceladoTodos"
              name="isCancelado"
              value={""}
              checked={filter.isCancelado === ""}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="Todos"
            />
          </div>
          <div className="input-base-container-20">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <Radio
              id="isCanceladoFalse"
              name="isCancelado"
              value={"false"}
              checked={filter.isCancelado === "false"}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="Solo Dedudas"
            />
          </div>
          <div className="input-base-container-20">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <Radio
              id="isCanceladoTrue"
              name="isCancelado"
              value={"true"}
              checked={filter.isCancelado === "true"}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="Solo Cancelados"
            />
          </div>
        </div>
      </div>
    </BasicKeyHandler>
  );
};

export default CuentaPorPagarFilter;
