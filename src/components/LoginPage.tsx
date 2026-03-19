/**
 * LoginPage — Screen 1 of LoginAuthModule
 * Renders the main login form with email, password,
 * validation, and navigation to ForgotPassword screen.
 */

import { useState } from "react";
import { Eye, EyeOff, Shield, ArrowRight, AlertCircle } from "lucide-react";
import type { LoginAuthModuleProps } from "../types";

interface LoginPageProps {
  onNavigate: (screen: "forgot-password") => void;
  onLogin: (email: string, password: string) => Promise<void>;
  error: string | null;
  isLoading: boolean;
  theme: LoginAuthModuleProps["theme"];
  appName: string;
  appTagline: string;
}

export function LoginPage({
  onNavigate,
  onLogin,
  error,
  isLoading,
  theme,
  appName,
  appTagline,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setEmailError("Email is required");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError("Password is required");
      return false;
    }
    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      await onLogin(email, password);
    }
  };

  return (
    <div className="auth-split-container" data-theme={theme}>
      {/* Left Panel - Dark Always */}
      <div className="auth-left-panel">
        <div className="auth-left-content">
          {/* Security Illustration SVG */}
          <div className="auth-illustration">
            <svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Decorative circles */}
              <circle cx="100" cy="100" r="80" stroke="#E8B86D" strokeWidth="1" opacity="0.2" />
              <circle cx="100" cy="100" r="60" stroke="#E8B86D" strokeWidth="1" opacity="0.3" />
              
              {/* Shield */}
              <path
                d="M100 40 L140 55 L140 95 C140 115 125 130 100 140 C75 130 60 115 60 95 L60 55 L100 40Z"
                fill="#E8B86D"
                opacity="0.9"
              />
              
              {/* Lock inside shield */}
              <rect x="90" y="85" width="20" height="25" rx="2" fill="#1A1A2E" />
              <path
                d="M95 85 L95 78 C95 72 105 72 105 78 L105 85"
                stroke="#1A1A2E"
                strokeWidth="3"
                fill="none"
              />
              
              {/* Checkmark */}
              <path
                d="M85 100 L93 108 L115 80"
                stroke="#1A1A2E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Badge and Description */}
          <div className="auth-badge">Secure Access</div>
          <p className="auth-description">
            Enterprise-grade security and encryption
          </p>

          {/* Decorative Background Patterns */}
          <div className="auth-bg-pattern">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Theme Dependent */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          {/* Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <Shield size={32} className="logo-icon" />
            </div>
            <h2 className="auth-app-name">{appName}</h2>
            <p className="auth-app-tagline">{appTagline}</p>
          </div>

          {/* Welcome Heading */}
          <div className="auth-welcome">
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to your account to continue</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="auth-error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Email Field */}
            <div className="auth-field">
              <label htmlFor="email" className="auth-label">
                EMAIL ADDRESS
              </label>
              <input
                id="email"
                type="email"
                className={`auth-input ${emailError ? "error" : ""}`}
                placeholder="admin@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) validateEmail(e.target.value);
                }}
                onBlur={() => validateEmail(email)}
                disabled={isLoading}
              />
              {emailError && <p className="auth-field-error">{emailError}</p>}
            </div>

            {/* Password Field */}
            <div className="auth-field">
              <label htmlFor="password" className="auth-label">
                PASSWORD
              </label>
              <div className="auth-password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className={`auth-input ${passwordError ? "error" : ""}`}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (passwordError) validatePassword(e.target.value);
                  }}
                  onBlur={() => validatePassword(password)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordError && <p className="auth-field-error">{passwordError}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="auth-forgot-wrapper">
              <button
                type="button"
                className="auth-forgot-link"
                onClick={() => onNavigate("forgot-password")}
                disabled={isLoading}
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button type="submit" className="auth-button" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="auth-spinner"></div>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Demo Hint */}
            <p className="auth-demo-hint">
              Demo: admin@company.com · Admin@123
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}