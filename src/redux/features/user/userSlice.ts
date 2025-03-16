import { createSlice } from "@reduxjs/toolkit";

// initial State
const initialState = {
  user: {},
  token: "",
  lastPath: "/",
};

// user slice
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, actions) => {
      state.user = actions.payload.user;
      state.token = actions.payload.token;
    },
    logOutUser: (state) => {
      (state.user = ""), (state.token = "");
      // flash the lastPath
      state.lastPath = "/";
    },
    getLastPath: (state, action) => {
      state.lastPath = action.payload;
    },
  },
});

// exporting user slice function
export const { setUserInfo, logOutUser, getLastPath } = userSlice.actions;

export default userSlice.reducer;
