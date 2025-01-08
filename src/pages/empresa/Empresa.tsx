import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ChangeEvent, useEffect, useState } from "react";
import { FaBuilding, FaCog, FaRegCalendarAlt } from "react-icons/fa";
import { Messages } from "../../components";
import { useFocus, useGlobalContext } from "../../hooks";
import {
  defaultConfiguracion,
  IConfiguracion,
  IConfiguracionDetalle,
  IConfiguracionTablas,
} from "../../models";
import {
  get,
  getTablas,
  handleInputType,
  handleSetErrorMensaje,
  handleSetInputs,
} from "../../util";
import {
  EmpresaConfiguracionTab,
  EmpresaDatosTab,
  EmpresaPeriodoTab,
} from "./components";

const Empresa: React.FC = () => {
  //#region useState
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { mensajes } = globalContext;
  const mensaje = mensajes.filter((x) => x.origen === "global" && x.tipo === 0);
  const inputs = useFocus("numeroDocumentoIdentidad");
  const [data, setData] = useState<IConfiguracion>(defaultConfiguracion);

  const buttons = [
    { icon: FaBuilding, label: "Datos Principales" },
    { icon: FaRegCalendarAlt, label: "Habilitar Periodo" },
    { icon: FaCog, label: "Configuración" },
  ];

  const mesesHabilitadosLimpios = data.mesesHabilitados
    .split(",") // Dividir en un array
    .map((mes) => mes.trim()) // Eliminar espacios en cada elemento
    .join(","); // Volver a unirlos en un string si necesitas el formato original
  //#endregion

  //#region useEffect
  useEffect(() => {
    handleSetInputs(setGlobalContext, inputs);
    handleLoad();
  }, [inputs]);

  //#endregion

  //#region Funciones
  const handleData = ({
    target,
  }: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name } = target;
    const value = handleInputType(target);
    setData((x) => {
      const newData = { ...x, [name]: value };

      if (name === "departamentoId") {
        newData.provinciaId = "";
        newData.distritoId = "";
      } else if (name === "provinciaId") {
        newData.distritoId = "";
      } else if (name === "correoElectronico") {
        newData.correoElectronico = value === "" ? null : (value as string);
      }
      return newData;
    });
  };

  const handleMap = (
    porcentajes: IConfiguracionDetalle[]
  ): IConfiguracionDetalle[] => {
    return porcentajes.map((x, i) => ({
      tipo: "registrar",
      detalleId: i + 1,
      porcentaje: x.porcentaje,
      tipoPercepcion: x.tipoPercepcion,
      default: x.default,
    }));
  };

  const handleLoad = async (): Promise<void> => {
    try {
      const menu: string = "Empresa/Configuracion";
      const response: IConfiguracion = await get({
        globalContext,
        menu,
      });
      const porcentajesIGV = handleMap(response.porcentajesIGV);
      const porcentajesRetencion = handleMap(response.porcentajesRetencion);
      const porcentajesDetraccion = handleMap(response.porcentajesDetraccion);
      const porcentajesPercepcion = handleMap(response.porcentajesPercepcion);
      const mesesHabilitadosLimpios = response.mesesHabilitados
        .split(",") // Dividir en un array
        .map((mes) => mes.trim()) // Eliminar espacios en cada elemento
        .join(","); // Volver a unirlos en un string si necesitas el formato original
      const empresa: IConfiguracion = {
        ...response,
        porcentajesIGV,
        porcentajesRetencion,
        porcentajesDetraccion,
        porcentajesPercepcion,
        mesesHabilitados: mesesHabilitadosLimpios,
      };
      const tablas: IConfiguracionTablas = await getTablas(globalContext, menu);
      setData(empresa);
      setGlobalContext((x) => ({
        ...x,
        api: { ...x.api, menu, origen: "global" },
        form: { ...x.form, tablas },
      }));
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error);
    }
  };
  //#endregion

  return (
    <div className="main-base">
      <div className="main-header">
        <h4 className="main-header-title">Empresa</h4>
      </div>

      <div className="main-body">
        {mensaje.length > 0 && <Messages />}

        <TabGroup className="tab-base">
          <TabList className="tab-base-list">
            {buttons.map((x, index) => (
              <Tab as="div" key={index + 1}>
                {({ selected }) => (
                  <button
                    className={`tab-base-list-button ${
                      selected ? "tab-base-list-selected" : ""
                    }`}
                  >
                    <x.icon className="tab-base-list-icon" />
                    <span>{x.label}</span>
                  </button>
                )}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="h-[90%]">
            <TabPanel className="h-full">
              <EmpresaDatosTab
                dataGeneral={data}
                handleDataGeneral={handleData}
              />
            </TabPanel>
            <TabPanel className="h-full">
              <EmpresaPeriodoTab dataGeneral={data} setDataGeneral={setData} />
            </TabPanel>
            <TabPanel className="h-full">
              <EmpresaConfiguracionTab
                dataGeneral={data}
                setDataGeneral={setData}
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default Empresa;
