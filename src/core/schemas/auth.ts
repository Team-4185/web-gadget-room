import * as z from 'zod';

const passwordSchema = z
  .string()
  .min(8, { error: 'Please enter valid data' })
  .max(50, { error: 'Please enter valid data' })
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/, {
    error: 'Please enter valid data',
  });

const emailSchema = z
  .email({ error: 'Please enter valid email address' })
  .min(10, { error: 'Please enter valid data' })
  .max(100, { error: 'Please enter valid data' });

const authBaseSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  ...authBaseSchema.shape,
  rememberMe: z.boolean().optional(),
});

export const registerSchema = z
  .object({
    ...authBaseSchema.shape,
    passwordConfirmation: passwordSchema,
    terms: z.boolean().refine((val) => val, {
      error: 'You must accept the Terms of Service.',
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    error: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type FormRegisterValues = z.infer<typeof registerSchema>;
export type FormLoginValues = z.infer<typeof loginSchema>;
export type FormForgotPassword = z.infer<typeof forgotPasswordSchema>;
