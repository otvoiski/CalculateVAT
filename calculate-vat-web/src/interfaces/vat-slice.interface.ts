import { IVatCountry } from "./vat.interface";

export interface IVatSlice {
  isLoading: boolean,
  error?: string,
  active?: IVatCountry;
  items: IVatCountry[];
}