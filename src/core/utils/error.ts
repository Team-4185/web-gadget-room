import { isAxiosError } from 'axios';

type ValidationErrorResponse = {
  detail?: string;
  message?: string;
  error?: string;
  title?: string;
  validationDetails?: {
    validationProblems?: string[];
  };
};

const getBackendErrorMessage = (data?: ValidationErrorResponse) => {
  if (!data) return undefined;

  const validationMessage = data.validationDetails?.validationProblems?.[0];
  return data.detail ?? data.message ?? data.error ?? validationMessage ?? data.title;
};

export const toErrorMessage = (error: unknown, fallback: string) => {
  if (isAxiosError<ValidationErrorResponse>(error)) {
    return getBackendErrorMessage(error.response?.data) ?? error.message ?? fallback;
  }

  if (error instanceof Error) return error.message;
  return fallback;
};

export const toValidationMessages = (error: unknown): string[] => {
  if (!isAxiosError<ValidationErrorResponse>(error)) return [];

  return error.response?.data?.validationDetails?.validationProblems ?? [];
};
