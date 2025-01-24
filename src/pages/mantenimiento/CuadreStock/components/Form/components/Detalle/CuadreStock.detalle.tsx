import React, { ChangeEvent, useEffect, useState } from "react";
import {
  defaultCuadreStockTablas,
  ICuadreStock,
  ICuadreStockDetalle,
  ICuadreStockTablas,
  defaultCuadreStockDetalle,
} from "../../../../../../../models";
import { useGlobalContext } from "../../../../../../../hooks";
import { useCuadreStockDetalleColumn } from "../../../Column";
import { handleInputType } from "../../../../../../../util";
import CuadreStockDetalleFilter from "../Filter/CuadreStockDetalle.filter";
import { Table } from "../../../../../../../components";

interface IProps {
  dataGeneral: ICuadreStock;
  dataDetalles: ICuadreStockDetalle[];
  setDataGeneral: React.Dispatch<React.SetStateAction<ICuadreStock>>;
  setDataDetalles: React.Dispatch<React.SetStateAction<ICuadreStockDetalle[]>>;
  handleDataGeneral: (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => Promise<void> | void;
  handleTotal: (e: ChangeEvent<HTMLInputElement>) => Promise<void> | void;
}

const CuadreStockDetalle: React.FC<IProps> = ({
  dataGeneral,
  dataDetalles,
  setDataDetalles,
  setDataGeneral,
  handleTotal,
  handleDataGeneral,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, mensajes, extra, api } = globalContext;
  const { primer, segundo } = modal;
  const { retorno, tablas } = form;
  const { simplificado, element } = extra;
  const { inputs } = element;
  const mensaje = mensajes.filter((x) => x.origen === "detalle" && x.tipo >= 0);
  const [data, setData] = useState<ICuadreStockDetalle>(
    defaultCuadreStockDetalle
  );
  const columns = useCuadreStockDetalleColumn(handleTotal);
  //#endregion
  return (
    <div className="form-base-container cuadre-stock-detalle-form">
      <CuadreStockDetalleFilter
        dataDetalles={dataDetalles}
        setDataDetalles={setDataDetalles}
      />
      <Table
        data={dataDetalles}
        columns={columns}
        doubleClick={false}
        selectable={false}
        border={true}
        tableClassName="cuadre-stock-detalle-table"
      />
    </div>
  );
};

export default CuadreStockDetalle;
