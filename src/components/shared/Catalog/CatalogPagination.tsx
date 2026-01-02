import { Box } from '@mui/material';

import SmallArrowRigth from '/icons/SmallArrowRigth.svg';
import SmallArrowLeft from '/icons/SmallArrowLeft.svg';

interface CatalogPaginationProps {
  totalPages: number;
  currentPage: number;
  onPrev: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
}

export const CatalogPagination = ({
  totalPages,
  currentPage,
  onPrev,
  onNext,
  onPageChange,
}: CatalogPaginationProps) => {
  if (totalPages <= 0) return null;

  return (
    <Box className="pagination">
      {totalPages > 1 && (
        <Box className="pagination-prev" onClick={onPrev} role="button" tabIndex={0}>
          <img src={SmallArrowLeft} alt="Arrow Left" />
        </Box>
      )}

      <Box className="pagination-numbers">
        {Array.from({ length: totalPages }, (_, i) => {
          const page = i + 1;
          return (
            <span
              key={page}
              className={`pagination-number ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
              role="button"
              tabIndex={0}
            >
              {page}
            </span>
          );
        })}
      </Box>

      {totalPages > 1 && (
        <Box className="pagination-next" onClick={onNext} role="button" tabIndex={0}>
          Next <img src={SmallArrowRigth} alt="Arrow Right" />
        </Box>
      )}
    </Box>
  );
};
