/** Reusable for every list endpoint. */

export const getPagination = (page = 1, limit = 10) => {
  const currentPage = Math.max(Number(page), 1);

  const pageSize = Math.max(Number(limit), 1);

  const skip = (currentPage - 1) * pageSize;

  return {
    currentPage,
    pageSize,
    skip,
  };
};
