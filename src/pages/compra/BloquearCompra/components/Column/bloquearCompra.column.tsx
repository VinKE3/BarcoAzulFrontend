// columnsConfig.ts
import { Dispatch, SetStateAction, useMemo } from "react";
import { Column } from "react-table";
import { CheckBox } from "../../../../../components";
import { IBloquearCompraTable, IGlobalContext } from "../../../../../models";
import {
  handleBloquearCompraCheck,
  handleFormatRowDate,
  handleMonedaRow,
  handleNumber,
} from "../../../../../util";

const useBloquearCompraColumn = (
  loading: boolean,
  setGlobalContext: Dispatch<SetStateAction<IGlobalContext>>
): Column<IBloquearCompraTable>[] => {
  return useMemo<Column<IBloquearCompraTable>[]>(
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
        accessor: "fechaContable",
        Cell: ({ row }: { row: { original: IBloquearCompraTable } }) => {
          const { fechaContable } = row.original;

          return (
            <div className="table-base-td-multiple-center">
              <p>{handleFormatRowDate(fechaContable)}</p>
            </div>
          );
        },
      },
      {
        Header: "Proveedor",
        accessor: "proveedorNombre",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "RUC",
        accessor: "proveedorNumero",
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
          row: { original: IBloquearCompraTable; index: number };
        }) => {
          const { index, original } = row;
          const { isBloqueado } = original;
          return (
            <CheckBox
              id={index.toString()}
              value={isBloqueado}
              name="isBloqueado"
              handleData={() =>
                handleBloquearCompraCheck(setGlobalContext, "Compra", original)
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

export default useBloquearCompraColumn;
