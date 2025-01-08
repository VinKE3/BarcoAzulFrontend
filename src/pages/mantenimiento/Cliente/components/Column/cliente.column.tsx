// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IClienteTable } from "../../../../../models";

const useClienteColumn = (): Column<IClienteTable>[] => {
  return useMemo<Column<IClienteTable>[]>(
    () => [
      { Header: "RUC/DNI", accessor: "numeroDocumentoIdentidad" },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Dirección",
        accessor: "direccionPrincipal",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IClienteTable } }) => (
          <ActionBar id={row.original.id} rowData={row.original} isTablas={true} />
        ),
      },
    ],
    []
  );
};

export default useClienteColumn;
