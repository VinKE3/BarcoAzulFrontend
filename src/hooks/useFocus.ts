import { createRef, useRef } from "react";
import { InputFocusType } from "../models";

/**
 * Hook personalizado para manejar múltiples referencias a elementos del DOM, como inputs, 
 * y permitir que estos se enfoquen programáticamente.
 * 
 * Este hook es útil cuando se necesita gestionar el enfoque en varios elementos del formulario 
 * y cambiarlos de manera dinámica según la interacción del usuario o lógica del negocio.
 * 
 * @param ids Una lista de identificadores de los elementos del DOM (por ejemplo, IDs de los campos de entrada) 
 *            que se van a manejar y enfocar.
 * 
 * @returns Un objeto que contiene referencias a todos los elementos proporcionados. 
 *          Las claves del objeto son los IDs y los valores son las referencias a los elementos.
 * 
 * @example
 * const focusRefs = useFocus("input1", "input2", "input3");
 * 
 * // Ahora puedes acceder a cada input a través de sus referencias:
 * focusRefs.input1.current.focus();  // Enfocar el primer input
 * focusRefs.input2.current.focus();  // Enfocar el segundo input
 */
export const useFocus = (...ids: string[]) => {
  // useRef se utiliza para mantener una referencia mutable a los inputs
  const inputs = useRef<InputFocusType>({});

  // Para cada ID en la lista de IDs, crear una referencia y almacenarla en el objeto inputs.current
  ids.forEach((id) => {
    inputs.current[id] = createRef<any>();
  });

  // Devolver el objeto inputs.current que contiene todas las referencias creadas
  return inputs.current;
};
