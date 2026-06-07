import type { ApiPhoneColor } from '@/core/types';

export const DEFAULT_PHONE_COLOR: ApiPhoneColor = {
  name: 'BLACK',
  displayName: 'Black',
  hexCode: '#000000',
};

export const getDefaultPhoneColor = (colors: ApiPhoneColor[] = []) =>
  colors.find((color) => color.name === DEFAULT_PHONE_COLOR.name) ??
  colors.find((color) => color.displayName.toLowerCase() === 'black') ??
  colors[0] ??
  DEFAULT_PHONE_COLOR;

export const getPhoneColorByName = (colors: ApiPhoneColor[] = [], colorName?: string) =>
  colors.find((color) => color.name === colorName) ?? getDefaultPhoneColor(colors);
