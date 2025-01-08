// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { ITransportistaTable } from "../../../../../models";

const useTransportistaColumn = (): Column<ITransportistaTable>[] => {
  return useMemo<Column<ITransportistaTable>[]>(
    () => [
      {
        Header: "Tipo",
        Cell: ({ row }: { row: { original: ITransportistaTable } }) => {
          const tipo = row.original.tipoConductor;
          return tipo === "01"
            ? "Transportista"
            : tipo === "02"
            ? "Conductor"
            : tipo;
        },
      },
      { Header: "RUC/DNI", accessor: "numeroDocumentoIdentidad" },
      {
        Header: "Nombre",
        accessor: "nombre",
      },
      {
        Header: "Licencia Conducir N°",
        accessor: "licenciaConducir",
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: ITransportistaTable } }) => (
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

export default useTransportistaColumn;
