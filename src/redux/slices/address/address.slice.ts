import { Address } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AddressStateI {
  result?: Address[] | null;
}

const addressState: AddressStateI = {
  result: null,
};

export const addressSlice = createSlice({
  name: "address",
  initialState: addressState,
  reducers: {
    setAddressState: (
      state: AddressStateI,
      action: PayloadAction<AddressStateI>
    ) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setAddressState } = addressSlice.actions;

export default addressSlice.reducer;
