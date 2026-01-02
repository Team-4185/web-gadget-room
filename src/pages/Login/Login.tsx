import { Container, Box } from '@mui/material';

import { Header } from '../../components/shared/Header';
import { LoginLeft } from '../../components/shared/Login/LoginLeft/LoginLeft';
import { LoginRight } from '../../components/shared/Login/LoginRigth/LoginRigth';

import './Login.css';

export const Login = () => {
  return (
    <>
      <Header page="Login" product="" orderLength={0} />

      <Container component="section" maxWidth="xl" disableGutters className="login-container">
        <Box className="login-main">
          <LoginLeft />
          <LoginRight />
        </Box>
      </Container>
    </>
  );
};
