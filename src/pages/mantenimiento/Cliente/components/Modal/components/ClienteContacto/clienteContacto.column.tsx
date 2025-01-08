// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../../components";
import { IClienteContacto } from "../../../../../../../models";

const useClienteContactoColumn = (): Column<IClienteContacto>[] => {
  return useMemo<Column<IClienteContacto>[]>(
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
        Cell: ({ row }: { row: { original: IClienteContacto } }) => (
          <ActionBar
            modalProp="segundo"
            rowData={{ ...row.original, origen: "clienteContacto" }}
            id={row.original.id.toString()}
            isAdminPermisos={true}
          />
        ),
      },
    ],
    []
  );
};

export default useClienteContactoColumn;
