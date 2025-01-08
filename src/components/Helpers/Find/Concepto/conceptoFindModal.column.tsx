// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IConceptoFindTable } from "../../../../models";
import { SelectButton } from "../../SelectButton";

const useConceptoFindModalColumn = (
  inputFocus: string
): Column<IConceptoFindTable>[] => {
  return useMemo<Column<IConceptoFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IConceptoFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton
              retorno={{ ...row.original, origen: "conceptoFind" }}
              inputFocus={inputFocus}
            />
          </div>
        ),
      },
      {
        Header: "Fecha",
        accessor: "fechaEmision",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Moneda",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Saldo",
        accessor: "saldo",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
    ],
    []
  );
};

export default useConceptoFindModalColumn;
