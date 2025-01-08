// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IDocumentoVentaPedido, IPedidoFindTable } from "../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const usePedidosFindModalColumn = (inputFocus: string): Column<IPedidoFindTable>[] => {
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
        Header: "Adjuntar",
        Cell: ({ row }: { row: { original: IPedidoFindTable } }) => {
          const { id, numeroDocumento } = row.original;
          const pedido: IDocumentoVentaPedido = { tipo: "registrar", id, numeroDocumento };
          return (
            <div className="button-select-base-container">
              <SelectButton
                retorno={{ ...pedido, origen: "pedidoFind" }}
                closeModal={false}
                inputFocus={inputFocus}
                className="button-base-bg-indigo"
              />
            </div>
          );
        },
      },
    ],
    []
  );
};

export default usePedidosFindModalColumn;
