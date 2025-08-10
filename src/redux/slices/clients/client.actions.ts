import { Client } from "@/types";
import clientProvider from "../../../providers/clients/client.provider";
import { setClientState } from "./client.slice";

export const getAllClient = () => {
  return async (dispatch: Function) => {
    const res = await clientProvider.getAll();
    if (!res || res?.error)
      return [
        dispatch(
          setClientState({
            result: [],
          })
        ),
      ];
    dispatch(
      setClientState({
        result: res,
      })
    );
  };
};

export const createClient = (
  client: Partial<Client>,
  successAction?: () => void
) => {
  return async (dispatch: Function) => {
    const res = await clientProvider.create(client);
    if (!res || res?.error) return alert("Error creando cliente");
    successAction?.();
    dispatch(getAllClient());
  };
};

export const updateClient = (
  uuid: string,
  data: Partial<Client>,
  successAction?: () => void
) => {
  return async (dispatch: Function) => {
    const res = await clientProvider.updateData(uuid, data);
    if (!res || res?.error) return alert("Error creando cliente");
    successAction?.();
    dispatch(getAllClient());
  };
};

export const removeClient = (uuid: string) => {
  return async (dispatch: Function) => {
    const res = await clientProvider.remove(uuid);
    if (!res || res?.error) return alert("Error creando cliente");
    dispatch(getAllClient());
  };
};
