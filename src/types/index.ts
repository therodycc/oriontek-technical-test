export interface Client {
  uuid: string;
  createdBy: string | null;
  createdAt: string;
  modifiedBy: string | null;
  modifiedAt: string | null;
  completeName: string;
  identity: string;
  email: string;
  phoneNumber?: string;
  birthDate?: string;
  gender: string;
  password?: string;
  addresses: Address[];
}

export interface Address {
  uuid: string;
  createdBy: string | null;
  createdAt: string; // ISO 8601 date string
  modifiedBy: string | null;
  modifiedAt: string | null;
  name?: string;
  address: string;
  province: string;
  lat?: number;
  long?: number;
  isMain?: boolean;
}

export interface UserFormData {
  completeName: string;
  identity: string;
  email: string;
  gender: "male" | "female" | string;
}

export interface AddressFormData {
  address: string;
  province: string;
  name: string;
}
