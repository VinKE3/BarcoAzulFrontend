import { ChangeEvent } from "react";
import { BasicKeyHandler, ButtonFooter, CheckBox } from "../../../components";
import { useFocus, useGlobalContext } from "../../../hooks";
import { IConfiguracion, IOptionType } from "../../../models";
import { monthsText, yearsText } from "../../../util";

interface IProps {
  dataGeneral: IConfiguracion;
  setDataGeneral: React.Dispatch<React.SetStateAction<IConfiguracion>>;
}

const EmpresaPeriodoTab: React.FC<IProps> = ({
  dataGeneral,
  setDataGeneral,
}) => {
  //#region useState
  const { globalContext } = useGlobalContext();
  const { extra } = globalContext;
  const { element } = extra;
  const inputs = useFocus("anioHabilitado1", "anioHabilitado2");
  //#endregion

  //#region Funciones
  const handleYear = ({ target }: ChangeEvent<HTMLSelectElement>): void => {
    const { name, value: rawValue } = target;
    const value = Number(rawValue);
    setDataGeneral((x) => {
      const newData = { ...x, [name]: value };
      newData.mesesHabilitados = handleMesesHabilitados(newData);
      return newData;
    });
  };

  const handleMesesHabilitados = (data: IConfiguracion): string => {
    const { anioHabilitado1, anioHabilitado2 } = data;
    const years = [anioHabilitado1, anioHabilitado2];
    const meses = years.flatMap((year) =>
      monthsText.map((m) => `${year}${m.value}`)
    );
 

    // Utiliza un Sort para ordenar los datos y un Set para eliminar duplicados
    return Array.from(new Set(meses)).sort().join(",");
  };

  const handleMonth = (anio: number, mes: string | number): void => {
    const monthStr = `${anio}${mes}`;
    const mesesArray = dataGeneral.mesesHabilitados.split(",");
    const index = mesesArray.indexOf(monthStr);

    if (index > -1) {
      mesesArray.splice(index, 1); // Eliminar mes
    } else {
      mesesArray.push(monthStr); // Añadir mes
    }

    mesesArray.sort(); // Ordenar los meses
    setDataGeneral((x) => ({ ...x, mesesHabilitados: mesesArray.join(",") }));
  };

  const handleSelectAll =
    (anio: number) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
      const { target } = e;
      const value = (target as HTMLInputElement).checked;
      handleAllMonths(anio, value);
    };

  const handleAllMonths = (anio: number, check: boolean): void => {
    const newMonths = check ? monthsText.map((x) => `${anio}${x.value}`) : [];
    let mesesArray = dataGeneral.mesesHabilitados.split(",");

    // Filtrar meses que no corresponden al año especificado
    mesesArray = mesesArray.filter((m) => !m.startsWith(anio.toString()));

    if (check) mesesArray = mesesArray.concat(newMonths);
    mesesArray.sort(); // Ordenar los meses

    setDataGeneral((x) => ({ ...x, mesesHabilitados: mesesArray.join(",") }));
  };

  const handleCheck = (anio: number, mes: string | number): boolean => {
    const monthStr = `${anio}${mes}`;
    return dataGeneral.mesesHabilitados.split(",").includes(monthStr);
  };

  const renderMonths = (anio: number): JSX.Element[] => {
    return monthsText.map((month) => (
      <div
        key={`${anio}${month.value}`}
        className="empresa-periodo-months-check"
      >
        <CheckBox
          id={`month${anio}${month.value}`}
          value={handleCheck(anio, month.value)}
          handleData={() => handleMonth(anio, month.value)}
          label={month.descripcion}
        />
      </div>
    ));
  };
  //#endregion

  return (
    <div className="empresa-periodo">
      <BasicKeyHandler selector="empresa-periodo">
        <div className="empresa-periodo-container">
          <div className="empresa-periodo-bloque">
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="anioHabilitado1" className="label-base">
                  Año 1
                </label>
                <select
                  ref={inputs["anioHabilitado1"]}
                  id="anioHabilitado1"
                  name="anioHabilitado1"
                  value={dataGeneral.anioHabilitado1 ?? ""}
                  onChange={handleYear}
                  className="input-base"
                >
                  {yearsText().map((x: IOptionType) => (
                    <option key={x.value} value={x.value ?? ""}>
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
                  id="anios1"
                  value={dataGeneral.mesesHabilitados
                    .split(",")
                    .some((mes) =>
                      mes.startsWith(dataGeneral.anioHabilitado1.toString())
                    )}
                  handleData={handleSelectAll(dataGeneral.anioHabilitado1)}
                  label="Todos"
                />
              </div>
            </div>

            <div className="empresa-periodo-months">
              {renderMonths(dataGeneral.anioHabilitado1)}
            </div>
          </div>

          <div className="empresa-periodo-bloque">
            <div className="input-base-row">
              <div className="input-base-container-100">
                <label htmlFor="anioHabilitado2" className="label-base">
                  Año 2
                </label>
                <select
                  ref={inputs["anioHabilitado2"]}
                  id="anioHabilitado2"
                  name="anioHabilitado2"
                  value={dataGeneral.anioHabilitado2 ?? ""}
                  onChange={handleYear}
                  className="input-base"
                >
                  {yearsText().map((x: IOptionType) => (
                    <option key={x.value} value={x.value ?? ""}>
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
                  id="anios2"
                  value={dataGeneral.mesesHabilitados
                    .split(",")
                    .some((mes) =>
                      mes.startsWith(dataGeneral.anioHabilitado2.toString())
                    )}
                  handleData={handleSelectAll(dataGeneral.anioHabilitado2)}
                  label="Todos"
                />
              </div>
            </div>
            <div className="empresa-periodo-months">
              {renderMonths(dataGeneral.anioHabilitado2)}
            </div>
          </div>
        </div>
        <ButtonFooter
          data={dataGeneral}
          clearForm={false}
          showClose={false}
          inputFocus="anioHabilitado1"
        />
      </BasicKeyHandler>
    </div>
  );
};

export default EmpresaPeriodoTab;
