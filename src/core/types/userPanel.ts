import type { ComponentType, SVGProps } from 'react';

export type UserPanelTab = 'overview' | 'orders' | 'favorite' | 'settings';
export type OrderStatus = 'new' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface IUserPanelMenuItem {
  id: UserPanelTab;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  badge?: number;
}

export interface IUserPanelStatItem {
  id: string;
  label: string;
  value: number;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface IUserPanelOrderItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

export interface IUserPanelOrder {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: IUserPanelOrderItem[];
}

export interface IUserPanelData {
  greeting: string;
  subtitle: string;
  menu: IUserPanelMenuItem[];
  stats: IUserPanelStatItem[];
  orders: IUserPanelOrder[];
}
