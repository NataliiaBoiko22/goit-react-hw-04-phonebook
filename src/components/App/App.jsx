
import React, { Component } from 'react';
import css from './app.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContsctForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';

class App extends Component {
  state = {
    contacts: [
     
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsFromLS = JSON.parse(localStorage.getItem('contacts'));
    if (contactsFromLS) {
      this.setState({ contacts: contactsFromLS })
    }
      
  }
  componentDidUpdate(prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;
    if (prevContacts !== nextContacts) {
       localStorage.setItem('contacts', JSON.stringify(nextContacts))
    }
  };


  addName = ({ name, number }) => {
    const nameCase = name.toLowerCase();
    const names = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );

    if (names.indexOf(nameCase) >= 0) {
      alert(name + ' is already in contacts');
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
      };
    });
  };
  removeName = idx => {
    this.setState(prevState => {
      let newContacts = [];
      prevState.contacts.forEach(contact => {
        if (contact.id !== idx) {
          newContacts.push(contact);
        }
      });
      return { contacts: newContacts };
    });
  };
  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    let { filter, contacts } = this.state;
    const filterCase = filter.toLowerCase();
    const newArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterCase)
    );
    return newArray;
  };
  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addName} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter onChange={this.handleFilter} value={filter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onRemove={this.removeName}
        />
      </div>
    );
  }
}

export default App;
