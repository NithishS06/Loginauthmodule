import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import LoginAuthModule from "../index.tsx";
import type { LoginSuccessResult } from "../types";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [loginResult, setLoginResult] = useState<LoginSuccessResult | null>(null);

  const handleLoginSuccess = (result: LoginSuccessResult) => {
    console.log("Login successful:", result);
    setLoginResult(result);
  };

  const handleLogout = () => {
    console.log("User logged out");
    setLoginResult(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="relative w-full h-screen">
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium text-sm"
        style={{
          background: theme === "light" ? "#FFFFFF" : "#16162A",
          color: theme === "light" ? "#1A1A2E" : "#F0EDE8",
          border: theme === "light" ? "1px solid #DDD8D0" : "1px solid #2E2E4A",
        }}
      >
        {theme === "light" ? (
          <>
            <Moon size={16} />
            <span>Dark Mode</span>
          </>
        ) : (
          <>
            <Sun size={16} />
            <span>Light Mode</span>
          </>
        )}
      </button>

      {/* Login Auth Module */}
      <LoginAuthModule
        appName="Acme Corp"
        appTagline="Admin Portal"
        theme={theme}
        onLoginSuccess={handleLoginSuccess}
        onLogout={handleLogout}
      />

      {/* Optional: Debug Info (remove in production) */}
      {loginResult && (
        <div
          className="fixed bottom-6 right-6 z-50 p-4 rounded-lg shadow-lg text-xs max-w-md"
          style={{
            background: theme === "light" ? "#FFFFFF" : "#16162A",
            color: theme === "light" ? "#1A1A2E" : "#F0EDE8",
            border: theme === "light" ? "1px solid #DDD8D0" : "1px solid #2E2E4A",
          }}
        >
          <p className="font-bold mb-2">Console Output:</p>
          <pre className="text-xs overflow-auto" style={{ maxHeight: "200px" }}>
            {JSON.stringify(loginResult, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}