import { ConfigResponseType } from "../types";

export interface IGetServiceParams {
  url: string;
  allData?: boolean;
  isBlob?: boolean;
  responseType: ConfigResponseType;
}
