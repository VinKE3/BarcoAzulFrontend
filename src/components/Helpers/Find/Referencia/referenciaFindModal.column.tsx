// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IReferenciaFindTable } from "../../../../models";
import { handleFormatRowDate, handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const useReferenciaFindModalColumn = (inputFocus: string, tipo: string): Column<IReferenciaFindTable>[] => {
  return useMemo<Column<IReferenciaFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IReferenciaFindTable } }) => (
          <div className="button-select-base-container">
            <SelectButton retorno={{ ...row.original, origen: "referenciaFind" }} inputFocus={inputFocus} />
          </div>
        ),
      },
      {
        Header: "Documento",
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
        Header: tipo === "venta" ? "Cliente" : "Proveedor",
        accessor: tipo === "venta" ? "clienteNombre" : "proveedorNombre",
        Cell: ({ row }: { row: { original: IReferenciaFindTable } }) => {
          const { clienteNombre, proveedorNombre, ruc } = row.original;
          return (
            <div className="table-base-td-multiple">
              <p>{tipo === "venta" ? clienteNombre : proveedorNombre}</p>
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
    ],
    []
  );
};

export default useReferenciaFindModalColumn;
