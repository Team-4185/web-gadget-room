import { useEffect, type ReactNode } from 'react';
import { Typography } from '@mui/material';

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
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isLoading) onCancel();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLoading, isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className="confirmation-modal__backdrop" role="presentation">
      <div
        className="confirmation-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-modal-title"
      >
        <div className="confirmation-modal__icon" aria-hidden="true">
          !
        </div>

        <Typography
          id="confirmation-modal-title"
          component="h3"
          sx={{ fontSize: '28px', fontWeight: 700, lineHeight: 1.15 }}
        >
          {title}
        </Typography>

        <div className="confirmation-modal__description">{description}</div>

        <div className="confirmation-modal__actions">
          <button
            type="button"
            className="confirmation-modal__button"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className="confirmation-modal__button confirmation-modal__button--danger"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Deleting...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
