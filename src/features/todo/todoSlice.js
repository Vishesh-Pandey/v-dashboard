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
      doc(db, getAuth().currentUser.email + "/dashboard/todo", todo.id),
      {
        id: todo.id,
        task: todo.task,
        complete: false,
      }
    );
    return {
      id: todo.id,
      task: todo.task,
      complete: false,
    };
  } catch (e) {
    return todo;
  }
});

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
  const querySnapshot = await getDocs(
    collection(
      getFirestore(app),
      getAuth().currentUser.email + "/dashboard/todo"
    )
  );

  let todoUpdateArray = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    todoUpdateArray.push(doc.data());
  });
  return todoUpdateArray;
});

export const deleteTask = createAsyncThunk("todo/deleteTodo", async (id) => {
  try {
    await deleteDoc(
      doc(db, getAuth().currentUser.email + "/dashboard/todo", id)
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
