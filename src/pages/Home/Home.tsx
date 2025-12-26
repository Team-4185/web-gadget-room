import { Box, Container } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { ProductCard } from '../../components/ui/ProductCard/ProductCard';
import fire from '/icons/fire.svg';
import { PRODUCTS } from '../../core/constants/products';
import { addProduct } from '../../core/store/slices/cartSlice';

export const Home = () => {
  const navigate = useNavigate();
  const brands = [
    { id: 1, name: 'Apple', icon: '/icons/Brands/Apple.svg', descr: 'iphone 15 series' },
    { id: 2, name: 'Samsung', icon: '/icons/Brands/Samsung.svg', descr: 'Galaxy S24 Ultra' },
    { id: 3, name: 'Xiaomi', icon: '/icons/Brands/Xiaomi.svg', descr: '14T Pro' },
    { id: 4, name: 'Google', icon: '/icons/Brands/Google.svg', descr: 'Pixel 8 Pro' },
  ];
  const IPhone17 = PRODUCTS[0];
  const dispatch = useDispatch();
  const addPhone = () => {
    dispatch(
      addProduct({ id: IPhone17.id, name: IPhone17.name, price: IPhone17.price, amount: 1 })
    );
    navigate('/cart');
  };

  return (
    <>
      <Container disableGutters maxWidth="xl" sx={{ padding: '30px' }}>
        <Box
          sx={{
            width: '100%',
            height: '600px',
            background: '#b7b7b7',
            padding: '167px 559px 188px 79px',
          }}
        >
          <Box>
            <span
              style={{
                fontFamily: 'Montserrat, sans-serif',
                fontStyle: 'italic',
                fontWeight: '300',
                fontSize: '96px',
                lineHeight: '75%',
                letterSpacing: '-0.05em',
                color: '#f8fcff',
              }}
            >
              iPhone 17 <span style={{ fontWeight: '600' }}>Pro Max</span>
            </span>
            <span
              style={{
                marginTop: '31px',
                marginBottom: '74px',
                display: 'block',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '100%',
                color: '#fff',
              }}
            >
              Created to change everything for the better. For everyone.
            </span>
            <button
              style={{
                borderRadius: '15px',
                padding: '8px',
                width: '200px',
                boxShadow: '1px 10px 30px 0 rgba(0, 0, 0, 0.25)',
                background: '#fff',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '600',
                fontSize: '24px',
                lineHeight: '100%',
                color: '#000',
                border: 'none',
                cursor: 'pointer',
                height: '60px',
              }}
              onClick={() => addPhone()}
            >
              Buy Now
            </button>
          </Box>
        </Box>
        <Box sx={{ width: '100%', display: 'flex' }}>
          <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ width: '100%', height: '314px', background: '#797979' }}></Box>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ width: '50%', height: '272px', background: '#fff' }}></Box>
              <Box sx={{ width: '50%', height: '272px', background: '#aeaeae' }}></Box>
            </Box>
          </Box>
          <Box sx={{ width: '50%', background: '#717171', padding: '177px 252px  316px 30px' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'Montserrat, sans-serif',
                fontStyle: 'italic',
                fontWeight: '300',
                fontSize: '36px',
                lineHeight: '131%',
                letterSpacing: '-0.06em',
                color: '#fff',
              }}
            >
              Samsung <span style={{ fontWeight: '600' }}>Galaxy S24 Ultra</span>
            </span>
            <span
              style={{
                display: 'block',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: '400',
                fontSize: '24px',
                lineHeight: '196%',
                color: '#fff',
              }}
            >
              Shi-Revolution in your pocket.
            </span>
          </Box>
        </Box>
        <Box sx={{ width: '100%', padding: '80px 88px', height: '444px' }}>
          <span
            style={{
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: '700',
              fontSize: '48px',
              lineHeight: '0%',
              color: '#000',
            }}
          >
            Featured Brands
          </span>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              mt: '50px',
              justifyContent: 'space-between',
            }}
          >
            {brands.map((brand) => (
              <div key={brand.id}>
                <Box
                  sx={{
                    width: '280px',
                    height: '200px',
                    background: '#aeaeae',
                    borderRadius: '20px',
                    padding: '63px 65px',
                  }}
                >
                  <span
                    style={{
                      display: 'flex',
                      width: '100%',
                      textAlign: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      fontFamily: 'Montserrat, sans-serif',
                      fontWeight: '700',
                      fontSize: '32px',
                      lineHeight: '84%',
                      color: '#000',
                    }}
                  >
                    <img style={{ width: '40px', height: '40px' }} src={brand.icon} />
                    {brand.name}
                  </span>
                  <span
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      marginTop: '10px',
                      fontWeight: '400',
                      fontSize: '14px',
                      lineHeight: '107%',
                      color: '#000',
                    }}
                  >
                    {brand.descr}
                  </span>
                </Box>
              </div>
            ))}
          </Box>
        </Box>
        <Box sx={{ width: '100%', height: '634px', padding: '60px 80px' }}>
          <span
            style={{
              fontWeight: '700',
              fontSize: '48px',
              lineHeight: '0%',
              color: '#000',
            }}
          >
            New Arrivals
          </span>
          <Box
            sx={{
              display: 'flex',
              width: '100%',
              mt: '50px',
              justifyContent: 'space-between',
            }}
          >
            {PRODUCTS.filter((product) => product.newProduct)
              .slice(0, 4)
              .map((product) => (
                <ProductCard
                  home
                  key={product.id}
                  image={product.img}
                  {...product}
                  onClick={() => {
                    navigate(`/product/${product.id}`, { state: product });
                  }}
                />
              ))}
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          width: '100%',
          margin: '0 auto',
          background: '#aeaeae',
          padding: '96px 423px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '594px',
            height: 'max-content',
            gap: '30px',
          }}
        >
          <Box sx={{ display: 'flex', gap: '42px', alignSelf: 'center' }}>
            <img src={fire} alt="fire icon" />
            <span style={{ fontWeight: '800', fontSize: '48px', lineHeight: '98%', color: '#000' }}>
              Big Summer Sale
            </span>
          </Box>
          <span
            style={{
              fontStyle: 'italic',
              fontWeight: '400',
              fontSize: '36px',
              color: '#000',
              height: '32px',
            }}
          >
            Up to 50% off on popular models
          </span>
          <button
            style={{
              display: 'block',
              borderRadius: '15px',
              padding: '8px',
              width: '200px',
              height: '60px',
              boxShadow: '1px 10px 30px 0 rgba(0, 0, 0, 0.25)',
              background: '#fff',
              alignSelf: 'center',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '24px',
              lineHeight: '100%',
              color: '#00',
              fontFamily: 'Montserrat, sans-serif',
            }}
            onClick={() => navigate('/catalog')}
          >
            Shop Deals
          </button>
        </Box>
      </Box>
    </>
  );
};
