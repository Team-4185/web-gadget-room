import type { IAdminCustomerItem, IAdminCustomerKpiItem } from '@/core/types';
import { ArrowRightUp, Customers, Dollar, Star } from '@/assets';

export const ADMIN_CUSTOMER_KPIS: IAdminCustomerKpiItem[] = [
  { id: 'total', title: 'Total clients', value: '100', icon: Customers },
  { id: 'new_month', title: 'New (month)', value: '89', icon: Star },
  { id: 'inactive', title: 'Inactive', value: '60', icon: ArrowRightUp },
  { id: 'receipt', title: 'Wed receipt', value: '$2,200', icon: Dollar },
];

export const ADMIN_CUSTOMERS: IAdminCustomerItem[] = [
  {
    id: '1',
    name: 'Ivan Petrov',
    email: 'ivan@gmail.com',
    phone: '+380 630000000',
    orders: 12,
    spent: '$8,450',
    registeredAt: 'January 15, 2025',
    status: 'inactive',
  },
  {
    id: '2',
    name: 'Maria Ivanova',
    email: 'maria@gmail.com',
    phone: '+380 630000000',
    orders: 8,
    spent: '$5,230',
    registeredAt: 'March 3, 2024',
    status: 'active',
  },
  {
    id: '3',
    name: 'Alex Smirnov',
    email: 'alex@gmail.com',
    phone: '+380 630000000',
    orders: 12,
    spent: '$12,890',
    registeredAt: 'December 22, 2023',
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Elena Kozlova',
    email: 'elena@gmail.com',
    phone: '+380 630000000',
    orders: 3,
    spent: '$2,150',
    registeredAt: 'July 10, 2025',
    status: 'new',
  },
  {
    id: '5',
    name: 'Dmitry Volkov',
    email: 'volk@gmail.com',
    phone: '+380 630000000',
    orders: 6,
    spent: '$4,780',
    registeredAt: 'May 5, 2024',
    status: 'active',
  },
];
