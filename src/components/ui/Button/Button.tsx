import type { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  width?: number | string;
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, style, ...props }) => {
  return (
    <button
      {...props}
      style={{
        borderRadius: '6px',
        padding: '16px 56px',
        fontWeight: '500',
        fontSize: '16px',
        cursor: 'pointer',
        fontFamily: 'Montserrat, sans-serif',
        textAlign: 'center',
        ...style,
      }}
    >
      {children}
    </button>
  );
};
