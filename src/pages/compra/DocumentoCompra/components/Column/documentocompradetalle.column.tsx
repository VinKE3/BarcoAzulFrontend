import { useMemo } from "react";
import { Column } from "react-table";
import { ActionBar } from "../../../../../components";
import {
  IDocumentoCompraDetalle,
  ModalCrudType,
} from "../../../../../models";
import {
  handleNumber,
} from "../../../../../util";

const useDocumentoCompraDetalleColumn = (
  tipo: ModalCrudType
): Column<IDocumentoCompraDetalle>[] => {
   return useMemo<Column<IDocumentoCompraDetalle>[]>(() => {
     const columns: Column<IDocumentoCompraDetalle>[] = [
       {
         Header: "N°",
         accessor: "detalleId",
         Cell: ({ value }: { value: number }) => {
           return <p className="table-body-td-center">{value}</p>;
         },
       },
       {
         Header: "Descripción",
         accessor: "descripcion",
         Cell: ({ row }: { row: { original: IDocumentoCompraDetalle } }) => {
           const { original } = row;
           const { descripcion } = original;

           return (
             <div className="table-base-td-multiple-fit">
               <p>{descripcion}</p>
             </div>
           );
         },
       },
       {
         Header: "Unidad",
         accessor: "unidadMedidaId",
         Cell: ({ value }: { value: string }) => {
           return <p className="table-body-td-center">{value}</p>;
         },
       },
       {
         Header: "Cantidad",
         accessor: "cantidad",
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
         accessor: "precioUnitario",
         Cell: ({ value }: { value: number }) => {
           return (
             <p className="table-body-td-right">
               {handleNumber(value, true, true, 4)}
             </p>
           );
         },
       },
       {
         Header: "Importe",
         accessor: "importe",
         Cell: ({ value }: { value: number }) => {
           return (
             <p className="table-body-td-right">
               {handleNumber(value, true, true)}
             </p>
           );
         },
       },
     ];

     if (tipo !== "consultar") {
       columns.push({
         Header: "Acciones",
         Cell: ({ row }: { row: { original: IDocumentoCompraDetalle } }) => (
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

export default useDocumentoCompraDetalleColumn;
