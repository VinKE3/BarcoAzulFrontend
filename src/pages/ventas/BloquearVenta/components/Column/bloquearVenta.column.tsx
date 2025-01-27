// columnsConfig.ts
import { Dispatch, SetStateAction, useMemo } from "react";
import { Column } from "react-table";
import { CheckBox } from "../../../../../components";
import { IBloquearVentaTable, IGlobalContext } from "../../../../../models";
import {
  handleBloquearVentaCheck,
  handleFormatRowDate,
  handleMonedaRow,
  handleNumber,
} from "../../../../../util";

const useBloquearVentaColumn = (
  loading: boolean,
  setGlobalContext: Dispatch<SetStateAction<IGlobalContext>>
): Column<IBloquearVentaTable>[] => {
  return useMemo<Column<IBloquearVentaTable>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "N° Documento",
        accessor: "numeroDocumento",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Fecha",
        accessor: "fechaEmision",
        Cell: ({ row }: { row: { original: IBloquearVentaTable } }) => {
          const { fechaEmision } = row.original;

          return (
            <div className="table-base-td-multiple-center">
              <p>{handleFormatRowDate(fechaEmision)}</p>
            </div>
          );
        },
      },
      {
        Header: "Cliente",
        accessor: "clienteNombre",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "RUC",
        accessor: "clienteNumero",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{handleMonedaRow(value)}</p>;
        },
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, false, true)}
            </p>
          );
        },
      },
      {
        Header: "Cancelado",
        accessor: "isBloqueado",
        Cell: ({ value }: { value: boolean }) => {
          return (
            <div className="flex justify-center">
              <p className={`badge-base-${value ? "red" : "gray"}`}>
                {value ? "Si" : "No"}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Bloquear",
        Cell: ({
          row,
        }: {
          row: { original: IBloquearVentaTable; index: number };
        }) => {
          const { index, original } = row;
          const { isBloqueado } = original;
          return (
            <CheckBox
              id={index.toString()}
              value={isBloqueado}
              name="isBloqueado"
              handleData={() =>
                handleBloquearVentaCheck(setGlobalContext, "Venta", original)
              }
              disabled={loading}
            />
          );
        },
      },
    ],
    []
  );
};

export default useBloquearVentaColumn;
