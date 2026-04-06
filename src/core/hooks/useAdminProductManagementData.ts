import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { ADMIN_PANEL_MANAGED_PRODUCTS } from '@/core/constants';
import { adminProductsService } from '@/core/services';
import { useAdminPanelData } from './useAdminPanelData';

export const useAdminProductManagementData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();
  const [products, setProducts] = useState(ADMIN_PANEL_MANAGED_PRODUCTS.slice(0, 10));
  const [totalProducts, setTotalProducts] = useState(ADMIN_PANEL_MANAGED_PRODUCTS.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      setIsLoading(true);

      try {
        const response = await adminProductsService.getProducts({
          page: currentPage,
          size: 10,
          search: searchQuery,
          brand: selectedBrand,
          signal: controller.signal,
        });

        setProducts(response.products);
        setTotalProducts(response.totalElements);
        setTotalPages(response.totalPages);
        setIsFirstPage(response.first);
        setIsLastPage(response.last);
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;

        setProducts(ADMIN_PANEL_MANAGED_PRODUCTS.slice(0, 10));
        setTotalProducts(ADMIN_PANEL_MANAGED_PRODUCTS.length);
        setTotalPages(1);
        setIsFirstPage(true);
        setIsLastPage(true);
      } finally {
        setIsLoading(false);
      }
    };

    load();

    return () => controller.abort();
  }, [currentPage, searchQuery, selectedBrand]);

  const goToPreviousPage = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prevPage) => (isLastPage ? prevPage : prevPage + 1));
  }, [isLastPage]);

  const onSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  }, []);

  const onBrandChange = useCallback((value: string) => {
    setSelectedBrand(value);
    setCurrentPage(1);
  }, []);

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      products,
      totalProducts,
      currentPage,
      totalPages,
      isFirstPage,
      isLastPage,
      isLoading,
      searchQuery,
      selectedBrand,
      goToPreviousPage,
      goToNextPage,
      onSearchChange,
      onBrandChange,
    }),
    [
      currentPage,
      goToNextPage,
      goToPreviousPage,
      greeting,
      isFirstPage,
      isLastPage,
      isLoading,
      menu,
      onBrandChange,
      onSearchChange,
      products,
      searchQuery,
      selectedBrand,
      subtitle,
      totalPages,
      totalProducts,
    ]
  );
};
