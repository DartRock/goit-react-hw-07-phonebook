import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import { ContactList } from './components/ContactList/ContactList';
import { Filter } from './components/Filter/Filter';
import { contactsOperations } from './redux/contacts';
import s from './App.module.css';
import { changeFilter } from './redux/contacts/contactsReducer';

const { getContacts, addContact, deleteContact } = contactsOperations;

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();
  console.log(contacts);

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const submitHandler = ({ name, number }) => {
    const contactToAdd = {
      id: nanoid(),
      name,
      number,
    };

    if (
      contacts.some(
        contact =>
          contact.name.toLowerCase() === contactToAdd.name.toLowerCase(),
      )
    ) {
      return alert(`${contactToAdd.name} is already in contacts!`);
    } else {
      dispatch(addContact(contactToAdd));
    }
  };

  const flterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };
  const onChangeFilter = e => dispatch(changeFilter(e.target.value));

  const removeContact = id => dispatch(deleteContact(id));

  return (
    <section className={s.section}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={submitHandler} />
      <h2 className={s.title}>Contacts</h2>
      <Filter onChange={onChangeFilter} value={filter} />
      <ContactList
        filterContacts={flterContacts()}
        onDeleteContacts={removeContact}
      />
    </section>
  );
};

export default App;
