// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IPedidoFindTable } from "../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const usePedidoFindModalColumn = (inputFocus: string): Column<IPedidoFindTable>[] => {
  return useMemo<Column<IPedidoFindTable>[]>(
    () => [
      {
        Header: "Pedido N°",
        accessor: "numeroDocumento",
      },
      {
        Header: "Emisión",
        accessor: "fechaEmision",
        Cell: ({ value }: { value: string }) => <p className="table-body-td-center">{handleFormatRowDate(value)}</p>,
      },
      {
        Header: "Cliente",
        accessor: "clienteNombre",
        Cell: ({ row }: { row: { original: IPedidoFindTable } }) => {
          const { clienteNombre, ruc } = row.original;
          return (
            <div className="table-base-td-multiple">
              <p>{clienteNombre}</p>
              <p className="table-base-td-sub-text">{ruc ?? ""}</p>
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
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IPedidoFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton retorno={{ origen: "pedidoFind", ...row.original }} inputFocus={inputFocus} />
          </div>
        ),
      },
    ],
    []
  );
};

export default usePedidoFindModalColumn;
