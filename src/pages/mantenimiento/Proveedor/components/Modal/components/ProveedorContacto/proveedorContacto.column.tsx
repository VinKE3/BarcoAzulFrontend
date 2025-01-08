// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../../components";
import { IProveedorContacto } from "../../../../../../../models";

const useProveedorContactoColumn = (): Column<IProveedorContacto>[] => {
  return useMemo<Column<IProveedorContacto>[]>(
    () => [
      {
        Header: "RUC/DNI",
        accessor: "numeroDocumentoIdentidad",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="text-center">{value ?? ""}</p>;
        },
      },
      {
        Header: "Nombres",
        accessor: "nombres",
      },
      {
        Header: "Dirección",
        accessor: "direccion",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IProveedorContacto } }) => (
          <ActionBar
            modalProp="segundo"
            rowData={{ ...row.original, origen: "proveedorContacto" }}
            id={row.original.id.toString()}
            isAdminPermisos={true}
          />
        ),
      },
    ],
    []
  );
};

export default useProveedorContactoColumn;
