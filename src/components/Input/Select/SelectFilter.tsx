import React, { KeyboardEvent, useState } from "react";
import Select from "react-select";
import { ICombo, IOptionType, ISelectFilter } from "../../../models";

/**
 * Componente SelectFilter que retorna un select personalizado con filtro integrado.
 */
const SelectFilter: React.FC<ISelectFilter> = ({
  id,
  value,
  data,
  disabled = false,
  nextElementType = "input",
  nextElementId,
  handleData,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar si el menú está abierto

  // Mapea los datos para poblar las opciones del select
  const options: IOptionType[] = data.map((x: ICombo) => ({
    value: x.id,
    label: x.nombre || x.descripcion,
  }));

  //#region Funciones
  // Maneja la apertura y cierre del menú
  const handleMenu = (value: boolean): void => {
    setIsMenuOpen(value);
  };

  // Maneja el evento de pulsación de teclas
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter") {
      if (!isMenuOpen) {
        handleData(null, id as string); // Si el menú no está abierto, llama a handleData con null
      }

      if (!isMenuOpen && options.length > 0) {
        setIsMenuOpen(true); // Abre el menú si hay opciones disponibles
      } else {
        const nextElement = document.getElementById(nextElementId); // Obtiene el siguiente elemento por su id

        if (nextElement && nextElementType === "input") {
          const input = nextElement as HTMLInputElement | HTMLSelectElement;
          input.focus(); // Enfoca el siguiente elemento si es un input
        } else if (nextElement && nextElementType === "select") {
          const select = nextElement.querySelector(
            ".my-react-select__input"
          ) as HTMLInputElement;
          if (select) {
            select.focus(); // Enfoca el siguiente elemento si es un select
          }
        }
      }
    }
  };

  // Maneja el cambio de selección
  const handleChange = (option: IOptionType | null): void => {
    setIsMenuOpen(false); // Cierra el menú
    handleData(option, id as string); // Llama a handleData con la opción seleccionada
  };
  //#endregion

  return (
    <Select
      id={id as string}
      inputId={id as string}
      name={id as string}
      placeholder="SELECCIONAR"
      value={options.find((x: IOptionType) => x.value === value)} // Busca la opción seleccionada en la lista de opciones
      onChange={handleChange} // Maneja el cambio de selección
      onKeyDown={handleKeyDown} // Maneja el evento de pulsación de teclas
      menuIsOpen={isMenuOpen} // Controla si el menú está abierto
      onMenuOpen={() => handleMenu(true)} // Maneja la apertura del menú
      onMenuClose={() => handleMenu(false)} // Maneja el cierre del menú
      options={options} // Opciones del select
      closeMenuOnSelect={true} // Cierra el menú al seleccionar una opción
      isClearable={true} // Permite limpiar la selección
      isDisabled={disabled ?? false} // Deshabilita el select si se proporciona como true
      className="my-react-select-container" // Clase CSS para estilizar el contenedor del select
      classNamePrefix="my-react-select" // Prefijo para las clases CSS del select
    />
  );
};

export default SelectFilter;
