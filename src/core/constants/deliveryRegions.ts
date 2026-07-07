import type { DeliveryRegionMapConfig, ISelectOption } from '@/core/types';

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

export const UKRAINE_REGION_MAP_CONFIG: Record<string, DeliveryRegionMapConfig> = {
  vinnytsia: {
    value: 'vinnytsia',
    name: 'Vinnytsia region',
    center: [49.2331, 28.4682],
    bounds: [
      [48.1, 27.2],
      [50.5, 30.0],
    ],
  },
  volyn: {
    value: 'volyn',
    name: 'Volyn region',
    center: [50.7472, 25.3254],
    bounds: [
      [50.0, 23.6],
      [51.9, 26.8],
    ],
  },
  dnipropetrovsk: {
    value: 'dnipropetrovsk',
    name: 'Dnipropetrovsk region',
    center: [48.4647, 35.0462],
    bounds: [
      [47.2, 32.9],
      [49.4, 36.9],
    ],
  },
  donetsk: {
    value: 'donetsk',
    name: 'Donetsk region',
    center: [48.0159, 37.8028],
    bounds: [
      [46.8, 36.5],
      [49.3, 39.4],
    ],
  },
  zhytomyr: {
    value: 'zhytomyr',
    name: 'Zhytomyr region',
    center: [50.2547, 28.6587],
    bounds: [
      [49.2, 27.2],
      [51.7, 30.4],
    ],
  },
  zakarpattia: {
    value: 'zakarpattia',
    name: 'Zakarpattia region',
    center: [48.6208, 22.2879],
    bounds: [
      [47.8, 22.0],
      [49.2, 24.7],
    ],
  },
  zaporizhzhia: {
    value: 'zaporizhzhia',
    name: 'Zaporizhzhia region',
    center: [47.8388, 35.1396],
    bounds: [
      [46.2, 34.0],
      [48.9, 37.4],
    ],
  },
  'ivano-frankivsk': {
    value: 'ivano-frankivsk',
    name: 'Ivano-Frankivsk region',
    center: [48.9226, 24.7111],
    bounds: [
      [47.7, 23.5],
      [49.6, 25.7],
    ],
  },
  'kyiv-region': {
    value: 'kyiv-region',
    name: 'Kyiv region',
    center: [50.4501, 30.5234],
    bounds: [
      [49.2, 28.6],
      [51.7, 32.2],
    ],
  },
  kirovohrad: {
    value: 'kirovohrad',
    name: 'Kirovohrad region',
    center: [48.5079, 32.2623],
    bounds: [
      [47.5, 29.7],
      [49.4, 34.2],
    ],
  },
  luhansk: {
    value: 'luhansk',
    name: 'Luhansk region',
    center: [48.574, 39.3078],
    bounds: [
      [47.6, 37.8],
      [50.1, 40.7],
    ],
  },
  lviv: {
    value: 'lviv',
    name: 'Lviv region',
    center: [49.8397, 24.0297],
    bounds: [
      [48.7, 22.7],
      [50.7, 25.5],
    ],
  },
  mykolaiv: {
    value: 'mykolaiv',
    name: 'Mykolaiv region',
    center: [46.975, 31.9946],
    bounds: [
      [46.0, 30.2],
      [48.3, 33.2],
    ],
  },
  odesa: {
    value: 'odesa',
    name: 'Odesa region',
    center: [46.4825, 30.7233],
    bounds: [
      [45.2, 28.2],
      [48.3, 31.6],
    ],
  },
  poltava: {
    value: 'poltava',
    name: 'Poltava region',
    center: [49.5883, 34.5514],
    bounds: [
      [48.5, 32.1],
      [50.6, 35.6],
    ],
  },
  rivne: {
    value: 'rivne',
    name: 'Rivne region',
    center: [50.6199, 26.2516],
    bounds: [
      [50.0, 25.0],
      [51.9, 27.9],
    ],
  },
  sumy: {
    value: 'sumy',
    name: 'Sumy region',
    center: [50.9077, 34.7981],
    bounds: [
      [50.1, 32.8],
      [52.4, 35.8],
    ],
  },
  ternopil: {
    value: 'ternopil',
    name: 'Ternopil region',
    center: [49.5535, 25.5948],
    bounds: [
      [48.5, 24.4],
      [50.3, 26.4],
    ],
  },
  kharkiv: {
    value: 'kharkiv',
    name: 'Kharkiv region',
    center: [49.9935, 36.2304],
    bounds: [
      [48.5, 34.8],
      [50.8, 38.1],
    ],
  },
  kherson: {
    value: 'kherson',
    name: 'Kherson region',
    center: [46.6354, 32.6169],
    bounds: [
      [45.7, 31.1],
      [47.6, 35.1],
    ],
  },
  khmelnytskyi: {
    value: 'khmelnytskyi',
    name: 'Khmelnytskyi region',
    center: [49.4229, 26.9871],
    bounds: [
      [48.4, 26.0],
      [50.6, 28.0],
    ],
  },
  cherkasy: {
    value: 'cherkasy',
    name: 'Cherkasy region',
    center: [49.4444, 32.0598],
    bounds: [
      [48.3, 30.6],
      [50.3, 33.8],
    ],
  },
  chernivtsi: {
    value: 'chernivtsi',
    name: 'Chernivtsi region',
    center: [48.2915, 25.9403],
    bounds: [
      [47.7, 24.9],
      [48.8, 27.5],
    ],
  },
  chernihiv: {
    value: 'chernihiv',
    name: 'Chernihiv region',
    center: [51.4982, 31.2893],
    bounds: [
      [50.3, 30.2],
      [52.4, 33.6],
    ],
  },
  'kyiv-city': {
    value: 'kyiv-city',
    name: 'Kyiv (city)',
    center: [50.4501, 30.5234],
    bounds: [
      [50.2133, 30.2394],
      [50.5908, 30.8259],
    ],
  },
};
