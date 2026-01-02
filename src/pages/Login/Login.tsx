import { Container, Box } from '@mui/material';

import { LoginLeft } from '../../components/shared/Login/LoginLeft/LoginLeft';
import { LoginRight } from '../../components/shared/Login/LoginRigth/LoginRigth';

import './Login.css';

export const Login = () => {
  return (
    <>
      <Container component="section" maxWidth="xl" disableGutters className="login-container">
        <Box className="login-main">
          <LoginLeft />
          <LoginRight />
        </Box>
      </Container>
    </>
  );
};
