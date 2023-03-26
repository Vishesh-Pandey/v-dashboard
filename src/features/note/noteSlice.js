import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  note: "Hello",
};

export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    clear: (state) => {
      state.value = "";
    },
    copy: (state) => {
      navigator.clipboard.writeText(state.value);
    },
    change: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { clear, copy, change } = noteSlice.actions;

export const selectNote = (state) => state.note.value;

export default noteSlice.reducer;
