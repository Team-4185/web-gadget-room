import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminPanelOrderItem } from '@/core/types';

import './AdminPanelRecentOrders.css';

interface IProps {
  orders: IAdminPanelOrderItem[];
}

const STATUS_LABELS = {
  processing: 'Processing',
  paid: 'Paid',
  shipping: 'Shipping',
} as const;

export const AdminPanelRecentOrders: FC<IProps> = ({ orders }) => {
  return (
    <section className="admin-panel-recent-orders" aria-label="Recent orders">
      <Typography component="h3" sx={{ fontSize: '20px', fontWeight: 600, lineHeight: 1 }}>
        Recent Orders
      </Typography>

      <div className="admin-panel-recent-orders__list">
        {orders.map((order) => (
          <article key={order.id} className="admin-panel-recent-orders__item">
            <div className="admin-panel-recent-orders__item-top">
              <Typography component="span" sx={{ fontSize: '14px', fontWeight: 500, color: 'var(--blue)' }}>
                {order.orderNumber}
              </Typography>
              <Typography component="span" sx={{ fontSize: '14px', color: 'var(--black-opacity-65)' }}>
                {order.age}
              </Typography>
            </div>

            <Typography component="p" sx={{ fontSize: '16px', fontWeight: 600 }}>
              {order.customer}
            </Typography>

            <div className="admin-panel-recent-orders__item-bottom">
              <Typography component="p" sx={{ fontSize: '14px', color: 'var(--black-opacity-65)' }}>
                {order.product}
              </Typography>
              <span className={`admin-panel-recent-orders__status is-${order.status}`}>
                {STATUS_LABELS[order.status]}
              </span>
            </div>
          </article>
        ))}
      </div>

      <button type="button" className="admin-panel-recent-orders__view-all">
        Show all orders
      </button>
    </section>
  );
};
