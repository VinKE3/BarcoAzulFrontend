/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosCall } from "../../axios";

export interface IApi {
  origen: string;
  callEndpoint: (axiosCall: AxiosCall<any>) => Promise<any>;
  loading: boolean;
  menu: string;
  refrescar?: boolean;
}
export const defaultApi: IApi = {
  origen: "global",
  callEndpoint: async () => new Promise<any>((resolve) => resolve({} as any)),
  loading: false,
  menu: "",
  refrescar: false,
};
