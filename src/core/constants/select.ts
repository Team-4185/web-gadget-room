import type { DeliveryBranchOption, ISelectOption } from '@/core/types';

export const SORT_BY: ISelectOption[] = [
  {
    name: 'Name: A to Z',
    value: 'name_asc',
  },
  {
    name: 'Name: Z to A',
    value: 'name_desc',
  },
  {
    name: 'Price: Low to High',
    value: 'price_asc',
  },
  {
    name: 'Price: High to Low',
    value: 'price_desc',
  },
  {
    name: 'Popularity: High to Low',
    value: 'popularity_desc',
  },
];

export const LANGUAGES: ISelectOption[] = [
  {
    name: 'English - En',
    value: 'en',
  },
  {
    name: 'Ukraine - Ua',
    value: 'ua',
  },
];

export const COURIER_BRANCHES: DeliveryBranchOption[] = [
  {
    name: 'Courier hub #1, Kyiv',
    value: 'courier-1',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    source: 'fallback',
  },
  {
    name: 'Courier hub #3, Kyiv',
    value: 'courier-3',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    source: 'fallback',
  },
  {
    name: 'Courier hub #8, Kyiv',
    value: 'courier-8',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    source: 'fallback',
  },
];

export const NOVA_BRANCHES: DeliveryBranchOption[] = [
  {
    name: 'Nova Poshta #104, Kyiv',
    value: 'nova-104',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    address: 'Nova Poshta #104, Kyiv',
    lat: 50.455,
    lon: 30.612,
    source: 'fallback',
  },
  {
    name: 'Nova Poshta #17, Kyiv',
    value: 'nova-17',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    address: 'Nova Poshta #17, Kyiv',
    lat: 50.462,
    lon: 30.486,
    source: 'fallback',
  },
  {
    name: 'Nova Poshta #9, Kyiv',
    value: 'nova-9',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    address: 'Nova Poshta #9, Kyiv',
    lat: 50.424,
    lon: 30.516,
    source: 'fallback',
  },
];

export const UKR_BRANCHES: DeliveryBranchOption[] = [
  {
    name: 'Ukr Poshta #22, Kyiv',
    value: 'ukr-22',
    provider: 'UKR_POSHTA',
    city: 'Kyiv',
    address: 'Ukr Poshta #22, Kyiv',
    lat: 50.448,
    lon: 30.522,
    source: 'fallback',
  },
  {
    name: 'Ukr Poshta #49, Kyiv',
    value: 'ukr-49',
    provider: 'UKR_POSHTA',
    city: 'Kyiv',
    address: 'Ukr Poshta #49, Kyiv',
    lat: 50.442,
    lon: 30.489,
    source: 'fallback',
  },
  {
    name: 'Ukr Poshta #103, Kyiv',
    value: 'ukr-103',
    provider: 'UKR_POSHTA',
    city: 'Kyiv',
    address: 'Ukr Poshta #103, Kyiv',
    lat: 50.451,
    lon: 30.57,
    source: 'fallback',
  },
];

export const DHL_BRANCHES: DeliveryBranchOption[] = [
  {
    name: 'DHL Service Point #2, Kyiv',
    value: 'dhl-2',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    source: 'fallback',
  },
  {
    name: 'DHL Service Point #5, Kyiv',
    value: 'dhl-5',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    source: 'fallback',
  },
  {
    name: 'DHL Service Point #11, Kyiv',
    value: 'dhl-11',
    provider: 'NOVA_POSHTA',
    city: 'Kyiv',
    source: 'fallback',
  },
];

export const DEFAULT_BRANCH_ADDRESS = {
  country: 'Ukraine',
  zipCode: '01001',
};

export const BRANCH_ADDRESS_BY_ID: Record<string, typeof DEFAULT_BRANCH_ADDRESS> = {
  'nova-104': { country: 'Ukraine', zipCode: '02094' },
  'nova-17': { country: 'Ukraine', zipCode: '01054' },
  'nova-9': { country: 'Ukraine', zipCode: '03150' },
  'ukr-22': { country: 'Ukraine', zipCode: '02002' },
  'ukr-49': { country: 'Ukraine', zipCode: '03049' },
  'ukr-103': { country: 'Ukraine', zipCode: '02103' },
  'dhl-2': { country: 'Ukraine', zipCode: '01001' },
  'dhl-5': { country: 'Ukraine', zipCode: '04070' },
  'dhl-11': { country: 'Ukraine', zipCode: '03113' },
};
