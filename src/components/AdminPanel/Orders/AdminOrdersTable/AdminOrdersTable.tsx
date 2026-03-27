import { useMemo, useState, type FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminManagedOrderItem } from '@/core/types';
import {
  ADMIN_ORDER_FILTER_TABS,
  ADMIN_ORDER_STATUS_LABELS,
  type AdminOrderFilterId,
} from '@/core/constants';
import { Button } from '@/components/ui';
import { Trash, Visibility, Edit } from '@/assets';

import './AdminOrdersTable.css';

interface IProps {
  orders: IAdminManagedOrderItem[];
  totalOrders: number;
}

export const AdminOrdersTable: FC<IProps> = ({ orders, totalOrders }) => {
  const [activeTab, setActiveTab] = useState<AdminOrderFilterId>('all');

  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders;
    return orders.filter((order) => order.status === activeTab);
  }, [orders, activeTab]);

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
            onClick={() => setActiveTab(tab.id)}
            sx={{
              color: activeTab === tab.id ? 'var(--white)' : 'var(--black)',
              background: activeTab === tab.id ? 'var(--blue-violet)' : 'var(--white)',
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
              <th>Product</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
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
                <td>{order.product}</td>
                <td>{order.quantity}</td>
                <td>{order.amount}</td>
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
                    <button type="button" aria-label={`Edit ${order.orderNumber}`}>
                      <Edit />
                    </button>
                    <button type="button" aria-label={`Delete ${order.orderNumber}`}>
                      <Trash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-orders-table__footer">
        <Typography variant="body2" component="p">
          Showing <span>{filteredOrders.length}</span> of <span>{totalOrders}</span> orders
        </Typography>
        <div className="admin-orders-table__pager">
          <Button
            maxWidth="55px"
            height="34px"
            border="none"
            borderRadius="12px"
            sx={{ fontSize: '14px', fontWeight: 500 }}
          >
            Back
          </Button>
          <Button
            maxWidth="55px"
            height="34px"
            border="none"
            borderRadius="12px"
            sx={{ fontSize: '14px', fontWeight: 500 }}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};
