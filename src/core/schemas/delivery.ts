import * as z from 'zod';

import { isValidPhoneNumber } from '@/core/utils/phoneFormat';

const namePattern = /^[\p{L}]+(?:[ '-][\p{L}]+)*$/u;
const regionPattern = /^[\p{L}\s'-]{2,50}$/u;
const streetPattern = /^[\p{L}0-9.\s',/-]{2,100}$/u;
const houseNumberPattern = /^[0-9]{1,5}(?:[\p{L}]|[/-][\p{L}0-9]{1,3})?$/u;
const apartmentNumberPattern = /^[0-9]{1,5}[\p{L}]?$/u;
const zipCodePattern = /^[0-9a-zA-Z\s-]{3,10}$/;

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
    phone: z.string().trim().refine(isValidPhoneNumber, {
      error: 'Phone number must be in the format +380 (50) 555-55-55',
    }),
    region: z.string().trim().min(1, { error: 'Please select a region' }),
  }),
  delivery: z.object({
    courierAddress: z.object({
      city: z.string().trim().regex(regionPattern, {
        error:
          'City must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes',
      }),
      street: z.string().trim().regex(streetPattern, {
        error:
          'Street must be 2-100 characters and contain only letters, numbers, spaces, dot, comma, apostrophe, slash, or hyphen',
      }),
      houseNumber: z.string().trim().regex(houseNumberPattern, {
        error: "Use house format like '10', '10A', '10/2', or '12-B'",
      }),
      apartmentNumber: z
        .string()
        .trim()
        .refine((value) => !value || apartmentNumberPattern.test(value), {
          error: 'Apartment must be 1-5 digits, optionally followed by a letter',
        })
        .optional(),
      country: z.string().trim().regex(regionPattern, {
        error:
          'Country must be 2-50 characters and contain only letters, spaces, hyphens, or apostrophes',
      }),
      zipCode: z.string().trim().regex(zipCodePattern, {
        error: 'ZIP code must be 3-10 alphanumeric characters, spaces, or hyphens',
      }),
    }),
  }),
});
