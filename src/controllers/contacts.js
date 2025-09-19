// src/controllers/contacts.js
import { getAllContacts, getContactById,createContact, updateContact ,deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const contacts = await getAllContacts({
    page,
    perPage,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  
  //  bulunamazsa cevap
  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

	//  bulunursa cevap
  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};


export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    // zorunlu alan kontrolü
    if (!name || !phoneNumber || !contactType) {
      return res.status(400).json({
        status: 400,
        message: "Missing required fields: name, phoneNumber, contactType",
      });
    }

    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: "Successfully created a contact!",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const payload = req.body;

    // Güncelleme isteği boş mu kontrol et
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({
        status: 400,
        message: "No data provided for update",
      });
    }

    const updatedContact = await updateContact(contactId, payload);

    if (!updatedContact) {
      return next(createHttpError(404, "Contact not found")); 
    }

    res.status(200).json({
      status: 200,
      message: "Successfully patched a contact!",
      data: updatedContact,
    });
  } catch (error) {
    next(error); // errorHandler'a gönder
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deleted = await deleteContact(contactId);

    if (!deleted) {
     
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};