import { createSlice } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContact } from './contactsOperations';

const initialState = {
  items: [],
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    changeFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getContacts.fulfilled, (state, { payload }) => {
        state.items = payload;
      })

      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })

      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const idx = state.items.findIndex(contact => contact.id === payload.id);
        state.items.splice(idx, 1);
      });
  },
});

export const { setContacts, addContacts, deleteContacts, filterContacts } =
  contactsSlice.actions;

export default contactsSlice.reducer;
