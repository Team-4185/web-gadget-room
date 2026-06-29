import { Bell, Cart, Liked, User } from '@/assets';

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

export const HEADER_ICONS = [
  { id: 1, icon: User, href: '/userProfile' },
  { id: 2, icon: Liked, href: '/userProfile?tab=favorite' },
  { id: 3, icon: Cart, href: '/cart' },
];

export const USER_PANEL_ICONS = [
  { id: 1, icon: User, href: '/userProfile' },
  { id: 2, icon: Cart, href: '/cart' },
];

export const ADMIN_PANEL_ICONS = [
  { id: 0, icon: Bell, href: '#' },
  { id: 1, icon: User, href: '/userProfile' },
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

export const ROUTES_WITH_BREADCRUMBS = ['/catalog', '/product/:id'];

export const ROUTES_WITH_ORDERING_STEPS = ['/cart', '/payment', '/delivery'];
