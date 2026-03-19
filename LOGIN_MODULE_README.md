# Login Authentication Module

A professional, reusable React + TypeScript authentication module with a beautiful split-screen design, theme support, and complete authentication flow.

## 🎯 Features

- **Reusable Component**: Drop into any application by passing props
- **Theme Support**: Light and dark themes with smooth transitions
- **Complete Auth Flow**: Login, forgot password, and success screens
- **Form Validation**: Client-side validation with inline error messages
- **Loading States**: Elegant loading animations and feedback
- **JWT Token Generation**: Mock JWT token creation for demo purposes
- **Responsive Design**: Adapts beautifully to all screen sizes
- **Accessibility**: WCAG compliant with proper ARIA labels
- **Type Safe**: Full TypeScript support with comprehensive interfaces

## 📦 Installation

The module is already integrated into the project. All dependencies are included:
- React 18.3.1
- TypeScript
- Motion (for animations)
- Lucide React (for icons)

## 🚀 Quick Start

```tsx
import LoginAuthModule from '../index';
import type { LoginSuccessResult } from '../types';

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const handleLoginSuccess = (result: LoginSuccessResult) => {
    console.log('User logged in:', result.user);
    console.log('JWT Token:', result.token);
    // Store token, redirect user, etc.
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Clear session, redirect to login, etc.
  };

  return (
    <LoginAuthModule
      appName="Acme Corp"
      appTagline="Admin Portal"
      theme={theme}
      onLoginSuccess={handleLoginSuccess}
      onLogout={handleLogout}
    />
  );
}
```

## 📋 Props API

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `appName` | `string` | Yes | Company or application name (e.g., "Acme Corp") |
| `appTagline` | `string` | Yes | Subtitle or descriptor (e.g., "Admin Portal") |
| `theme` | `"light" \| "dark"` | Yes | Visual theme for the right panel |
| `onLoginSuccess` | `(result: LoginSuccessResult) => void` | Yes | Callback fired when login succeeds |
| `onLogout` | `() => void` | Yes | Callback fired when user logs out |

### Type Definitions

```typescript
interface LoginSuccessResult {
  user: User;
  token: string;
}

interface User {
  name: string;
  email: string;
  role: string;
}
```

## 🎨 Design System

### Layout
- **Split Screen**: 40% left panel (always dark) / 60% right panel (theme-dependent)
- **Left Panel**: Security illustration, badge, description, decorative patterns
- **Right Panel**: Branding, forms, and interactive content

### Typography
- **Headings**: DM Serif Display (elegant serif font)
- **Body**: DM Sans (clean sans-serif font)

### Color Palette

**Light Theme:**
- Background: `#F5F3EF` (warm off-white)
- Panel: `#FFFFFF` (white)
- Accent: `#E8B86D` (golden)
- Text: `#1A1A2E` (dark blue)
- Success: `#1A7A4A` (forest green)
- Error: `#C0392B` (crimson red)

**Dark Theme:**
- Background: `#0D0D1A` (deep blue-black)
- Panel: `#16162A` (midnight blue)
- Accent: `#E8B86D` (golden)
- Text: `#F0EDE8` (off-white)
- Success: `#2ECC71` (emerald green)
- Error: `#E74C3C` (bright red)

## 🔐 Demo Credentials

For testing the module, use these credentials:

```
Email: admin@company.com
Password: Admin@123
```

## 📱 Screens

### 1. Login Screen
- Email and password inputs with validation
- Show/hide password toggle
- Forgot password link
- Demo credentials hint
- Loading state during authentication

### 2. Forgot Password Screen
- Back to login navigation
- Email input with validation
- Send reset link button
- Success state with confirmation message

### 3. Success Screen
- Animated checkmark
- User information display
- JWT token visualization
- Sign out button

## 🎭 Animations

- **Page Entrance**: Fade in + slide up (0.5s)
- **Loading**: Rotating spinner
- **Success Icon**: Scale + rotate animation
- **Input Focus**: Accent border + soft glow
- **Button Hover**: Darken + lift effect
- **Illustration**: Floating animation (3s loop)

## 🏗️ File Structure

```
/src
├── types/
│   └── index.ts              # TypeScript interfaces
├── hooks/
│   └── useAuth.ts            # Authentication logic hook
├── components/
│   ├── LoginPage.tsx         # Login screen
│   ├── ForgotPassword.tsx    # Password reset screen
│   └── SuccessScreen.tsx     # Success/authenticated screen
├── styles/
│   └── auth.css              # Complete styling system
└── index.ts                  # Main module export
```

## 🔧 Customization

### Changing Credentials

Edit `/src/hooks/useAuth.ts`:

```typescript
const DEMO_EMAIL = "your@email.com";
const DEMO_PASSWORD = "YourPassword123";
```

### Modifying User Data

In `useAuth.ts`, update the user object:

```typescript
const user: User = {
  name: "Your Name",
  email: credentials.email,
  role: "Your Role",
};
```

### Adjusting Theme Colors

Colors are defined as CSS variables in `/src/index.ts`. Modify the `useEffect` that sets theme variables.

### Custom Validation

Add or modify validation rules in the respective component files:
- `LoginPage.tsx`: `validateEmail()`, `validatePassword()`
- `ForgotPassword.tsx`: `validateEmail()`

## 📐 Responsive Breakpoints

- **Desktop**: Full split-screen layout (> 768px)
- **Tablet**: Adjusted panel widths (768px - 1024px)
- **Mobile**: Stacked layout, left panel becomes header (< 768px)

## ♿ Accessibility

- Semantic HTML elements
- Proper label associations
- Keyboard navigation support
- Focus indicators
- Screen reader friendly error messages
- ARIA attributes where needed

## 🧪 Testing Flow

1. Load the application
2. Toggle between light/dark themes
3. Try invalid credentials (see error banner)
4. Try valid credentials (admin@company.com / Admin@123)
5. View success screen with user info and token
6. Click "Forgot Password" link
7. Submit email for password reset
8. View success message
9. Return to login
10. Login and sign out

## 🚨 Important Notes

- **JWT Generation**: Uses `btoa()` for demo purposes only. In production, use a proper JWT library and backend authentication.
- **Validation**: Client-side only. Always validate on the server in production.
- **Security**: This is a demo module. Implement proper security measures for production use.
- **Token Storage**: Handle token storage securely (HttpOnly cookies or secure storage).

## 🎯 Production Checklist

Before using in production:

- [ ] Replace mock authentication with real API calls
- [ ] Implement server-side validation
- [ ] Use proper JWT library (e.g., jsonwebtoken)
- [ ] Add CSRF protection
- [ ] Implement rate limiting
- [ ] Add proper error handling and logging
- [ ] Use HTTPS only
- [ ] Implement secure token storage
- [ ] Add remember me functionality (optional)
- [ ] Implement 2FA support (optional)
- [ ] Add password strength requirements
- [ ] Implement account lockout after failed attempts

## 📄 License

This module is part of the Figma Make project.

## 🤝 Support

For issues or questions, please refer to the main project documentation.

---

**Built with ❤️ as a Senior Architect-grade authentication solution**
