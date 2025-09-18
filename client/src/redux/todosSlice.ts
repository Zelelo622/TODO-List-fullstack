import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
}

const initialState: TodosState = {
  items: [
    { id: 1, text: "Покормить кота", completed: false },
    { id: 2, text: "Сделать TodoList", completed: true }
  ]
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now(),
        text: action.payload,
        completed: false
      });
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((t) => !t.completed);
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
