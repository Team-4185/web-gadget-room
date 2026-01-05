import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box } from '@mui/material';

import Home from '/icons/Home.svg';
import RightArrow from '/icons/SmallArrowRigth.svg';

type BreadCrumbsProps = {
  page?:
    | 'Home'
    | 'Catalog'
    | 'About us'
    | 'Login'
    | 'Register'
    | 'Cart'
    | 'Delivery'
    | 'Payment'
    | 'ProductPage';
  product?: string;
};

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ page, product }) => {
  const catalog = page === 'Catalog';
  const navigate = useNavigate();
  return (
    <>
      {product ? (
        <Container disableGutters maxWidth="xl" className="header_breadcrumbs__container">
          <Box className="header_breadcrumbs__box">
            <Box
              onClick={() => navigate('/')}
              component="a"
              href="#"
              className="header_breadcrumbs__home"
            >
              <img src={Home} alt="Home icon" />
              <span>Home</span>
            </Box>
            <img src={RightArrow} alt="arrow icon" />
            <a onClick={() => navigate('/catalog')} href="#" className="header_breadcrumbs__link">
              Catalog
            </a>
            <img src={RightArrow} alt="arrow icon" />
            <span className="header_breadcrumbs__product">{product}</span>
          </Box>
        </Container>
      ) : catalog ? (
        <Container disableGutters maxWidth="xl" className="header_breadcrumbs__container">
          <Box className="header_breadcrumbs__box">
            <Box
              onClick={() => navigate('/')}
              component="a"
              href="#"
              className="header_breadcrumbs__home"
            >
              <img src={Home} alt="Home icon" />
              <span>Home</span>
            </Box>
            <img src={RightArrow} alt="arrow icon" />
            <a href="#" className="header_breadcrumbs__link">
              {page}
            </a>
          </Box>
        </Container>
      ) : null}
    </>
  );
};
