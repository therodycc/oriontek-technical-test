import { Address } from "@/types";
import addressProvider from "@/providers/address/address.provider";
import { setAddressState } from "./address.slice";
import { getAllClient } from "../clients/client.actions";

export const getAllAddressByClient = (uuid: string) => {
  return async (dispatch: Function) => {
    const res = await addressProvider.getAllByClient(uuid);
    if (!res || res?.error)
      return [
        dispatch(
          setAddressState({
            result: [],
          })
        ),
      ];
    dispatch(
      setAddressState({
        result: res,
      })
    );
  };
};

export const createAddress = (
  clientUuid: string,
  address: Partial<Address>,
  successAction?: () => void
) => {
  return async (dispatch: Function) => {
    const res = await addressProvider.create(clientUuid, address);
    if (!res || res?.error) return alert("Error creando direción");
    successAction?.();
    dispatch(getAllClient());
  };
};

export const updateAddress = (
  uuid: string,
  data: Partial<Address>,
  successAction?: () => void
) => {
  return async (dispatch: Function) => {
    const res = await addressProvider.updateData(uuid, data);
    if (!res || res?.error) return alert("Error creando direción");
    successAction?.();
    dispatch(getAllClient());
  };
};

export const removeAddress = (uuid: string) => {
  return async (dispatch: Function) => {
    const res = await addressProvider.remove(uuid);
    if (!res || res?.error) return alert("Error creando direción");
    dispatch(getAllClient());
  };
};
