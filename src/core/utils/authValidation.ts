import { isEmail, isLength, isStrongPassword } from 'validator';

export const pwdRules = {
  minLength: 8,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

export const getLoginIssues = (form: { email: string; password: string }) => {
  const issues: string[] = [];
  if (!isEmail(form.email)) issues.push('Enter a valid email address');
  if (!isLength(form.password, { min: 8 })) issues.push('Min 8 characters');
  return issues;
};

export const getRegisterIssues = (form: {
  email: string;
  password: string;
  passwordConfirmation: string;
  accept: boolean;
}) => {
  const issues: string[] = [];
  if (!isEmail(form.email)) issues.push('Enter a valid email address');
  if (!isStrongPassword(form.password, pwdRules))
    issues.push('Min 8 chars, 1 lower, 1 upper, 1 number, 1 symbol');
  if (form.password !== form.passwordConfirmation) issues.push('Passwords do not match');
  if (!form.accept) issues.push('Accept Terms to continue');
  return issues;
};
