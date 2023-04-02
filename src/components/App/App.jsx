import React, { useState, useEffect } from 'react';
import css from './app.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContsctForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsFromLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsFromLS) {
      setContacts(contactsFromLS);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addName = ({ name, number }) => {
    const nameCase = name.toLowerCase();
    const names = contacts.map((contact) => contact.name.toLowerCase());

    if (names.includes(nameCase)) {
      alert(`${name} is already in contacts`);
      return;
    }
    setContacts((prevContacts) => [
      { name, number, id: nanoid() },
      ...prevContacts,
    ]);
  };

  const removeName = (idx) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== idx)
    );
  };

  const handleFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleContacts = () => {
    const filterCase = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filterCase)
    );
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onSubmit={addName} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter onChange={handleFilter} value={filter} />
      <ContactList contacts={getVisibleContacts()} onRemove={removeName} />
    </div>
  );
}

export default App;

