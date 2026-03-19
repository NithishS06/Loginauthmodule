/**
 * SuccessScreen — Screen 3 of LoginAuthModule
 * Shown after successful JWT authentication.
 * Displays user info, token, and logout option.
 */

import { useEffect, useState } from "react";
import { CheckCircle, LogOut } from "lucide-react";
import { motion } from "motion/react";
import type { User } from "../types";

interface SuccessScreenProps {
  user: User;
  token: string;
  onLogout: () => void;
  theme: "light" | "dark";
}

export function SuccessScreen({ user, token, onLogout, theme }: SuccessScreenProps) {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Delay content reveal for animation
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Truncate token for display
  const displayToken = token.length > 50 ? `${token.substring(0, 50)}...` : token;

  return (
    <div className="auth-split-container" data-theme={theme}>
      {/* Left Panel - Dark Always */}
      <div className="auth-left-panel">
        <div className="auth-left-content">
          {/* Success Illustration SVG */}
          <div className="auth-illustration">
            <motion.svg
              width="200"
              height="200"
              viewBox="0 0 200 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Decorative circles */}
              <circle cx="100" cy="100" r="80" stroke="#2ECC71" strokeWidth="1" opacity="0.2" />
              <circle cx="100" cy="100" r="60" stroke="#2ECC71" strokeWidth="1" opacity="0.3" />
              
              {/* Shield with checkmark */}
              <motion.path
                d="M100 40 L140 55 L140 95 C140 115 125 130 100 140 C75 130 60 115 60 95 L60 55 L100 40Z"
                fill="#2ECC71"
                opacity="0.9"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              
              {/* Large checkmark */}
              <motion.path
                d="M80 100 L95 115 L120 80"
                stroke="#1A1A2E"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              />
            </motion.svg>
          </div>

          {/* Badge and Description */}
          <div className="auth-badge">Authenticated</div>
          <p className="auth-description">
            Your session is now active and secure
          </p>

          {/* Decorative Background Patterns */}
          <div className="auth-bg-pattern">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
            <div className="circle circle-3"></div>
          </div>
        </div>
      </div>

      {/* Right Panel - Success Content */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          {showContent && (
            <motion.div
              className="auth-success-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Success Icon */}
              <motion.div
                className="auth-success-checkmark"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              >
                <CheckCircle size={80} />
              </motion.div>

              {/* Heading */}
              <h1 className="auth-title" style={{ marginTop: "2rem" }}>
                Authentication Successful
              </h1>

              {/* JWT Badge */}
              <div className="auth-jwt-badge">
                JWT Token Issued ✓
              </div>

              {/* User Info */}
              <div className="auth-user-info">
                <p>
                  Logged in as <strong>{user.name}</strong>
                </p>
                <p className="auth-user-role">
                  Role: <span>{user.role}</span>
                </p>
              </div>

              {/* Token Display */}
              <div className="auth-token-display">
                <p className="auth-token-label">Active Token:</p>
                <code className="auth-token-code">
                  {displayToken} <span className="token-status">[JWT token active]</span>
                </code>
              </div>

              {/* Sign Out Button */}
              <button
                className="auth-button auth-logout-button"
                onClick={onLogout}
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}