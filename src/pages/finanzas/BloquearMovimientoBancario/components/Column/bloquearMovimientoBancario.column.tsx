// columnsConfig.ts
import { Dispatch, SetStateAction, useMemo } from "react";
import { Column } from "react-table";
import { CheckBox } from "../../../../../components";
import {
  IBloquearMovimientoBancarioTable,
  IGlobalContext,
} from "../../../../../models";
import {
  handleBloquearMovimientoBancarioCheck,
  handleFormatRowDate,
  handleMonedaRow,
  handleNumber,
} from "../../../../../util";

const useBloquearMovimientoBancarioColumn = (
  loading: boolean,
  setGlobalContext: Dispatch<SetStateAction<IGlobalContext>>
): Column<IBloquearMovimientoBancarioTable>[] => {
  return useMemo<Column<IBloquearMovimientoBancarioTable>[]>(
    () => [
      {
        Header: "Id",
        accessor: "id",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Fecha",
        accessor: "fechaContable",
        Cell: ({
          row,
        }: {
          row: { original: IBloquearMovimientoBancarioTable };
        }) => {
          const { fechaContable } = row.original;

          return (
            <div className="table-base-td-multiple-center">
              <p>{handleFormatRowDate(fechaContable)}</p>
            </div>
          );
        },
      },
      {
        Header: "N° Operación",
        accessor: "numeroOperacion",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Concepto",
        accessor: "concepto",
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
        Header: "Monto",
        accessor: "monto",
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
          row: { original: IBloquearMovimientoBancarioTable; index: number };
        }) => {
          const { index, original } = row;
          const { isBloqueado } = original;
          return (
            <CheckBox
              id={index.toString()}
              value={isBloqueado}
              name="isBloqueado"
              handleData={() =>
                handleBloquearMovimientoBancarioCheck(
                  setGlobalContext,
                  "Movimiento Bancario",
                  original
                )
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
export default useBloquearMovimientoBancarioColumn;
