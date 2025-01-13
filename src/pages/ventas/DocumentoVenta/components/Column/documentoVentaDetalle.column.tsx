// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IDocumentoVentaDetalle, ModalCrudType } from "../../../../../models";
import { handleNumber } from "../../../../../util";

const useDocumentoVentaDetalleColumn = (
  tipo: ModalCrudType
): Column<IDocumentoVentaDetalle>[] => {
  return useMemo<Column<IDocumentoVentaDetalle>[]>(() => {
    const columns: Column<IDocumentoVentaDetalle>[] = [
      {
        Header: "N°",
        accessor: "detalleId",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Descripción",
        accessor: "descripcion",
      },
      {
        Header: "Unidad",
        accessor: "unidadMedidaId",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Cantidad",
        accessor: "cantidad",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Costo Unitario",
        accessor: "precioUnitario",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Importe",
        accessor: "importe",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
    ];

    if (tipo !== "consultar") {
      columns.push({
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IDocumentoVentaDetalle } }) => (
          <ActionBar
            id=""
            isAdminPermisos={true}
            returnRetorno={true}
            rowData={{ ...row.original, origen: "detalle" }}
          />
        ),
      });
    }

    return columns;
  }, [tipo]);
};

export default useDocumentoVentaDetalleColumn;
