import * as z from 'zod';

const namePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;

const nameSchema = (fieldName: string) =>
  z
    .string()
    .trim()
    .min(3, { error: `${fieldName} must be between 3 and 255 characters` })
    .max(255, { error: `${fieldName} must be between 3 and 255 characters` })
    .regex(namePattern, {
      error: `${fieldName} may contain one or more words with letters, spaces, hyphens, or apostrophes`,
    });

export const deliveryCheckoutSchema = z.object({
  recipient: z.object({
    firstName: nameSchema('First name'),
    lastName: nameSchema('Last name'),
    email: z
      .string()
      .trim()
      .min(10, { error: 'Email must be between 10 and 100 characters' })
      .max(100, { error: 'Email must be between 10 and 100 characters' })
      .email({ error: 'Enter a valid email address' }),
    phone: z
      .string()
      .trim()
      .regex(/^\+380\d{9}$/, { error: 'Phone number must be in the format +380XXXXXXXXX' }),
    region: z.string().trim().min(1, { error: 'Please select a region' }),
  }),
  delivery: z.object({
    courierAddress: z.object({
      city: nameSchema('City'),
      street: z
        .string()
        .trim()
        .min(3, { error: 'Street must be between 3 and 255 characters' })
        .max(255, { error: 'Street must be between 3 and 255 characters' }),
      houseNumber: z
        .string()
        .trim()
        .min(1, { error: 'House number is required' })
        .max(20, { error: 'House number must be up to 20 characters' }),
      apartmentNumber: z
        .string()
        .trim()
        .max(20, { error: 'Apartment number must be up to 20 characters' })
        .optional(),
      country: nameSchema('Country'),
      zipCode: z
        .string()
        .trim()
        .regex(/^\d{5}$/, { error: 'ZIP code must contain 5 digits' }),
    }),
  }),
});
