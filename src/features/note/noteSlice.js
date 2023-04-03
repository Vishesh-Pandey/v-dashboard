import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  doc,
  setDoc,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import app from "../../firebase";

const db = getFirestore(app);

const initialState = {
  value: "Loading...",
  saved: false,
};

export const fetchNotes = createAsyncThunk("notes/fetchNotes", async () => {
  const querySnapshot = await getDocs(
    collection(
      getFirestore(app),
      getAuth().currentUser.email + "/dashboard/notes"
    )
  );
  let notes = "";
  querySnapshot.forEach((doc) => {
    notes = doc.data().text;
  });
  return notes;
});

export const saveNotesOnDatabase = createAsyncThunk(
  "notes/saveNotesOnDatabase",
  async (note) => {
    try {
      await setDoc(
        doc(db, getAuth().currentUser.email + "/dashboard/notes", "note"),
        {
          text: note,
        }
      );
      return true;
    } catch (e) {
      return false;
    }
  }
);

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
        state.saved = false;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(saveNotesOnDatabase.pending, (state) => {
        state.saved = false;
      })
      .addCase(saveNotesOnDatabase.fulfilled, (state, action) => {
        state.saved = true;
      });
  },
});

export const { clear, copy, change } = noteSlice.actions;

export const selectNote = (state) => state.note.value;

export default noteSlice.reducer;
