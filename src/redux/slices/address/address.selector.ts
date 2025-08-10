import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../../store/root-reducer";

const addressState = (state: AppState) => state.address;

const getAllAddresses = createSelector(addressState, (state) => state.result);

export const addressSelector = {
  getAllAddresses,
};
