import type { FC } from 'react';
import {
  SearchOutlined,
  EmailOutlined,
  LocalPhoneOutlined,
  MailOutlined,
  DeleteOutlineOutlined,
} from '@mui/icons-material';
import { Typography } from '@mui/material';

import type { IAdminCustomerItem } from '@/core/types';

import './AdminCustomersTable.css';

interface IProps {
  customers: IAdminCustomerItem[];
  totalCustomers: number;
}

const STATUS_LABELS = {
  vip: 'VIP',
  active: 'Active',
  new: 'New',
} as const;

export const AdminCustomersTable: FC<IProps> = ({ customers, totalCustomers }) => {
  return (
    <section className="admin-customers-table" aria-label="Customers base">
      <div className="admin-customers-table__header">
        <Typography component="h2" sx={{ fontSize: '24px', fontWeight: 600, lineHeight: 1 }}>
          Customers base
        </Typography>
        <Typography component="p" sx={{ marginTop: '6px', fontSize: '14px' }}>
          Customer Information Management
        </Typography>
      </div>

      <label className="admin-customers-table__search" aria-label="Search customers">
        <SearchOutlined sx={{ fontSize: '20px', color: 'var(--black-opacity-65)' }} />
        <input type="text" placeholder="Search by name, email, number..." />
      </label>

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
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="is-strong">{customer.name}</td>
                <td>
                  <div className="admin-customers-table__contact">
                    <span>
                      <EmailOutlined sx={{ fontSize: '10px' }} />
                      {customer.email}
                    </span>
                    <span>
                      <LocalPhoneOutlined sx={{ fontSize: '10px' }} />
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
                      <MailOutlined sx={{ fontSize: '18px' }} />
                    </button>
                    <button type="button" aria-label={`Delete ${customer.name}`}>
                      <DeleteOutlineOutlined sx={{ fontSize: '18px' }} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="admin-customers-table__footer">
        <Typography component="p" sx={{ fontSize: '14px' }}>
          Showing <span>{customers.length}</span> of <span>{totalCustomers}</span> customer
        </Typography>
        <div className="admin-customers-table__pager">
          <button type="button">Back</button>
          <button type="button" className="is-primary">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
