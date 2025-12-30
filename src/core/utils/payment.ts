export const onlyDigits = (value: string) => value.replace(/\D/g, '');

export const formatCardNumber = (value: string) => {
  const digits = onlyDigits(value).slice(0, 19); // до 19 цифр (AmEx/другие)
  return digits.replace(/(.{4})/g, '$1 ').trim();
};

export const formatCvv = (value: string) => onlyDigits(value).slice(0, 4);

export const isValidCvv = (cvv: string) => {
  const len = cvv.length;
  return len === 3 || len === 4;
};

export const isValidMonth = (month: string) => month.trim().length > 0;

export const isValidYear = (year: string) => year.trim().length > 0;

export const isValidName = (name: string) => name.trim().length >= 2;

export const isValidCardNumber = (cardNumber: string) => {
  const digits = onlyDigits(cardNumber);
  return digits.length >= 12 && digits.length <= 19;
};
