import { AxiosResponse } from "axios"; // Importar AxiosResponse desde axios
import { useEffect, useState } from "react"; // Importar useEffect y useState desde React
import { AxiosCall } from "../models";

/**
 * Hook personalizado para manejar el estado de carga y permitir la cancelación de solicitudes 
 * en componentes que realizan llamadas a la API.
 * 
 * Este hook es útil cuando se quiere mostrar un indicador de carga mientras se realiza una solicitud
 * a la API y permitir que la solicitud se cancele si el componente se desmonta antes de que termine.
 * 
 * @returns Un objeto con dos propiedades:
 * - `loading`: Un valor booleano que indica si la solicitud está en curso.
 * - `callEndpoint`: Una función que realiza una llamada a la API y maneja el estado de carga.
 */
const useFetchAndLoad = () => {
  //#region useState
  const [loading, setLoading] = useState(false); // Estado para indicar si la solicitud está en curso
  let controller: AbortController; // Variable para almacenar el controlador AbortController
  //#endregion

  //#region useFfect
  // Efecto secundario para cancelar la solicitud al desmontar el componente
  useEffect(() => {
    return () => {
      cancelEndpoint(); // En el desmontaje del componente, cancelar la solicitud actual
    };
  }, []);
  //#endregion

  //#region Funciones
  // Función para realizar la llamada a la API
  const callEndpoint = async (axiosCall: AxiosCall<any>): Promise<AxiosResponse<any, any>> => {
    if (axiosCall.controller) controller = axiosCall.controller; // Utilizar el controlador proporcionado si está presente
    setLoading(true); // Establecer el estado de carga a true
    let response = {} as AxiosResponse<any>; // Inicializar el resultado como un objeto AxiosResponse vacío
    try {
      response = await axiosCall.call; // Realizar la llamada a la API utilizando Axios
    } catch (error) {
      setLoading(false); // En caso de error, establecer el estado de carga a false
      throw error; // Relanzar el error para que pueda ser manejado por el código que utiliza este hook
    }
    setLoading(false); // Establecer el estado de carga a false una vez que la llamada es exitosa
    return response; // Devolver el resultado de la llamada a la API
  };
  
  // Función para cancelar la solicitud actual
  const cancelEndpoint = (): void => {
    setLoading(false); // Establecer el estado de carga a false
    controller && controller.abort(); // Abortar la operación asincrónica utilizando el controlador AbortController si está presente
  };
  //#endregion

  // Devolver un objeto que contiene el estado de carga y la función para realizar llamadas a la API
  return { loading, callEndpoint };
};

export default useFetchAndLoad;
