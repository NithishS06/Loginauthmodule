/**
 * LoginAuthModule — Reusable Authentication Module
 * Version: 1.0.0
 * 
 * Usage:
 * import LoginAuthModule from './login-auth-module';
 * 
 * <LoginAuthModule
 *   appName="Your App Name"
 *   appTagline="Your App Tagline"
 *   theme="light" | "dark"
 *   onLoginSuccess={(result) => console.log(result.user, result.token)}
 *   onLogout={() => console.log('logged out')}
 * />
 * 
 * Props:
 * - appName: string — Company or application name
 * - appTagline: string — Subtitle shown below company name
 * - theme: "light" | "dark" — Visual theme
 * - onLoginSuccess: (result: { user, token }) => void
 * - onLogout: () => void
 */

import { useState, useEffect } from "react";
import { LoginPage } from "./components/LoginPage";
import { ForgotPassword } from "./components/ForgotPassword";
import { SuccessScreen } from "./components/SuccessScreen";
import { useAuth } from "./hooks/useAuth";
import type { LoginAuthModuleProps, Screen } from "./types";
import "./styles/auth.css";

export default function LoginAuthModule({
  appName,
  appTagline,
  theme,
  onLoginSuccess,
  onLogout,
}: LoginAuthModuleProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("login");
  const auth = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const success = await auth.login({ email, password });
    if (success && auth.user && auth.token) {
      onLoginSuccess({ user: auth.user, token: auth.token });
      setCurrentScreen("success");
    }
  };

  const handleLogout = () => {
    auth.logout();
    setCurrentScreen("login");
    onLogout();
  };

  const handleNavigate = (screen: Screen) => {
    auth.clearError();
    setCurrentScreen(screen);
  };

  // Update CSS variables based on theme
  useEffect(() => {
    const root = document.documentElement;
    
    if (theme === "light") {
      root.style.setProperty("--auth-bg", "#F5F3EF");
      root.style.setProperty("--auth-panel-bg", "#FFFFFF");
      root.style.setProperty("--auth-left-bg", "#1A1A2E");
      root.style.setProperty("--auth-accent", "#E8B86D");
      root.style.setProperty("--auth-text", "#1A1A2E");
      root.style.setProperty("--auth-text-muted", "#7A7A8C");
      root.style.setProperty("--auth-input-bg", "#F5F3EF");
      root.style.setProperty("--auth-input-border", "#DDD8D0");
      root.style.setProperty("--auth-btn-bg", "#1A1A2E");
      root.style.setProperty("--auth-btn-text", "#F5F3EF");
      root.style.setProperty("--auth-error", "#C0392B");
      root.style.setProperty("--auth-success", "#1A7A4A");
    } else {
      root.style.setProperty("--auth-bg", "#0D0D1A");
      root.style.setProperty("--auth-panel-bg", "#16162A");
      root.style.setProperty("--auth-left-bg", "#0A0A14");
      root.style.setProperty("--auth-accent", "#E8B86D");
      root.style.setProperty("--auth-text", "#F0EDE8");
      root.style.setProperty("--auth-text-muted", "#8A8AA0");
      root.style.setProperty("--auth-input-bg", "#1E1E32");
      root.style.setProperty("--auth-input-border", "#2E2E4A");
      root.style.setProperty("--auth-btn-bg", "#E8B86D");
      root.style.setProperty("--auth-btn-text", "#0D0D1A");
      root.style.setProperty("--auth-error", "#E74C3C");
      root.style.setProperty("--auth-success", "#2ECC71");
    }
  }, [theme]);

  return (
    <>
      {currentScreen === "login" && (
        <LoginPage
          onNavigate={handleNavigate}
          onLogin={handleLogin}
          error={auth.error}
          isLoading={auth.isLoading}
          theme={theme}
          appName={appName}
          appTagline={appTagline}
        />
      )}
      {currentScreen === "forgot-password" && (
        <ForgotPassword
          onNavigate={handleNavigate}
          theme={theme}
          appName={appName}
          appTagline={appTagline}
        />
      )}
      {currentScreen === "success" && auth.user && auth.token && (
        <SuccessScreen
          user={auth.user}
          token={auth.token}
          onLogout={handleLogout}
          theme={theme}
        />
      )}
    </>
  );
}

export type { LoginAuthModuleProps } from "./types";