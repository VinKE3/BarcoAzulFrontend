import { useEffect, useState } from "react";

/**
 * Hook personalizado que limita la frecuencia con la que se ejecuta una operación costosa, 
 * como una solicitud a una API, al evitar que se ejecute en cada cambio de valor, 
 * y solo lo hace después de que el usuario haya dejado de escribir por un período específico.
 * 
 * @param value El valor que se está monitoreando (por ejemplo, el texto ingresado por el usuario).
 * @param delay El tiempo en milisegundos de espera antes de ejecutar la operación, después de que el usuario haya dejado de escribir. 
 *              El valor predeterminado es 400ms.
 * 
 * @returns El valor "debounced", es decir, el valor actualizado después de que haya pasado el retraso especificado.
 * 
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 * 
 * En este caso, la búsqueda no se realizará hasta que el usuario haya dejado de escribir por 500ms.
 */
export const useDebounce = <T>(value: T, delay: number = 400): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Crear un timeout para actualizar el valor "debounced" después del retraso especificado
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el timeout si el valor o el delay cambian antes de que se ejecute el timeout
    return () => clearTimeout(timeoutId);
  }, [value, delay]);

  // Retornar el valor "debounced"
  return debouncedValue;
};
