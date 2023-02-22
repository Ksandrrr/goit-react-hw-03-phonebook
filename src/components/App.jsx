import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './PhonebookForm/PhonebookForm';
import PhoneList from './PhoneList/PhoneList';
import PhoneBookFilter from './PhonebookFilter/PhonebookFilter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

   componentDidMount() {
        const contacts = JSON.parse(localStorage.getItem("my-contacts"));
        if(contacts?.length) { 
            this.setState({
                contacts,
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        const {contacts} = this.state;
        if(contacts.length !== prevState.contacts.length) {
            localStorage.setItem("my-contacts", JSON.stringify(contacts));
        }
    }


  onAddContacts = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  saveFilterValue = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  filterContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return result;
  }
  isDublicate(name, number) {
    const { contacts } = this.state;
    const normalizedName = name.toLowerCase();
    const normalizedPhone = number.toLowerCase();
    const dublicate = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName &&
        contact.number.toLowerCase() === normalizedPhone
      );
    });
    return Boolean(dublicate);
  }
  delateContacts = id => {
    const updatedContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState({ contacts: updatedContacts });
  };

  render() {
    const items = this.filterContacts();
    return (
      <section>
        <h1>Phonebook</h1>
        <ContactForm
          onAddContacts={this.onAddContacts}
          contacts={this.state.contacts}
        />
        <h2>Contacts</h2>
        <PhoneBookFilter saveFilterValue={this.saveFilterValue} Filter={this.state.filter} />
        <PhoneList items={items} delateContacts={this.delateContacts} />
      </section>
    );
  }
}

export default App;
