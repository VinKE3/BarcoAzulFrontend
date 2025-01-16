// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { INotaPedidoFindTable } from "../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const useNotaPedidoFindModalColumn = (
  inputFocus: string
): Column<INotaPedidoFindTable>[] => {
  return useMemo<Column<INotaPedidoFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: INotaPedidoFindTable } }) => (
          <div className="helper-select-container">
            <SelectButton
              retorno={{ origen: "cotizacionFind", ...row.original }}
              inputFocus={inputFocus}
            />
          </div>
        ),
      },
      {
        Header: "Nota Pedido N°",
        accessor: "numeroDocumento",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Emisión",
        accessor: "fechaEmision",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{handleFormatRowDate(value)}</p>;
        },
      },
      {
        Header: "Cliente",
        accessor: "clienteNombre",
        Cell: ({ row }: { row: { original: INotaPedidoFindTable } }) => {
          return (
            <div className="flex flex-col">
              <p>{row.original.clienteNombre}</p>
              <p className="font-semibold text-mini">
                {row.original.clienteNumero ?? ""}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Total",
        accessor: "total",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="text-right">{handleNumber(value, false, true)}</p>
          );
        },
      },
    ],
    [inputFocus]
  );
};

export default useNotaPedidoFindModalColumn;
