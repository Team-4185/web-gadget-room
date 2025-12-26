import { Container, Box, TextField } from '@mui/material';

import ArrowRight from '/icons/ArrowRight.svg';

export const Registration = () => {
  return (
    <>
      <Container
        component="section"
        maxWidth="xl"
        disableGutters
        className="registration-container"
      >
        <Box component="div" className="registration">
          {/* Левая часть */}
          <Box component="div" className="registration__left">
            <Box className="registration__text-block">
              <span className="registration__title">Nice to meet you)</span>
              <span className="registration__subtitle">Just register to join with us</span>
              <img src={ArrowRight} alt="Arrow Right" className="registration__arrow" />
            </Box>
          </Box>

          {/* Правая часть */}
          <Box className="registration__right">
            <Box className="registration__form-wrapper">
              <span className="registration__form-title">Register</span>
              <Box component="form" className="registration__form">
                {['Email Address', 'Password', 'Repeat Password'].map((label, index) => (
                  <TextField
                    key={index}
                    id={label.toLowerCase().replace(/\s+/g, '')}
                    label={label}
                    type={label.includes('Password') ? 'password' : 'text'}
                    variant="outlined"
                    className="registration__textfield"
                  />
                ))}
              </Box>
            </Box>

            <Box className="registration__terms">
              <Box className="registration__checkbox-row">
                <input type="checkbox" name="terms" id="terms" className="registration__checkbox" />
                <Box className="registration__terms-text">
                  <span>I have read and accept the Terms of</span>
                  <span>Service & Privacy Policy *</span>
                </Box>
              </Box>
              <Box>
                <button className="registration__button">Continue</button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
