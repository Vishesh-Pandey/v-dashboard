import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getDocs, collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../../firebase";

const initialState = {
  value: "Hello",
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  console.log("Inside function");
  const querySnapshot = await getDocs(
    collection(
      getFirestore(app),
      getAuth().currentUser.email + "/dashboard/notes"
    )
  );
  let notes = "";
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    notes = doc.data().text;
  });
  return notes;
});

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

  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.value = "loading";
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

export const { clear, copy, change } = noteSlice.actions;

export const selectNote = (state) => state.note.value;

export default noteSlice.reducer;
