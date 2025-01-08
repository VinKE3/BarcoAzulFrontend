// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IUsuarioTable } from "../../../../../models";
import { handleTipoUsuario } from "../../../../../util";
const useUsuarioColumn = (): Column<IUsuarioTable>[] => {
  return useMemo<Column<IUsuarioTable>[]>(
    () => [
      {
        Header: "Nick",
        accessor: "nick",
      },
      {
        Header: "Tipo Usuario",
        accessor: "tipoUsuarioDescripcion",
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="flex justify-center">
              <p className={`badge-base-${handleTipoUsuario(value).className}`}>
                {handleTipoUsuario(value).descripcion}
              </p>
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
              <p className={`badge-base-${value ? "primary" : "secondary"}`}>
                {value ? "Activo" : "Inactivo"}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IUsuarioTable } }) => (
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

export default useUsuarioColumn;
