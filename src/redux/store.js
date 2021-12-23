import { configureStore } from '@reduxjs/toolkit';
import contactReducer from './contacts/contactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export default store;
