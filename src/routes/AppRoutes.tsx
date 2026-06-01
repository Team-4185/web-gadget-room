import { Navigate, createBrowserRouter } from 'react-router';

import {
  About,
  AuthPage,
  Cart,
  Catalog,
  Delivery,
  EmptyCart,
  Home,
  Payment,
  ProductPage,
  UserProfile,
  AdminPanel,
  PageNotFound,
} from '@/pages';
import { ProtectedRoutes } from '@/routes/ProtectedRoute';
import { AdminRoutes } from '@/routes/AdminRoutes';
import { PRODUCTS } from '@/core/constants';
import { phonesService } from '@/core/services';
import { mapApiPhoneToProduct } from '@/core/utils';
import App from '@/App';
import type { ILoaderData } from '@/core/types';

const getFallbackProduct = (id?: string) => PRODUCTS.find((product) => product.id === Number(id));

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
        path: 'login',
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
            path: 'payment',
            Component: Payment,
          },
          {
            path: 'userProfile',
            Component: UserProfile,
          },
          {
            Component: AdminRoutes,
            children: [
              {
                path: 'adminPanel',
                Component: AdminPanel,
              },
            ],
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
              const useTestingFallback = import.meta.env.VITE_USE_TESTING_FALLBACK === 'true';
              const productId = Number(params.id);

              if (!productId || Number.isNaN(productId)) {
                return null;
              }

              if (useTestingFallback) {
                return getFallbackProduct(params.id) ?? null;
              }

              try {
                const phone = await phonesService.getById(productId);
                const imageUrls = await phonesService.getImageObjectUrls(phone.images ?? []);

                return mapApiPhoneToProduct(phone, imageUrls[0]);
              } catch {
                return getFallbackProduct(params.id) ?? null;
              }
            },
            handle: {
              breadcrumb: (data: ILoaderData | null) => [
                { id: 1, path: '/home', label: 'Home' },
                { id: 2, path: '/catalog', label: 'Catalog' },
                {
                  id: 3,
                  path: data ? `/product/${data.id}` : '/catalog',
                  label: data?.name ?? 'Product',
                },
              ],
            },
          },
          {
            path: '404',
            Component: PageNotFound,
          },
        ],
      },
      {
        path: '*',
        Component: () => <Navigate to="/404" replace />,
      },
    ],
  },
]);
