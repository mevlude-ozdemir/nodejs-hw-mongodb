// src/utils/parseFilterParams.js

const parseType = (type) => {
  if (typeof type !== 'string') return;
  const validTypes = ['work', 'home', 'personal'];
  return validTypes.includes(type) ? type : undefined;
};

const parseBoolean = (value) => {
  if (typeof value !== 'string') return;
  if (value.toLowerCase() === 'true') return true;
  if (value.toLowerCase() === 'false') return false;
};

export const parseFilterParams = (query) => {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseBoolean(isFavourite);

  const filter = {};
  if (parsedType) filter.contactType = parsedType; // MongoDB alan adıyla eşleşti
  if (typeof parsedIsFavourite === 'boolean') filter.isFavourite = parsedIsFavourite;

  return filter;
};