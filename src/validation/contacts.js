// src/validation/contacts.js

import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  phoneNumber: Joi.string().min(3).max(20).required(),
  email: Joi.string().min(6).max(20).required(),
  contactType: Joi.string().valid('male', 'female', 'other').required(),
  isFavourite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(20),
  phoneNumber: Joi.string().min(3).max(20),
  email: Joi.string().min(6).max(20),
  contactType: Joi.string().valid('male', 'female', 'other'),
  isFavourite: Joi.boolean(),
});