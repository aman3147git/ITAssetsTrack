import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const loginUser = createAsyncThunk("auth/login", async (formData, thunkAPI) => {
  try {
    const { data } = await API.post("/auth/login", formData);
    localStorage.setItem("token", data.token);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const registerUser = createAsyncThunk("auth/register", async (formData, thunkAPI) => {
  try {
    const { data } = await API.post("/auth/register", formData);
    return data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
