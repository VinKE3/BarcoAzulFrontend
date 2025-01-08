/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";
import { IGetServiceParams, IPutServiceParams, ModalIdType } from "../models";
import { apiURL, loadAbort } from "../util";

/**
 * Realiza una solicitud HTTP GET a un endpoint específico utilizando `axios`.
 * Esta función permite configurar el tipo de respuesta (JSON o Blob) y soporta la cancelación de la solicitud mediante `AbortController`.
 *
 * @param {string} url - La URL del endpoint a consultar.
 * @param {boolean} [isBlob=false] - Si es `true`, la respuesta se espera como un Blob (por ejemplo, para descargar archivos). Si es `false`, se espera una respuesta en formato JSON.
 * @param {boolean} [allData=false] - Si es `true`, devuelve toda la respuesta. Si es `false`, solo devuelve los datos de la respuesta (`response.data`).
 * @returns {object} - Un objeto que contiene:
 *  - `call`: La promesa de la solicitud HTTP que resuelve la respuesta.
 *  - `controller`: El `AbortController` para poder abortar la solicitud si es necesario.
 */
export const getService = ({
  url,
  isBlob,
  allData,
  responseType,
}: IGetServiceParams) => {
  const controller = loadAbort();
  const signal = controller.signal;
  const config = { responseType, signal };

  const endpoint: string = `${apiURL}/${url}`;

  return {
    call: axios.get(endpoint, config).then((response: AxiosResponse) => {
      return isBlob ? response : allData ? response : response.data;
    }),

    controller,
  };
};

/**
 * Realiza una solicitud HTTP POST a un endpoint específico utilizando `axios`.
 * Esta función permite configurar el tipo de respuesta (JSON o Blob) y soporta la cancelación de la solicitud mediante `AbortController`.
 *
 * @param {string} url - La URL del endpoint al que enviar la solicitud POST.
 * @param {any} data - Los datos a enviar en el cuerpo de la solicitud POST.
 * @param {boolean} [isBlob=false] - Si es `true`, la respuesta se espera como un Blob (por ejemplo, para descargar archivos). Si es `false`, se espera una respuesta en formato JSON.
 * @param {boolean} [allData=false] - Si es `true`, devuelve toda la respuesta. Si es `false`, solo devuelve los datos de la respuesta (`response.data`).
 * @returns {object} - Un objeto que contiene:
 *  - `call`: La promesa de la solicitud HTTP que resuelve la respuesta.
 *  - `controller`: El `AbortController` para poder abortar la solicitud si es necesario.
 */
export const postService = (
  url: string,
  data: any,
  isBlob?: boolean,
  allData?: boolean
) => {
  const controller = loadAbort();
  const signal = controller.signal;
  const responseType: "json" | "blob" = isBlob ? "blob" : "json";
  const config = { responseType, signal };
  const endpoint: string = `${apiURL}/${url}`;

  return {
    call: axios.post(endpoint, data, config).then((response: AxiosResponse) => {
      return isBlob ? response : allData ? response : response.data;
    }),
    controller,
  };
};

/**
 * Realiza una solicitud HTTP PUT a un endpoint específico utilizando `axios`.
 * Esta función permite configurar el tipo de respuesta (JSON o Blob) y soporta la cancelación de la solicitud mediante `AbortController`.
 *
 * @function putService
 * @param {IPutServiceParams} params - Los parámetros para realizar la solicitud PUT.
 * @param {string} params.endPoint - La URL completa del endpoint al que se enviará la solicitud.
 * @param {any} params.data - Los datos que se enviarán en el cuerpo de la solicitud PUT.
 * @param {boolean} [params.allData=false] - Si es `true`, se devuelve toda la respuesta de Axios; si es `false`, solo los datos de la respuesta.
 * @param {ConfigResponseType} params.responseType - El tipo de respuesta esperada, ya sea `json` o `blob`.
 *
 * @returns {object} Un objeto que contiene:
 *  - `call`: Una promesa que resuelve con la respuesta de la solicitud PUT.
 *  - `controller`: El `AbortController` que permite cancelar la solicitud si es necesario.
 *
 */
export const putService = ({
  endPoint,
  data,
  allData,
  responseType,
}: IPutServiceParams) => {
  const controller = loadAbort();
  const signal = controller.signal;
  const config = { responseType, signal };
  const endpoint: string = `${apiURL}/${endPoint}`;
  return {
    call: axios.put(endpoint, data, config).then((response: AxiosResponse) => {
      return allData ? response : response.data;
    }),
    controller,
  };
};

/**
 * Realiza una solicitud HTTP DELETE a un endpoint específico utilizando `axios`.
 * Esta función permite configurar el tipo de respuesta (JSON o Blob) y soporta la cancelación de la solicitud mediante `AbortController`.
 *
 * @param {string} url - La URL del endpoint al que enviar la solicitud DELETE.
 * @param {ModalIdType} id - El identificador único del recurso a eliminar.
 * @param {boolean} [isBlob=false] - Si es `true`, la respuesta se espera como un Blob (por ejemplo, para descargar archivos). Si es `false`, se espera una respuesta en formato JSON.
 * @param {boolean} [allData=false] - Si es `true`, devuelve toda la respuesta. Si es `false`, solo devuelve los datos de la respuesta (`response.data`).
 * @returns {object} - Un objeto que contiene:
 *  - `call`: La promesa de la solicitud HTTP que resuelve la respuesta.
 *  - `controller`: El `AbortController` para poder abortar la solicitud si es necesario.
 */
export const deleteService = (
  url: string,
  id: ModalIdType,
  isBlob?: boolean,
  allData?: boolean
) => {
  const controller = loadAbort();
  const signal = controller.signal;
  const responseType: "json" | "blob" = isBlob ? "blob" : "json";
  const config = { responseType, signal };

  const endpoint = `${apiURL}/${url}/${encodeURI(id as string)}`;

  return {
    call: axios.delete(endpoint, config).then((response: AxiosResponse) => {
      return isBlob ? response : allData ? response : response.data;
    }),

    controller,
  };
};
