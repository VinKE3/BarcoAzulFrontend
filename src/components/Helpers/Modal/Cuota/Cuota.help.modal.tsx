import { addDays, format, parseISO } from "date-fns";
import { ChangeEvent, useEffect, useState } from "react";
import { BsFileEarmarkPlusFill } from "react-icons/bs";
import { useFocus, useGlobalContext } from "../../../../hooks";
import {
  ICuotaHelp,
  ICuotaHelpModal,
  IDocumentoVentaCuota,
  IMoneda,
  defaultCuotaHelp,
} from "../../../../models";
import {
  handleClearMensajes,
  handleClearModalProp,
  handleFocus,
  handleInputType,
  handleNumber,
  handleSetInputs,
  handleSetTextos,
  handleToast,
} from "../../../../util";
import { ButtonGroup } from "../../../ButtonGroup";
import { ButtonFooter } from "../../../Footer";
import { BasicKeyHandler } from "../../../Keys";
import { ModalForm } from "../../../Modal";
import { Table } from "../../../Table";
import useCuotaHelpColumn from "./cuotaHelp.column";

const CuotaHelpModal: React.FC<ICuotaHelpModal> = ({
  dataGeneral,
  tablas,
  handleCuota,
}) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal } = globalContext;
  const { primer, tercer } = modal;
  const [data, setData] = useState<ICuotaHelp>(defaultCuotaHelp);
  const [table, setTable] = useState<IDocumentoVentaCuota[]>(
    dataGeneral.cuotas
  );
  const { monedas } = tablas;
  const columns = useCuotaHelpColumn();

  const [show, setShow] = useState<boolean>(false);
  const inputs = useFocus("numeroCuota");
  const footerItems = [
    { text: "Cuotas", value: Number(table.length) },
    { text: "Total", value: Number(dataGeneral.total) },
  ];
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  useEffect(() => {
    setTable(dataGeneral.cuotas);
  }, [dataGeneral.cuotas]);
  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => ({ ...x, [name]: value }));
  };

  const handleNew = (): void => {
    setData({ ...defaultCuotaHelp, numeroCuota: table.length });
    setShow(true);
  };

  const handleClose = (): void => {
    setShow(false);
  };

  const handleValidation = async (): Promise<boolean> => {
    await handleClearMensajes(setGlobalContext);

    const textos: string[] = [];

    // Validaciones específicas para el detalle general
    if (!data.numeroCuota || data.numeroCuota <= 0) {
      textos.push("El número de cuotas debe ser mayor a 0.");
    }

    if (!data.numeroDias || data.numeroDias <= 0) {
      textos.push("El número de días debe ser mayor a 0.");
    }

    if (textos.length > 0) {
      handleSetTextos(setGlobalContext, "adicional", textos);
    }

    return textos.length === 0;
  };

  const saveCuota = async (): Promise<void> => {
    const detalleValido = await handleValidation();
    if (!detalleValido) {
      handleFocus(inputs["numeroCuota"]);
      return;
    }

    const { total, fechaEmision } = dataGeneral;
    const { numeroCuota, numeroDias } = data;

    const montoCuota = Math.floor((total / numeroCuota) * 100) / 100; // Calcular el monto de cada cuota
    const montoRestante = total - montoCuota * (numeroCuota - 1); // Calcular el monto de la última cuota

    const cuotas: IDocumentoVentaCuota[] = Array.from(
      { length: numeroCuota },
      (_, i) => ({
        cuotaId: i + 1,
        fechaPago: format(
          addDays(parseISO(fechaEmision), numeroDias * (i + 1)),
          "yyyy-MM-dd"
        ),
        monto: i === numeroCuota - 1 ? montoRestante : montoCuota, // Usar el monto de la última cuota para la última iteración
      })
    );

    handleCuota(cuotas);
    handleToast("success", "Cuotas generadas correctamente.");
    handleClose();
  };
  //#endregion

  return (
    <ModalForm
      title="Generar Cuotas"
      origenMensajes="adicional"
      replaceClose={true}
      onClose={() => handleClearModalProp(setGlobalContext, "segundo")}
      className="cuota-help-modal md:min-w-[35%] md:w-[35%] !gap-y-0"
    >
      <div className="!p-0 main-modal-form">
        {!show && (
          <ButtonGroup showRegistrar={false} showAnular={false}>
            <button
              id="buttonAgregar"
              name="buttonAgregar"
              title="Presione [ALT + A] para agregar un registro."
              accessKey="a"
              autoFocus={tercer.tipo === null}
              onClick={handleNew}
              className="button-base button-base-bg-secondary"
            >
              <BsFileEarmarkPlusFill
                size={"1.5rem"}
                className="button-base-icon"
              />
              <span className="button-base-text">Generar</span>
            </button>
          </ButtonGroup>
        )}

        {show && (
          <BasicKeyHandler selector="cuota-help-modal">
            <div className="filter-base cuota-help-modal">
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="fechaEmision" className="label-base">
                    Emisión
                  </label>
                  <input
                    type="date"
                    id="fechaEmision"
                    name="fechaEmision"
                    value={dataGeneral.fechaEmision}
                    disabled
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="monedaId" className="label-base">
                    Moneda
                  </label>
                  <select
                    id="monedaId"
                    name="monedaId"
                    value={dataGeneral.monedaId}
                    disabled
                    className="input-base"
                  >
                    {monedas.map((x: IMoneda) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="numeroCuota" className="label-base">
                    Número de Cuotas
                  </label>
                  <input
                    ref={inputs["numeroCuota"]}
                    type="number"
                    inputMode="numeric"
                    id="numeroCuota"
                    name="numeroCuota"
                    placeholder="Número de Cuotas"
                    value={data.numeroCuota}
                    onChange={handleData}
                    autoFocus
                    min={0}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="numeroDias" className="label-base">
                    Número de Días
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="numeroDias"
                    name="numeroDias"
                    placeholder="Número de Días"
                    value={data.numeroDias}
                    onChange={handleData}
                    min={0}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <ButtonFooter
                modalProp="tercer"
                origenMensaje="adicional"
                data={data}
                replaceSend={true}
                onSend={saveCuota}
                replaceClose={true}
                onClose={handleClose}
                inputFocus="numeroCuota"
              />
            </div>
          </BasicKeyHandler>
        )}

        <Table
          data={table}
          columns={columns}
          doubleClick={false}
          pagination={false}
          selectable={false}
          tableClassName={"cuota-help-modal-table"}
          border={true}
        />
      </div>

      {footerItems.map((item, index) => (
        <div key={index} className="form-base-detalle-row">
          <p className="form-base-detalle-row-text">{item.text}</p>
          <p className="form-base-detalle-row-monto">
            {item.text === "Cuotas"
              ? item.value
              : handleNumber(item.value, true, true)}
          </p>
        </div>
      ))}
    </ModalForm>
  );
};

export default CuotaHelpModal;
