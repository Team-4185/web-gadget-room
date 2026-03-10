import { Typography } from '@mui/material';

export const EMAIL_TOOLTIP = (
  <div>
    <Typography variant="caption" component="div">
      • 10–100 chars
    </Typography>
    <Typography variant="caption" component="div">
      • 3+ chars before @ (letters, digits, ._%+-)
    </Typography>
    <Typography variant="caption" component="div">
      • 3+ chars domain (letters, digits, .-)
    </Typography>
    <Typography variant="caption" component="div">
      • 2+ chars TLD
    </Typography>
  </div>
);

export const PASSWORD_TOOLTIP = (
  <div>
    <Typography variant="caption" component="div">
      • 8–50 chars
    </Typography>
    <Typography variant="caption" component="div">
      • At least 1 lowercase letter
    </Typography>
    <Typography variant="caption" component="div">
      • At least 1 uppercase letter
    </Typography>
    <Typography variant="caption" component="div">
      • At least 1 digit
    </Typography>
    <Typography variant="caption" component="div">
      • At least 1 special char (!@#$%^&*)
    </Typography>
    <Typography variant="caption" component="div">
      • Only letters, digits, !@#$%^&* allowed
    </Typography>
  </div>
);
