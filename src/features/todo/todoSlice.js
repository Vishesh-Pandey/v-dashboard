import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { getAuth } from "firebase/auth";
import {
  doc,
  getDocs,
  setDoc,
  deleteDoc,
  getFirestore,
  collection,
} from "firebase/firestore";
import app from "../../firebase";

const db = getFirestore(app);

const initialState = {
  value: [{ id: 10, complete: true, task: "Loading..." }],
  saved: false,
};

export const addTodo = createAsyncThunk("todo/addTodo", async (todo) => {
  try {
    await setDoc(
      doc(
        db,
        `users/${getAuth().currentUser.uid}/dashboard/todo/task/${todo.id}`
      ),
      todo
    );
    return todo;
  } catch (e) {
    return todo;
  }
});

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const querySnapshot = await getDocs(
    collection(
      getFirestore(app),
      `users/${getAuth().currentUser.uid}/dashboard/todo/task`
    )
  );

  let todoUpdateArray = [];
  querySnapshot.forEach((doc) => {
    todoUpdateArray.push(doc.data());
  });
  return todoUpdateArray;
});

export const deleteTask = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    await deleteDoc(
      doc(db, `users/${getAuth().currentUser.uid}/dashboard/todo/task`, id)
    );
    return id;
  } catch (error) {
    return id;
  }
});

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.fulfilled, (state, action) => {
        state.value.push(action.payload);
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.value = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.value = state.value.filter((item) => item.id !== action.payload);
      });
  },
});

export const selectTodo = (state) => state.todo.value;

export default todoSlice.reducer;
