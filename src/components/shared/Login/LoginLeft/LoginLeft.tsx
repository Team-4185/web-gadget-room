import { Box } from '@mui/material';

import ArrowRight from '/icons/ArrowRight.svg';

export const LoginLeft = () => {
  return (
    <Box className="login-left">
      <Box className="login-left-text">
        <span>Welcome back</span>
        <span>Please login to continue</span>
      </Box>
      <img src={ArrowRight} alt="Arrow Rigth" className="login-left-arrow" />
    </Box>
  );
};
