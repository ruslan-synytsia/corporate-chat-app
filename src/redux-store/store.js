// store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import chatReducer from './chatSlice';

const rootReducer = combineReducers({
    authData: authReducer,
    chatData: chatReducer
})

const store = configureStore({
  reducer: rootReducer
});

export default store;