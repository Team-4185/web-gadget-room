import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { CATALOG_PAGE_SIZE, PRODUCTS } from '@/core/constants';
import { phonesService } from '@/core/services';
import type { CatalogApiSort, IProduct, SortOption } from '@/core/types';
import {
  getFallbackCatalogProductsPage,
  isDemoFallbackEnabled,
  isForcedTestingFallback,
  mapApiPhoneToProduct,
} from '@/core/utils';

export const useCatalogProducts = ({
  currentPage,
  sortBy,
  brands,
  sort,
  minPrice,
  maxPrice,
  enabled = true,
}: {
  currentPage: number;
  sortBy: SortOption;
  brands: string[];
  sort: CatalogApiSort;
  minPrice: number;
  maxPrice: number;
  enabled?: boolean;
}) => {
  const demoFallbackEnabled = isDemoFallbackEnabled();
  const forcedTestingFallback = isForcedTestingFallback();
  const [products, setProducts] = useState<IProduct[]>(
    demoFallbackEnabled ? PRODUCTS.slice(0, CATALOG_PAGE_SIZE) : []
  );
  const [totalProducts, setTotalProducts] = useState(demoFallbackEnabled ? PRODUCTS.length : 0);
  const [totalPages, setTotalPages] = useState(
    demoFallbackEnabled ? Math.ceil(PRODUCTS.length / CATALOG_PAGE_SIZE) : 1
  );
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const brandsKey = brands.join('|');
  const selectedBrands = useMemo(() => (brandsKey ? brandsKey.split('|') : []), [brandsKey]);

  useEffect(() => {
    if (!enabled) return;

    if (forcedTestingFallback) {
      const fallback = getFallbackCatalogProductsPage({
        products: PRODUCTS,
        page: currentPage,
        sortBy,
        selectedBrands,
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
    let isActive = true;

    const loadProducts = async () => {
      setIsLoading(true);

      try {
        const response = await phonesService.getCatalog(
          {
            page: currentPage,
            size: CATALOG_PAGE_SIZE,
            brands: selectedBrands,
            minPrice,
            maxPrice,
            sort,
          },
          controller.signal
        );

        if (!isActive) return;

        const mappedProducts = await Promise.all(
          response.content.map(async (phone) => {
            const previewImageUrl = phone.previewImage?.url
              ? await phonesService.getImageObjectUrl(phone.previewImage.url, controller.signal)
              : null;
            const imageUrls = previewImageUrl
              ? [previewImageUrl]
              : await phonesService.getImageObjectUrls(phone.images ?? [], controller.signal);

            return mapApiPhoneToProduct(phone, imageUrls[0]);
          })
        );

        if (isActive && !controller.signal.aborted) {
          setProducts(mappedProducts);
          setTotalProducts(response.totalElements);
          setTotalPages(Math.max(1, response.totalPages));
          setIsFirstPage(response.first);
          setIsLastPage(response.last);
        }
      } catch (error) {
        if (!isActive) return;

        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;

        if (demoFallbackEnabled) {
          const fallback = getFallbackCatalogProductsPage({
            products: PRODUCTS,
            page: currentPage,
            sortBy,
            selectedBrands,
            maxPrice,
          });

          setProducts(fallback.products);
          setTotalProducts(fallback.totalElements);
          setTotalPages(fallback.totalPages);
          setIsFirstPage(fallback.first);
          setIsLastPage(fallback.last);
        } else {
          setProducts([]);
          setTotalProducts(0);
          setTotalPages(1);
          setIsFirstPage(true);
          setIsLastPage(true);
        }
      } finally {
        if (isActive && !controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void loadProducts();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [
    currentPage,
    demoFallbackEnabled,
    enabled,
    forcedTestingFallback,
    maxPrice,
    minPrice,
    selectedBrands,
    sort,
    sortBy,
  ]);

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
