/**
 * ForgotPassword — Screen 2 of LoginAuthModule
 * Renders the password reset request form.
 * Navigates back to LoginPage on completion.
 */

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import type { LoginAuthModuleProps } from "../types";

interface ForgotPasswordProps {
  onNavigate: (screen: "login") => void;
  theme: LoginAuthModuleProps["theme"];
  appName: string;
  appTagline: string;
}

export function ForgotPassword({
  onNavigate,
  theme,
  appName,
  appTagline,
}: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
    setIsSuccess(true);
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
              
              {/* Email envelope */}
              <rect x="60" y="75" width="80" height="50" rx="4" fill="#E8B86D" opacity="0.9" />
              <path
                d="M60 75 L100 105 L140 75"
                stroke="#1A1A2E"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Lock overlay */}
              <circle cx="130" cy="110" r="18" fill="#1A1A2E" />
              <rect x="123" y="107" width="14" height="12" rx="1" fill="#E8B86D" />
              <path
                d="M126 107 L126 103 C126 100 134 100 134 103 L134 107"
                stroke="#E8B86D"
                strokeWidth="2"
                fill="none"
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
          {!isSuccess ? (
            <>
              {/* Back Button */}
              <button
                className="auth-back-button"
                onClick={() => onNavigate("login")}
              >
                <ArrowLeft size={16} />
                <span>Back to Sign In</span>
              </button>

              {/* Heading */}
              <div className="auth-welcome" style={{ marginTop: "2rem" }}>
                <h1 className="auth-title">Reset Password</h1>
                <p className="auth-subtitle">
                  Enter your email and we'll send you a secure reset link.
                </p>
              </div>

              {/* Reset Form */}
              <form onSubmit={handleSubmit} className="auth-form">
                {/* Email Field */}
                <div className="auth-field">
                  <label htmlFor="reset-email" className="auth-label">
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="reset-email"
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

                {/* Submit Button */}
                <button type="submit" className="auth-button" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="auth-spinner"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="auth-success-state">
                <div className="auth-success-icon">
                  <CheckCircle size={64} />
                </div>
                <h1 className="auth-title">Reset link sent!</h1>
                <p className="auth-subtitle">
                  Check your inbox at <strong>{email}</strong>
                </p>

                <button
                  className="auth-button"
                  onClick={() => onNavigate("login")}
                  style={{ marginTop: "2rem" }}
                >
                  <ArrowLeft size={18} />
                  <span>Back to Sign In</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}