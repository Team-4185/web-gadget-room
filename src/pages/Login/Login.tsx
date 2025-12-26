import { Container, Box, TextField } from '@mui/material';

import { Header } from '../../components/shared/Header';
import ArrowRight from '/icons/ArrowRight.svg';

import './Login.css';

export const Login = () => {
  return (
    <>
      <Header page="Login" product="" orderLength={0} />

      <Container component="section" maxWidth="xl" disableGutters className="login-container">
        <Box className="login-main">
          {/* Левая часть */}
          <Box className="login-left">
            <Box className="login-left-text">
              <span>Welcome back</span>
              <span>Please login to continue</span>
            </Box>
            <img src={ArrowRight} alt="" className="login-left-arrow" />
          </Box>

          {/* Правая часть */}
          <Box className="login-right">
            <Box className="login-right-box">
              <span>Login</span>
              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <TextField
                  id="emailAddressLogin"
                  label="Email Address"
                  variant="outlined"
                  className="login-textfield"
                />
                <TextField
                  id="passwordLogin"
                  label="Password"
                  type="password"
                  variant="outlined"
                  className="login-textfield"
                />
              </Box>
            </Box>

            <Box className="login-bottom">
              <Box className="login-bottom-top">
                <Box className="login-remember">
                  <input type="checkbox" id="remember" />
                  <span>Remember</span>
                </Box>
                <button className="login-forgot">Forgot Password?</button>
              </Box>

              <button className="login-submit">Continue</button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};
