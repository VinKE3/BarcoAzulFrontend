// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IOrdenCompraFindTable } from "../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const useOrdenCompraFindModalColumn = (inputFocus: string): Column<IOrdenCompraFindTable>[] => {
  return useMemo<Column<IOrdenCompraFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IOrdenCompraFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton retorno={{ origen: "ordenCompraFind", ...row.original }} inputFocus={inputFocus} />
          </div>
        ),
      },
      {
        Header: "Orden N°",
        accessor: "numeroDocumento",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Emisión",
        accessor: "fechaEmision",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-body-td-center">{handleFormatRowDate(value)}</p>;
        },
      },
      {
        Header: "Proveedor",
        accessor: "proveedorNombre",
      },
      {
        Header: "Doc. Relacionado",
        accessor: "documentoRelacionado",
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="flex justify-center">
              <p className={`badge-base-${value === "  -    -        " ? "gray" : "blue"}`}>{value}</p>
            </div>
          );
        },
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-right">{handleNumber(value, false, true)}</p>;
        },
      },
    ],
    []
  );
};

export default useOrdenCompraFindModalColumn;
