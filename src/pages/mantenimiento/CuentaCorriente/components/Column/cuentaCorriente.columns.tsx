// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ICuentaCorrienteTable } from "../../../../../models";
import { handleMonedaRow } from "../../../../../util";

const useCuentaCorrienteColumn = (): Column<ICuentaCorrienteTable>[] => {
  return useMemo<Column<ICuentaCorrienteTable>[]>(
    () => [
      {
        Header: "Número",
        accessor: "numero",
      },
      {
        Header: "Cuenta",
        accessor: "tipoCuentaDescripcion",
      },
      {
        Header: "Entidad Bancaria",
        accessor: "entidadBancariaNombre",
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return <p className="text-center">{handleMonedaRow(value)}</p>;
        },
      },
      {
        Header: "Saldo Final",
        accessor: "saldoFinal",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ICuentaCorrienteTable } }) => (
          <ActionBar
            id={row.original.id}
            rowData={row.original}
            isTablas={true}
          />
        ),
      },
    ],
    []
  );
};

export default useCuentaCorrienteColumn;
