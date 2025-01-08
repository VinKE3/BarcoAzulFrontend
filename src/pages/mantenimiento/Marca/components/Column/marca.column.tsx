import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IMarcaTable } from "../../../../../models";
const useMarcaColumn = (): Column<IMarcaTable>[] => {
  return useMemo<Column<IMarcaTable>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IMarcaTable } }) => (
          <ActionBar id={row.original.id.toString()} rowData={row.original} />
        ),
      },
    ],
    []
  );
};

export default useMarcaColumn;
