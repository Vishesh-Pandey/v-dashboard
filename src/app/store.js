import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/note/noteSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
  },
});
