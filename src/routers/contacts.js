// src/routers/contacts.js
import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema,updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId',
  isValidId, ctrlWrapper(getContactByIdController));

router.post('/register', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:contactId',
  isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));//update kullandım çünkü patch ederken zorunlu alanlara gerek yok.

router.delete('/contacts/:contactId',
  isValidId, ctrlWrapper(deleteContactController));



export default router;
