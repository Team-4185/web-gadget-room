import { useEffect, useState, type FC } from 'react';
import { CircularProgress, Typography } from '@mui/material';

import { ConfirmationModal } from '@/components/shared';
import { Button } from '@/components/ui';
import { useModalLifecycle } from '@/core/hooks';
import type { AdminOrderAction, IAdminOrderDetails } from '@/core/types';
import { AdminOrderDeliveryInfo } from './AdminOrderDeliveryInfo';
import { AdminOrderItemsList } from './AdminOrderItemsList';
import { AdminOrderSummary } from './AdminOrderSummary';

import './AdminOrderDetailsModal.css';

interface IProps {
  order: IAdminOrderDetails | null;
  isLoading: boolean;
  isActionLoading: boolean;
  onClose: () => void;
  onAction: (orderId: string, action: AdminOrderAction) => void;
}

const ACTION_LABELS: Record<AdminOrderAction, string> = {
  confirm: 'Confirm',
  cancel: 'Cancel',
  process: 'Process',
  ship: 'Ship',
  deliver: 'Deliver',
};

const FALLBACK_ACTIONS_BY_STATUS: Partial<
  Record<IAdminOrderDetails['status'], AdminOrderAction[]>
> = {
  new: ['confirm', 'cancel'],
  confirmed: ['process', 'cancel'],
  processing: ['ship', 'cancel'],
  shipped: ['deliver'],
};

export const AdminOrderDetailsModal: FC<IProps> = ({
  order,
  isLoading,
  isActionLoading,
  onClose,
  onAction,
}) => {
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] = useState(false);

  useModalLifecycle({
    isOpen: Boolean(order) || isLoading,
    onClose,
    closeOnEscape: !isCancelConfirmationOpen,
  });

  useEffect(() => {
    if (!order) setIsCancelConfirmationOpen(false);
  }, [order]);

  if (!order && !isLoading) return null;

  const actions = order
    ? order.availableActions.length
      ? order.availableActions
      : (FALLBACK_ACTIONS_BY_STATUS[order.status] ?? [])
    : [];

  const handleActionClick = (action: AdminOrderAction) => {
    if (!order) return;

    if (action === 'cancel') {
      setIsCancelConfirmationOpen(true);
      return;
    }

    onAction(order.id, action);
  };

  const handleConfirmCancelOrder = () => {
    if (!order) return;

    setIsCancelConfirmationOpen(false);
    onAction(order.id, 'cancel');
  };

  return (
    <div className="admin-order-details-modal__backdrop" role="presentation">
      <section
        className="admin-order-details-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-order-details-modal-title"
      >
        <header className="admin-order-details-modal__header">
          <div>
            <Typography
              id="admin-order-details-modal-title"
              component="h3"
              fontSize="28px"
              fontWeight={600}
              lineHeight={1.08}
            >
              {order ? `Order ${order.orderNumber}` : 'Order details'}
            </Typography>
            {order ? (
              <Typography
                className="admin-order-details-modal__subtitle"
                component="p"
                fontSize="13px"
                color="var(--black-opacity-65)"
              >
                {order.date} {order.time}
              </Typography>
            ) : null}
          </div>

          <button
            type="button"
            aria-label="Close order details"
            className="admin-order-details-modal__close"
            onClick={onClose}
          >
            x
          </button>
        </header>

        {isLoading ? (
          <div className="admin-order-details-modal__loading">
            <CircularProgress size={34} />
          </div>
        ) : order ? (
          <div className="admin-order-details-modal__content">
            <AdminOrderSummary order={order} />
            <AdminOrderDeliveryInfo order={order} />
            <AdminOrderItemsList items={order.items} />

            {actions.length ? (
              <div className="admin-order-details-modal__actions">
                {actions.map((action) => (
                  <Button
                    key={action}
                    maxWidth="136px"
                    height="36px"
                    fontSize="14px"
                    fontWeight={600}
                    borderRadius="10px"
                    disabled={isActionLoading}
                    onClick={() => handleActionClick(action)}
                  >
                    {ACTION_LABELS[action]}
                  </Button>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <ConfirmationModal
        isOpen={Boolean(order) && isCancelConfirmationOpen}
        title="Cancel order"
        description={
          <p>
            Are you sure you want to cancel <strong>{order?.orderNumber}</strong>?
          </p>
        }
        confirmLabel="Cancel order"
        cancelLabel="Keep order"
        onCancel={() => setIsCancelConfirmationOpen(false)}
        onConfirm={handleConfirmCancelOrder}
      />
    </div>
  );
};
