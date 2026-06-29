import { type FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminCustomerItem } from '@/core/types';
import { Search } from '@/components/ui';
import { AdminPagination } from '@/components/shared';
import { Trash, MailOutlined, PhoneOutlined } from '@/assets';

import './AdminCustomersTable.css';

interface IProps {
  customers: IAdminCustomerItem[];
  searchQuery: string;
  currentPage: number;
  totalCustomers: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  isLoading?: boolean;
  onEmailCustomer: (customer: IAdminCustomerItem) => void;
  onDeleteCustomer: (customer: IAdminCustomerItem) => void;
  onSearchChange: (value: string) => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const STATUS_LABELS = {
  inactive: 'Inactive',
  active: 'Active',
  new: 'New',
} as const;

export const AdminCustomersTable: FC<IProps> = ({
  customers,
  searchQuery,
  currentPage,
  totalCustomers,
  totalPages,
  isFirstPage,
  isLastPage,
  isLoading = false,
  onEmailCustomer,
  onDeleteCustomer,
  onSearchChange,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <section className="admin-customers-table" aria-label="Customers base">
      <div className="admin-customers-table__header">
        <Typography component="h2" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
          Customers base
        </Typography>
        <Typography variant="body2" component="p" sx={{ marginTop: '6px' }}>
          Customer Information Management
        </Typography>
      </div>

      <Search
        className="admin-customers-table__search"
        ariaLabel="Search customers"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search by name, email, number..."
      />

      <div className="admin-customers-table__table-wrap">
        <table className="admin-customers-table__table">
          <colgroup>
            <col className="admin-customers-table__col-client" />
            <col className="admin-customers-table__col-contact" />
            <col className="admin-customers-table__col-orders" />
            <col className="admin-customers-table__col-spent" />
            <col className="admin-customers-table__col-date" />
            <col className="admin-customers-table__col-status" />
            <col className="admin-customers-table__col-actions" />
          </colgroup>
          <thead>
            <tr>
              <th>Client</th>
              <th>Contact</th>
              <th>Orders</th>
              <th>Spent</th>
              <th>Date of registration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <span className="admin-customers-table__client-name" title={customer.name}>
                    {customer.name}
                  </span>
                </td>
                <td>
                  <div className="admin-customers-table__contact">
                    <span>
                      <MailOutlined width={10} height={10} style={{ color: 'var(--black)' }} />
                      {customer.email}
                    </span>
                    <span>
                      <PhoneOutlined width={10} height={10} style={{ color: 'var(--black)' }} />
                      {customer.phone}
                    </span>
                  </div>
                </td>
                <td>{customer.orders}</td>
                <td>{customer.spent}</td>
                <td>
                  <div className="admin-customers-table__date">
                    <span>{customer.registeredAt}</span>
                  </div>
                </td>
                <td>
                  <span className={`admin-customers-table__status is-${customer.status}`}>
                    {STATUS_LABELS[customer.status]}
                  </span>
                </td>
                <td>
                  <div className="admin-customers-table__actions">
                    <button
                      type="button"
                      aria-label={`Email ${customer.name}`}
                      onClick={() => onEmailCustomer(customer)}
                    >
                      <MailOutlined style={{ color: 'var(--green)' }} />
                    </button>
                    <button
                      type="button"
                      aria-label={`Delete ${customer.name}`}
                      onClick={() => onDeleteCustomer(customer)}
                    >
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
        totalItems={totalCustomers}
        itemLabel="customers"
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
