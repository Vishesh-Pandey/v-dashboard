import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/note/noteSlice";
import todoReducer from "../features/todo/todoSlice";
import websiteReducer from "../features/websites/websiteSlice";

export const store = configureStore({
  reducer: {
    note: noteReducer,
    todo: todoReducer,
    website: websiteReducer,
  },
});
