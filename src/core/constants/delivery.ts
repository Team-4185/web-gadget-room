import type {
  DeliveryBranchesMap,
  DeliveryCheckoutForm,
  DeliveryOptionConfig,
  ISelectOption,
} from '@/core/types';

import { COURIER_BRANCHES, DHL_BRANCHES, NOVA_BRANCHES, UKR_BRANCHES } from './select';

export const DELIVERY_OPTIONS: DeliveryOptionConfig[] = [
  { id: 'courier', title: 'Courier to your address', price: 11 },
  { id: 'nova', title: 'Self-pickup from the Nova Post', price: 11 },
  { id: 'ukr', title: 'Self-pickup from the Ukr Post', price: 5 },
  { id: 'dhl', title: 'Self-pickup from the DHL', price: 30 },
];

export const DELIVERY_BRANCHES_BY_METHOD: DeliveryBranchesMap = {
  courier: COURIER_BRANCHES,
  nova: NOVA_BRANCHES,
  ukr: UKR_BRANCHES,
  dhl: DHL_BRANCHES,
};

export const UKRAINE_REGIONS: ISelectOption[] = [
  { name: 'Vinnytsia region', value: 'vinnytsia' },
  { name: 'Volyn region', value: 'volyn' },
  { name: 'Dnipropetrovsk region', value: 'dnipropetrovsk' },
  { name: 'Donetsk region', value: 'donetsk' },
  { name: 'Zhytomyr region', value: 'zhytomyr' },
  { name: 'Zakarpattia region', value: 'zakarpattia' },
  { name: 'Zaporizhzhia region', value: 'zaporizhzhia' },
  { name: 'Ivano-Frankivsk region', value: 'ivano-frankivsk' },
  { name: 'Kyiv region', value: 'kyiv-region' },
  { name: 'Kirovohrad region', value: 'kirovohrad' },
  { name: 'Luhansk region', value: 'luhansk' },
  { name: 'Lviv region', value: 'lviv' },
  { name: 'Mykolaiv region', value: 'mykolaiv' },
  { name: 'Odesa region', value: 'odesa' },
  { name: 'Poltava region', value: 'poltava' },
  { name: 'Rivne region', value: 'rivne' },
  { name: 'Sumy region', value: 'sumy' },
  { name: 'Ternopil region', value: 'ternopil' },
  { name: 'Kharkiv region', value: 'kharkiv' },
  { name: 'Kherson region', value: 'kherson' },
  { name: 'Khmelnytskyi region', value: 'khmelnytskyi' },
  { name: 'Cherkasy region', value: 'cherkasy' },
  { name: 'Chernivtsi region', value: 'chernivtsi' },
  { name: 'Chernihiv region', value: 'chernihiv' },
  { name: 'Kyiv (city)', value: 'kyiv-city' },
];

export const INITIAL_DELIVERY_CHECKOUT_FORM: DeliveryCheckoutForm = {
  recipient: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    region: '',
  },
  delivery: {
    method: 'nova',
    branchByMethod: {
      courier: '',
      nova: '',
      ukr: '',
      dhl: '',
    },
  },
  payment: {
    method: 'online',
    onlinePayment: 'card',
  },
};
