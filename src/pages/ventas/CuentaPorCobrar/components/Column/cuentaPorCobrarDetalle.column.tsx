// columnsConfig.ts
import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import { IAbonos, ModalCrudType } from "../../../../../models";
import {
  handleFormatRowDate,
  handleMonedaRow,
  handleNumber,
} from "../../../../../util";

const useCuentaPorCobrarDetalleColumn = (
  tipo: ModalCrudType
): Column<IAbonos>[] => {
  return useMemo<Column<IAbonos>[]>(() => {
    const columns: Column<IAbonos>[] = [
      {
        Header: "N°",
        accessor: "abonoId",
        Cell: ({ value }: { value: number }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Descripción",
        accessor: "tipoPagoDescripcion",
      },
      {
        Header: "Concepto",
        accessor: "concepto",
        Cell: ({ value }: { value: string | null }) => {
          return <p className="table-base-body-td-center">{value}</p>;
        },
      },
      {
        Header: "Fecha",
        accessor: "fecha",
        Cell: ({ value }: { value: string }) => {
          return (
            <p className="table-base-body-td-center">
              {handleFormatRowDate(value)}
            </p>
          );
        },
      },
      {
        Header: "M",
        accessor: "monedaId",
        Cell: ({ value }: { value: string }) => {
          return (
            <div className="flex justify-center">
              <p className="main-table-badge-gray">{handleMonedaRow(value)}</p>
            </div>
          );
        },
      },
      {
        Header: "Tipo Cambio",
        accessor: "tipoCambio",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
      {
        Header: "Monto",
        accessor: "monto",
        Cell: ({ value }: { value: number }) => {
          return (
            <p className="table-base-body-td-right">
              {handleNumber(value, true, true)}
            </p>
          );
        },
      },
    ];

    if (tipo !== "modificar") {
      columns.push({
        Header: "Acciones",
        Cell: ({ row }: { row: { original: IAbonos } }) => (
          <ActionBar
            id=""
            isAdminPermisos={true}
            returnRetorno={true}
            rowData={{ ...row.original, origen: "detalle" }}
            showModificar={false}
            showEliminar={false}
          />
        ),
      });
    }

    return columns;
  }, [tipo]);
};

export default useCuentaPorCobrarDetalleColumn;
