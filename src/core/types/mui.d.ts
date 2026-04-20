import '@mui/material/styles';
import '@mui/material/Typography';
import type { TypographyStyleOptions } from '@mui/material/styles/createTypography';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    aboutHeading: TypographyStyleOptions;
    aboutSectionHeading: TypographyStyleOptions;
  }

  interface TypographyVariantsOptions {
    aboutHeading?: TypographyStyleOptions;
    aboutSectionHeading?: TypographyStyleOptions;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    aboutHeading: true;
    aboutSectionHeading: true;
  }
}
