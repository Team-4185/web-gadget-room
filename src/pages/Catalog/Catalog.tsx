import { useState, useMemo } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  MenuItem,
  Slider,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from 'react-router-dom';

import ExpandIcon from '/icons/ExpandMore.svg';
import RadioActive from '/icons/RadioActive.svg';
import RadioInactive from '/icons/RadioInactive.svg';
import SmallArrowRigth from '/icons/SmallArrowRigth.svg';
import SmallArrowLeft from '/icons/SmallArrowLeft.svg';
import { Input } from '../../components/ui/Input/Input';
import { ProductCard } from '../../components/ui/ProductCard/ProductCard';
import { PRODUCTS } from '../../core/constants/products';

import './Catalog.css';

interface Product {
  id: number;
  name: string;
  price: number;
  sale?: boolean;
  img: string;
  hit?: boolean;
  newProduct?: boolean;
  inStock?: boolean;
  preOrder?: boolean;
  reviews?: number;
}

type SortOption =
  | 'popularity'
  | 'name A to Z'
  | 'name Z to A'
  | 'price decreasing'
  | 'price increasing'
  | 'number of reviews';

export const Catalog = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const itemsPerPage: number = 12;

  // Filters state
  const [appleActive, setAppleActive] = useState<boolean>(false);
  const [samsungActive, setSamsungActive] = useState<boolean>(false);
  const [xiaomiActive, setXiaomiActive] = useState<boolean>(false);
  const [onePlusActive, setOnePlusActive] = useState<boolean>(false);
  const [honorActive, setHonorActive] = useState<boolean>(false);
  const [pocoActive, setPocoActive] = useState<boolean>(false);
  const [inStockActive, setInStockActive] = useState<boolean>(false);
  const [preOrderActive, setPreOrderActive] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(2000);

  const filteredAndSortedProducts = useMemo<Product[]>(() => {
    let filtered: Product[] = [...PRODUCTS];
    const selectedBrands: string[] = [];
    if (appleActive) selectedBrands.push('apple');
    if (samsungActive) selectedBrands.push('samsung');
    if (xiaomiActive) selectedBrands.push('xiaomi');
    if (onePlusActive) selectedBrands.push('oneplus');
    if (honorActive) selectedBrands.push('honor');
    if (pocoActive) selectedBrands.push('poco');

    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product: Product) =>
        selectedBrands.some((brand: string) => product.name.toLowerCase().includes(brand))
      );
    }

    filtered = filtered.filter((product: Product) => {
      const price: number = product.price;
      return price >= 200 && price <= sliderValue;
    });

    if (inStockActive && !preOrderActive) {
      filtered = filtered.filter((product: Product) => product.inStock !== false);
    } else if (preOrderActive && !inStockActive) {
      filtered = filtered.filter((product: Product) => product.preOrder === true);
    }

    switch (sortBy) {
      case 'name A to Z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name Z to A':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'price decreasing':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'price increasing':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'number of reviews':
        filtered.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [
    appleActive,
    samsungActive,
    xiaomiActive,
    onePlusActive,
    honorActive,
    pocoActive,
    inStockActive,
    preOrderActive,
    sliderValue,
    sortBy,
  ]);

  const totalPages: number = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  const currentItems: Product[] = filteredAndSortedProducts.slice(startIndex, endIndex);
  const navigate = useNavigate();

  const handlePrevPage = (): void => {
    setCurrentPage(currentPage === 1 ? 1 : currentPage - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const handleNextPage = (): void => {
    setCurrentPage(currentPage === totalPages ? 1 : currentPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handPageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSliderChange = (_event: Event, newValue: number | number[]): void => {
    setSliderValue(newValue as number);
    setCurrentPage(1);
  };

  const handleSortChange = (event: SelectChangeEvent<string>): void => {
    setSortBy(event.target.value as SortOption);
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    switch (brand) {
      case 'apple':
        setAppleActive((prev) => !prev);
        break;
      case 'samsung':
        setSamsungActive((prev) => !prev);
        break;
      case 'xiaomi':
        setXiaomiActive((prev) => !prev);
        break;
      case 'oneplus':
        setOnePlusActive((prev) => !prev);
        break;
      case 'honor':
        setHonorActive((prev) => !prev);
        break;
      case 'poco':
        setPocoActive((prev) => !prev);
        break;
      case 'instock':
        setInStockActive((prev) => !prev);
        break;
      case 'preorder':
        setPreOrderActive((prev) => !prev);
        break;
    }
    setCurrentPage(1);
  };

  return (
    <Container maxWidth="xl" disableGutters className="catalog-container">
      <Box className="catalog-layout">
        {/* Filters */}
        <Box className="catalog-filters">
          <span className="catalog-filter-title">Filter:</span>
          <Box className="catalog-accordion-list">
            <Accordion defaultExpanded className="catalog-accordion">
              <AccordionSummary
                expandIcon={<img src={ExpandIcon} />}
                className="catalog-accordion-summary"
              >
                <span className="accordion-title">Brand</span>
              </AccordionSummary>
              <AccordionDetails className="catalog-accordion-details">
                {['apple', 'samsung', 'xiaomi', 'oneplus', 'honor', 'poco'].map((brand) => {
                  const isActive = {
                    apple: appleActive,
                    samsung: samsungActive,
                    xiaomi: xiaomiActive,
                    oneplus: onePlusActive,
                    honor: honorActive,
                    poco: pocoActive,
                  }[brand];
                  return (
                    <form key={brand} className="filter-form" onClick={() => toggleBrand(brand)}>
                      <img src={isActive ? RadioActive : RadioInactive} alt="Radio button" />
                      <span className="filter-label">
                        {brand.charAt(0).toUpperCase() + brand.slice(1)}
                      </span>
                    </form>
                  );
                })}
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded className="catalog-accordion">
              <AccordionSummary
                expandIcon={<img src={ExpandIcon} />}
                className="catalog-accordion-summary"
              >
                <span className="accordion-title">Price</span>
              </AccordionSummary>
              <AccordionDetails className="catalog-accordion-details price-details">
                <Box className="price-values">
                  <span>€ {sliderValue}</span>
                  <span>€ 2000</span>
                </Box>
                <Slider
                  value={sliderValue}
                  onChange={handleSliderChange}
                  min={299}
                  max={2000}
                  step={10}
                  size="small"
                  defaultValue={0}
                  aria-label="Small"
                  valueLabelDisplay="auto"
                  className="price-slider"
                />
              </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded className="catalog-accordion">
              <AccordionSummary
                expandIcon={<img src={ExpandIcon} />}
                className="catalog-accordion-summary"
              >
                <span className="accordion-title">Availability</span>
              </AccordionSummary>
              <AccordionDetails className="catalog-accordion-details">
                <form className="filter-form" onClick={() => toggleBrand('instock')}>
                  <img src={inStockActive ? RadioActive : RadioInactive} alt="Radio button" />
                  <span className="filter-label">In stock</span>
                </form>
                <form className="filter-form" onClick={() => toggleBrand('preorder')}>
                  <img src={preOrderActive ? RadioActive : RadioInactive} alt="Radio button" />
                  <span className="filter-label">Pre-order</span>
                </form>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>

        <Box className="catalog-content">
          <Box className="catalog-header">
            <span className="catalog-title">Catalog</span>
            <Box className="catalog-sort">
              <span>Sort by</span>
              <Input
                inherit
                select
                value={sortBy}
                onChange={handleSortChange}
                id="sort"
                name="sort"
                className="catalog-sort-select"
              >
                <MenuItem value="popularity">Popularity</MenuItem>
                <MenuItem value="name A to Z">Name A to Z</MenuItem>
                <MenuItem value="name Z to A">Name Z to A</MenuItem>
                <MenuItem value="price decreasing">Price decreasing</MenuItem>
                <MenuItem value="price increasing">Price increasing</MenuItem>
                <MenuItem value="number of reviews">Number of reviews</MenuItem>
              </Input>
            </Box>
          </Box>

          <Box className="catalog-products">
            {currentItems.map((product) => (
              <ProductCard
                home
                key={product.id}
                id={product.id}
                image={product.img}
                name={product.name}
                price={product.price}
                sale={product.sale}
                hit={product.hit}
                newProduct={product.newProduct}
                onClick={() => navigate(`/product/${product.id}`, { state: product })}
              />
            ))}
          </Box>

          {totalPages > 0 && (
            <Box className="pagination">
              {totalPages > 1 && (
                <Box className="pagination-prev" onClick={handlePrevPage}>
                  <img src={SmallArrowLeft} alt="Arrow Right" />
                </Box>
              )}
              <Box className="pagination-numbers">
                {Array.from({ length: totalPages }, (_: unknown, i: number) => (
                  <span
                    key={i}
                    className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}
                    onClick={() => handPageChange(i + 1)}
                  >
                    {i + 1}
                  </span>
                ))}
              </Box>
              {totalPages > 1 && (
                <Box className="pagination-next" onClick={handleNextPage}>
                  Next <img src={SmallArrowRigth} alt="Arrow Right" />
                </Box>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
};
