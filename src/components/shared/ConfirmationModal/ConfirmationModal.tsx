import type { ReactNode } from 'react';
import { Typography } from '@mui/material';

import { Button } from '@/components/ui';
import { AlertConfirmation } from '@/assets';
import { ModalShell } from '../ModalShell/ModalShell';

import './ConfirmationModal.css';

interface IProps {
  isOpen: boolean;
  title: string;
  description: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isLoading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isLoading = false,
  onCancel,
  onConfirm,
}: IProps) => {
  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onCancel}
      closeOnEscape={!isLoading}
      backdropClassName="confirmation-modal__backdrop"
      dialogClassName="confirmation-modal"
      dialogElement="div"
      labelledBy="confirmation-modal-title"
    >
      <div className="confirmation-modal__icon" aria-hidden="true">
        <AlertConfirmation />
      </div>

      <Typography
        id="confirmation-modal-title"
        component="h3"
        sx={{ fontSize: '32px', fontWeight: 700, lineHeight: 1.15 }}
      >
        {title}
      </Typography>

      <div className="confirmation-modal__description">{description}</div>

      <div className="confirmation-modal__actions">
        <Button
          type="button"
          maxWidth="100%"
          height="40px"
          fontSize="20px"
          fontWeight={400}
          borderRadius="10px"
          onClick={onCancel}
          disabled={isLoading}
        >
          {cancelLabel}
        </Button>
        <Button
          type="button"
          maxWidth="100%"
          height="40px"
          fontSize="20px"
          fontWeight={400}
          borderRadius="10px"
          border="1px solid var(--coralRed)"
          sx={{
            '&:hover': {
              background: 'var(--coralRed)',
              color: 'var(--white)',
            },
          }}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? 'Deleting...' : confirmLabel}
        </Button>
      </div>
    </ModalShell>
  );
};
