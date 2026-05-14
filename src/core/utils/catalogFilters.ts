import type { CatalogApiSort, ICheckboxOption, IProduct, SortOption } from '@/core/types';

import { CATALOG_PAGE_SIZE } from '@/core/constants';

export const getCatalogApiSort = (sortBy: SortOption): CatalogApiSort =>
  sortBy;

export const getSelectedCatalogBrands = (
  activeItems: Record<string, boolean>,
  brandOptions: ICheckboxOption[]
) => brandOptions.filter((brand) => activeItems[brand.value]).map((brand) => brand.label);

export const sortFallbackCatalogProducts = (products: IProduct[], sortBy: SortOption) => {
  const sortedProducts = [...products];

  if (sortBy === 'price_asc') {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === 'price_desc') {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
};

export const getFallbackCatalogProductsPage = ({
  products,
  page,
  sortBy,
  selectedBrands,
  maxPrice,
}: {
  products: IProduct[];
  page: number;
  sortBy: SortOption;
  selectedBrands: string[];
  maxPrice: number;
}) => {
  const filteredProducts = sortFallbackCatalogProducts(products, sortBy).filter((product) => {
    const matchesBrand = selectedBrands.length
      ? selectedBrands.some((brand) => product.name.toLowerCase().includes(brand.toLowerCase()))
      : true;
    const matchesPrice = product.price <= maxPrice;

    return matchesBrand && matchesPrice;
  });
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / CATALOG_PAGE_SIZE));
  const startIndex = (page - 1) * CATALOG_PAGE_SIZE;

  return {
    products: filteredProducts.slice(startIndex, startIndex + CATALOG_PAGE_SIZE),
    totalElements: filteredProducts.length,
    totalPages,
    first: page <= 1,
    last: page >= totalPages,
  };
};
