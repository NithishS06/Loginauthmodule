// TypeScript interfaces for Login Authentication Module

export interface LoginAuthModuleProps {
  appName: string;
  appTagline: string;
  theme: "light" | "dark";
  onLoginSuccess: (result: LoginSuccessResult) => void;
  onLogout: () => void;
}

export interface LoginSuccessResult {
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  role: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenPayload {
  sub: string;
  name: string;
  role: string;
  iat: number;
}

export type Screen = "login" | "forgot-password" | "success";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}
