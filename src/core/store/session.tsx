// import { createContext, useContext, useMemo, useState, useEffect } from 'react';

// import { tokenStorage } from '@/core/utils';
// // import { http } from '@/core/config';

// type User = { userId: number; email: string } | null;
// type Session = {
//   user: User;
//   setAuth: (u: {
//     userId: number;
//     email: string;
//     accessToken: string;
//     refreshToken: string;
//   }) => void;
//   logout: () => void;
// };

// const SessionContext = createContext<Session | null>(null);

// export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User>(null);

//   useEffect(() => {
//     const saved = tokenStorage.get();
//     if (saved.accessToken && saved.refreshToken && saved.email && saved.userId !== null) {
//       http.setTokens({ accessToken: saved.accessToken, refreshToken: saved.refreshToken });
//       setUser({ userId: saved.userId!, email: saved.email! });
//     }
//   }, []);

//   const setAuth: Session['setAuth'] = ({ userId, email, accessToken, refreshToken }) => {
//     tokenStorage.set({ userId, email, accessToken, refreshToken });
//     http.setTokens({ accessToken, refreshToken });
//     setUser({ userId, email });
//   };

//   const logout = () => {
//     tokenStorage.clear();
//     http.clearTokens();
//     setUser(null);
//   };

//   const value = useMemo(() => ({ user, setAuth, logout }), [user]);

//   return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
// };

// export const useSession = () => {
//   const ctx = useContext(SessionContext);
//   if (!ctx) throw new Error('useSession must be used within SessionProvider');
//   return ctx;
// };
