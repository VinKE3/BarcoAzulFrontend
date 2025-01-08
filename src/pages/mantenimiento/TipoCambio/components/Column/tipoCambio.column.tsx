// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ITipoCambioTable } from "../../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../../util";

const useTipoCambioColumn = (): Column<ITipoCambioTable>[] => {
  return useMemo<Column<ITipoCambioTable>[]>(
    () => [
      {
        Header: "Fecha",
        accessor: "id",
        Cell: ({ value }: { value: string }) => {
          return (
            <p className="table-body-td-center">{handleFormatRowDate(value)}</p>
          );
        },
      },
      {
        Header: "Compra",
        accessor: "precioCompra",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="text-center">{handleNumber(value, false, true, 3)}</p>
          );
        },
      },
      {
        Header: "Venta",
        accessor: "precioVenta",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="text-center">{handleNumber(value, false, true, 3)}</p>
          );
        },
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ITipoCambioTable } }) => (
          <ActionBar id={row.original.id} rowData={row.original} />
        ),
      },
    ],
    []
  );
};

export default useTipoCambioColumn;
