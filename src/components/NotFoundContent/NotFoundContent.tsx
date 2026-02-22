import type { FC } from 'react';
import { Typography } from '@mui/material';

import { Button } from '@/components';

import './NotFoundContent.css';

type Props = {
  onBackHome: () => void;
};

export const NotFoundContent: FC<Props> = ({ onBackHome }) => {
  return (
    <section className="not-found-content">
      <div className="not-found-content__info">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--blue-violet)',
          }}
        >
          Oops!
        </Typography>

        <Typography
          variant="h6"
          component="p"
          sx={{
            fontSize: '26px',
            lineHeight: 1.23,
            fontWeight: 700,
          }}
        >
          Our robots messed up something ??
        </Typography>

        <Typography
          variant="body1"
          component="p"
          sx={{ margin: 0, lineHeight: 1.4, fontWeight: 600, color: '#3b3a3a' }}
        >
          It looks like the page got lost among the gadgets.
        </Typography>

        <Button
          onClick={onBackHome}
          maxWidth="190px"
          height="56px"
          fontWeight={500}
          borderRadius="30px"
          border="none"
          sx={{
            marginTop: '10px',
            background: 'var(--blue-violet)',
            color: 'var(--white)',
            boxShadow: '0 1px 4px 0 var(--blue-violet)',
            '&:hover': {
              background: 'var(--blue-violet)',
              color: 'var(--white)',
            },
          }}
        >
          BACK HOME
        </Button>
      </div>

      <div className="not-found-content__image" aria-hidden="true">
        <div className="not-found-content__image-placeholder">404 Illustration</div>
      </div>
    </section>
  );
};
