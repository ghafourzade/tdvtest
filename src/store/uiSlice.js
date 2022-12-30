import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = Boolean(action.payload);
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
