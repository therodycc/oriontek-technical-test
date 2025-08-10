import { Address } from "@/types";
import addressProvider from "@/providers/address/address.provider";
import { setAddressState } from "./address.slice";
import { getAllClient } from "../clients/client.actions";
import { AppDispatch } from "@/redux/store"; // Importa el tipo del store

export const getAllAddressByClient = (uuid: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await addressProvider.getAllByClient(uuid);
    if (!res || res?.error) {
      dispatch(setAddressState({ result: [] }));
      return;
    }
    dispatch(setAddressState({ result: res }));
  };
};

export const createAddress = (
  clientUuid: string,
  address: Partial<Address>,
  successAction?: () => void
) => {
  return async (dispatch: AppDispatch) => {
    const res = await addressProvider.create(clientUuid, address);
    if (!res || res?.error) {
      alert("Error creando dirección");
      return;
    }
    successAction?.();
    dispatch(getAllClient());
  };
};

export const updateAddress = (
  uuid: string,
  data: Partial<Address>,
  successAction?: () => void
) => {
  return async (dispatch: AppDispatch) => {
    const res = await addressProvider.updateData(uuid, data);
    if (!res || res?.error) {
      alert("Error creando dirección");
      return;
    }
    successAction?.();
    dispatch(getAllClient());
  };
};

export const removeAddress = (uuid: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await addressProvider.remove(uuid);
    if (!res || res?.error) {
      alert("Error creando dirección");
      return;
    }
    dispatch(getAllClient());
  };
};
