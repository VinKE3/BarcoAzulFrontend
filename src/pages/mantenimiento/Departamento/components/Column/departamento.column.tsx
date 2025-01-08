// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IDepartamentoTable } from "../../../../../models";

const useDepartamentoColumn = (): Column<IDepartamentoTable>[] => {
  return useMemo<Column<IDepartamentoTable>[]>(
    () => [
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IDepartamentoTable } }) => <ActionBar id={row.original.id} rowData={row.original} />,
      },
    ],
    []
  );
};

export default useDepartamentoColumn;
