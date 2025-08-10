import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../store/root-reducer";

const clientState = (state: AppState) => state.client;

const getAllClients = createSelector(clientState, (state) => state.result);
const getSelectedClient = createSelector(
  clientState,
  (state) =>
    state.result?.find((item) => item.uuid === state.selectedClientUuid) || null
);

export const clientSelector = {
  getAllClients,
  getSelectedClient,
};
