export interface IVatValue {
  id: number;
  value: number;
}

export interface IVatCountry {
  id: number;
  vats: IVatValue[];
  name: string;
}
