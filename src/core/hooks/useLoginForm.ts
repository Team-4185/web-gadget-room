// import { useMemo, useState } from 'react';
// import { isEmail, isLength } from 'validator';

// import { getLoginIssues } from '@/core/utils';

// export const useLoginForm = () => {
//   const [loginForm, setLoginForm] = useState({ email: '', password: '' });
//   const [loginErrors, setLoginErrors] = useState<{ email?: string; password?: string }>({});

//   const loginIssues = useMemo(() => getLoginIssues(loginForm), [loginForm]);

//   const validateLogin = () => {
//     const errs: typeof loginErrors = {};
//     if (!isEmail(loginForm.email)) errs.email = 'Enter a valid email address';
//     if (!isLength(loginForm.password, { min: 8 })) errs.password = 'Min 8 characters';
//     setLoginErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   return {
//     loginForm,
//     setLoginForm,
//     loginErrors,
//     setLoginErrors,
//     loginIssues,
//     validateLogin,
//   };
// };
