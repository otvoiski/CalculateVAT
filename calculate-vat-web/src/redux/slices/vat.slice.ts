import { createSlice } from "@reduxjs/toolkit";

import { IVatSlice } from "../../interfaces/vat-slice.interface";
import { getVats } from "../trunks/vat.trunk";

const vatSlice = createSlice({
  name: "vat",
  initialState: {
    isLoading: false,
    error: undefined,
    active: undefined,
    items: [],
  } as IVatSlice,
  reducers: {
    changeVat(state, action) {
      const vat = state.items.find((x) => x.name === action.payload);
      state.active = vat;
    },
  },
  extraReducers(builder) {
    builder.addCase(getVats.pending, (state, action) => {
      if (!state.isLoading) {
        state.isLoading = true;
      }
    });
    builder.addCase(getVats.fulfilled, (state, action) => {
      if (state.isLoading) {
        state.items = action.payload;
        state.isLoading = false;
      }
    });
    builder.addCase(getVats.rejected, (state, action) => {
      if (!state.isLoading) {
        state.isLoading = false;
        state.error = "Error occured";
      }
    });
  },
});

export const { changeVat } = vatSlice.actions;
export default vatSlice.reducer;