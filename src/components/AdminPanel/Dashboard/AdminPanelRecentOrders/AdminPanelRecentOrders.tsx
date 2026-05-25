import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { AdminPanelTab, IAdminPanelOrderItem } from '@/core/types';

import './AdminPanelRecentOrders.css';

interface IProps {
  orders: IAdminPanelOrderItem[];
  onTabChange?: (tab: AdminPanelTab) => void;
}

const STATUS_LABELS = {
  processing: 'Processing',
  confirmed: 'Confirmed',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
  paid: 'Paid',
  shipping: 'Shipping',
} as const;

export const AdminPanelRecentOrders: FC<IProps> = ({ orders, onTabChange }) => {
  return (
    <section className="admin-panel-recent-orders" aria-label="Recent orders">
      <Typography component="h3" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
        Recent Orders
      </Typography>

      <div className="admin-panel-recent-orders__list">
        {orders.map((order) => (
          <article key={order.id} className="admin-panel-recent-orders__item">
            <div className="admin-panel-recent-orders__item-top">
              <Typography
                variant="subtitle2"
                component="span"
                sx={{ fontWeight: 500, color: 'var(--blue)' }}
              >
                {order.orderNumber}
              </Typography>
              <Typography
                variant="body2"
                component="span"
                sx={{ color: 'var(--black-opacity-65)' }}
              >
                {order.age}
              </Typography>
            </div>

            <Typography variant="subtitle1" component="p" sx={{ fontWeight: 600 }}>
              {order.customer}
            </Typography>

            <div className="admin-panel-recent-orders__item-bottom">
              <Typography variant="body2" component="p" sx={{ color: 'var(--black-opacity-65)' }}>
                {order.product}
              </Typography>
              <span className={`admin-panel-recent-orders__status is-${order.status}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="admin-panel-recent-orders__view-all"
        onClick={() => onTabChange?.('orders')}
      >
        <Typography variant="body2" component="span">
          Show all orders
        </Typography>
      </button>
    </section>
  );
};
