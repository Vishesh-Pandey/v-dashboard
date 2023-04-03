import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getFirestore,
  collection,
} from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import app from "../../firebase";

const db = getFirestore(app);

const initialState = {
  value: [],
  saved: false,
};

export const getWebsites = createAsyncThunk("websites/fetch", async () => {
  const querySnapshot = await getDocs(
    collection(db, getAuth().currentUser.email + "/dashboard/websites")
  );

  let websiteUpdateArray = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    websiteUpdateArray.push(doc.data());
  });
  return websiteUpdateArray;
});

export const addWebsite = createAsyncThunk("websites/add", async (website) => {
  console.log("Inside add website");
  try {
    await setDoc(
      doc(
        db,
        getAuth().currentUser.email + "/dashboard/websites",
        website.name
      ),
      {
        name: website.name,
        link: website.link,
      }
    );
    return website;
  } catch (error) {
    return website;
  }
});

export const removeWebsite = createAsyncThunk(
  "website/remove",
  async (name) => {
    console.log("removing :", name);
    await deleteDoc(
      doc(db, getAuth().currentUser.email + "/dashboard/websites", name)
    );
    return name;
  }
);

export const websiteSlice = createSlice({
  name: "websites",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWebsite.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(removeWebsite.fulfilled, (state, action) => {
        state.value = state.value.filter(
          (item) => item.name !== action.payload
        );
      })
      .addCase(getWebsites.fulfilled, (state, action) => {
        state.value = action.payload;
      });
  },
});

export const selectWebsite = (state) => state.website.value;

export default websiteSlice.reducer;
