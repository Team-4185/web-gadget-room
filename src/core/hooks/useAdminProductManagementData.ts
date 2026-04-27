import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';

import { ADMIN_PANEL_MANAGED_PRODUCTS } from '@/core/constants';
import { adminProductsService } from '@/core/services';
import type { AdminProductStatus } from '@/core/types';
import { useAdminPanelData } from './useAdminPanelData';

const getFallbackBrands = () =>
  Array.from(new Set(ADMIN_PANEL_MANAGED_PRODUCTS.map((item) => item.brand))).sort((a, b) =>
    a.localeCompare(b)
  );

const mergeBrands = (current: string[], next: string[]) =>
  Array.from(
    new Set(
      [...current, ...next]
        .map((brand) => brand.trim())
        .filter((brand) => brand.length > 0)
    )
  ).sort((a, b) => a.localeCompare(b));

export const useAdminProductManagementData = () => {
  const { greeting, subtitle, menu } = useAdminPanelData();
  const [products, setProducts] = useState(ADMIN_PANEL_MANAGED_PRODUCTS.slice(0, 10));
  const [availableBrands, setAvailableBrands] = useState<string[]>(getFallbackBrands);
  const [totalProducts, setTotalProducts] = useState(ADMIN_PANEL_MANAGED_PRODUCTS.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<AdminProductStatus | ''>('');

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
          status: selectedStatus,
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
  }, [currentPage, searchQuery, selectedBrand, selectedStatus, reloadKey]);

  useEffect(() => {
    const controller = new AbortController();

    const loadBrands = async () => {
      try {
        const brands = await adminProductsService.getAvailableBrands(controller.signal);
        const nextBrands = brands.length ? brands : getFallbackBrands();
        setAvailableBrands((prev) => mergeBrands(prev, nextBrands));
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ERR_CANCELED') return;
        setAvailableBrands((prev) => (prev.length ? prev : getFallbackBrands()));
      }
    };

    loadBrands();

    return () => controller.abort();
  }, [reloadKey]);

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

  const onStatusChange = useCallback((value: AdminProductStatus | '') => {
    setSelectedStatus(value);
    setCurrentPage(1);
  }, []);

  const refreshProducts = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  return useMemo(
    () => ({
      greeting,
      subtitle,
      menu,
      products,
      availableBrands,
      totalProducts,
      currentPage,
      totalPages,
      isFirstPage,
      isLastPage,
      isLoading,
      searchQuery,
      selectedBrand,
      selectedStatus,
      goToPreviousPage,
      goToNextPage,
      onSearchChange,
      onBrandChange,
      onStatusChange,
      refreshProducts,
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
      onStatusChange,
      refreshProducts,
      products,
      availableBrands,
      searchQuery,
      selectedBrand,
      selectedStatus,
      subtitle,
      totalPages,
      totalProducts,
    ]
  );
};
