// src/controllers/contacts.js
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { env } from '../utils/env.js';


export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId: req.user._id,
  });
  console.log('CONTACTS COUNT:', contacts.data.length); // debug
  console.log('USER ID:', req.user?._id);

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
    const { name, phoneNumber, contactType, email, isFavourite } = req.body;

    // zorunlu alan kontrolü
    if (!name || !phoneNumber || !contactType) {
      return res.status(400).json({
        status: 400,
        message: 'Missing required fields: name, phoneNumber, contactType',
      });
    }

    let photoUrl;
    if (req.file) {
      // Cloudinary yükleme fonksiyonun
      photoUrl = await saveFileToCloudinary(req.file);
    }

      const newContact = await createContact({
      name,
      phoneNumber,
      email,
      contactType,
      isFavourite,
      photo: photoUrl,
      userId: req.user._id,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const payload = { ...req.body };

    if (Object.keys(payload).length === 0 && !req.file) {
      return res.status(400).json({
        status: 400,
        message: 'No data provided for update',
      });
    }

    // Fotoğraf varsa yükle
    if (req.file) {
      if (env('ENABLE_CLOUDINARY') === 'true') {
        payload.photo = await saveFileToCloudinary(req.file);
      } else {
        payload.photo = await saveFileToUploadDir(req.file);
      }
    }

    const updatedContact = await updateContact(contactId, payload, req.user._id);

    if (!updatedContact) {
      return next(createHttpError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
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
