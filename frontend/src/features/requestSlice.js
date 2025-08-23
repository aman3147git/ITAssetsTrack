import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchRequests = createAsyncThunk("requests/fetch", async () => {
  const { data } = await API.get("/requests");
  return data;
});

export const createRequest = createAsyncThunk("requests/create", async (formData) => {
  const { data } = await API.post("/requests", formData);
  return data;
});

export const approveRequest = createAsyncThunk("requests/approve", async (id) => {
  const { data } = await API.put(`/requests/${id}/approve`);
  return data;
});

const requestSlice = createSlice({
  name: "requests",
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        const index = state.list.findIndex((req) => req._id === action.payload._id);
        if (index !== -1) state.list[index] = action.payload;
      });
  },
});

export default requestSlice.reducer;
