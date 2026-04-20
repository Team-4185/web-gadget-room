import { Cart, Liked, Search, User } from '@/assets';

const PageName = {
  Home: 'Home',
  Catalog: 'Catalog',
  AboutUs: 'About us',
  Cart: 'Cart',
  Delivery: 'Delivery',
  Payment: 'Payment',
  Login: 'Login',
  Register: 'Register',
  ProductPage: 'ProductPage',
} as const;

export const ICONS = [
  { id: 0, icon: Search, href: '#' },
  { id: 1, icon: User, href: '/userProfile' },
  { id: 2, icon: Liked, href: '#' },
  { id: 3, icon: Cart, href: '/cart' },
];

export const PAGES = [
  { id: 0, name: PageName.Home, href: '/home' },
  { id: 1, name: PageName.Catalog, href: '/catalog' },
  { id: 2, name: PageName.AboutUs, href: '/about' },
];

export const AUTHBUTTON = [
  { id: 0, name: PageName.Login, href: '/' },
  { id: 1, name: PageName.Register, href: '/register' },
];

export const ROUTES_WITHOUT_BREADCRUMBS = [
  '/',
  '/cart',
  '/payment',
  '/delivery',
  '/register',
  '/404',
  '/empty-cart',
  '/userProfile',
  '/home',
];

export const ROUTES_WITH_ORDERING_STEPS = ['/cart', '/payment', '/delivery'];
