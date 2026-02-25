// import { useMemo, useState } from 'react';
// import { isEmail, isStrongPassword } from 'validator';

// import { getRegisterIssues, pwdRules } from '@/core/utils';

// export const useRegisterForm = () => {
//   const [regForm, setRegForm] = useState({
//     email: '',
//     password: '',
//     passwordConfirmation: '',
//     accept: false,
//   });
//   const [regErrors, setRegErrors] = useState<{
//     email?: string;
//     password?: string;
//     passwordConfirmation?: string;
//     accept?: string;
//   }>({});

//   const regIssues = useMemo(() => getRegisterIssues(regForm), [regForm]);

//   const validateRegister = () => {
//     const errs: typeof regErrors = {};
//     if (!isEmail(regForm.email)) errs.email = 'Enter a valid email address';
//     if (!isStrongPassword(regForm.password, pwdRules))
//       errs.password = 'Min 8 chars, 1 lower, 1 upper, 1 number, 1 symbol';
//     if (regForm.password !== regForm.passwordConfirmation)
//       errs.passwordConfirmation = 'Passwords do not match';
//     if (!regForm.accept) errs.accept = 'Accept Terms to continue';
//     setRegErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   return {
//     regForm,
//     setRegForm,
//     regErrors,
//     setRegErrors,
//     regIssues,
//     validateRegister,
//   };
// };
