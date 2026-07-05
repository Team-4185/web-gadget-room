import { Typography } from '@mui/material';

import {
  ADMIN_ORDER_PAYMENT_METHOD_LABELS,
  ADMIN_ORDER_PAYMENT_STATUS_LABELS,
  ADMIN_ORDER_STATUS_LABELS,
} from '@/core/constants';
import type { IAdminOrderDetails } from '@/core/types';

type AdminOrderSummaryProps = {
  order: IAdminOrderDetails;
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const AdminOrderSummary = ({ order }: AdminOrderSummaryProps) => (
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
);
