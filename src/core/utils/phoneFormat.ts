const UKRAINE_COUNTRY_CODE = '380';
const LOCAL_PHONE_LENGTH = 9;

const getLocalPhoneDigits = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (digits.startsWith(UKRAINE_COUNTRY_CODE)) {
    return digits.slice(
      UKRAINE_COUNTRY_CODE.length,
      UKRAINE_COUNTRY_CODE.length + LOCAL_PHONE_LENGTH
    );
  }

  if (digits.startsWith('0')) {
    return digits.slice(1, LOCAL_PHONE_LENGTH + 1);
  }

  return digits.slice(0, LOCAL_PHONE_LENGTH);
};

export const normalizePhoneNumber = (value: string) => {
  const localDigits = getLocalPhoneDigits(value);

  return localDigits ? `+${UKRAINE_COUNTRY_CODE}${localDigits}` : '';
};

export const formatPhoneNumber = (value: string) => {
  const localDigits = getLocalPhoneDigits(value);

  if (!localDigits) return '';

  const operator = localDigits.slice(0, 2);
  const firstGroup = localDigits.slice(2, 5);
  const secondGroup = localDigits.slice(5, 7);
  const thirdGroup = localDigits.slice(7, 9);
  let formatted = `+${UKRAINE_COUNTRY_CODE}`;

  if (operator) {
    formatted += ` (${operator}`;
  }

  if (operator.length === 2) {
    formatted += ')';
  }

  if (firstGroup) {
    formatted += ` ${firstGroup}`;
  }

  if (secondGroup) {
    formatted += `-${secondGroup}`;
  }

  if (thirdGroup) {
    formatted += `-${thirdGroup}`;
  }

  return formatted;
};

export const isValidPhoneNumber = (value: string) =>
  /^\+380\d{9}$/.test(normalizePhoneNumber(value));
