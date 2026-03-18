export const Pagination = ({ pagination }) => (
  <div className='pagination'>
    <button
      type='button'
      className='pagination__button'
      onClick={pagination.prev}
      disabled={pagination.currentPage === 1}
    >
      Previous
    </button>

    <div className='pagination__pages'>
      {Array.from({ length: pagination.maxPage }).map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            type='button'
            className={`pagination__page${pagination.currentPage === page ? ' active' : ''}`}
            onClick={() => pagination.jump(page)}
          >
            {page}
          </button>
        );
      })}
    </div>

    <button
      type='button'
      className='pagination__button'
      onClick={pagination.next}
      disabled={pagination.currentPage === pagination.maxPage}
    >
      Next
    </button>
  </div>
);
