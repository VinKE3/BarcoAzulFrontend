// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IClienteFindTable } from "../../../../models";
import { SelectButton } from "../../SelectButton";

const useClienteFindModalColumn = (inputFocus: string): Column<IClienteFindTable>[] => {
  return useMemo<Column<IClienteFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IClienteFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton retorno={{ ...row.original, origen: "clienteFind" }} inputFocus={inputFocus} />
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
    ],
    []
  );
};

export default useClienteFindModalColumn;
