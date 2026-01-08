import { Box, Container } from '@mui/material';

import { CatalogContent, CatalogFilters } from '@/components';
import { useCatalogProducts, useCatalogState, usePagination } from '@/core/hooks';
import { ITEMS_PER_PAGE, PRODUCTS } from '@/core/constants';

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
