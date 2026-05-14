import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { CATALOG_MIN_PRICE, CATALOG_PAGE_SIZE, PRODUCTS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { CatalogApiSort, IProduct, SortOption } from '@/core/types';
import { getFallbackCatalogProductsPage, mapApiPhoneToProduct } from '@/core/utils';

export const useCatalogProducts = ({
  currentPage,
  sortBy,
  brands,
  sort,
  maxPrice,
}: {
  currentPage: number;
  sortBy: SortOption;
  brands: string[];
  sort: CatalogApiSort;
  maxPrice: number;
}) => {
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS.slice(0, CATALOG_PAGE_SIZE));
  const [totalProducts, setTotalProducts] = useState(PRODUCTS.length);
  const [totalPages, setTotalPages] = useState(Math.ceil(PRODUCTS.length / CATALOG_PAGE_SIZE));
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (import.meta.env.VITE_USE_TESTING_FALLBACK === 'true') {
      const fallback = getFallbackCatalogProductsPage({
        products: PRODUCTS,
        page: currentPage,
        sortBy,
        selectedBrands: brands,
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
            brands,
            minPrice: CATALOG_MIN_PRICE,
            maxPrice,
            sort,
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

        const fallback = getFallbackCatalogProductsPage({
          products: PRODUCTS,
          page: currentPage,
          sortBy,
          selectedBrands: brands,
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
  }, [brands, currentPage, maxPrice, sort, sortBy]);

  return useMemo(
    () => ({
      products,
      currentPage,
      totalProducts,
      totalPages,
      isFirstPage,
      isLastPage,
      isLoading,
    }),
    [currentPage, isFirstPage, isLastPage, isLoading, products, totalPages, totalProducts]
  );
};
