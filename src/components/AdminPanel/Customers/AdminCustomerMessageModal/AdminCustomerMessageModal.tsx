import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

import { Button } from '@/components/ui';
import type { IAdminCustomerItem } from '@/core/types';

import './AdminCustomerMessageModal.css';

interface IProps {
  customer: IAdminCustomerItem | null;
  onClose: () => void;
  onSend: (message: string) => void;
}

export const AdminCustomerMessageModal = ({ customer, onClose, onSend }: IProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!customer) return;

    setMessage('');

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [customer, onClose]);

  if (!customer) return null;

  const trimmedMessage = message.trim();

  return (
    <div className="admin-customer-message-modal__backdrop" role="presentation">
      <section
        className="admin-customer-message-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-customer-message-modal-title"
      >
        <header className="admin-customer-message-modal__header">
          <Typography
            id="admin-customer-message-modal-title"
            component="h3"
            fontSize="28px"
            fontWeight={600}
            lineHeight={1.1}
          >
            Send message
          </Typography>
          <button
            type="button"
            aria-label="Close message modal"
            className="admin-customer-message-modal__close"
            onClick={onClose}
          >
            x
          </button>
        </header>

        <div className="admin-customer-message-modal__field">
          <span>Recipient</span>
          <p>{customer.email}</p>
        </div>

        <label className="admin-customer-message-modal__message">
          <span>Message</span>
          <textarea
            value={message}
            placeholder="Write a message to the customer"
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <div className="admin-customer-message-modal__actions">
          <Button
            type="button"
            maxWidth="100%"
            height="40px"
            fontSize="16px"
            fontWeight={600}
            borderRadius="8px"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            maxWidth="100%"
            height="40px"
            fontSize="16px"
            fontWeight={600}
            borderRadius="8px"
            disabled={!trimmedMessage}
            onClick={() => onSend(trimmedMessage)}
          >
            Send
          </Button>
        </div>
      </section>
    </div>
  );
};
