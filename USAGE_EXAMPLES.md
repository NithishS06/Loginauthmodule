# Usage Examples - Login Authentication Module

## 🎯 Basic Usage

### Minimal Setup
```tsx
import LoginAuthModule from '../index';

function App() {
  return (
    <LoginAuthModule
      appName="My Company"
      appTagline="Dashboard"
      theme="light"
      onLoginSuccess={(result) => {
        console.log('Logged in:', result.user);
      }}
      onLogout={() => {
        console.log('Logged out');
      }}
    />
  );
}
```

## 🎨 With Theme Toggle

```tsx
import { useState } from 'react';
import LoginAuthModule from '../index';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      
      <LoginAuthModule
        appName="Acme Corp"
        appTagline="Admin Portal"
        theme={theme}
        onLoginSuccess={(result) => console.log(result)}
        onLogout={() => console.log('Logged out')}
      />
    </div>
  );
}
```

## 🔐 With Token Storage

```tsx
import { useState } from 'react';
import LoginAuthModule from '../index';
import type { LoginSuccessResult } from '../types';

function App() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  const handleLoginSuccess = (result: LoginSuccessResult) => {
    // Store token in localStorage
    localStorage.setItem('authToken', result.token);
    localStorage.setItem('user', JSON.stringify(result.user));
    
    // Update state
    setAuthToken(result.token);
    
    // Navigate to dashboard
    window.location.href = '/dashboard';
  };

  const handleLogout = () => {
    // Clear storage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Clear state
    setAuthToken(null);
  };

  return (
    <LoginAuthModule
      appName="Your App"
      appTagline="Welcome"
      theme="light"
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    />
  );
}
```

## 🚀 With React Router

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import LoginAuthModule from '../index';
import type { LoginSuccessResult } from '../types';

function LoginScreen() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleLoginSuccess = (result: LoginSuccessResult) => {
    // Store auth data
    sessionStorage.setItem('authToken', result.token);
    sessionStorage.setItem('user', JSON.stringify(result.user));
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

  return (
    <LoginAuthModule
      appName="Enterprise Suite"
      appTagline="Admin Console"
      theme={theme}
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    />
  );
}
```

## 🌐 With API Integration

```tsx
import { useState } from 'react';
import LoginAuthModule from '../index';
import type { LoginSuccessResult } from '../types';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleLoginSuccess = async (result: LoginSuccessResult) => {
    try {
      // Send token to your backend for verification
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': result.token,
        },
        body: JSON.stringify({ user: result.user }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Session created:', data);
        
        // Redirect or update UI
        window.location.href = '/dashboard';
      } else {
        console.error('Verification failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <LoginAuthModule
      appName="Platform"
      appTagline="Control Center"
      theme={theme}
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    />
  );
}
```

## 🎭 With Context Provider

```tsx
import { createContext, useContext, useState, ReactNode } from 'react';
import LoginAuthModule from '../index';
import type { LoginSuccessResult, User } from '../types';

// Create Auth Context
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (result: LoginSuccessResult) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (result: LoginSuccessResult) => {
    setUser(result.user);
    setToken(result.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuthContext must be used within AuthProvider');
  return context;
}

// App Component
function App() {
  return (
    <AuthProvider>
      <LoginScreen />
    </AuthProvider>
  );
}

function LoginScreen() {
  const { login, logout } = useAuthContext();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <LoginAuthModule
      appName="App Name"
      appTagline="Tagline"
      theme={theme}
      onLoginSuccess={login}
      onLogout={logout}
    />
  );
}
```

## 🔔 With Notifications

```tsx
import { useState } from 'react';
import { toast } from 'sonner';
import LoginAuthModule from '../index';
import type { LoginSuccessResult } from '../types';

function App() {
  const handleLoginSuccess = (result: LoginSuccessResult) => {
    toast.success(`Welcome back, ${result.user.name}!`, {
      description: `Logged in as ${result.user.role}`,
      duration: 3000,
    });

    // Store and redirect
    sessionStorage.setItem('authToken', result.token);
    setTimeout(() => {
      window.location.href = '/dashboard';
    }, 1000);
  };

  const handleLogout = () => {
    toast.info('You have been logged out', {
      description: 'See you next time!',
    });

    sessionStorage.clear();
  };

  return (
    <LoginAuthModule
      appName="My Platform"
      appTagline="Welcome Back"
      theme="light"
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    />
  );
}
```

## 🎨 Custom Styling Override

```tsx
import { useState, useEffect } from 'react';
import LoginAuthModule from '../index';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Override specific colors
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.style.setProperty('--auth-accent', '#FF6B6B');
      document.documentElement.style.setProperty('--auth-btn-bg', '#4ECDC4');
    } else {
      document.documentElement.style.setProperty('--auth-accent', '#FFE66D');
      document.documentElement.style.setProperty('--auth-btn-bg', '#95E1D3');
    }
  }, [theme]);

  return (
    <LoginAuthModule
      appName="Custom Theme App"
      appTagline="Your Way"
      theme={theme}
      onLoginSuccess={(result) => console.log(result)}
      onLogout={() => console.log('Logged out')}
    />
  );
}
```

## 🕒 With Session Timeout

```tsx
import { useState, useEffect, useRef } from 'react';
import LoginAuthModule from '../index';
import type { LoginSuccessResult } from '../types';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleLogout();
      alert('Session expired. Please log in again.');
    }, SESSION_TIMEOUT);
  };

  const handleLoginSuccess = (result: LoginSuccessResult) => {
    setIsAuthenticated(true);
    sessionStorage.setItem('authToken', result.token);
    resetTimeout();

    // Reset timeout on user activity
    window.addEventListener('mousemove', resetTimeout);
    window.addEventListener('keypress', resetTimeout);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.clear();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    window.removeEventListener('mousemove', resetTimeout);
    window.removeEventListener('keypress', resetTimeout);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <LoginAuthModule
      appName="Secure App"
      appTagline="Protected Access"
      theme="dark"
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    />
  );
}
```

## 🌍 Multi-Environment Setup

```tsx
import { useState } from 'react';
import LoginAuthModule from '../index';
import type { LoginSuccessResult } from '../types';

