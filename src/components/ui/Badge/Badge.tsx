import type { FC, PropsWithChildren } from 'react';
import { Badge as BadgeMUI } from '@mui/material';

import type { BadgeType } from '@/core/types';

const badgeColorMap: Record<BadgeType, string> = {
  New: 'var(--lime-green)',
  Hit: 'var(--amber)',
  Sale: 'var(--coralRed)',
};

export const Badge: FC<PropsWithChildren<{ text: BadgeType }>> = ({ children, text }) => {
  return (
    <BadgeMUI
      sx={{
        display: 'block',

        '& .MuiBadge-badge': {
          width: '50px',
          height: '25px',
          background: `${badgeColorMap[text]}`,
          borderRadius: '6px',
          padding: '0',
          fontWeight: 500,
          fontSize: '15px',
          color: 'var(--white)',
          top: 28.5,
          left: 41,
        },
      }}
      badgeContent={text}
      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      {children}
    </BadgeMUI>
  );
};
