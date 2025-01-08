import React from "react";
import { IRadio } from "../../../models";

/**
 * Componente CheckBox que retorna un radiobutton personalizado.
 */
const Radio: React.FC<IRadio> = ({ id, name, value, checked = false, label, disabled = false, handleData }) => {
  return (
    <div role="button" className="input-checkbox-base-container">
      <label className="input-checkbox-base-container-label">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked} // Propiedad para manejar si el radio button está seleccionado
          onChange={handleData} // Manejador de cambio para actualizar el valor del radio button
          disabled={disabled} // Propiedad para manejar si el radio button está deshabilitado
          className="input-radio-base" // Clase CSS para estilizar el radio button
        />

        {label && (
          <label htmlFor={id} className="input-checkbox-base-label">
            {label} {/* Muestra la etiqueta si se proporciona */}
          </label>
        )}
      </label>
    </div>
  );
};

export default Radio;
