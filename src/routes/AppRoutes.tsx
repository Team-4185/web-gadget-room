import { Navigate, createBrowserRouter } from 'react-router';

import {
  About,
  AuthPage,
  Cart,
  Catalog,
  Delivery,
  EmptyCart,
  Home,
  ProductPage,
  UserProfile,
  AdminPanel,
  PageNotFound,
} from '@/pages';
import { ProtectedRoutes } from '@/routes/ProtectedRoute';
import { PRODUCTS } from '@/core/constants';
import App from '@/App';
import type { ILoaderData } from '@/core/types';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    children: [
      {
        index: true,
        Component: AuthPage,
      },
      {
        path: 'register',
        Component: AuthPage,
      },
      {
        path: 'forgot-password',
        Component: AuthPage,
      },
      {
        Component: ProtectedRoutes,
        children: [
          {
            path: 'home',
            Component: Home,
          },
          {
            path: 'cart',
            Component: Cart,
          },
          {
            path: 'empty-cart',
            Component: EmptyCart,
          },
          {
            path: 'delivery',
            Component: Delivery,
          },
          {
            path: 'userProfile',
            Component: UserProfile,
          },
          {
            path: 'adminPanel',
            Component: AdminPanel,
          },
          {
            path: 'catalog',
            Component: Catalog,
            handle: {
              breadcrumb: () => [
                { id: 1, path: '/home', label: 'Home' },
                { id: 2, path: '/catalog', label: 'Catalog' },
              ],
            },
          },
          {
            path: 'about',
            Component: About,
          },
          {
            path: 'product/:id',
            Component: ProductPage,
            loader: async ({ params }) => {
              return PRODUCTS.find((product) => product.id === Number(params.id));
            },
            handle: {
              breadcrumb: (data: ILoaderData) => [
                { id: 1, path: '/home', label: 'Home' },
                { id: 2, path: '/catalog', label: 'Catalog' },
                { id: 3, path: `/product/${data.id}`, label: data.name },
              ],
            },
          },
        ],
      },
      {
        path: '404',
        Component: PageNotFound,
      },
      {
        path: '*',
        Component: () => <Navigate to="/404" replace />,
      },
    ],
  },
]);
