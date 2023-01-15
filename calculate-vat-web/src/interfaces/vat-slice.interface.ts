import { IVat } from "./vat.interface";

export interface IVatSlice {
  isLoading: boolean,
  error?: string,
  active?: IVat;
  items: IVat[];
}
