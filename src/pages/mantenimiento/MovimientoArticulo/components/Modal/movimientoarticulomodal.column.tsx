import { useMemo } from "react";
import { Column } from "react-table";
import { IMovimientoArticuloModalTable } from "../../../../../models";
import { handleFormatRowDate } from "../../../../../util";

const movimientoArticuloModalcolumn =
  (): Column<IMovimientoArticuloModalTable>[] => {
    return useMemo<Column<IMovimientoArticuloModalTable>[]>(
      () => [
        {
          Header: "N°",
          accessor: "numero",
          Cell: ({ value }: { value: number }) => {
            return <p className="table-body-td-center">{value}</p>;
          },
        },
        {
          Header: "Fecha",
          accessor: "fechaEmision",
          Cell: ({ value }: { value: string }) => {
            return (
              <p className="table-body-td-center">
                {handleFormatRowDate(value)}
              </p>
            );
          },
        },
        {
          Header: "Documento",
          accessor: "numeroDocumento",
        },
        {
          Header: "Razón Social",
          accessor: "clienteNombre",
        },
        {
          Header: "Entradas",
          accessor: "entradaCantidad",
          Cell: ({ value }: { value: number }) => {
            return <p className="table-body-td-center">{value}</p>;
          },
        },
        {
          Header: "Costo",
          accessor: "entradaCosto",
          Cell: ({ value }: { value: number }) => {
            return (
              <p className="table-body-td-center">
                {parseFloat(value.toString()).toFixed(2)}
              </p>
            );
          },
        },
        {
          Header: "Total",
          accessor: "entradaImporte",
          Cell: ({ value }: { value: number }) => {
            return (
              <p className="table-body-td-center">
                {parseFloat(value.toString()).toFixed(2)}
              </p>
            );
          },
        },
        {
          Header: "Salidas",
          accessor: "salidaCantidad",
          Cell: ({ value }: { value: number }) => {
            return <p className="table-body-td-center">{value}</p>;
          },
        },
        {
          Header: "Precio",
          accessor: "salidaCosto",
          Cell: ({ value }: { value: number }) => {
            return (
              <p className="table-body-td-center">
                {parseFloat(value.toString()).toFixed(2)}
              </p>
            );
          },
        },
        {
          Header: "Total",
          accessor: "salidaImporte",
          Cell: ({ value }: { value: number }) => {
            return (
              <p className="table-body-td-center">
                {parseFloat(value.toString()).toFixed(2)}
              </p>
            );
          },
        },
        {
          Header: "Saldo",
          accessor: "saldoCantidad",
          Cell: ({ value }: { value: number }) => {
            return (
              <p className="table-body-td-center">
                {parseFloat(value.toString()).toFixed(2)}
              </p>
            );
          },
        },
        {
          Header: "Costo",
          accessor: "saldoCosto",
          Cell: ({ value }: { value: number }) => {
            return (
              <p className="table-body-td-center">
                {parseFloat(value.toString()).toFixed(2)}
              </p>
            );
          },
        },
        {
          Header: "Total",
          accessor: "saldoImporte",
          Cell: ({ value }: { value: number }) => {
            return (
              <p className="table-body-td-center">
                {parseFloat(value.toString()).toFixed(2)}
              </p>
            );
          },
        },
      ],
      []
    );
  };

export default movimientoArticuloModalcolumn;
