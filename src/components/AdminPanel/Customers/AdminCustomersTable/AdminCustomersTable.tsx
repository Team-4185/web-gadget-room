import { useMemo, useState, type FC } from 'react';
import { Typography } from '@mui/material';

import type { IAdminCustomerItem } from '@/core/types';
import { Search } from '@/components/ui';
import { AdminPagination } from '@/components/shared';
import { Trash, MailOutlined, PhoneOutlined } from '@/assets';

import './AdminCustomersTable.css';

const ADMIN_CUSTOMERS_PAGE_SIZE = 10;

interface IProps {
  customers: IAdminCustomerItem[];
}

const STATUS_LABELS = {
  vip: 'VIP',
  active: 'Active',
  new: 'New',
} as const;

export const AdminCustomersTable: FC<IProps> = ({ customers }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return customers;

    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(query) ||
        customer.email.toLowerCase().includes(query) ||
        customer.phone.toLowerCase().includes(query)
    );
  }, [customers, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / ADMIN_CUSTOMERS_PAGE_SIZE));
  const paginatedCustomers = useMemo(() => {
    const startIndex = (currentPage - 1) * ADMIN_CUSTOMERS_PAGE_SIZE;
    return filteredCustomers.slice(startIndex, startIndex + ADMIN_CUSTOMERS_PAGE_SIZE);
  }, [currentPage, filteredCustomers]);

  const changeSearchQuery = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

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
        onChange={changeSearchQuery}
        placeholder="Search by name, email, number..."
      />

      <div className="admin-customers-table__table-wrap">
        <table className="admin-customers-table__table">
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
            {paginatedCustomers.map((customer) => (
              <tr key={customer.id}>
                <td className="is-strong">{customer.name}</td>
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
                <td>{customer.registeredAt}</td>
                <td>
                  <span className={`admin-customers-table__status is-${customer.status}`}>
                    {STATUS_LABELS[customer.status]}
                  </span>
                </td>
                <td>
                  <div className="admin-customers-table__actions">
                    <button type="button" aria-label={`Email ${customer.name}`}>
                      <MailOutlined style={{ color: 'var(--green)' }} />
                    </button>
                    <button type="button" aria-label={`Delete ${customer.name}`}>
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
        totalItems={filteredCustomers.length}
        itemLabel="customers"
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
