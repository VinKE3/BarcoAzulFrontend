import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FaBuilding, FaMapMarkedAlt, FaUserTie } from "react-icons/fa";
import { RiContactsBook2Fill } from "react-icons/ri";
import { ModalForm } from "../../../../../components";
import { useGlobalContext } from "../../../../../hooks";
import {
  defaultClienteModal,
  ICliente,
  IClienteContacto,
  IClienteDireccion,
  IClienteModal,
  IClientePersonal,
  IClienteTabTablas,
} from "../../../../../models";
import { get, getTablas, handleSetErrorMensaje } from "../../../../../util";
import {
  ClienteContactoTab,
  ClienteDatosTab,
  ClienteDireccionTab,
  ClientePersonalTab,
} from "./components";
const ClienteModal: React.FC = () => {
  //#region useState
  const menuDireccion: string = "Mantenimiento/ClienteDireccion";
  const menuContacto: string = "Mantenimiento/ClienteContacto";
  const menuPersonal: string = "Mantenimiento/ClientePersonal";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;

  const [data, setData] = useState<ICliente>(form.data);
  const [dataAdicional, setDataAdicional] =
    useState<IClienteModal>(defaultClienteModal);
  const buttons = [
    { icon: FaBuilding, label: "Datos Principales", show: true },
    {
      icon: FaMapMarkedAlt,
      label: "Direcciones",
      show: primer.tipo !== "registrar",
    },
    {
      icon: RiContactsBook2Fill,
      label: "Contactos",
      show: primer.tipo !== "registrar",
    },
    { icon: FaUserTie, label: "Personal", show: primer.tipo !== "registrar" },
  ];
  //#endregion

  //#region useEffect
  useEffect(() => {
    primer.tipo !== "registrar" && handleLoad();
  }, [primer.tipo]);
  //#endregion

  //#region Funciones
  const handleLoad = async (): Promise<void> => {
    try {
      const { direccionTablas, contactoTablas, personalTablas } =
        await handleTablas();

      const direccionData = await handleListarDireccion();
      const contactoData = await handleListarContacto();
      const personalData = await handleListarPersonal();

      setDataAdicional({
        direccion: { tablas: direccionTablas, data: direccionData },
        contacto: { tablas: contactoTablas, data: contactoData },
        personal: { tablas: personalTablas, data: personalData },
      });
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };

  const handleTablas = async (): Promise<IClienteTabTablas> => {
    const [direccionTablas, contactoTablas, personalTablas] = await Promise.all(
      [
        getTablas(globalContext, menuDireccion),
        getTablas(globalContext, menuContacto),
        getTablas(globalContext, menuPersonal),
      ]
    );
    return { direccionTablas, contactoTablas, personalTablas };
  };

  const handleListarDireccion = async (): Promise<IClienteDireccion[]> => {
    try {
      const urlParams = new URLSearchParams({ clienteId: primer.id as string });
      return await get({
        globalContext,
        menu: `${menuDireccion}/ListarPorCliente`,
        urlParams,
      });
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
      return [];
    }
  };

  const handleListarContacto = async (): Promise<IClienteContacto[]> => {
    try {
      const urlParams = new URLSearchParams({ clienteId: primer.id as string });
      return await get({
        globalContext,
        menu: `${menuContacto}/ListarPorCliente`,
        urlParams,
      });
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
      return [];
    }
  };

  const handleListarPersonal = async (): Promise<IClientePersonal[]> => {
    try {
      const urlParams = new URLSearchParams({ clienteId: primer.id as string });
      const response: IClientePersonal[] = await get({
        globalContext,
        menu: `${menuPersonal}/ListarPorCliente`,
        urlParams,
      });
      return response.map((x) => {
        const { apellidoMaterno, apellidoPaterno, nombres } = x.personal;
        return {
          ...x,
          nombreCompleto: `${apellidoPaterno} ${apellidoMaterno} ${nombres}`,
        };
      });
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
      return [];
    }
  };
  //#endregion
  return (
    <ModalForm
      title={`${primer.tipo} cliente`}
      className="cliente-modal md:min-w-[60%]"
    >
      <TabGroup className="tab-base">
        <TabList className="tab-base-list">
          {buttons
            .filter((x) => x.show)
            .map((x, index) => (
              <Tab as="div" key={index}>
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

        <TabPanels>
          <TabPanel className="main-modal-form">
            <ClienteDatosTab dataGeneral={data} setDataGeneral={setData} />
          </TabPanel>
          <TabPanel className="main-modal-form">
            <ClienteDireccionTab
              dataDireccion={dataAdicional.direccion}
              handleListarDireccion={handleListarDireccion}
            />
          </TabPanel>
          <TabPanel className="main-modal-form">
            <ClienteContactoTab
              dataContacto={dataAdicional.contacto}
              handleListarContacto={handleListarContacto}
            />
          </TabPanel>
          <TabPanel className="main-modal-form">
            <ClientePersonalTab
              dataPersonal={dataAdicional.personal}
              handleListarPersonal={handleListarPersonal}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </ModalForm>
  );
};

export default ClienteModal;
