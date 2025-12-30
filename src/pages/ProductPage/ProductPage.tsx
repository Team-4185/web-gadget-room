import type { FC } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Container } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { PRODUCTS } from '../../core/constants/products';
import First from '/icons/productImg/BigImg.svg';
import Second from '/icons/productImg/SmallFirst.svg';
import Third from '/icons/productImg/SmallSecond.svg';
import Fourth from '/icons/productImg/SmallThird.svg';
import Fivth from '/icons/productImg/SmallFourth.svg';
import currency from '/icons/currency.svg';
import phone from '/icons/ProductInfoIcons/phone.svg';
import CPU from '/icons/ProductInfoIcons/CPU.svg';
import camera from '/icons/ProductInfoIcons/camera.svg';
import frontCamera from '/icons/ProductInfoIcons/frontCamera.svg';
import core from '/icons/ProductInfoIcons/core.svg';
import battery from '/icons/ProductInfoIcons/battery.svg';
import shop from '/icons/ProductInfoIcons/shop.svg';
import delivery from '/icons/ProductInfoIcons/deliveryTrack.svg';
import verify from '/icons/ProductInfoIcons/verify.svg';
import { addProduct } from '../../core/store/slices/cartSlice';

export const ProductPage: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const productFromState = location.state;
  const product = productFromState || PRODUCTS.find((p) => p.id === Number(id));
  const [img, setImg] = useState(First);
  const cpuName = product.name.split(' ');
  const dispatch = useDispatch();
  const addToCart = () => dispatch(addProduct(product));
  const buyNow = () => {
    addToCart();
    navigate('/cart');
  };
  return (
    <Container disableGutters maxWidth="xl" sx={{ padding: '20px' }}>
      <Box
        sx={{ display: 'flex', width: '100%', gap: '112px', justifyContent: 'center', mb: '98px' }}
      >
        {/* Images */}
        <Box sx={{ display: 'flex', gap: '48px', width: '536px', alignItems: 'center' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '75px',
              gap: '24px',
              height: '444px',
              alignItems: 'center',
            }}
          >
            <img
              style={{ width: '75px', height: '93px', cursor: 'pointer' }}
              src={Second}
              alt="Second Image"
              onClick={() => setImg(Second)}
            />
            <img
              style={{ width: '46px', height: '93px', cursor: 'pointer' }}
              src={Third}
              alt="Fourth Image"
              onClick={() => setImg(Third)}
            />
            <img
              style={{ width: '45px', height: '93px', cursor: 'pointer' }}
              src={Fourth}
              alt="Third Image"
              onClick={() => setImg(Fourth)}
            />
            <img
              style={{ width: '35px', height: '93px', cursor: 'pointer' }}
              src={Fivth}
              alt="Fivth Image"
              onClick={() => setImg(Fivth)}
            />
          </Box>
          <img style={{ width: '413px', height: '516px' }} src={img} alt="Big Image" />
        </Box>
        {/* Info */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '34px' }}>
          <span style={{ fontWeight: '700', fontSize: '40px', color: '#000' }}>{product.name}</span>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              style={{ marginRight: '14px', width: '32px', height: '32px' }}
              src={currency}
              alt="currency icon"
            />
            <span style={{ fontWeight: '500', fontSize: '32px', color: '#000' }}>
              {product.price}
            </span>
          </Box>
          <Box
            sx={{
              width: '536px',
              gap: '15px',
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                borderRadius: '7px',
                padding: '16px',
                width: '100%',
                background: '#f4f4f4',
                display: 'flex',
                gap: '8px',
              }}
            >
              <img style={{ width: '24px', height: '24px' }} src={phone} alt="Phone icon" />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#a7a7a7',
                  }}
                >
                  Screen Size
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#4e4e4e',
                  }}
                >
                  6.7"
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: '7px',
                padding: '16px',
                width: '100%',
                background: '#f4f4f4',
                display: 'flex',
                gap: '8px',
              }}
            >
              <img style={{ width: '24px', height: '24px' }} src={CPU} alt="Phone icon" />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#a7a7a7',
                  }}
                >
                  CPU
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#4e4e4e',
                  }}
                >
                  {cpuName[0]}
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: '7px',
                padding: '16px',
                width: '100%',
                background: '#f4f4f4',
                display: 'flex',
                gap: '8px',
              }}
            >
              <img style={{ width: '24px', height: '24px' }} src={core} alt="Phone icon" />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#a7a7a7',
                  }}
                >
                  Cores
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#4e4e4e',
                  }}
                >
                  6
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: '7px',
                padding: '16px',
                width: '100%',
                background: '#f4f4f4',
                display: 'flex',
                gap: '8px',
              }}
            >
              <img style={{ width: '24px', height: '24px' }} src={camera} alt="Phone icon" />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#a7a7a7',
                  }}
                >
                  Main camera
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#4e4e4e',
                  }}
                >
                  48-12 -12 MP
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: '7px',
                padding: '16px',
                width: '100%',
                background: '#f4f4f4',
                display: 'flex',
                gap: '8px',
              }}
            >
              <img style={{ width: '24px', height: '24px' }} src={frontCamera} alt="Phone icon" />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#a7a7a7',
                  }}
                >
                  Front-camera
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#4e4e4e',
                  }}
                >
                  12 MP
                </span>
              </Box>
            </Box>
            <Box
              sx={{
                borderRadius: '7px',
                padding: '16px',
                width: '100%',
                background: '#f4f4f4',
                display: 'flex',
                gap: '8px',
              }}
            >
              <img style={{ width: '24px', height: '24px' }} src={battery} alt="Phone icon" />
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
                <span
                  style={{
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#a7a7a7',
                  }}
                >
                  Battery
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '114%',
                    color: '#4e4e4e',
                  }}
                >
                  4323 mAh
                </span>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              width: '536px',
              fontWeight: '400',
              fontSize: '14px',
              lineHeight: '171%',
              letterSpacing: '0.03em',
              color: '#6c6c6c',
            }}
          >
            Enhanced capabilities thanks toan enlarged display of 6.7 inchesand work without
            rechargingthroughout the day. Incredible photosas in weak, yesand in bright lightusing
            the new systemwith two cameras{' '}
            <span
              style={{
                textDecoration: 'uderline',
                textDecorationSkipInk: 'none',
                color: '#2c2c2c',
              }}
            >
              more...
            </span>
          </Box>
          <Box sx={{ width: '100%', display: 'flex', gap: '16px' }}>
            <button
              style={{
                border: '1px solid #979797',
                borderRadius: '6px',
                padding: '16px 56px',
                width: '257px',
                cursor: 'pointer',
                background: '#fff',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '150%',
                textAlign: 'center',
                color: '#000',
                fontFamily: 'Montserrat, sans-serif',
              }}
              onClick={addToCart}
            >
              Add To Cart
            </button>
            <button
              style={{
                border: '1px solid #979797',
                borderRadius: '6px',
                padding: '16px 56px',
                width: '257px',
                cursor: 'pointer',
                background: '#979797',
                fontWeight: '500',
                fontSize: '16px',
                lineHeight: '150%',
                textAlign: 'center',
                color: '#fff',
                fontFamily: 'Montserrat, sans-serif',
              }}
              onClick={buyNow}
            >
              Buy Now
            </button>
          </Box>
          <Box sx={{ display: 'flex', width: '100%', gap: '32px' }}>
            <Box sx={{ display: 'flex', width: '157px', gap: '16px', alignItems: 'center' }}>
              <div
                style={{
                  borderRadius: '11px',
                  padding: '16px',
                  width: '56px',
                  height: '56px',
                  background: '#f6f6f6',
                }}
              >
                <img src={delivery} alt="Delivery Icon" />
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '171%',
                    color: '#717171',
                  }}
                >
                  Delivery
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '171%',
                    color: '#000',
                  }}
                >
                  1-2 day
                </span>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '157px', gap: '16px', alignItems: 'center' }}>
              <div
                style={{
                  borderRadius: '11px',
                  padding: '16px',
                  width: '56px',
                  height: '56px',
                  background: '#f6f6f6',
                }}
              >
                <img src={shop} alt="Shop Icon" />
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '171%',
                    color: '#717171',
                  }}
                >
                  In Stock
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '171%',
                    color: '#000',
                  }}
                >
                  Today
                </span>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '157px', gap: '16px', alignItems: 'center' }}>
              <div
                style={{
                  borderRadius: '11px',
                  padding: '16px',
                  width: '56px',
                  height: '56px',
                  background: '#f6f6f6',
                }}
              >
                <img src={verify} alt="Delivery Icon" />
              </div>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '171%',
                    color: '#717171',
                  }}
                >
                  Guaranteed
                </span>
                <span
                  style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    lineHeight: '171%',
                    color: '#000',
                  }}
                >
                  1 year
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
