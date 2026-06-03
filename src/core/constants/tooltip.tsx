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

export const PROFILE_NAME_TOOLTIP = (
  <div>
    <Typography variant="caption" component="div">
      - 3-255 chars
    </Typography>
    <Typography variant="caption" component="div">
      - Letters, spaces, hyphens, apostrophes
    </Typography>
    <Typography variant="caption" component="div">
      - One or more words
    </Typography>
  </div>
);

export const PROFILE_PHONE_TOOLTIP = (
  <div>
    <Typography variant="caption" component="div">
      - Format: +380 (50) 555-55-55
    </Typography>
    <Typography variant="caption" component="div">
      - Country code +380 is added automatically
    </Typography>
  </div>
);
