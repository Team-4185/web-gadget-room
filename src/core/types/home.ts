import type { PRODUCTS } from '../constants/products';

export type Brand = {
  id: number;
  name: string;
  icon: string;
  descr: string;
};

export type Product = (typeof PRODUCTS)[number];
