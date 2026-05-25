import * as z from 'zod';

const namePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

const profileNameSchema = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(3, { error: `${fieldName} must be between 3 and 255 characters` })
    .max(255, { error: `${fieldName} must be between 3 and 255 characters` })
    .regex(namePattern, {
      error: `${fieldName} may contain one or more words with letters, spaces, hyphens, or apostrophes`,
    });

export const userProfileSchema = z.object({
  firstName: profileNameSchema('First name'),
  lastName: profileNameSchema('Last name'),
  city: profileNameSchema('City'),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\+380\d{9}$/, { error: 'Phone number must be in the format +380XXXXXXXXX' }),
});

export type UserProfileFormValues = z.infer<typeof userProfileSchema>;
