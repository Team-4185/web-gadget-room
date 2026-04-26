import { useMemo, useState, type FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminManagedOrderItem } from '@/core/types';
import {
  ADMIN_ORDER_FILTER_TABS,
  ADMIN_ORDER_STATUS_LABELS,
  type AdminOrderFilterId,
} from '@/core/constants';
import { Button } from '@/components/ui';
import { AdminPagination } from '@/components/shared';
import { Trash, Visibility, Edit } from '@/assets';

import './AdminOrdersTable.css';

const ADMIN_ORDERS_PAGE_SIZE = 10;

interface IProps {
  orders: IAdminManagedOrderItem[];
}

export const AdminOrdersTable: FC<IProps> = ({ orders }) => {
  const [activeTab, setActiveTab] = useState<AdminOrderFilterId>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    if (activeTab === 'all') return orders;
    return orders.filter((order) => order.status === activeTab);
  }, [orders, activeTab]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ADMIN_ORDERS_PAGE_SIZE));
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * ADMIN_ORDERS_PAGE_SIZE;
    return filteredOrders.slice(startIndex, startIndex + ADMIN_ORDERS_PAGE_SIZE);
  }, [currentPage, filteredOrders]);

  const changeActiveTab = (tab: AdminOrderFilterId) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

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
            onClick={() => changeActiveTab(tab.id)}
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
            {paginatedOrders.map((order) => (
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

      <AdminPagination
        totalItems={filteredOrders.length}
        itemLabel="orders"
        currentPage={currentPage}
        totalPages={totalPages}
        isFirstPage={currentPage === 1}
        isLastPage={currentPage === totalPages}
        onPreviousPage={() => setCurrentPage((page) => Math.max(1, page - 1))}
        onNextPage={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
      />
    </section>
  );
};
