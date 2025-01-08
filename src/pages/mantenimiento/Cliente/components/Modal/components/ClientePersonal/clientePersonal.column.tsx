// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../../components";
import { IClientePersonal } from "../../../../../../../models";

const useClientePersonalColumn = (): Column<IClientePersonal>[] => {
  return useMemo<Column<IClientePersonal>[]>(
    () => [
      {
        Header: "Personal",
        accessor: "nombreCompleto",
      },
      {
        Header: "Por Defecto",
        accessor: "default",
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
        Cell: ({ row }: { row: { original: IClientePersonal } }) => (
          <ActionBar
            modalProp="segundo"
            rowData={{ ...row.original, origen: "clientePersonal" }}
            id={row.original.id}
            isAdminPermisos={true}
            showModificar={false}
          />
        ),
      },
    ],
    []
  );
};

export default useClientePersonalColumn;
