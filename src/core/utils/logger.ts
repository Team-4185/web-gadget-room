type LogContext = Record<string, unknown>;

export const logger = {
  error(message: string, error?: unknown, context?: LogContext) {
    if (!import.meta.env.DEV) return;

    console.error(message, error, context ?? '');
  },
  warn(message: string, context?: LogContext) {
    if (!import.meta.env.DEV) return;

    console.warn(message, context ?? '');
  },
};
