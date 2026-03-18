import { useEffect, useRef, useState } from 'react';

export const usePagination = (items, itemsPerPage, options = {}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(items.length / itemsPerPage);
  const hasMountedRef = useRef(false);

  const currentData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  };

  const next = () => setCurrentPage((page) => Math.min(page + 1, maxPage));
  const prev = () => setCurrentPage((page) => Math.max(page - 1, 1));
  const jump = (page) => setCurrentPage(Math.min(Math.max(page, 1), maxPage));

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }

    options.onPageChange?.(currentPage);
  }, [currentPage]);

  return { currentData, currentPage, maxPage, next, prev, jump };
};
