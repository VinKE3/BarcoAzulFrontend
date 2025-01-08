import React from "react";
import { ICheckBox } from "../../../models";

/**
 * Componente CheckBox que retorna un checkbox personalizado.
 */
const CheckBox: React.FC<ICheckBox> = ({ id, name, value, label, disabled = false, autoFocus = false, handleData }) => {
  return (
    <div className="input-checkbox-base-container">
      <label htmlFor={id} className="input-checkbox-base-container-label">
        <input
          type="checkbox"
          id={id}
          name={name ?? id}
          value={value ?? false} // Asigna el valor del checkbox, por defecto es false si el valor es undefined o null
          checked={value} // Propiedad para manejar si el checkbox está marcado o no
          onChange={handleData} // Manejador de cambio para actualizar el valor del checkbox
          disabled={disabled} // Propiedad para manejar si el checkbox está deshabilitado
          autoFocus={autoFocus}
          className="input-checkbox-base"
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

export default CheckBox;
