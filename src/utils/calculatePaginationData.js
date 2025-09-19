// src/utils/calculatePaginationData.js

export const calculatePaginationData = (count, perPage, page) => {
  const totalPages = Math.max(Math.ceil(count / perPage), 1);
  const hasNextPage = page < totalPages;
  const hasPreviousPage = page > 1;

  return {
    page,
    perPage,
    totalItems: count,
    totalPages,
    hasNextPage,
    hasPreviousPage,
  };
};
