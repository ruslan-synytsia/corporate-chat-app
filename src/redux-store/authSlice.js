import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { sendLoginDataToServer, sendRegistrDataToServer } from '../api/api';

const initialAuthState = {
  loading: false,
  statusCode: null,
  message: null,
  accessAuth: false,
  error: null,
};

// Thunk-function Login
export const fetchAuthLogin = createAsyncThunk(
  'auth/fetchAuthLoginData',
  async (data) => {
    try {
      const response = await sendLoginDataToServer(data);
      return response;
    } catch (e) {
      throw e;
    }
  }
);

// Thunk-function Registration
export const fetchAuthRegistration = createAsyncThunk(
  'auth/fetchAuthRegData',
  async (data) => {
    try {
      const response = await sendRegistrDataToServer(data);
      return response;
    } catch (e) {
      throw e;
    }
  }
);

// Create slice
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setStatusCode: (state, action) => {
      state.statusCode = action.payload;
    },
    setAccessFromComp: (state, action) => {
      state.accessAuth = action.payload;
    },
    resetAccessAuth: (state) => {
      state.accessAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuthLogin.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
      state.accessAuth = action.payload.access;
      state.error = null;
    });
    builder.addCase(fetchAuthLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(fetchAuthRegistration.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchAuthRegistration.fulfilled, (state, action) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
      state.accessAuth = action.payload.access;
      state.error = null;
    });
    builder.addCase(fetchAuthRegistration.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

export const { 
  setMessage, 
  setStatusCode, 
  resetAccessAuth, 
  setAccessFromComp } = authSlice.actions;

export default authSlice.reducer;
