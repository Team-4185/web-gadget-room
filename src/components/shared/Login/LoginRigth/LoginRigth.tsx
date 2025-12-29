import { Box } from '@mui/material';

import { LoginForm } from '../../../../pages/Login';
import { LoginActions } from '../../../../pages/Login';

export const LoginRight = () => {
  return (
    <Box className="login-right">
      <Box className="login-right-box">
        <span>Login</span>
        <LoginForm />
      </Box>

      <LoginActions />
    </Box>
  );
};
