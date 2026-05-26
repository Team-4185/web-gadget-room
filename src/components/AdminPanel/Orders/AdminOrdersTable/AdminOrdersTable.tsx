import type { FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminManagedOrderItem } from '@/core/types';
import { Visibility } from '@/assets';
import {
  ADMIN_ORDER_FILTER_TABS,
  ADMIN_ORDER_PAYMENT_METHOD_LABELS,
  ADMIN_ORDER_PAYMENT_STATUS_LABELS,
  ADMIN_ORDER_STATUS_LABELS,
  type AdminOrderFilterId,
} from '@/core/constants';
import { Button } from '@/components/ui';
import { AdminPagination } from '@/components/shared';

import './AdminOrdersTable.css';

interface IProps {
  orders: IAdminManagedOrderItem[];
  totalOrders: number;
  currentPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading: boolean;
  activeFilter: AdminOrderFilterId;
  onFilterChange: (filter: AdminOrderFilterId) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export const AdminOrdersTable: FC<IProps> = ({
  orders,
  totalOrders,
  currentPage,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading,
  activeFilter,
  onFilterChange,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <section className="admin-orders-table" aria-label="Order management">
      <div className="admin-orders-table__head">
        <Typography component="h2" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
          Order Management
        </Typography>
        <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
          All orders from your customers
        </Typography>
      </div>

      <div className="admin-orders-table__tabs" role="tablist" aria-label="Order filters">
        {ADMIN_ORDER_FILTER_TABS.map((tab) => (
          <Button
            key={tab.id}
            maxWidth="90px"
            height="33px"
            border="none"
            fontSize="14px"
            borderRadius="8px"
            onClick={() => onFilterChange(tab.id)}
            sx={{
              color: activeFilter === tab.id ? 'var(--white)' : 'var(--black)',
              background: activeFilter === tab.id ? 'var(--blue-violet)' : 'var(--white)',
            }}
          >
            {tab.label}
          </Button>
        ))}
      </div>

      <div className="admin-orders-table__table-wrap">
        <table className="admin-orders-table__table">
          <thead>
            <tr>
              <th>Order number</th>
              <th>Customer</th>
              <th>Payment method</th>
              <th>Payment status</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="admin-orders-table__number">{order.orderNumber}</td>
                <td>
                  <div className="admin-orders-table__customer">
                    <Typography variant="subtitle2" component="span" sx={{ fontWeight: 500 }}>
                      {order.customer}
                    </Typography>
                    <Typography
                      variant="caption"
                      component="span"
                      sx={{ color: 'var(--black-opacity-65)' }}
                    >
                      {order.email}
                    </Typography>
                  </div>
                </td>
                <td>{ADMIN_ORDER_PAYMENT_METHOD_LABELS[order.paymentMethod]}</td>
                <td>{ADMIN_ORDER_PAYMENT_STATUS_LABELS[order.paymentStatus]}</td>
                <td>
                  <div className="admin-orders-table__date">
                    <span>{order.date}</span>
                    <span>{order.time}</span>
                  </div>
                </td>
                <td>
                  <span className={`admin-orders-table__status is-${order.status}`}>
                    {ADMIN_ORDER_STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td>
                  <div className="admin-orders-table__actions">
                    <button type="button" aria-label={`View ${order.orderNumber}`}>
                      <Visibility />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AdminPagination
        totalItems={totalOrders}
        itemLabel="orders"
        currentPage={currentPage}
        totalPages={totalPages}
        isFirstPage={isFirstPage}
        isLastPage={isLastPage}
        isLoading={isLoading}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
      />
    </section>
  );
};
