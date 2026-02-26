import type { FC } from 'react';
import { Typography } from '@mui/material';

import { Button } from '@/components';

import './NotFoundContent.css';

type Props = {
  onBackHome: () => void;
};

export const NotFoundContent: FC<Props> = ({ onBackHome }) => {
  return (
    <div className="not-found-content">
      <div className="not-found-content__info">
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
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
            fontWeight: 700,
          }}
        >
          Our robots messed up something
        </Typography>

        <Typography variant="body1" component="p" sx={{ fontWeight: 700 }}>
          It looks like the page got lost among the gadgets.
        </Typography>

        <Button
          onClick={onBackHome}
          maxWidth="190px"
          height="56px"
          fontWeight={500}
          borderRadius="30px"
          textTransform="uppercase"
          sx={{
            marginTop: '10px',
          }}
        >
          Back Home
        </Button>
      </div>

      <div className="not-found-content__image" aria-hidden="true">
        <img
          className="not-found-content__image-placeholder"
          src="/pageNotFoundRobots.png"
          alt="404 Illustration"
        />
      </div>
    </div>
  );
};
