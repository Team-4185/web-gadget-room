import { type FC } from 'react';
import { Breadcrumbs, Link, Typography } from '@mui/material';
import { Link as RouterLink, useMatches } from 'react-router';

import { ChevronRight, Home } from '@/assets';
import type { IBreadcrumbMatch, ILoaderData } from '@/core/types';

export const BreadCrumbs: FC = () => {
  const matches = useMatches() as IBreadcrumbMatch<ILoaderData>[];

  const crumbs = matches
    .filter((match) => match.handle?.breadcrumb)
    .flatMap((match) => match.handle?.breadcrumb(match.loaderData));

  return (
    <Breadcrumbs separator={<ChevronRight color="var(--blue-violet)" />} aria-label="breadcrumb">
      {crumbs.map((crumb, idx) => {
        const isLastPage = idx === crumbs.length - 1;

        return !isLastPage ? (
          <Link
            key={crumb.id}
            component={RouterLink}
            to={crumb.path}
            sx={{
              display: 'flex',
              gap: '3px',
              alignItems: 'center',
            }}
          >
            {crumb.path === '/home' && <Home />}

            {crumb.label}
          </Link>
        ) : (
          <Typography
            sx={{
              color: 'var(--black)',
              fontWeight: 600,
            }}
          >
            {crumb.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};
