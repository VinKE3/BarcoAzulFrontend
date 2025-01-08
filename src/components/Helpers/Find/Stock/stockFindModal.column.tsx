// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IStockFindTable } from "../../../../models";
import { handleNumber } from "../../../../util";

const useStockFindModalColumn = (): Column<IStockFindTable>[] => {
  return useMemo<Column<IStockFindTable>[]>(
    () => [
      {
        Header: "Almacén",
        accessor: "almacenDescripcion",
      },
      {
        Header: "Stock Cajas",
        accessor: "stockCajas",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true, 1)}</p>;
        },
      },
      {
        Header: "Stock Unidades",
        accessor: "stockUnidades",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true, 1)}</p>;
        },
      },
    ],
    []
  );
};

export default useStockFindModalColumn;
