import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showNotification: false,
  notificationType: "success",
  notification: "Notification message",
  autoHideDuration: 3000,
  previousPage: "/home",
  momentTitle: "",
  prefetchImages: [],
  imageSlot: {
    0: { id: 0, visible: true },
    1: { id: 1, visible: false },
    2: { id: 2, visible: false },
  },
  event_date: null,
  location: "",
  description: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowNotification(state, { payload }) {
      state.showNotification = payload;
    },
    setImageSlot(state, { payload }) {
      state.imageSlot = payload;
    },
    setLocation(state, { payload }) {
      state.location = payload;
    },
    setDescription(state, { payload }) {
      state.description = payload;
    },
    setEventDate(state, { payload }) {
      state.event_date = payload;
    },
    setMomentTitle(state, { payload }) {
      state.momentTitle = payload;
    },
    setPrefetchImages(state, { payload }) {
      console.log(payload);
      state.prefetchImages = payload;
    },
    setNotification(state, { payload }) {
      state.notification = payload.message;
      state.notificationType = payload.type;
      state.showNotification = true;
    },
    resetNotification(state) {
      state.showNotification = false;
    },
    setPreviousPage(state, { payload }) {
      state.previousPage = payload;
    },
  },
});

export default uiSlice.reducer;
export const uiAction = uiSlice.actions;
export const uiState = (state) => state.ui;
