// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const students = await ContactsCollection.find();
  return students;
};

export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};
