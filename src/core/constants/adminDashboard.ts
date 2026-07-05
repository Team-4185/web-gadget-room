import type {
  IAdminPanelBrandItem,
  IAdminPanelLowStockItem,
  IAdminPanelMenuItem,
  IAdminPanelOrderItem,
  IAdminPanelProductItem,
  IAdminPanelStatItem,
} from '@/core/types';
import { Customers, Dashboard, Dollar, Order, Product } from '@/assets';

import { FALLBACK_IMAGE } from './productMedia';

export const ADMIN_PANEL_MENU: IAdminPanelMenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: Dashboard },
  { id: 'product', label: 'Products', icon: Product, badge: 100 },
  { id: 'orders', label: 'Orders', icon: Order, badge: 10 },
  { id: 'customers', label: 'Customers', icon: Customers },
];

export const ADMIN_PANEL_STATS: IAdminPanelStatItem[] = [
  {
    id: 'revenue',
    title: 'Total revenue',
    value: '$ 120,000',
    subtitle: 'Over the last 30 days',
    trend: '+18.2%',
    isPositive: true,
    icon: Dollar,
  },
  {
    id: 'orders',
    title: 'Total orders',
    value: '1,847',
    subtitle: '124 in processing',
    trend: '+12.5%',
    isPositive: true,
    icon: Order,
  },
  {
    id: 'stock',
    title: 'Items in stock',
    value: '3,856',
    subtitle: '12 running low',
    trend: '-3.1%',
    isPositive: false,
    icon: Product,
  },
  {
    id: 'clients',
    title: 'New clients',
    value: '100',
    subtitle: 'This month',
    trend: '+24.8%',
    isPositive: true,
    icon: Customers,
  },
];

export const ADMIN_PANEL_BRANDS: IAdminPanelBrandItem[] = [
  { id: 'apple', label: 'Apple', share: 35, color: 'var(--chart-brand-apple)' },
  { id: 'samsung', label: 'Samsung', share: 28, color: 'var(--chart-brand-samsung)' },
  { id: 'xiaomi', label: 'Xiaomi', share: 18, color: 'var(--chart-brand-xiaomi)' },
  { id: 'google', label: 'Google', share: 12, color: 'var(--chart-brand-google)' },
  { id: 'other', label: 'Other', share: 7, color: 'var(--chart-brand-other)' },
];

export const ADMIN_PANEL_PRODUCTS: IAdminPanelProductItem[] = [
  {
    id: '1',
    title: 'iPhone 15 Pro Max',
    sales: '342 sales - USD 444,558',
    trend: '+12%',
    stock: '45 pcs',
    statusLabel: 'In Stock',
    image: FALLBACK_IMAGE,
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra',
    sales: '298 sales - USD 357,020',
    trend: '+8%',
    stock: '62 pcs',
    statusLabel: 'In Stock',
    image: FALLBACK_IMAGE,
  },
  {
    id: '3',
    title: 'Google Pixel 8 Pro',
    sales: '187 sales - USD 186,813',
    trend: '+15%',
    stock: '38 pcs',
    statusLabel: 'In Stock',
    image: FALLBACK_IMAGE,
  },
  {
    id: '4',
    title: 'Xiaomi 14 Pro',
    sales: '156 sales - USD 132,444',
    trend: '+22%',
    stock: '89 pcs',
    statusLabel: 'In Stock',
    image: FALLBACK_IMAGE,
  },
  {
    id: '5',
    title: 'OnePlus 11',
    sales: '134 sales - USD 107,066',
    trend: '+5%',
    stock: '54 pcs',
    statusLabel: 'In Stock',
    image: FALLBACK_IMAGE,
  },
  {
    id: '6',
    title: 'Samsung Galaxy S22',
    sales: '342 sales - USD 444,558',
    trend: '+18%',
    stock: '16 pcs',
    statusLabel: 'Low Stock',
    image: FALLBACK_IMAGE,
  },
  {
    id: '7',
    title: 'Honor 90',
    sales: '342 sales - USD 444,558',
    trend: '+8%',
    stock: '30 pcs',
    statusLabel: 'In Stock',
    image: FALLBACK_IMAGE,
  },
  {
    id: '8',
    title: 'iPhone 11 128 GB',
    sales: '342 sales - USD 444,558',
    trend: '+40%',
    stock: '60 pcs',
    statusLabel: 'In Stock',
    image: FALLBACK_IMAGE,
  },
];
export const ADMIN_PANEL_RECENT_ORDERS: IAdminPanelOrderItem[] = [
  {
    id: '1',
    orderNumber: '#ORD-8472',
    customer: 'John Smith',
    email: 'john.smith@example.com',
    age: '5 min',
    status: 'processing',
  },
  {
    id: '2',
    orderNumber: '#ORD-8471',
    customer: 'Maria Johnson',
    email: 'maria.johnson@example.com',
    age: '12 min',
    status: 'confirmed',
  },
  {
    id: '3',
    orderNumber: '#ORD-8470',
    customer: 'Alex Brown',
    email: 'alex.brown@example.com',
    age: '28 min',
    status: 'delivered',
  },
];

export const ADMIN_PANEL_LOW_STOCK: IAdminPanelLowStockItem[] = [
  { id: '1', title: 'iPhone 15 Pro 256GB Black', left: 3, threshold: 10 },
  { id: '2', title: 'Samsung S24 Ultra 512GB Grey', left: 5, threshold: 15 },
  { id: '3', title: 'Google Pixel 8 Pro 128GB White', left: 7, threshold: 12 },
];
