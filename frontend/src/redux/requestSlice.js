import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../axios.js";

export const createRequest = createAsyncThunk(
  "requests/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("/requests", data);
      console.log(res.data);
      
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error creating request"
      );
    }
  }
);

export const fetchMyRequests = createAsyncThunk(
  "requests/fetchMy",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/requests/my");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching requests"
      );
    }
  }
);

export const fetchPendingRequests = createAsyncThunk(
  "requests/fetchPending",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/requests/pending");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error fetching pending requests"
      );
    }
  }
);

export const updateRequestStatus = createAsyncThunk(
  "requests/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.patch(`/requests/${id}`, { status });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Error updating request"
      );
    }
  }
);

export const fetchAllRequests = createAsyncThunk(
  "requests/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/requests/history"); 
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);




const requestSlice = createSlice({
  name: "requests",
  initialState: { 
    list: [], 
    history: [],   
    loading: false, 
    error: null 
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(createRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create request";
      })

     
      .addCase(fetchMyRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchMyRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch requests";
        state.list = [];
      })

      
      .addCase(fetchPendingRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.list = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(fetchPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch pending requests";
        state.list = [];
      })

      
      .addCase(updateRequestStatus.fulfilled, (state, action) => {
        const idx = state.list.findIndex((r) => r._id === action.payload._id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
      })

      
      .addCase(fetchAllRequests.fulfilled, (state, action) => {
        state.history = Array.isArray(action.payload) ? action.payload : [];
      });
  },
});


export default requestSlice.reducer;



