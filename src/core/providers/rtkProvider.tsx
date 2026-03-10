import type { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import { store } from '@/core/store';

export const RTKProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
