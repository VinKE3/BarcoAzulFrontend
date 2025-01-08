// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IPersonalTable } from "../../../../../models";
import { handleSelectPersonal } from "../../../../../util";

const useVendedorColumn = (): Column<IPersonalTable>[] => {
  return useMemo<Column<IPersonalTable>[]>(
    () => [
      {
        Header: "RUC/DNI",
        accessor: "numeroDocumentoIdentidad",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Apellidos y Nombres",
        accessor: "nombres",
        Cell: ({ row }: { row: { original: IPersonalTable } }) => {
          return <p>{handleSelectPersonal(row.original)}</p>;
        },
      },
      {
        Header: "Cargo",
        accessor: "cargoDescripcion",
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="flex justify-center">
              <p className="main-table-badge-gray">{value}</p>
            </div>
          );
        },
      },
      {
        Header: "Estado",
        accessor: "isActivo",
        Cell: ({ value }: { value: boolean }) => {
          return (
            <div className="flex justify-center">
              <p
                className={`main-table-badge-${
                  value ? "primary" : "secondary"
                }`}
              >
                {value ? "Activo" : "Inactivo"}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IPersonalTable } }) => (
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

export default useVendedorColumn;
