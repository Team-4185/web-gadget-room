import { Box } from '@mui/material';

import { LoginForm } from '../LoginForm/LoginForm';
import { LoginActions } from '../LoginActions/LoginActions';

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
