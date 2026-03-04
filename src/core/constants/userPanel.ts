import { Liked, Logout, Order, Settings, User } from '@/assets';
import type { IUserPanelData } from '@/core/types';

// Temporary frontend source for User Panel.
// Replace with API data once backend endpoint is ready.
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
  ],
};

export const USER_PANEL_LOGOUT = {
  label: 'Log Out',
  icon: Logout,
};
