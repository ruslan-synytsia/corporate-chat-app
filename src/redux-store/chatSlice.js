import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getChatData } from '../api/api';
import { getListUsers } from '../api/api';

const initialChatState = {
  loading: true,
  statusCode: null,
  message: null,
  content: null,
  usersList: [],
  accessData: true,
  error: null,
};

// Thunk-function Getting Main Account Data
export const fetchChatData = createAsyncThunk(
  'chat/fetchChatData',
  async () => {
    try {
      const response = await getChatData();
      return response;
    } catch (e) {
      throw e;
    }
  });

  export const fetchListUsers = createAsyncThunk(
    'chat/fetchListUsers',
    async () => {
      try {
        const response = await getListUsers();
        return response;
      } catch (e) {
        throw e;
      }
    });

// Create slice
const chatSlice = createSlice({
  name: 'chat',
  initialState: initialChatState,
    reducers: {
      // setSocket: (state, action) => {
      //   state.socket = action.payload;
      // }
    },
  extraReducers: (builder) => {
    builder.addCase(fetchChatData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchChatData.fulfilled, (state, action) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
      state.accessData = action.payload.access;
      state.content = action.payload.content;
      state.error = null;
    });
    builder.addCase(fetchChatData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(fetchListUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchListUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.statusCode = action.payload.statusCode;
      state.message = action.payload.message;
      state.accessData = action.payload.access;
      state.usersList = action.payload.usersList;
      state.error = null;
    });
    builder.addCase(fetchListUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  }
});

// export const { setSocket } = chatSlice.actions;
export default chatSlice.reducer;