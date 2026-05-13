import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { BRANDS, PRODUCTS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { CatalogApiSort, IProduct, SortOption } from '@/core/types';
import { mapApiPhoneToProduct } from '@/core/utils';

const CATALOG_PAGE_SIZE = 12;
const CATALOG_MIN_PRICE = 0;

const sortMap: Partial<Record<SortOption, CatalogApiSort>> = {
  popularity: 'price_asc',
  new: 'price_asc',
  increase: 'price_asc',
  reduction: 'price_desc',
  'price increasing': 'price_asc',
  'price decreasing': 'price_desc',
};

const getSelectedBrand = (activeItems: Record<string, boolean>) => {
  const selectedBrand = BRANDS.find((brand) => activeItems[brand.value]);
  return selectedBrand?.label;
};

const sortFallbackProducts = (products: IProduct[], sortBy: SortOption) => {
  const sortedProducts = [...products];

  if (sortBy === 'increase' || sortBy === 'price increasing') {
    return sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortBy === 'reduction' || sortBy === 'price decreasing') {
    return sortedProducts.sort((a, b) => b.price - a.price);
  }

  return sortedProducts;
};

const getFallbackProductsPage = ({
  page,
  sortBy,
  activeItems,
  maxPrice,
}: {
  page: number;
  sortBy: SortOption;
  activeItems: Record<string, boolean>;
  maxPrice: number;
}) => {
  const selectedBrand = getSelectedBrand(activeItems);
  const filteredProducts = sortFallbackProducts(PRODUCTS, sortBy).filter((product) => {
    const matchesBrand = selectedBrand
      ? product.name.toLowerCase().includes(selectedBrand.toLowerCase())
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

export const useCatalogProducts = ({
  sortBy,
  activeItems,
  maxPrice,
}: {
  sortBy: SortOption;
  activeItems: Record<string, boolean>;
  maxPrice: number;
}) => {
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS.slice(0, CATALOG_PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(PRODUCTS.length);
  const [totalPages, setTotalPages] = useState(Math.ceil(PRODUCTS.length / CATALOG_PAGE_SIZE));
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const selectedBrand = getSelectedBrand(activeItems);
  const apiSort = sortMap[sortBy] ?? 'price_asc';

  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, selectedBrand, maxPrice]);

  useEffect(() => {
    if (import.meta.env.VITE_USE_TESTING_FALLBACK === 'true') {
      const fallback = getFallbackProductsPage({
        page: currentPage,
        sortBy,
        activeItems,
        maxPrice,
      });

      setProducts(fallback.products);
      setTotalProducts(fallback.totalElements);
      setTotalPages(fallback.totalPages);
      setIsFirstPage(fallback.first);
      setIsLastPage(fallback.last);
      return;
    }

    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const response = await phonesService.getCatalog(
          {
            page: currentPage,
            size: CATALOG_PAGE_SIZE,
            brand: selectedBrand,
            minPrice: CATALOG_MIN_PRICE,
            maxPrice,
            sort: apiSort,
          },
          controller.signal
        );
        const mappedProducts = await Promise.all(
          response.content.map(async (phone) => {
            const imageUrls = await phonesService.getImageObjectUrls(
              phone.images ?? [],
              controller.signal
            );

            return mapApiPhoneToProduct(phone, imageUrls[0]);
          })
        );

        if (!controller.signal.aborted) {
          setProducts(mappedProducts);
          setTotalProducts(response.totalElements);
          setTotalPages(Math.max(1, response.totalPages));
          setIsFirstPage(response.first);
          setIsLastPage(response.last);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;

        const fallback = getFallbackProductsPage({
          page: currentPage,
          sortBy,
          activeItems,
          maxPrice,
        });

        setProducts(fallback.products);
        setTotalProducts(fallback.totalElements);
        setTotalPages(fallback.totalPages);
        setIsFirstPage(fallback.first);
        setIsLastPage(fallback.last);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => controller.abort();
  }, [activeItems, apiSort, currentPage, maxPrice, selectedBrand, sortBy]);

  return useMemo(
    () => ({
      products,
      currentPage,
      totalProducts,
      totalPages,
      isFirstPage,
      isLastPage,
      isLoading,
      setCurrentPage,
    }),
    [currentPage, isFirstPage, isLastPage, isLoading, products, totalPages, totalProducts]
  );
};
