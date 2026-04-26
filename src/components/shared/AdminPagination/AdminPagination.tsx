import { type FC } from 'react';
import { Typography } from '@mui/material';

import { Button } from '@/components/ui';

import './AdminPagination.css';

interface IProps {
  totalItems: number;
  itemLabel: string;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading?: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const AdminPagination: FC<IProps> = ({
  totalItems,
  itemLabel,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading = false,
  onPreviousPage,
  onNextPage,
}) => (
  <div className="admin-pagination">
    <Typography variant="body2" component="p">
      Total {itemLabel}: <span>{totalItems}</span>
      {` - Page ${currentPage} of ${totalPages}`}
    </Typography>

    <div className="admin-pagination__actions">
      <Button
        type="button"
        maxWidth="52px"
        height="34px"
        fontSize="15px"
        fontWeight={500}
        border="none"
        borderRadius="12px"
        onClick={onPreviousPage}
        disabled={isFirstPage || isLoading}
      >
        Back
      </Button>
      <Button
        type="button"
        maxWidth="52px"
        height="34px"
        fontSize="15px"
        fontWeight={500}
        border="none"
        borderRadius="12px"
        onClick={onNextPage}
        disabled={isLastPage || isLoading}
      >
        Next
      </Button>
    </div>
  </div>
);