// Environment-based configuration
const ENV = import.meta.env.MODE; // 'development' | 'staging' | 'production'

const CONFIG = {
  development: {
    appName: 'DevApp',
    appTagline: 'Development Environment',
    apiUrl: 'http://localhost:3000',
  },
  staging: {
    appName: 'StagingApp',
    appTagline: 'Staging Environment',
    apiUrl: 'https://staging.example.com',
  },
  production: {
    appName: 'MyApp',
    appTagline: 'Production',
    apiUrl: 'https://api.example.com',
  },
};

function App() {
  const config = CONFIG[ENV as keyof typeof CONFIG];

  const handleLoginSuccess = async (result: LoginSuccessResult) => {
    try {
      const response = await fetch(`${config.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result),
      });

      if (response.ok) {
        console.log('Login successful in', ENV);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <LoginAuthModule
      appName={config.appName}
      appTagline={config.appTagline}
      theme="light"
      onLoginSuccess={handleLoginSuccess}
      onLogout={() => console.log('Logged out')}
    />
  );
}
```

## 📱 With Responsive Theme (System Preference)

```tsx
import { useState, useEffect } from 'react';
import LoginAuthModule from '../index';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Detect system theme preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(mediaQuery.matches ? 'dark' : 'light');

    const handler = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <LoginAuthModule
      appName="Adaptive App"
      appTagline="Auto Theme"
      theme={theme}
      onLoginSuccess={(result) => console.log(result)}
      onLogout={() => console.log('Logged out')}
    />
  );
}
```

---

## 🎓 Tips & Best Practices

### ✅ DO
- Store tokens securely (HttpOnly cookies in production)
- Validate user input on both client and server
- Use HTTPS in production
- Implement proper error handling
- Add loading states for better UX
- Clear sensitive data on logout

### ❌ DON'T
- Store tokens in localStorage for sensitive apps
- Skip server-side validation
- Hardcode credentials (use environment variables)
- Ignore accessibility
- Skip error handling
- Keep tokens indefinitely

---

**Ready to integrate? Pick an example and customize it for your needs!**
