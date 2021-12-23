import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import { getContacts, addContact, deleteContact } from './contactsOperations';

const changeFilter = createAction('contacts/changeFilter');

const itemsReducer = createReducer([], builder => {
  builder
    .addCase(getContacts.fulfilled, (_, { payload }) => payload)
    .addCase(addContact.fulfilled, (state, { payload }) => [...state, payload])
    .addCase(deleteContact.fulfilled, (state, { payload }) =>
      state.filter(city => city.id !== payload.id),
    );
});

const filterReducer = createReducer('', builder => {
  builder.addCase(changeFilter, (_, { payload }) => payload);
});

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

export { changeFilter };

export default contactsReducer;
