import { useEffect, useState, type FC } from 'react';
import { CircularProgress, Typography } from '@mui/material';

import { ConfirmationModal } from '@/components/shared';
import { Button } from '@/components/ui';
import { FALLBACK_IMAGE } from '@/core/constants';
import {
  ADMIN_ORDER_PAYMENT_METHOD_LABELS,
  ADMIN_ORDER_PAYMENT_STATUS_LABELS,
  ADMIN_ORDER_STATUS_LABELS,
} from '@/core/constants';
import type { AdminOrderAction, IAdminOrderDetails } from '@/core/types';

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

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const AdminOrderDetailsModal: FC<IProps> = ({
  order,
  isLoading,
  isActionLoading,
  onClose,
  onAction,
}) => {
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] = useState(false);

  useEffect(() => {
    if (!order && !isLoading) return;

    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isLoading, onClose, order]);

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
            <div className="admin-order-details-modal__summary">
              <div className="admin-order-details-modal__summary-card">
                <Typography component="span" fontSize="13px" fontWeight={600}>
                  Status
                </Typography>
                <div className={`admin-order-details-modal__status is-${order.status}`}>
                  {ADMIN_ORDER_STATUS_LABELS[order.status]}
                </div>
              </div>
              <div className="admin-order-details-modal__summary-card">
                <Typography component="span" fontSize="14px" fontWeight={600}>
                  Payment
                </Typography>
                <Typography component="p" fontSize="13px" fontWeight={500}>
                  {ADMIN_ORDER_PAYMENT_STATUS_LABELS[order.paymentStatus]}
                </Typography>
                <Typography component="p" fontSize="13px" color="var(--black-opacity-65)">
                  {ADMIN_ORDER_PAYMENT_METHOD_LABELS[order.paymentMethod]}
                </Typography>
              </div>
              <div className="admin-order-details-modal__summary-card">
                <Typography component="span" fontSize="14px" fontWeight={600}>
                  Total
                </Typography>
                <Typography component="p" fontSize="20px" fontWeight={600}>
                  {formatCurrency(order.total)}
                </Typography>
              </div>
            </div>

            <section className="admin-order-details-modal__section">
              <Typography component="h4" fontSize="16px" fontWeight={600}>
                Customer
              </Typography>
              <div className="admin-order-details-modal__field-grid">
                <div>
                  <Typography component="span" fontSize="14px" fontWeight={500}>
                    Name
                  </Typography>
                  <Typography component="p" fontSize="13px" fontWeight={400}>
                    {order.customer}
                  </Typography>
                </div>
                <div>
                  <Typography component="span" fontSize="14px" fontWeight={500}>
                    Phone
                  </Typography>
                  <Typography component="p" fontSize="13px" fontWeight={400}>
                    {order.phone}
                  </Typography>
                </div>
                <div>
                  <Typography component="span" fontSize="14px" fontWeight={500}>
                    Email
                  </Typography>
                  <Typography component="p" fontSize="13px" fontWeight={400}>
                    {order.email}
                  </Typography>
                </div>
              </div>
            </section>

            <section className="admin-order-details-modal__section">
              <Typography component="h4" fontSize="16px" fontWeight={600}>
                Delivery
              </Typography>
              <div className="admin-order-details-modal__field-grid admin-order-details-modal__field-grid--delivery">
                <div>
                  <Typography component="span" fontSize="14px" fontWeight={600}>
                    Method
                  </Typography>
                  <Typography component="p" fontSize="13px" fontWeight={400}>
                    {order.deliveryMethod}
                  </Typography>
                </div>
                <div>
                  <Typography component="span" fontSize="14px" fontWeight={600}>
                    Address
                  </Typography>
                  <Typography component="p" fontSize="13px" fontWeight={400}>
                    {order.shippingAddress}
                  </Typography>
                </div>
              </div>
            </section>

            <div className="admin-order-details-modal__items">
              <Typography component="h4" fontSize="20px" fontWeight={600}>
                Ordered items
              </Typography>

              <div className="admin-order-details-modal__items-list">
                {order.items.map((item) => (
                  <div className="admin-order-details-modal__item" key={item.id}>
                    <img
                      className="admin-order-details-modal__item-image"
                      src={item.image || FALLBACK_IMAGE}
                      alt={item.title}
                      onError={(event) => {
                        event.currentTarget.src = FALLBACK_IMAGE;
                      }}
                    />
                    <div className="admin-order-details-modal__item-info">
                      <Typography component="p" fontSize="16px" fontWeight={600}>
                        {item.title}
                      </Typography>
                      <Typography component="p" fontSize="13px" color="var(--black-opacity-65)">
                        SKU: {item.sku}
                      </Typography>
                      <div className="admin-order-details-modal__item-details">
                        <span>Quantity: {item.quantity}</span>
                        {item.color ? <span>Color: {item.color}</span> : null}
                        {item.storage ? <span>Storage: {item.storage}</span> : null}
                      </div>
                    </div>
                    <div className="admin-order-details-modal__item-price">
                      <strong>{formatCurrency(item.totalPrice)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
