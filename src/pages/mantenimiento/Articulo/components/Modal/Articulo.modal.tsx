import { ChangeEvent, useEffect, useState } from "react";
import {
  BasicKeyHandler,
  ButtonFooter,
  CheckBox,
  ModalForm,
  SelectFilter,
} from "../../../../../components";
import { useFocus, useGlobalContext } from "../../../../../hooks";
import {
  IArticulo,
  IArticuloTablas,
  IMoneda,
  IOptionType,
  defaultArticuloTablas,
} from "../../../../../models";
import { handleInputType, handleSetInputs } from "../../../../../util";

const ArticuloModal: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;
  const {
    tiposExistencia,
    lineas,
    subLineas,
    marcas,
    monedas,
    unidadesMedida,
  }: IArticuloTablas = form.tablas || defaultArticuloTablas;
  const [data, setData] = useState<IArticulo>(form.data);
  const inputs = useFocus("id", "codigoBarras");
  const [selectedLinea, setSelectedLinea] = useState(""); // Línea seleccionada
  //#endregion

  // Transformar el modelo de las sublíneas
  const transformedSubLineas = subLineas.map((subLinea) => ({
    id: subLinea.subLineaId,
    lineaId: subLinea.lineaId,
    descripcion: subLinea.descripcion,
  }));

  const filteredSubLineas = transformedSubLineas.filter(
    (subLinea) => subLinea.lineaId === selectedLinea
  );

  useEffect(() => {
    setSelectedLinea(data.lineaId || "");
  }, [data.lineaId]);

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
  }, [inputs]);

  //#endregion

  //#region Funciones
  const calcularPrecioVenta = (
    precioCompra: number,
    porcentajeUtilidad: number
  ): number => {
    if (!precioCompra || !porcentajeUtilidad) return 0;
    return precioCompra * (1 + porcentajeUtilidad / 100);
  };

  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);

    setData((prevData) => {
      const newData = { ...prevData, [name]: value };

      // Recalcular *todos* los precios de venta *después* de actualizar precioCompra
      if (name === "precioCompra") {
        newData.precioVenta1 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad1
        );
        newData.precioVenta2 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad2
        );
        newData.precioVenta3 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad3
        );
        newData.precioVenta4 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad4
        );
      } else if (name === "porcentajeUtilidad1") {
        newData.precioVenta1 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad1
        );
      } else if (name === "porcentajeUtilidad2") {
        newData.precioVenta2 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad2
        );
      } else if (name === "porcentajeUtilidad3") {
        newData.precioVenta3 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad3
        );
      } else if (name === "porcentajeUtilidad4") {
        newData.precioVenta4 = calcularPrecioVenta(
          newData.precioCompra,
          newData.porcentajeUtilidad4
        );
      }

      return newData;
    });
  };

  useEffect(() => {
    // Este useEffect solo se ejecuta una vez al montar el componente
    setData((prevData) => ({
      ...prevData,
      precioVenta1: calcularPrecioVenta(
        prevData.precioCompra,
        prevData.porcentajeUtilidad1
      ),
      precioVenta2: calcularPrecioVenta(
        prevData.precioCompra,
        prevData.porcentajeUtilidad2
      ),
      precioVenta3: calcularPrecioVenta(
        prevData.precioCompra,
        prevData.porcentajeUtilidad3
      ),
      precioVenta4: calcularPrecioVenta(
        prevData.precioCompra,
        prevData.porcentajeUtilidad4
      ),
    }));
  }, []); // Array de dependencias vacío

  const handleCustomSelect = (
    option: IOptionType | null,
    name: string
  ): void => {
    setData((prev) => ({
      ...prev,
      [name]: option ? option.value : null,
      ...(name === "lineaId" ? { subLineaId: null } : {}),
    }));
  };
  //#endregion
  return (
    <>
      {monedas.length > 0 && (
        <BasicKeyHandler selector="articulo-modal">
          <ModalForm
            title={`${primer.tipo} artículo`}
            className="md:max-h-[90%] md:min-w-[60%] articulo-modal"
          >
            <div className="modal-base-content">
              <div className="input-base-row">
                <div className="input-base-container-25">
                  <label htmlFor="id" className="label-base">
                    Código Producto
                  </label>
                  <input
                    ref={inputs["id"]}
                    id="id"
                    name="id"
                    placeholder="Código Producto"
                    value={data.id ?? ""}
                    disabled
                    className="input-base"
                  />
                </div>

                <div className="input-base-container-50">
                  <label htmlFor="codigoBarras" className="label-base">
                    Código Barras
                  </label>
                  <input
                    ref={inputs["codigoBarras"]}
                    id="codigoBarras"
                    name="codigoBarras"
                    placeholder="Código Barras"
                    value={data.codigoBarras ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    autoFocus
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <span className="label-base">Tipo Existencia</span>
                  <SelectFilter
                    id="tipoExistenciaId"
                    value={data.tipoExistenciaId}
                    handleData={(e) =>
                      handleCustomSelect(e, "tipoExistenciaId")
                    }
                    data={tiposExistencia}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="marcaId"
                    nextElementType="select"
                  />
                </div>
                <div className="input-base-container-50">
                  <span className="label-base">Marca</span>
                  <SelectFilter
                    id="marcaId"
                    value={data.marcaId}
                    handleData={(e) => handleCustomSelect(e, "marcaId")}
                    data={marcas}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="lineaId"
                    nextElementType="select"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <span className="label-base">Linea</span>
                  <SelectFilter
                    id="lineaId"
                    value={data.lineaId}
                    handleData={(e) => handleCustomSelect(e, "lineaId")}
                    data={lineas}
                    disabled={
                      primer.tipo === "consultar" || primer.tipo === "modificar"
                    }
                    nextElementId="subLineaId"
                    nextElementType="select"
                  />
                </div>
                <div className="input-base-container-50">
                  <span className="label-base">SubLinea</span>
                  <SelectFilter
                    id="subLineaId"
                    value={data.subLineaId}
                    handleData={(e) => handleCustomSelect(e, "subLineaId")}
                    data={filteredSubLineas}
                    disabled={
                      primer.tipo === "consultar" || primer.tipo === "modificar"
                    }
                    nextElementId="fixed"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-100">
                  <label htmlFor="descripcion" className="label-base">
                    Descripción
                  </label>
                  <input id="fixed" className="w-0 h-0 p-0" />
                  <input
                    id="descripcion"
                    name="descripcion"
                    placeholder="Descripción"
                    value={data.descripcion ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <span className="label-base">Unidad Medida</span>
                  <SelectFilter
                    id="unidadMedidaId"
                    value={data.unidadMedidaId}
                    handleData={(e) => handleCustomSelect(e, "unidadMedidaId")}
                    data={unidadesMedida}
                    disabled={primer.tipo === "consultar"}
                    nextElementId="fixed2"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="peso" className="label-base">
                    Peso (KG)
                  </label>
                  <input id="fixed2" className="w-0 h-0 p-0" />
                  <input
                    type="number"
                    inputMode="numeric"
                    id="peso"
                    name="peso"
                    placeholder="Peso"
                    value={data.peso ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-33">
                  <label htmlFor="stock" className="label-base">
                    Stock Actual
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="stock"
                    name="stock"
                    placeholder="stock"
                    value={data.stock ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="stockMinimo" className="label-base">
                    Stock Mínimo
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="stockMinimo"
                    name="stockMinimo"
                    placeholder="Stock Mínimo"
                    value={data.stockMinimo ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-33">
                  <label htmlFor="stockMax" className="label-base">
                    Stock Máximo
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="stockMax"
                    name="stockMax"
                    placeholder="Stock Máximo"
                    value={data.stockMax ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>

              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="monedaId" className="label-base">
                    Moneda
                  </label>
                  <select
                    id="monedaId"
                    name="monedaId"
                    value={data.monedaId ?? ""}
                    onChange={handleData}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  >
                    <option key="default" value="">
                      SELECCIONAR
                    </option>
                    {monedas.map((x: IMoneda) => (
                      <option key={x.id} value={x.id}>
                        {x.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="precioCompra" className="label-base">
                    Precio Compra
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="precioCompra"
                    name="precioCompra"
                    placeholder="Precio Compra"
                    value={data.precioCompra ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="porcentajeUtilidad1" className="label-base">
                    % Ganancia 01
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="porcentajeUtilidad1"
                    name="porcentajeUtilidad1"
                    placeholder="Ganancia 01"
                    value={data.porcentajeUtilidad1 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="precioVenta1" className="label-base">
                    Precio Venta 1
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="precioVenta1"
                    name="precioVenta1"
                    placeholder="Precio Venta"
                    value={data.precioVenta1 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="porcentajeUtilidad2" className="label-base">
                    % Ganancia 02
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="porcentajeUtilidad2"
                    name="porcentajeUtilidad2"
                    placeholder="Ganancia 02"
                    value={data.porcentajeUtilidad2 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="precioVenta2" className="label-base">
                    Precio Venta 2
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="precioVenta2"
                    name="precioVenta2"
                    placeholder="Precio Venta 2"
                    value={data.precioVenta2 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="porcentajeUtilidad3" className="label-base">
                    % Ganancia 03
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="porcentajeUtilidad3"
                    name="porcentajeUtilidad3"
                    placeholder="Ganancia 03"
                    value={data.porcentajeUtilidad3 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="precioVenta3" className="label-base">
                    Precio Venta 3
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="precioVenta3"
                    name="precioVenta3"
                    placeholder="Precio Venta 3"
                    value={data.precioVenta3 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
                <div className="input-base-container-50">
                  <label htmlFor="porcentajeUtilidad4" className="label-base">
                    % Ganancia 04
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="porcentajeUtilidad4"
                    name="porcentajeUtilidad4"
                    placeholder="Ganancia 04"
                    value={data.porcentajeUtilidad4 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
                <div className="input-base-container-50">
                  <label htmlFor="precioVenta4" className="label-base">
                    Precio Venta 4
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    id="precioVenta4"
                    name="precioVenta4"
                    placeholder="Precio Venta 4"
                    value={data.precioVenta4 ?? ""}
                    onChange={handleData}
                    autoComplete="off"
                    min={0}
                    step={1}
                    disabled={primer.tipo === "consultar"}
                    className="input-base"
                  />
                </div>
              </div>
              <div className="input-base-row">
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
              <div className="input-base-row">
                <div className="input-base-container-auto">
                  <CheckBox
                    id="isActivo"
                    value={data.isActivo}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Activo"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="precioIncluyeIGV"
                    value={data.precioIncluyeIGV}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="IGV"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="percepcionCompra"
                    value={data.percepcionCompra}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Pecep Compra"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="controlarStock"
                    value={data.controlarStock}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Control de Stock"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="actualizarPrecioCompra"
                    value={data.actualizarPrecioCompra}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Actualizar Precio"
                  />
                </div>
                <div className="input-base-container-auto">
                  <CheckBox
                    id="detraccion"
                    value={data.detraccion}
                    handleData={handleData}
                    disabled={primer.tipo === "consultar"}
                    label="Detracción"
                  />
                </div>
              </div>
            </div>

            <ButtonFooter data={data} inputFocus={"codigoBarras"} />
          </ModalForm>
        </BasicKeyHandler>
      )}
    </>
  );
};

export default ArticuloModal;
