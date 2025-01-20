// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { IDocumentoVentaFindTable } from "../../../../models";
import { handleNumber } from "../../../../util";
import { SelectButton } from "../../SelectButton";

const useDocumentoVentaFindModalColumn = (
  inputFocus: string
): Column<IDocumentoVentaFindTable>[] => {
  return useMemo<Column<IDocumentoVentaFindTable>[]>(
    () => [
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IDocumentoVentaFindTable } }) => (
          <div className="helper-select-container">
            <SelectButton
              retorno={{ origen: "documentoVentaFind", ...row.original }}
              inputFocus={inputFocus}
            />
          </div>
        ),
      },
      {
        Header: "N° Documento",
        accessor: "numeroDocumento",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Cliente",
        accessor: "clienteNombre",
        Cell: ({ row }: { row: { original: IDocumentoVentaFindTable } }) => {
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
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="table-base-body-td-center">{value}</p>;
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

export default useDocumentoVentaFindModalColumn;
