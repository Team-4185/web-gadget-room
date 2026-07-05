export const isDemoFallbackEnabled = () =>
  import.meta.env.DEV || import.meta.env.VITE_USE_TESTING_FALLBACK === 'true';

export const isForcedTestingFallback = () => import.meta.env.VITE_USE_TESTING_FALLBACK === 'true';
