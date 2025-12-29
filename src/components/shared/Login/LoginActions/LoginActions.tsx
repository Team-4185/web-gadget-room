import { Box } from '@mui/material';

export const LoginActions = () => {
  return (
    <Box className="login-bottom">
      <Box className="login-bottom-top">
        <Box className="login-remember">
          <input type="checkbox" id="remember" />
          <span>Remember</span>
        </Box>

        <button className="login-forgot" type="button">
          Forgot Password?
        </button>
      </Box>

      <button className="login-submit" type="button">
        Continue
      </button>
    </Box>
  );
};
