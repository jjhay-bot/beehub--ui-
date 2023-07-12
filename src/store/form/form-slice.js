import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formObj: {},
  isLoading: true,
  error: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormObj(state, { payload }) {
      state.formObj = { ...state.formObj, ...payload };
    },
    setFormObjDefault(state, { payload }) {
      state.formObj = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
    resetFormObj(state) {
      state.formObj = {};
    },
  },
});

export default formSlice.reducer;
export const formAction = formSlice.actions;
export const formState = (state) => state.form;
