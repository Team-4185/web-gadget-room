import { Box, TextField } from '@mui/material';

export const LoginForm = () => {
  return (
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
  );
};
