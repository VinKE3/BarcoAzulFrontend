import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import {
  IMovimientoBancarioDetalle,
  ModalCrudType,
} from "../../../../../models";
import { handleNumber } from "../../../../../util";

const useMovientoBancarioDetalleColum = (
  tipo: ModalCrudType
): Column<IMovimientoBancarioDetalle>[] => {
  return useMemo<Column<IMovimientoBancarioDetalle>[]>(() => {
    const columns: Column<IMovimientoBancarioDetalle>[] = [
      {
        Header: "N°",
        accessor: "detalleId",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Descripción",
        accessor: "concepto",
        Cell: ({ row }: { row: { original: IMovimientoBancarioDetalle } }) => {
          const { original } = row;
          const { concepto } = original;

          return (
            <div className="table-base-td-multiple-fit">
              <p>{concepto}</p>
            </div>
          );
        },
      },
      {
        Header: "Cantidad",
        accessor: "saldo",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Precio",
        accessor: "abono",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-body-td-right">
              {handleNumber(value, true, true, 4)}
            </p>
          );
        },
      },
    ];

    if (tipo !== "consultar") {
      columns.push({
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IMovimientoBancarioDetalle } }) => (
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

export default useMovientoBancarioDetalleColum;
