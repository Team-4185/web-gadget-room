import { isAxiosError } from 'axios';

export const toErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ detail?: string }>(error)) {
    return error.response?.data?.detail ?? error.message ?? fallback;
  }

  if (error instanceof Error) return error.message;
  return fallback;
};
