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


export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

// PATCH için service fonksiyonu
export const updateContact = async (contactId, payload) => {
  // { new: true } -> güncellenmiş dokümanı döndürsün
  const updatedContact = await ContactsCollection.findByIdAndUpdate(
    contactId,
    payload,
    { new: true }
  );
  return updatedContact;
};

export const deleteContact = async (contactId) => {
  const deletedContact = await ContactsCollection.findByIdAndDelete(contactId);
  return deletedContact;
};