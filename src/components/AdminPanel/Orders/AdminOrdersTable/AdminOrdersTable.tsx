import type { FC } from 'react';
import { EditOutlined, DeleteOutlineOutlined, VisibilityOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';

import type { AdminOrderStatus, IAdminManagedOrderItem } from '@/core/types';

import './AdminOrdersTable.css';

interface IProps {
  orders: IAdminManagedOrderItem[];
  totalOrders: number;
}

const STATUS_LABELS: Record<AdminOrderStatus, string> = {
  in_processing: 'In processing',
  paid: 'Paid',
  in_delivery: 'In Delivered',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

export const AdminOrdersTable: FC<IProps> = ({ orders, totalOrders }) => {
  return (
    <section className="admin-orders-table" aria-label="Order management">
      <div className="admin-orders-table__head">
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600, lineHeight: 1 }}>
          Order Management
        </Typography>
        <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
          All orders from your customers
        </Typography>
      </div>

      <div className="admin-orders-table__tabs" role="tablist" aria-label="Order filters">
        <button type="button" className="is-active">
          All orders
        </button>
        <button type="button">Processing</button>
        <button type="button">Paid</button>
        <button type="button">In transit</button>
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
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="admin-orders-table__number">{order.orderNumber}</td>
                <td>
                  <div className="admin-orders-table__customer">
                    <Typography variant="subtitle2" component="span" sx={{ fontWeight: 500 }}>
                      {order.customer}
                    </Typography>
                    <Typography variant="caption" component="span" sx={{ color: 'var(--black-opacity-65)' }}>
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
                    {STATUS_LABELS[order.status]}
                  </span>
                </td>
                <td>
                  <div className="admin-orders-table__actions">
                    <button type="button" aria-label={`View ${order.orderNumber}`}>
                      <VisibilityOutlined sx={{ fontSize: '18px' }} />
                    </button>
                    <button type="button" aria-label={`Edit ${order.orderNumber}`}>
                      <EditOutlined sx={{ fontSize: '18px' }} />
                    </button>
                    <button type="button" aria-label={`Delete ${order.orderNumber}`}>
                      <DeleteOutlineOutlined sx={{ fontSize: '18px' }} />
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
          Showing <span>{orders.length}</span> of <span>{totalOrders}</span> orders
        </Typography>
        <div className="admin-orders-table__pager">
          <button type="button">Back</button>
          <button type="button" className="is-primary">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
