// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {}
}) => {
 
  const skip = (page - 1) * perPage;

  // filtre uygulanmış query
  const contactsQuery = ContactsCollection.find(filter);

  // count ve listeyi paralel çek
  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments(filter),
    contactsQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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