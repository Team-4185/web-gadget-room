import { Button as MuiButton } from '@mui/material';
import type { ButtonProps } from '@mui/material';

interface IProps extends ButtonProps {
  maxWidth: string;
  height: string;
  fontSize?: string;
  fontWeight?: number;
  textTransform?: string;
  borderRadius?: string;
  border?: string;
}

export const Button = ({
  children,
  maxWidth,
  height,
  fontSize = '16px',
  fontWeight = 600,
  textTransform = 'none',
  borderRadius = '8px',
  border = '1px solid var(--blue-violet)',
  sx,
  ...props
}: IProps) => {
  return (
    <MuiButton
      {...props}
      sx={{
        maxWidth,
        height,
        fontSize,
        fontWeight,
        textTransform,
        borderRadius,
        border,
        width: '100%',
        boxShadow: '0px 0px 7px 0px var(--blue-violet)',
        background: 'var(--white)',
        lineHeight: 'normal',
        color: 'var(--black)',
        transition: 'all 0.7s ease',
        '&:hover': {
          background: 'var(--blue-violet)',
          color: 'var(--white)',
        },
        '&.Mui-disabled': {
          border: 'none',
          boxShadow: '0px 1px 4px 0px var(--light-gray)',
          background: 'var(--light-gray)',
          color: 'var(--white)',
        },
        '&:has(.MuiButton-endIcon)': {
          justifyContent: 'space-between',
        },
        '&:has(.MuiButton-startIcon)': {
          gap: '10px',
        },
        ...sx,
      }}
    >
      {children}
    </MuiButton>
  );
};
