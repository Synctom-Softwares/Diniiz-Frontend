/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../../../config/api";
import locationApi from "../../../../config/locationApi";
import asyncHandler from "../../../utils/asyncHandler";


const initialState = {
  allReservations: [],
  loading: false,
  error: null,
};



// ✅ Thunk: Login
export const getAllReservations = createAsyncThunk(
  "reservations/getAllReservations",
  async (_, { rejectWithValue }) => {
    const { data, error } = await asyncHandler(() =>
      locationApi.get('/reservations') // TODO: change route
    );

    if (error) return rejectWithValue(error);
    return data;
  }
);

export const createReservation = createAsyncThunk(
  "reservations/createReservation",
  async (_, { rejectWithValue }) => {
    const { data, error } = await asyncHandler(() =>
      locationApi.Post('/reservation', data) // TODO: change route
    );

    if (error) return rejectWithValue(error);
    return data;
  }
);

export const editReservation = createAsyncThunk(
  "reservations/editReservation",
  async (_, { rejectWithValue }) => {
    const { data, error } = await asyncHandler(() =>
      locationApi.put('/reservation', data) // TODO: change route
    );

    if (error) return rejectWithValue(error);
    return data;
  }
);


const reservationSlice = createSlice({
  name: "reservations",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = false;
      state.userData = null;
      state.token = null;
      state.loading = false;
      state.error = null;

      localStorage.removeItem("authStatus");
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
    },
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    setCurrentUser: (state, action) => {
      state.userData = action.payload;
      localStorage.setItem("userData", JSON.stringify(action.payload));
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllReservations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        state.tenants = action.payload.tenants;

      })
      .addCase(getAllReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Fetching reservations failed" };
      })

      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        // state.tenants = action.payload.tenants;

      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "Creating reservation failed" };
      })
      
      .addCase(editReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.status = true;
        // state.tenants = action.payload.tenants;

      })
      .addCase(editReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || { message: "editing reservation failed" };
      })

  },
});

export const { logout, setToken, setCurrentUser } = reservationSlice.actions;

export default reservationSlice.reducer;
