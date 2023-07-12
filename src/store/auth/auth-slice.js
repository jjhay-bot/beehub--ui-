import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "test",
  },
  token: localStorage.getItem("token"),
  email: localStorage.getItem("email"),
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    setToken(state, { payload }) {
      state.token = payload;
    },
    setEmail(state, { payload }) {
      state.email = payload;
    },
    setIsLoading(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export default authSlice.reducer;
export const authAction = authSlice.actions;
export const authState = (state) => state.auth;
