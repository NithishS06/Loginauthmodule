/**
 * useAuth — Authentication Hook
 * Handles login validation, JWT token generation,
 * logout, loading states and error states.
 * Demo credentials: admin@company.com / Admin@123
 */

import { useState } from "react";
import type { LoginCredentials, AuthState, User, TokenPayload } from "../types";

// Valid demo credentials
const DEMO_EMAIL = "admin@company.com";
const DEMO_PASSWORD = "Admin@123";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
    isLoading: false,
    error: null,
  });

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Validate credentials
    if (
      credentials.email === DEMO_EMAIL &&
      credentials.password === DEMO_PASSWORD
    ) {
      // Generate mock JWT token
      const user: User = {
        name: "Alex Morgan",
        email: credentials.email,
        role: "Administrator",
      };

      const tokenPayload: TokenPayload = {
        sub: credentials.email,
        name: user.name,
        role: user.role,
        iat: Date.now(),
      };

      const token = `Bearer ${btoa(JSON.stringify(tokenPayload))}`;

      setAuthState({
        isAuthenticated: true,
        user,
        token,
        isLoading: false,
        error: null,
      });

      return true;
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: "Invalid credentials. Please check your email and password.",
      }));
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState((prev) => ({ ...prev, error: null }));
  };

  return {
    ...authState,
    login,
    logout,
    clearError,
  };
}