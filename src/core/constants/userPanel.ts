import { Liked, Logout, Order, Settings, User } from '@/assets';
import type { IUserPanelData } from '@/core/types';
import { PRODUCTS } from '@/core/constants/products';
import { SmallClock, SmallTruck, StatusDelivered } from '@/assets';

export const USER_PANEL_DATA: IUserPanelData = {
  greeting: 'Welcome back Taras!',
  subtitle: "Here's what's happening with your account",
  menu: [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Order, badge: 3 },
    { id: 'favorite', label: 'Favorite', icon: Liked },
    { id: 'settings', label: 'Settings', icon: Settings },
  ],
  stats: [
    { id: 'orders', label: 'Total orders', value: 3, icon: Order },
    { id: 'favorites', label: 'Favorites', value: 4, icon: Liked },
  ],
  orders: [
    {
      id: '1',
      orderNumber: '#ORD-8472',
      date: 'Oct 20, 2025',
      status: 'delivered',
      total: 850,
      items: [
        {
          id: '1-1',
          title: 'iPhone 15 Pro Max 256 GB',
          quantity: 1,
          price: 850,
          image: '/icons/greyBox.png',
        },
        {
          id: '1-2',
          title: 'iPhone 15 Pro Max 256 GB',
          quantity: 1,
          price: 850,
          image: '/icons/greyBox.png',
        },
      ],
    },
    {
      id: '2',
      orderNumber: '#ORD-8453',
      date: 'Oct 15, 2025',
      status: 'shipped',
      total: 1100,
      items: [
        {
          id: '2-1',
          title: 'iPhone 11 128 GB',
          quantity: 1,
          price: 550,
          image: '/icons/greyBox.png',
        },
        {
          id: '2-2',
          title: 'iPhone 11 128 GB',
          quantity: 1,
          price: 550,
          image: '/icons/greyBox.png',
        },
      ],
    },
    {
      id: '3',
      orderNumber: '#ORD-8421',
      date: 'Oct 10, 2025',
      status: 'processing',
      total: 1100,
      items: [
        {
          id: '3-1',
          title: 'Samsung Galaxy S24 Ultra',
          quantity: 1,
          price: 950,
          image: '/icons/greyBox.png',
        },
        {
          id: '3-2',
          title: 'Samsung Galaxy S24 Ultra',
          quantity: 1,
          price: 950,
          image: '/icons/greyBox.png',
        },
      ],
    },
  ],
};

export const USER_PANEL_LOGOUT = {
  label: 'Log Out',
  icon: Logout,
};

export const USER_PANEL_FAVORITE_PRODUCTS = PRODUCTS.slice(0, 6);

export const STATUS_META = {
  delivered: {
    label: 'Delivered',
    icon: StatusDelivered,
    className: 'is-delivered',
  },
  shipped: {
    label: 'Shipped',
    icon: SmallTruck,
    className: 'is-shipped',
  },
  processing: {
    label: 'Processing',
    icon: SmallClock,
    className: 'is-processing',
  },
} as const;
