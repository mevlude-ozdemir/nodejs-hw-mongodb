// src/services/contacts.js

import { ContactsCollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const students = await ContactsCollection.find();
  return students;
};

// export const getStudentById = async (studentId) => {
//   const student = await ContactsCollection.findById(studentId);
//   return student;
// };
