// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IProveedorFindTable } from "../../../../models";
import { SelectButton } from "../../SelectButton";

const useProveedorFindModalColumn = (inputFocus: string): Column<IProveedorFindTable>[] => {
  return useMemo<Column<IProveedorFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IProveedorFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton retorno={{ ...row.original, origen: "proveedorFind" }} inputFocus={inputFocus} />
          </div>
        ),
      },
      {
        Header: "RUC/DNI",
        accessor: "numeroDocumentoIdentidad",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Teléfono",
        accessor: "telefono",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
    ],
    []
  );
};

export default useProveedorFindModalColumn;
