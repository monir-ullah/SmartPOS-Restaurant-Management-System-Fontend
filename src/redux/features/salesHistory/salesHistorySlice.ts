import { createSlice } from "@reduxjs/toolkit";

// initial State value for the sales history slice
const initialState = {
  salesHistoryInfo: "",
};

//  Creating sales history slice for redux state.
export const salesHistorySlice = createSlice({
  name: "salesHistory",
  initialState,
  reducers: {
    salesHistoryInfo: (state, action) => {
      state.salesHistoryInfo = action.payload;
    },
  },
});

// export salesHistoryInfo form other file use.
export const { salesHistoryInfo } = salesHistorySlice.actions;

// exporting sales history reducer for redux store. ts
export const salesHistoryReducer = salesHistorySlice.reducer;
