// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IProveedorTable } from "../../../../../models";

const useProveedorColumn = (): Column<IProveedorTable>[] => {
  return useMemo<Column<IProveedorTable>[]>(
    () => [
      {
        Header: "Código",
        accessor: "id",
        Cell: ({ value }: { value: string }) => (
          <p className="text-center">{value ?? "-"}</p>
        ),
      },
      {
        Header: "RUC/DNI",
        accessor: "numeroDocumentoIdentidad",
        Cell: ({ value }: { value: string }) => (
          <p className="text-center">{value ?? "-"}</p>
        ),
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
        Cell: ({ value }: { value: string }) => (
          <p className="text-center">{value ?? "-"}</p>
        ),
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IProveedorTable } }) => (
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

export default useProveedorColumn;
