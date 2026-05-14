import type { ISelectOption } from '@/core/types';

export const SORT_BY: ISelectOption[] = [
  {
    name: 'Price: Low to High',
    value: 'price_asc',
  },
  {
    name: 'Price: High to Low',
    value: 'price_desc',
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

export const COURIER_BRANCHES: ISelectOption[] = [
  { name: 'Courier hub #1, Kyiv', value: 'courier-1' },
  { name: 'Courier hub #3, Kyiv', value: 'courier-3' },
  { name: 'Courier hub #8, Kyiv', value: 'courier-8' },
];

export const NOVA_BRANCHES: ISelectOption[] = [
  { name: 'Nova Poshta #104, Kyiv', value: 'nova-104' },
  { name: 'Nova Poshta #17, Kyiv', value: 'nova-17' },
  { name: 'Nova Poshta #9, Kyiv', value: 'nova-9' },
];

export const UKR_BRANCHES: ISelectOption[] = [
  { name: 'Ukr Poshta #22, Kyiv', value: 'ukr-22' },
  { name: 'Ukr Poshta #49, Kyiv', value: 'ukr-49' },
  { name: 'Ukr Poshta #103, Kyiv', value: 'ukr-103' },
];

export const DHL_BRANCHES: ISelectOption[] = [
  { name: 'DHL Service Point #2, Kyiv', value: 'dhl-2' },
  { name: 'DHL Service Point #5, Kyiv', value: 'dhl-5' },
  { name: 'DHL Service Point #11, Kyiv', value: 'dhl-11' },
];
