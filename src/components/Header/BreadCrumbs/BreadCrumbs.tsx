import type { FC } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { ChevronRight, Home } from '@/assets';

export const BreadCrumbs: FC = () => {
  const handleClick = () => {
    console.log(1);
  };

  return (
    <Breadcrumbs separator={<ChevronRight color="var(--blue-violet)" />} aria-label="breadcrumb">
      <Link
        key="1"
        component={RouterLink}
        to="/"
        onClick={handleClick}
        sx={{
          display: 'flex',
          gap: '3px',
          alignItems: 'center',
        }}
      >
        <Home />
        Home
      </Link>

      <Link key="2" component={RouterLink} to="/" onClick={handleClick}>
        Test1
      </Link>

      <Typography
        sx={{
          color: 'var(--black)',
          fontWeight: 600,
        }}
      >
        Test2
      </Typography>
    </Breadcrumbs>
  );
};
