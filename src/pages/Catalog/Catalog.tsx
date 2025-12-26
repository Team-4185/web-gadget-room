import { Box, Container } from '@mui/material';
import { PRODUCTS } from '../../core/constants/products';

import { ITEMS_PER_PAGE } from '../../core/types/Catalog/catalog.constants';

import { CatalogFilters } from '../../components/ui/Catalog/CatalogFilters/CatalogFilters';
import { CatalogContent } from '../../components/ui/Catalog/CatalogContent';

import { usePagination } from '../../core/hooks/Catalog/usePagination';
import { useCatalogProducts } from '../../core/hooks/Catalog/useCatalogProducts';
import { useCatalogState } from '../../core/hooks/Catalog/useCatalogState';

export const Catalog = () => {
  const {
    sortBy,
    activeBrands,
    toggleBrand,
    sliderValue,
    handleSliderChange,
    inStockActive,
    preOrderActive,
    toggleInStock,
    togglePreOrder,
    handleSortChange,
  } = useCatalogState();

  const filteredAndSortedProducts = useCatalogProducts({
    products: PRODUCTS,
    activeBrands,
    sliderValue,
    inStockActive,
    preOrderActive,
    sortBy,
  });

  const { currentPage, totalPages, currentItems, goPrev, goNext, goToPage } = usePagination(
    filteredAndSortedProducts,
    ITEMS_PER_PAGE
  );

  return (
    <Container maxWidth="xl" disableGutters className="catalog-container">
      <Box className="catalog-layout">
        <CatalogFilters
          activeBrands={activeBrands}
          onToggleBrand={toggleBrand}
          sliderValue={sliderValue}
          onSliderChange={handleSliderChange}
          inStockActive={inStockActive}
          preOrderActive={preOrderActive}
          onToggleInStock={toggleInStock}
          onTogglePreOrder={togglePreOrder}
        />

        <CatalogContent
          sortBy={sortBy}
          onSortChange={handleSortChange}
          items={currentItems}
          totalPages={totalPages}
          currentPage={currentPage}
          onPrev={goPrev}
          onNext={goNext}
          onPageChange={goToPage}
        />
      </Box>
    </Container>
  );
};
