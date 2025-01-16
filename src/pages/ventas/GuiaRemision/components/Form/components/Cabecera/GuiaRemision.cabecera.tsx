import { KeyboardEvent } from "react";
import { TbDeviceIpadSearch } from "react-icons/tb";
import { CheckBox } from "../../../../../../../components";
import { useGlobalContext } from "../../../../../../../hooks";
import {
  ICombo,
  IGuiaRemision,
  IGuiaRemisionTablas,
  IPuntoVenta,
  ISerie,
  defaultGuiaRemisionTablas,
} from "../../../../../../../models";
import {
  handleClearMensajes,
  handleHelpModal,
  helpModalMap,
} from "../../../../../../../util";

interface IProps {
  data: IGuiaRemision;
  handleData: (x: any) => Promise<void> | void;
}

const GuiaRemisionCabecera: React.FC<IProps> = ({ data, handleData }) => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form, extra } = globalContext;
  const { primer } = modal;
  const { element } = extra;

  const {
    tiposDocumento,
    series,
    tiposDocumentoReferencia,
    motivosTraslado,
    modalidadesTransporte,
    puntoVenta,
    vendedores,
    monedas,
    tipos,
    puntosVentaDestino,
  }: IGuiaRemisionTablas = form.tablas || defaultGuiaRemisionTablas;
  const { inputs } = element;

  //#region Funciones
  const handleOpenModal = async (origen: string): Promise<void> => {
    await handleClearMensajes(setGlobalContext);

    if (origen in helpModalMap) {
      handleHelpModal(setGlobalContext, helpModalMap[origen]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;

    e.stopPropagation();
    handleOpenModal(e.currentTarget.id);
  };
  //#endregion
  return (
    <div className="form-base-container guia-remision-form">
      <div className="modal-base-content">
        <div className="input-base-row">
          <div className="input-base-container-25">
            <label htmlFor="serie" className="label-base">
              Serie
            </label>
            <select
              id="serie"
              name="serie"
              value={data.serie ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {series
                .filter(
                  (x: ISerie) => x.tipoDocumentoId === data.tipoDocumentoId
                )
                .map((x: ISerie) => (
                  <option key={x.serie} value={x.serie}>
                    {x.serie}
                  </option>
                ))}
            </select>
          </div>
          <div className="input-base-container-25">
            <label htmlFor="numero" className="label-base">
              Número
            </label>
            <input
              id="numero"
              name="numero"
              placeholder="Número"
              value={data.numero ?? ""}
              disabled
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="fechaEmision" className="label-base">
              Emisión
            </label>
            <input
              type="date"
              id="fechaEmision"
              name="fechaEmision"
              value={data.fechaEmision}
              onChange={handleData}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
          <div className="input-base-container-25">
            <label htmlFor="fechaTraslado" className="label-base">
              Emisión
            </label>
            <input
              type="date"
              id="fechaTraslado"
              name="fechaTraslado"
              value={data.fechaTraslado}
              onChange={handleData}
              disabled={primer.tipo === "consultar" || data.detalles.length > 0}
              className="input-base"
            />
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="direccionPartida" className="label-base">
              Dirección Partida
            </label>
            <input
              id="direccionPartida"
              name="direccionPartida"
              placeholder="Dirección Partida"
              value={data.direccionPartida ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="tipoDocumentoReferencia" className="label-base">
              Tipo Documento Afectación
            </label>
            <select
              id="tipoDocumentoReferencia"
              name="tipoDocumentoReferencia"
              value={data.tipoDocumentoReferencia ?? ""}
              onChange={handleData}
              autoFocus={primer.tipo !== "registrar"}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {tiposDocumentoReferencia?.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="documentoReferencia" className="label-base">
              Documento Referencia
            </label>
            <div className="input-base-container-button">
              <input
                id="documentoReferencia"
                name="documentoReferencia"
                placeholder="Documento Referencia"
                value={data.documentoReferencia ?? ""}
                disabled
                className={
                  primer.tipo !== "consultar"
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" && (
                <button
                  id="buttonReferenciaFind"
                  name="buttonReferenciaFind"
                  title="Presione [ALT + C] para adjuntar documento."
                  accessKey="c"
                  onClick={() => handleOpenModal("buttonReferenciaFind")}
                  onKeyDown={handleKeyDown}
                  disabled={data.tipoDocumentoReferencia === null}
                  className="button-base-anidado button-base-bg-primary"
                >
                  <TbDeviceIpadSearch
                    strokeWidth={2}
                    size="2rem"
                    className="button-base-icon"
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-40">
            <label htmlFor="motivoTrasladoId" className="label-base">
              Motivo
            </label>
            <select
              ref={inputs["motivoTrasladoId"]}
              id="motivoTrasladoId"
              name="motivoTrasladoId"
              value={data.motivoTrasladoId ?? ""}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {motivosTraslado.map((x: ICombo) => (
                <option key={x.id} value={x.id} disabled={!x.isActivo}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div
            className={
              data.motivoTrasladoId === "04"
                ? "input-base-container-33"
                : "input-base-container-75"
            }
          >
            <label htmlFor="motivoSustento" className="label-base">
              Sustento Motivo
            </label>
            <input
              id="motivoSustento"
              name="motivoSustento"
              placeholder="Sustento Motivo"
              value={data.motivoSustento ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-33">
            <label
              htmlFor="clienteNumeroDocumentoIdentidad"
              className="label-base"
            >
              Documento Identidad
            </label>
            <div className="input-base-container-button">
              <input
                ref={inputs["clienteNumeroDocumentoIdentidad"]}
                id="clienteNumeroDocumentoIdentidad"
                name="clienteNumeroDocumentoIdentidad"
                placeholder="Documento Identidad"
                value={data.clienteNumeroDocumentoIdentidad ?? ""}
                disabled
                className={
                  primer.tipo === "consultar"
                    ? "input-base"
                    : "input-base-button"
                }
              />
              {primer.tipo !== "consultar" && (
                <button
                  ref={inputs["buttonClienteFind"]}
                  id="buttonClienteFind"
                  name="buttonClienteFind"
                  title="Presione [ALT + C] para adjuntar cliente."
                  accessKey="c"
                  onClick={() => handleOpenModal("buttonClienteFind")}
                  onKeyDown={handleKeyDown}
                  className="button-base-anidado button-base-bg-primary"
                >
                  <TbDeviceIpadSearch
                    strokeWidth={2}
                    size="2rem"
                    className="button-base-icon"
                  />
                </button>
              )}
            </div>
          </div>
          <div className="input-base-container-100">
            <label htmlFor="clienteNombre" className="label-base">
              Nombre
            </label>
            <input
              ref={inputs["clienteNombre"]}
              id="clienteNombre"
              name="clienteNombre"
              placeholder="Nombre"
              value={data.clienteNombre ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-100">
            <label htmlFor="clienteDireccion" className="label-base">
              Dirección Llegada
            </label>
            <input
              id="clienteDireccion"
              name="clienteDireccion"
              placeholder="Dirección Llegada"
              value={data.clienteDireccion ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-20">
            <label htmlFor="clienteDireccionId" className="label-base">
              Ubigeo Llegada
            </label>
            <input
              id="clienteDireccionId"
              name="clienteDireccionId"
              placeholder="Ubigeo Llegada"
              value={data.clienteDireccionId ?? ""}
              disabled
              className="input-base"
            />
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-33">
            <label htmlFor="modalidadTransporteId" className="label-base">
              Modalidad Transporte
            </label>
            <select
              id="modalidadTransporteId"
              name="modalidadTransporteId"
              value={data.modalidadTransporteId}
              onChange={handleData}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            >
              <option key="default" value="">
                SELECCIONAR
              </option>
              {modalidadesTransporte?.map((x: ICombo) => (
                <option key={x.id} value={x.id}>
                  {x.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="input-base-container-auto">
            {element.responsive === "full" && (
              <span className="label-base-checkbox">-</span>
            )}
            <CheckBox
              id="trasladoVehiculoM1L"
              value={data.trasladoVehiculoM1L}
              handleData={handleData}
              disabled={primer.tipo === "consultar"}
              label="Traslado vehículo M1L"
            />
          </div>
          <div className="input-base-container-33">
            <label htmlFor="transportistas" className="label-base">
              {data.modalidadTransporteId !== "02"
                ? "Transportistas"
                : "Conductores"}
            </label>
            <div className="input-base-container-button">
              <input
                ref={inputs["transportistas"]}
                id="transportistas"
                name="transportistas"
                placeholder="Adjuntar Transportistas..."
                value={data.transportistas ? data.transportistas.length : "0"}
                disabled
                className={
                  primer.tipo !== "consultar" &&
                  data.modalidadTransporteId !== ""
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" &&
                data.modalidadTransporteId !== "" && (
                  <button
                    ref={inputs["buttonTransportistaHelp"]}
                    id="buttonTransportistaHelp"
                    name="buttonTransportistaHelp"
                    title={`Presione [ALT + W] para adjuntar ${
                      data.modalidadTransporteId === "01"
                        ? "transportista"
                        : "conductores"
                    }.`}
                    accessKey="w"
                    onClick={() => handleOpenModal("buttonTransportistaHelp")}
                    onKeyDown={handleKeyDown}
                    disabled={
                      data.modalidadTransporteId === "01" &&
                      data.transportistas.length > 0
                    }
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <TbDeviceIpadSearch
                      strokeWidth={2}
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                )}
            </div>
          </div>
          <div className="input-base-container-33">
            <label htmlFor="vehiculos" className="label-base">
              Vehículos
            </label>
            <div className="input-base-container-button">
              <input
                ref={inputs["vehiculos"]}
                id="vehiculos"
                name="vehiculos"
                placeholder="Adjuntar Vehículos..."
                value={data.vehiculos ? data.vehiculos.length : "0"}
                disabled
                className={
                  primer.tipo !== "consultar" &&
                  data.modalidadTransporteId === "02"
                    ? "input-base-button"
                    : "input-base"
                }
              />
              {primer.tipo !== "consultar" &&
                data.modalidadTransporteId === "02" && (
                  <button
                    ref={inputs["buttonVehiculoHelp"]}
                    id="buttonVehiculoHelp"
                    name="buttonVehiculoHelp"
                    title="Presione [ALT + E] para adjuntar vehículos."
                    accessKey="e"
                    onClick={() => handleOpenModal("buttonVehiculoHelp")}
                    onKeyDown={handleKeyDown}
                    className="button-base-anidado button-base-bg-primary"
                  >
                    <TbDeviceIpadSearch
                      strokeWidth={2}
                      size="2rem"
                      className="button-base-icon"
                    />
                  </button>
                )}
            </div>
          </div>
        </div>

        <div className="input-base-row">
          <div className="input-base-container-20">
            <label htmlFor="cantidadBultos" className="label-base">
              Cantidad Bultos
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="cantidadBultos"
              name="cantidadBultos"
              placeholder="Cantidad Bultos"
              value={data.cantidadBultos}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={1}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-20">
            <label htmlFor="pesoBrutoTotal" className="label-base">
              Peso Bruto Total KG
            </label>
            <input
              type="number"
              inputMode="numeric"
              id="pesoBrutoTotal"
              name="pesoBrutoTotal"
              placeholder="Peso Bruto Total KG"
              value={data.pesoBrutoTotal}
              onChange={handleData}
              autoComplete="off"
              min={0}
              step={0.1}
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
          <div className="input-base-container-100">
            <label htmlFor="observacion" className="label-base">
              Observación
            </label>
            <input
              id="observacion"
              name="observacion"
              placeholder="Observación"
              value={data.observacion ?? ""}
              onChange={handleData}
              autoComplete="off"
              disabled={primer.tipo === "consultar"}
              className="input-base"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuiaRemisionCabecera;
