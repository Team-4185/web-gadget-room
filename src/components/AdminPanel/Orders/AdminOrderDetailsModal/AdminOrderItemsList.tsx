import { Typography } from '@mui/material';

import { FALLBACK_IMAGE } from '@/core/constants';
import type { IAdminOrderDetails } from '@/core/types';

type AdminOrderItemsListProps = {
  items: IAdminOrderDetails['items'];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export const AdminOrderItemsList = ({ items }: AdminOrderItemsListProps) => (
  <div className="admin-order-details-modal__items">
    <Typography component="h4" fontSize="20px" fontWeight={600}>
      Ordered items
    </Typography>

    <div className="admin-order-details-modal__items-list">
      {items.map((item) => (
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
);
