import { useEffect, useState } from "react";
import { useMovimientoArticuloModalColumn } from ".";
import { ModalForm, Table } from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IMovimientoArticuloTable,
  ITable,
  IMovimientoArticuloKardex,
} from "../../../../../models";
import { handleSetInputs } from "../../../../../util";

const MovimientoArticuloModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, table: tableG } = globalContext;
  const { primer } = modal;

  const { data: dataTable, row } = tableG as ITable<
    IMovimientoArticuloTable,
    number
  >;
  const [dataGeneral] = useState<IMovimientoArticuloTable>(dataTable[row]);
  const columns = useMovimientoArticuloModalColumn();
  const [table, setTable] = useState<IMovimientoArticuloKardex[]>([]);
  const inputs = useFocus("numero", "numeroFilter");
  //#endregion
  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    setTable(form.data?.detalles);
  }, [form.data]);
  //#endregion
  return (
    <>
      <ModalForm
        title={`${primer.tipo}Kardex Artículo - ${dataGeneral.articuloDescripcion}`}
        subTitle={`Marca: ${dataGeneral.marcaNombre}`}
        className="md:max-h-[80%] md:min-w-[90%]"
      >
        <div className="modal-base-content-secondary">
          {table.length > 0 && (
            <Table
              data={table}
              columns={columns}
              pagination={false}
              doubleClick={false}
              selectable={false}
              tableClassName="movimiento-articulo-table-modal"
            />
          )}
        </div>
      </ModalForm>
    </>
  );
};

export default MovimientoArticuloModal;
