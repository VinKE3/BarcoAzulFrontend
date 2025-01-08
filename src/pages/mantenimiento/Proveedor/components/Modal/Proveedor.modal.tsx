/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { FaBuilding } from "react-icons/fa";
import { RiBankCardFill, RiContactsBook2Fill } from "react-icons/ri";
import { ModalForm } from "../../../../../components";
import { useGlobalContext } from "../../../../../hooks";
import {
  defaultProveedorModal,
  IProveedor,
  IProveedorContacto,
  IProveedorCuentaCorriente,
  IProveedorModal,
  IProveedorTabTablas,
} from "../../../../../models";
import { get, getTablas, handleSetErrorMensaje } from "../../../../../util";
import {
  ProveedorContactoTab,
  ProveedorCuentaCorrienteTab,
  ProveedorDatosTab,
} from "./components";
const ProveedorModal: React.FC = () => {
  //#region useState
  const menuCuentaCorriente: string = "Mantenimiento/ProveedorCuentaCorriente";
  const menuContacto: string = "Mantenimiento/ProveedorContacto";
  const { globalContext, setGlobalContext } = useGlobalContext();
  const { modal, form } = globalContext;
  const { primer } = modal;

  const [data, setData] = useState<IProveedor>(form.data);
  const [dataAdicional, setDataAdicional] = useState<IProveedorModal>(
    defaultProveedorModal
  );
  const buttons = [
    { icon: FaBuilding, label: "Datos Principales", show: true },
    {
      icon: RiBankCardFill,
      label: "Cuenta Corriente",
      show: primer.tipo !== "registrar",
    },
    {
      icon: RiContactsBook2Fill,
      label: "Contactos",
      show: primer.tipo !== "registrar",
    },
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
      const { cuentaCorrienteTablas, contactoTablas } = await handleTablas();

      const direccionData = await handleListarCuentaCorriente();
      const contactoData = await handleListarContacto();

      setDataAdicional({
        cuentaCorriente: { tablas: cuentaCorrienteTablas, data: direccionData },
        contacto: { tablas: contactoTablas, data: contactoData },
      });
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
    }
  };

  const handleTablas = async (): Promise<IProveedorTabTablas> => {
    const [cuentaCorrienteTablas, contactoTablas] = await Promise.all([
      getTablas(globalContext, menuCuentaCorriente),
      getTablas(globalContext, menuContacto),
    ]);

    return { cuentaCorrienteTablas, contactoTablas };
  };

  const handleListarCuentaCorriente = async (): Promise<
    IProveedorCuentaCorriente[]
  > => {
    try {
      const urlParams = new URLSearchParams({
        proveedorId: primer.id as string,
      });
      return await get({
        globalContext,
        menu: `${menuCuentaCorriente}/ListarPorProveedor`,
        urlParams,
      });
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
      return [];
    }
  };

  const handleListarContacto = async (): Promise<IProveedorContacto[]> => {
    try {
      const urlParams = new URLSearchParams({
        proveedorId: primer.id as string,
      });
      return await get({
        globalContext,
        menu: `${menuContacto}/ListarPorProveedor`,
        urlParams,
      });
    } catch (error) {
      handleSetErrorMensaje(setGlobalContext, error, "form");
      return [];
    }
  };
  //#endregion
  return (
    <ModalForm
      title={`${primer.tipo} proveedor`}
      className="proveedor-modal md:min-w-[60%]"
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
            <ProveedorDatosTab dataGeneral={data} setDataGeneral={setData} />
          </TabPanel>
          <TabPanel className="main-modal-form">
            <ProveedorCuentaCorrienteTab
              dataCuenta={dataAdicional.cuentaCorriente}
              handleListarCuentaCorriente={handleListarCuentaCorriente}
            />
          </TabPanel>
          <TabPanel className="main-modal-form">
            <ProveedorContactoTab
              dataContacto={dataAdicional.contacto}
              handleListarContacto={handleListarContacto}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </ModalForm>
  );
};

export default ProveedorModal;
