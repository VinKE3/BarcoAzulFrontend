// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IUnidadMedidaTable } from "../../../../../models";

const useUnidadMedidaColumn = (): Column<IUnidadMedidaTable>[] => {
  return useMemo<Column<IUnidadMedidaTable>[]>(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IUnidadMedidaTable } }) => (
          <ActionBar id={row.original.id} rowData={row.original} />
        ),
      },
    ],
    []
  );
};

export default useUnidadMedidaColumn;
