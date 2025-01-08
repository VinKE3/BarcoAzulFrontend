// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IMovimientoBancarioTable } from "../../../../../models";
import { handleFormatRowDate } from "../../../../../util";
import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/20/solid";

const useMovimientoBancarioColumn = (): Column<IMovimientoBancarioTable>[] => {
  return useMemo<Column<IMovimientoBancarioTable>[]>(
    () => [
      {
        Header: "Código",
        accessor: "id",
      },
      {
        Header: "Cuenta Bancaria",
        accessor: "cuentaBancaria",
      },
      {
        Header: "Emisión",
        accessor: "fechaEmision",
        Cell: ({ value }: { value: string }) => {
          return (
            <p className="table-body-td-center">{handleFormatRowDate(value)}</p>
          );
        },
      },
      {
        Header: "Movimiento",
        accessor: "tipoMovimientoId",
      },
      {
        Header: "Tipo",
        accessor: "tipoOperacionId",
      },
      {
        Header: "Número",
        accessor: "numeroOperacion",
      },
      {
        Header: "Nombres",
        accessor: "clienteProveedorNombre",
      },
      {
        Header: "Concepto",
        accessor: "concepto",
      },
      {
        Header: "Monto Total",
        accessor: "monto",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">
            {parseFloat(value.toString()).toFixed(2)}
          </p>
        ),
      },
      {
        Header: "Monto Aplicado",
        accessor: "total",
        Cell: ({ value }: { value: number }) => (
          <p className="table-body-td-center">
            {parseFloat(value.toString()).toFixed(2)}
          </p>
        ),
      },
      {
        Header: "B",
        accessor: "isBloqueado",
        Cell: ({ value }: { value: boolean }) => (
          <p className="">{value ? <CheckIcon /> : <CheckBadgeIcon />}</p>
        ),
      },

      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IMovimientoBancarioTable } }) => (
          <ActionBar
            id={row.original.id}
            rowData={row.original}
            isTablas={true}
          />
        ),
      },
    ],
    []
  );
};

export default useMovimientoBancarioColumn;
