import { Client } from "@/types";
import clientProvider from "../../../providers/clients/client.provider";
import { setClientState } from "./client.slice";
import { AppDispatch } from "@/redux/store"; // importa el tipo correcto

export const getAllClient = () => {
  return async (dispatch: AppDispatch) => {
    const res = await clientProvider.getAll();
    if (!res || res?.error) {
      dispatch(setClientState({ result: [] }));
      return;
    }
    dispatch(setClientState({ result: res }));
  };
};

export const createClient = (
  client: Partial<Client>,
  successAction?: () => void
) => {
  return async (dispatch: AppDispatch) => {
    const res = await clientProvider.create(client);
    if (!res || res?.error) {
      alert("Error creando cliente");
      return;
    }
    successAction?.();
    dispatch(getAllClient());
  };
};

export const updateClient = (
  uuid: string,
  data: Partial<Client>,
  successAction?: () => void
) => {
  return async (dispatch: AppDispatch) => {
    const res = await clientProvider.updateData(uuid, data);
    if (!res || res?.error) {
      alert("Error creando cliente");
      return;
    }
    successAction?.();
    dispatch(getAllClient());
  };
};

export const removeClient = (uuid: string) => {
  return async (dispatch: AppDispatch) => {
    const res = await clientProvider.remove(uuid);
    if (!res || res?.error) {
      alert("Error creando cliente");
      return;
    }
    dispatch(getAllClient());
  };
};
