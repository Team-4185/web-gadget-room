import { isAxiosError } from 'axios';

type ValidationErrorResponse = {
  detail?: string;
  validationDetails?: {
    validationProblems?: string[];
  };
};

export const toErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<{ detail?: string }>(error)) {
    return error.response?.data?.detail ?? error.message ?? fallback;
  }

  if (error instanceof Error) return error.message;
  return fallback;
};

export const toValidationMessages = (error: unknown): string[] => {
  if (!isAxiosError<ValidationErrorResponse>(error)) return [];

  return error.response?.data?.validationDetails?.validationProblems ?? [];
};
