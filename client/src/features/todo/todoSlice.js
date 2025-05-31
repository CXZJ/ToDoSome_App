import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { todoAPI } from '../../app/api';
import toast from 'react-hot-toast';

// Async thunks
export const getAllTodos = createAsyncThunk(
  'todo/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoAPI.getAllTodos();
      return response.data;
    } catch (error) {
      toast.error('Failed to fetch todos');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const createTodo = createAsyncThunk(
  'todo/create',
  async (todoData, { rejectWithValue }) => {
    try {
      const response = await todoAPI.createTodo(todoData);
      toast.success('Todo created successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create todo');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateTodo = createAsyncThunk(
  'todo/update',
  async ({ id, todoData }, { rejectWithValue }) => {
    try {
      const response = await todoAPI.updateTodo(id, todoData);
      toast.success('Todo updated successfully!');
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update todo');
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  'todo/delete',
  async (id, { rejectWithValue }) => {
    try {
      await todoAPI.deleteTodo(id);
      toast.success('Todo deleted successfully!');
      return id;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete todo');
      return rejectWithValue(error.response?.data);
    }
  }
);

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Todos
      .addCase(getAllTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(getAllTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Todo
      .addCase(createTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos.push(action.payload);
      })
      .addCase(createTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.todos.findIndex(todo => todo._id === action.payload._id);
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = state.todos.filter(todo => todo._id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = todoSlice.actions;
export default todoSlice.reducer; 
