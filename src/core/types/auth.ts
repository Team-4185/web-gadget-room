export type AuthRequestLogin = { email: string; password: string };

export type AuthRequestRegister = {
  email: string;
  password: string;
  passwordConfirmation: string;
};

export type AuthRequestRefresh = { refreshToken: string };

export type AuthResponse = {
  userId: number;
  email: string;
  accessToken: string;
  refreshToken: string;
};
