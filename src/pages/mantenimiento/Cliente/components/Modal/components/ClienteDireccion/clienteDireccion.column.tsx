// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../../components";
import { IClienteDireccion } from "../../../../../../../models";

const useClienteDireccionColumn = (): Column<IClienteDireccion>[] => {
  return useMemo<Column<IClienteDireccion>[]>(
    () => [
      {
        Header: "Dirección Secundaria",
        accessor: "direccion",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IClienteDireccion } }) => (
          <ActionBar
            modalProp="segundo"
            rowData={{ ...row.original, origen: "clienteDireccion" }}
            id={row.original.id.toString()}
            isAdminPermisos={true}
          />
        ),
      },
    ],
    []
  );
};

export default useClienteDireccionColumn;
