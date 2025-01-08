// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../../components";
import { IConfiguracionDetalle } from "../../../../../../models";

const usePorcentajeColumn = (
  origen: string
): Column<IConfiguracionDetalle>[] => {
  return useMemo<Column<IConfiguracionDetalle>[]>(
    () => [
      {
        Header: "N°",
        accessor: "detalleId",
        Cell: ({ value }: { value: number }) => {
          return <p className="text-center">{value}</p>;
        },
      },
      {
        Header: "Porcentaje",
        accessor: "porcentaje",
        Cell: ({ value }: { value: number }) => {
          return <p className="text-center">{`${value}%`}</p>;
        },
      },
      {
        Header: "Tipo",
        accessor: "tipoPercepcion",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="text-center">{value ?? "SIN TIPO"}</p>;
        },
      },
      {
        Header: "Por Defecto",
        accessor: "default",
        Cell: ({ value }: { value: boolean }) => {
          return (
            <div className="flex justify-center">
              <p
                className={`main-table-badge-${
                  value ? "primary" : "secondary"
                }`}
              >
                {value ? "Activo" : "Inactivo"}
              </p>
            </div>
          );
        },
      },
      {
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IConfiguracionDetalle } }) => (
          <ActionBar
            modalProp="segundo"
            id={row.original.detalleId.toString()}
            rowData={{ ...row.original, origen: `${origen}Detalle` }}
            returnRetorno={true}
            isAdminPermisos={true}
            showConsultar={false}
          />
        ),
      },
    ],
    [origen]
  );
};

export default usePorcentajeColumn;
