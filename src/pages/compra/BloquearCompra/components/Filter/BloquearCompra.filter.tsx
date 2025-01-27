/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { BasicKeyHandler, CheckBox } from "../../../../../components";
import { useDebounce, useGlobalContext } from "../../../../../hooks";
import {
  IBloquearCompraFilter,
  IBloquearCompraTable,
  ICombo,
  defaultBloquearCompraFilter,
} from "../../../../../models";
import {
  getListar,
  handleInputType,
  handleSetErrorMensaje,
  put,
  resetPagination,
} from "../../../../../util";

interface IProps {
  tablas: ICombo[];
}

const BloquearCompraFilter: React.FC<IProps> = ({ tablas }) => {
  //#region useState
  const menu: string = "Compra/BloquearCompra";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { table, modal, mensajes, extra } = globalContext;
  const { element, simplificado } = extra;
  const { fechaFin, fechaInicio } = simplificado;
  const { primer } = modal;
  const { pagina, data } = table;
  const mensaje = mensajes.filter((x) => x.tipo === 0);
  const [filter, setFilter] = useState<IBloquearCompraFilter>({
    ...defaultBloquearCompraFilter,
    fechaInicio: fechaInicio,
    fechaFin: fechaFin,
  });
  const search = useDebounce(filter);
  const [bloquearTodo, setBloquearTodo] = useState<boolean>(false);
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
        tipoDocumentoId: search.tipoDocumentoId,
        fechaInicio: search.fechaInicio,
        fechaFin: search.fechaFin,
      });
      const { data, total }: { data: IBloquearCompraTable[]; total: number } =
        await getListar(globalContext, params);
      setGlobalContext((x) => ({ ...x, table: { ...x.table, data, total } }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };

  const bloquearTodasLasCompras = async (): Promise<void> => {
    const isBloqueado = !bloquearTodo;

    const result = await Swal.fire({
      title: isBloqueado ? "Confirmar Bloqueo" : "Confirmar Desbloqueo",
      text: isBloqueado
        ? "¿Estás seguro de que deseas bloquear las primeras 50 compras?"
        : "¿Estás seguro de que deseas desbloquear las primeras 50 compras?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const { data }: { data: IBloquearCompraTable[] } = await getListar(
          globalContext
        );
        const ids = data.map((item) => item.id);

        const putResult = await put({
          globalContext,
          menu,
          data: {
            ids,
            isBloqueado,
          },
        });

        if (putResult) {
          setBloquearTodo(isBloqueado);
        }

        handleListar();
      } catch (error) {
        handleSetErrorMensaje(setGlobalContext, error);
      }
    }
  };
  //#endregion
  return (
    <div className="filter-base">
      <span className="filter-base-text">Filtrar por</span>
      <BasicKeyHandler selector="bloquear-compra-filter">
        <div className="input-base-row">
          <div className="input-base-container-50">
            <label htmlFor="tipoDocumentoId" className="label-base">
              Tipo Documento
            </label>
            <select
              id="tipoDocumentoId"
              name="tipoDocumentoId"
              value={filter.tipoDocumentoId}
              onChange={handleData}
              className="input-base"
            >
              {tablas.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-20">
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
          <div className="input-base-container-20">
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
          <div className="input-base-container-20">
            <CheckBox
              label={bloquearTodo ? "Desbloquear Todo" : "Bloquear Todo"} // Change label based on state
              id="bloquearTodo"
              name="bloquearTodo"
              value={bloquearTodo}
              handleData={() => {
                bloquearTodasLasCompras(); // Call the function without parameters
              }}
            />
          </div>
        </div>
      </BasicKeyHandler>
    </div>
  );
};

export default BloquearCompraFilter;
