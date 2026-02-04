import type { ISelectOption } from '@/core/types';

export const SORT_BY: ISelectOption[] = [
  {
    name: 'Popularity',
    value: 'popularity',
  },
  {
    name: 'New',
    value: 'new',
  },
  {
    name: 'Increase',
    value: 'increase',
  },
  {
    name: 'Reduction',
    value: 'reduction',
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
